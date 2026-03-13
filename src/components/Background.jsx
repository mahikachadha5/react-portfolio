import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./modules/Background.module.css";

export default function GrainBackground() {
  const { scrollYProgress } = useScroll();

  // Scroll breakpoints: 0 = top of page, 0.4 = projects, 0.75 = contact
  const breakpoints = [0, 0.4, 0.75, 1];

  // Top blob: travels top-right → bottom-left by end of projects (0.4)
  const topX = useTransform(scrollYProgress, breakpoints, [0, -300, -500, 100]);
  const topY = useTransform(scrollYProgress, breakpoints, [0, 100, 100, 0]);
  const topScale = useTransform(scrollYProgress, breakpoints, [1, 1.3, 0.85, 1.1]);
  const topRadius = useTransform(
    scrollYProgress,
    breakpoints,
    ["40% 60% 55% 45%", "65% 35% 70% 30%", "30% 70% 45% 55%", "55% 45% 60% 40%"]
  );

  // Bottom blob
  const bottomX = useTransform(scrollYProgress, breakpoints, [0, 800, 900, 0]);
  const bottomY = useTransform(scrollYProgress, breakpoints, [0, 100, 0, 0]);
  const bottomScale = useTransform(scrollYProgress, breakpoints, [1, 0.75, 1.4, 0.9]);
  const bottomRadius = useTransform(
    scrollYProgress,
    breakpoints,
    ["55% 45% 40% 60%", "30% 70% 55% 45%", "60% 40% 30% 70%", "45% 55% 50% 50%"]
  );

  return (
    <div className={styles.background}>
      <motion.div
        className={styles.blobTop}
        style={{ x: topX, y: topY, scale: topScale, borderRadius: topRadius }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={styles.blobBottom}
        style={{ x: bottomX, y: bottomY, scale: bottomScale, borderRadius: bottomRadius }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className={styles.grain} />
    </div>
  );
}
