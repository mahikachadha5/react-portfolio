import { useEffect, useId, useRef } from "react";

function readVar(name, fallback) {
  if (typeof document === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function cubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const uu = u * u;
  const tt = t * t;
  return {
    x: uu * u * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + tt * t * p3.x,
    y: uu * u * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + tt * t * p3.y,
  };
}

function cubicTangent(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const uu = u * u;
  const tt = t * t;
  return {
    x: 3 * uu * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * tt * (p3.x - p2.x),
    y: 3 * uu * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * tt * (p3.y - p2.y),
  };
}

function norm(v) {
  const L = Math.hypot(v.x, v.y);
  if (L < 1e-9) return { x: 0, y: 1 };
  return { x: v.x / L, y: v.y / L };
}

function normalFromTangent(tan) {
  return norm({ x: -tan.y, y: tan.x });
}

const STRIP_STEPS = 135;

export default function GradientSwoop() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rawId = useId();
  const noiseFilterId = `grain-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!(container && canvas)) return;

    const draw = (t = 0) => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w < 1 || h < 1) return;

      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const amber = readVar("--brand-amber", "#E3A514");
      const orange = "#D66736";
      const coral = readVar("--brand-coral", "#B74677");
      const purple = readVar("--brand-purple", "#453C7C");
      const blue = "#152E7F";

      const s1 = Math.sin(t * 0.0004);
      const s2 = Math.sin(t * 0.0003 + 1.2);

      const p0 = { x: 0, y: h * 0.97 };
      const p1 = { x: w * (0.35 + s1 * 0.06), y: h * (0.22 + s2 * 0.05) };
      const p2 = { x: w * (0.72 - s2 * 0.05), y: h * (0.9  - s1 * 0.06) };
      const p3 = { x: w * 0.92, y: 0 };

      const m = Math.min(w, h);
      const thickBL = Math.max(56, m * 0.28);
      const thinTR = Math.max(22, m * 0.09);
      const halfWAt = (t) => thickBL * (1 - t) + thinTR * t;

      for (let i = 0; i < STRIP_STEPS; i++) {
        const t0 = i / STRIP_STEPS;
        const t1 = (i + 1) / STRIP_STEPS;
        const w0 = halfWAt(t0);
        const w1 = halfWAt(t1);
        const wMid = (w0 + w1) / 2;

        const pa = cubicBezier(p0, p1, p2, p3, t0);
        const pb = cubicBezier(p0, p1, p2, p3, t1);
        const ta = cubicTangent(p0, p1, p2, p3, t0);
        const tb = cubicTangent(p0, p1, p2, p3, t1);
        const na = normalFromTangent(ta);
        const nb = normalFromTangent(tb);

        const mid = { x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 };
        const navg = norm({ x: na.x + nb.x, y: na.y + nb.y });

        const g = ctx.createLinearGradient(
          mid.x - wMid * navg.x,
          mid.y - wMid * navg.y,
          mid.x + wMid * navg.x,
          mid.y + wMid * navg.y
        );
        g.addColorStop(0, "rgba(28, 28, 36, 0)");
        g.addColorStop(0.04, amber);
        g.addColorStop(0.22, orange);
        g.addColorStop(0.4, coral);
        g.addColorStop(0.62, purple);
        g.addColorStop(0.82, blue);
        g.addColorStop(0.96, "#0A1040");
        g.addColorStop(1, "rgba(28, 28, 36, 0)");

        ctx.beginPath();
        ctx.moveTo(pa.x - w0 * na.x, pa.y - w0 * na.y);
        ctx.lineTo(pa.x + w0 * na.x, pa.y + w0 * na.y);
        ctx.lineTo(pb.x + w1 * nb.x, pb.y + w1 * nb.y);
        ctx.lineTo(pb.x - w1 * nb.x, pb.y - w1 * nb.y);
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.globalAlpha = 1;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let rafId;
    const start = performance.now();

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      draw(performance.now() - start);
    };

    const ro = new ResizeObserver(() => {});
    ro.observe(container);
    rafId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return (
    <div
      aria-hidden
      ref={containerRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "#1c1c24" }} />

      <div style={{ position: "absolute", inset: 0, transform: "scale(1.2)", transformOrigin: "center" }}>
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%", filter: "blur(10px)" }}
        />
      </div>

      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}
      >
        <title>Grain</title>
        <defs>
          <filter colorInterpolationFilters="sRGB" id={noiseFilterId}>
            <feTurbulence baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" type="fractalNoise" />
          </filter>
        </defs>
        <rect filter={`url(#${noiseFilterId})`} height="100%" width="100%" />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, transparent 34%, #1c1c24 100%)",
        }}
      />
    </div>
  );
}
