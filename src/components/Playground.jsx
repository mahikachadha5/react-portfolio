import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Background from "./Background";
import styles from "./modules/Playground.module.css";
import CursorBlob from "../interactions/CursorBlob"
import HalftoneSphere from "../interactions/HalftoneSphere"
import CursorText from "../interactions/CursorText";
import CopyTo from "../interactions/CopyTo"

const interactions = [
  { id: 1, title: "Halftone Orb", component: HalftoneSphere },
// { id: 2, title: "Cursor Effects", component: CursorText },
  { id: 3, title: "Copy To", component: CopyTo, info: "Custom cubic bezier curves make exits snap away (0.4, 0, 1, 1) and entries decelerate into place (0, 0, 0.2, 1). The same curve both ways feels mechanical." },
];

function PlaygroundCard({ title, component: Component, info }) {
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={styles.card}
      style={{
        borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
        zIndex: showInfo ? 10 : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
    </div>
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
              
              <PlaygroundCard key={interaction.id} {...interaction} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
