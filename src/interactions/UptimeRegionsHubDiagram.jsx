import { geoNaturalEarth1, geoPath } from "d3-geo";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";

const ZONE_DEFS = [
  { ids: new Set([840, 124, 484, 304]) },
  { ids: new Set([826, 372, 250, 724, 620, 380, 56, 528, 300, 196]) },
  {
    ids: new Set([
      276, 208, 752, 578, 246, 40, 756, 616, 203, 348, 642, 100, 440, 428, 233,
      191,
    ]),
  },
  { ids: new Set([392, 410, 408, 704, 764, 360, 608, 458, 702]) },
  { ids: new Set([356, 586, 50, 144, 524, 64]) },
  { ids: new Set([76, 32, 152, 170, 604, 862, 68, 600, 858, 218, 328, 740]) },
];

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export default function UptimeRegionsHubDiagram() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;

    async function init() {
      if (!canvas || !ctx || destroyed) return;

      const logW = canvas.offsetWidth || 800;
      const logH = canvas.offsetHeight || 220;
      canvas.width = logW;
      canvas.height = logH;

      const BORDER = "#4a4a55";
      const FG = "#E7E8EB";

      const projection = geoNaturalEarth1().fitExtent(
        [[-100, -50], [logW + 100, logH + 50]],
        { type: "Sphere" }
      );

      if (destroyed) return;

      const features = topojson.feature(worldTopo, worldTopo.objects.countries).features;

      const baseC = document.createElement("canvas");
      baseC.width = logW;
      baseC.height = logH;
      const bx = baseC.getContext("2d");
      if (!bx) return;
      const bPath = geoPath(projection, bx);
      for (const f of features) {
        bx.beginPath();
        bPath(f);
        bx.strokeStyle = BORDER;
        bx.lineWidth = 0.3;
        bx.stroke();
      }

      const G = 3;
      const zones = ZONE_DEFS.map((def) => {
        const off = document.createElement("canvas");
        off.width = logW;
        off.height = logH;
        const ox = off.getContext("2d");
        if (!ox) return null;
        const oPath = geoPath(projection, ox);
        for (const f of features) {
          if (def.ids.has(+(f.id ?? -1))) {
            ox.beginPath();
            oPath(f);
            ox.fillStyle = "#fff";
            ox.fill();
          }
        }
        const data = ox.getImageData(0, 0, logW, logH).data;
        const pixels = [];
        for (let y = 0; y < logH; y += G)
          for (let x = 0; x < logW; x += G)
            if ((data[(y * logW + x) * 4] ?? 0) > 100) pixels.push(x, y);
        return { pixels, fill: FG, brightness: Math.random() * 0.6, rampUp: false };
      }).filter(Boolean);

      let seqIndex = 0;
      const RAMP_MS = 700;
      const DECAY_MS = 1800;

      function fireNext() {
        if (destroyed) return;
        for (const z of zones) { z.brightness = 0; z.rampUp = false; }
        const zone = zones[seqIndex % zones.length];
        if (zone) { zone.brightness = 0; zone.rampUp = true; }
        seqIndex++;
        setTimeout(fireNext, RAMP_MS + 400 + DECAY_MS);
      }
      setTimeout(fireNext, 300);

      let last = performance.now();

      function draw(ts) {
        if (!ctx || destroyed) return;
        const dt = Math.min(ts - last, 50);
        last = ts;

        ctx.clearRect(0, 0, logW, logH);
        ctx.drawImage(baseC, 0, 0);

        for (const zone of zones) {
          if (zone.rampUp) {
            zone.brightness = Math.min(1, zone.brightness + dt / 700);
            if (zone.brightness >= 1) zone.rampUp = false;
          } else {
            zone.brightness = Math.max(0, zone.brightness - dt / 1800);
          }
          if (zone.brightness <= 0) continue;

          ctx.fillStyle = zone.fill;
          for (let i = 0; i < zone.pixels.length; i += 2) {
            const x = zone.pixels[i];
            const y = zone.pixels[i + 1];
            const bayer = (BAYER[Math.floor(y / G) % 4]?.[Math.floor(x / G) % 4] ?? 0) / 16;
            if (zone.brightness > bayer) ctx.fillRect(x, y, 2, 2);
          }
        }

        rafRef.current = requestAnimationFrame(draw);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    init();

    return () => {
      destroyed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", alignSelf: "stretch", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
