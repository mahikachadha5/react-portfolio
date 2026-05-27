import { motion } from "framer-motion";
import styles from "./modules/Hero.module.css";

const container = {
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className={styles.container}>
      <motion.div className={styles.heroContent} variants={container} initial="initial" animate="animate">
        <motion.h1 className={styles.title} variants={item} whileInView>
          Mahika Chadha{" "}
          <span className={`${styles.title} ${styles.spin}`}>✧</span>
          <span className={`${styles.title} ${styles.stretch}`}>˖</span>
          °.
        </motion.h1>
        <motion.div className={styles.descriptionsContainer} variants={item}>
          <div className={styles.mainDescription}>
            Design engineer who thinks in systems and psychology. I care deeply about craft and making experiences memorable.
          </div>
          <div className={styles.description}>
            Background in Computer Science + Cognitive Psychology. Born in New Jersey, short stints in SF and Madrid, now back in New Jersey.
            <br />
            <br />
            Previously @ <a className={styles.link} href="https://www.calvinklein.us/en">Calvin Klein</a> and <a className={styles.link} href="https://delsys.com/">Delsys</a>.
            Currently obsessing over typography, micro-interactions, and the physics of good UI.
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        className={styles.scrollArrow}
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to projects"
        variants={item}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
      >
        <svg width="28" height="15" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 0.5L10.5 10.5" stroke="currentColor" strokeLinecap="round"/>
          <path d="M20.5 0.5L10.5 10.5" stroke="currentColor" strokeLinecap="round"/>
        </svg>
      </motion.button>
    </section>
  );
}
