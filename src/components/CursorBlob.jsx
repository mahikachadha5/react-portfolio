import { useEffect, useState, useRef } from "react";
import styles from "./modules/CursorBlob.module.css";

const CursorBlob = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const blob4Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateBlob = (blobRef) => {
      if (!blobRef.current) return;

      const blob = blobRef.current;
      const rect = blob.getBoundingClientRect();

      const blobCenterX = rect.left + rect.width / 2;
      const blobCenterY = rect.top + rect.height / 2;

      const dx = mousePosition.x - blobCenterX;
      const dy = mousePosition.y - blobCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 300) {
        // Move away from cursor
        const pushX = -(dx / distance) * 600;
        const pushY = -(dy / distance) * 600;
        blob.style.transform = `translate(${pushX}px, ${pushY}px)`;
        blob.style.opacity = "0.6";
      } else {
        // Return closer to original position
        blob.style.transform = `translate(0px, 0px)`;
        blob.style.opacity = "0.8";
      }

      // Add transition for smooth movement
      blob.style.transition = "transform 1.2s ease-out, opacity 1s ease-out";
    };

    updateBlob(blob1Ref);
    updateBlob(blob2Ref);
    updateBlob(blob3Ref);
    updateBlob(blob4Ref);
  }, [mousePosition]);

  return (
    <div className={styles.blobsContainer}>
      <div ref={blob1Ref} className={`${styles.blob} ${styles.blob1}`} />
      <div ref={blob2Ref} className={`${styles.blob} ${styles.blob2}`} />
      <div ref={blob3Ref} className={`${styles.blob} ${styles.blob3}`} />
      <div ref={blob4Ref} className={`${styles.blob} ${styles.blob4}`} />
    </div>
  );
};

export default CursorBlob;
