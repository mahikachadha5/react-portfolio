import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import Background from "./Background";
import styles from "./modules/Playground.module.css";
import HalftoneSphere from "../interactions/HalftoneSphere"
// import CursorText from "../interactions/CursorText";
// import CursorBlob from "../interactions/CursorBlob"
import CopyTo from "../interactions/CopyTo"
import GridBackground from "../interactions/GridBackground"
import GradientSwoop from "../interactions/GradientSwoop"
import UptimeRegionsHubDiagram from "../interactions/UptimeRegionsHubDiagram"

const interactions = [
  { id: 1, title: "Halftone Orb", component: HalftoneSphere },
  { id: 2, title: "Region Map", component: UptimeRegionsHubDiagram },
// { id: 2, title: "Cursor Effects", component: CursorText },
  { id: 3, title: "Copy To", component: CopyTo, info: "Custom cubic bezier curves make exits snap away (0.4, 0, 1, 1) and entries decelerate into place (0, 0, 0.2, 1). The same curve both ways feels mechanical." },
  { id: 4, title: "Grid Background", component: GridBackground },
  { id: 5, title: "Gradient Swoop", component: GradientSwoop },
];

const spring = { type: "spring", stiffness: 500, damping: 38 };

function PlaygroundCard({ id, title, component: Component, info, onExpand, isExpanded }) {
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={`card-${id}`}
      className={styles.card}
      style={{
        borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
        opacity: isExpanded ? 0 : 1,
        pointerEvents: isExpanded ? "none" : "auto",
        cursor: "pointer",
      }}
      whileTap={{ scale: 0.97 }}
      transition={shouldReduceMotion ? { duration: 0 } : spring}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onExpand(id)}
    >
      <div className={styles.cardContent}>
        <Component isActive={hovered} />
        <div className={styles.cardFooter}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      </div>
      {info && (
        <button
          className={styles.infoButton}
          onClick={(e) => { e.stopPropagation(); setShowInfo(v => !v); }}
        >
          i
        </button>
      )}
      {showInfo && (
        <div className={styles.infoPanel}>{info}</div>
      )}
    </motion.div>
  );
}

const container = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Playground() {
  const [expandedId, setExpandedId] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const expandedInteraction = interactions.find((i) => i.id === expandedId);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setExpandedId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Background />
      <motion.div
        className={styles.container}
        data-theme="dark"
        variants={container}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={item} className={styles.backWrapper}>
          <Link to="/" className={styles.back}>⥆⁀*•ˋ‧. ⊹ ₊ Back</Link>
        </motion.div>

        <motion.div variants={item} className={styles.header}>
          <h2>My Playground</h2>
          <p className={styles.subtitle}>
            Interactions I&apos;ve built and things I&apos;ve been exploring.
          </p>
        </motion.div>

        {interactions.length > 0 && (
          <motion.div variants={item} className={styles.grid}>
            {interactions.map((interaction) => (
              <PlaygroundCard
                key={interaction.id}
                {...interaction}
                onExpand={setExpandedId}
                isExpanded={expandedId === interaction.id}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {expandedInteraction && (() => {
          const ExpandedComponent = expandedInteraction.component;
          return (
            <>
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                onClick={() => setExpandedId(null)}
              />
              <div className={styles.expandedWrapper}>
                <motion.div
                  layoutId={`card-${expandedInteraction.id}`}
                  className={`${styles.card} ${styles.cardExpanded}`}
                  transition={shouldReduceMotion ? { duration: 0 } : spring}
                  data-theme="dark"
                >
                  <div className={styles.cardContentExpanded}>
                    <ExpandedComponent isActive={true} />
                  </div>
                  <div className={styles.cardFooter}>
                    <h3 className={styles.cardTitle} style={{ opacity: 1 }}>
                      {expandedInteraction.title}
                    </h3>
                    <button
                      className={styles.closeButton}
                      onClick={() => setExpandedId(null)}
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          );
        })()}
      </AnimatePresence>
    </>
  );
}
