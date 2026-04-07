import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export default function GridBackground() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const { left, top, right, bottom } = el.getBoundingClientRect();
      if (
        e.clientX < left ||
        e.clientX > right ||
        e.clientY < top ||
        e.clientY > bottom
      ) {
        animate(mouseX, -999, { type: "spring", stiffness: 100, damping: 30 });
        animate(mouseY, -999, { type: "spring", stiffness: 100, damping: 30 });
      } else {
        animate(mouseX, e.clientX - left, {
          type: "spring",
          stiffness: 150,
          damping: 25,
        });
        animate(mouseY, e.clientY - top, {
          type: "spring",
          stiffness: 150,
          damping: 25,
        });
      }
    };

    const onMouseLeave = () => {
      animate(mouseX, -999, { type: "spring", stiffness: 100, damping: 30 });
      animate(mouseY, -999, { type: "spring", stiffness: 100, damping: 30 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY]);

  const baseGridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Base grid — always visible */}
      <div style={{ position: "absolute", inset: 0, ...baseGridStyle }} />

      {/* Colored grid — revealed under cursor via SVG mask */}
      <svg style={{ position: "absolute", inset: 0, height: "100%", width: "100%" }}>
        <defs>
          <linearGradient id="gb-line-color" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#CE53E0" />
            <stop offset="100%" stopColor="#f97066" />
          </linearGradient>

          <pattern
            height="40"
            id="gb-grid-lines-pattern"
            patternUnits="userSpaceOnUse"
            width="40"
          >
            <rect fill="black" height="40" width="40" />
            <rect fill="white" height="40" width="1" x="39" y="0" />
            <rect fill="white" height="1" width="40" x="0" y="39" />
          </pattern>
          <mask id="gb-grid-lines-mask">
            <rect fill="url(#gb-grid-lines-pattern)" height="100%" width="100%" />
          </mask>

          <motion.radialGradient
            cx={useMotionTemplate`${mouseX}px`}
            cy={useMotionTemplate`${mouseY}px`}
            gradientUnits="userSpaceOnUse"
            id="gb-grid-reveal"
            r="100"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </motion.radialGradient>
          <mask id="gb-cursor-mask">
            <rect fill="url(#gb-grid-reveal)" height="100%" width="100%" />
          </mask>
        </defs>

        <g mask="url(#gb-cursor-mask)">
          <rect
            fill="url(#gb-line-color)"
            height="100%"
            mask="url(#gb-grid-lines-mask)"
            width="100%"
          />
        </g>
      </svg>
    </div>
  );
}
