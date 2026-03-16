import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Background from "./Background";
import styles from "./modules/Playground.module.css";
import CursorBlob from "../interactions/CursorBlob"

// ─── Add interactions here ────────────────────────────────────────────────────
// import MyThing from "../interactions/MyThing";
//
// const interactions = [
//   { id: 1, title: "My Thing", description: "What it does.", component: MyThing, githubUrl: "https://github.com/..." },
// ];
// const interactions = [{
//   id: 1, title: "Moving Blobs", description: "Something", component: CursorBlob, githubUrl: "https://github.com/"
// }];
const interactions = [];
// ─────────────────────────────────────────────────────────────────────────────

function PlaygroundCard({ title, component: Component, githubUrl }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.card}
      style={{ borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardContent}>
        <Component isActive={hovered} />
        <div className={styles.cardFooter}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        {/* {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.sourceLink}
            style={{ opacity: hovered ? 1 : 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {"</>"}
          </a>
        )} */}
      </div>
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

        <em>Coming soon.</em>

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
