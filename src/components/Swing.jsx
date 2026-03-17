import { useEffect, useRef } from "react";
import s from "./modules/Swing.module.css";

export default function Swing() {
  const pivotRef = useRef(null);
  const stateRef = useRef({
    angle: 0,
    velocity: 0,
    gravity: 0.005,
    damping: 0.9995,
  });
  const rafRef = useRef(null);

  useEffect(() => {
    const pivot = pivotRef.current;
    if (!pivot) return;

    const tick = () => {
      const s = stateRef.current;
      const acceleration = -s.gravity * Math.sin(s.angle);
      s.velocity += acceleration;
      s.velocity *= s.damping;
      s.angle += s.velocity;
      pivot.style.transform = `rotate(${s.angle * (180 / Math.PI)}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <a>
      <div
        className={s.swingAnchor}
        onMouseEnter={() => {
          stateRef.current.velocity += 0.01;
          window.dispatchEvent(new CustomEvent("swing-hover-enter"));
        }}
        onMouseLeave={() => window.dispatchEvent(new CustomEvent("swing-hover-leave"))}
        onClick={() => window.dispatchEvent(new CustomEvent("navigate-playground"))}
      >
        <div
          className={s.swingPivot}
          ref={pivotRef}
        >
          {/* Ropes */}
          <svg width="17" height="107" viewBox="0 0 17 107" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="-1" x2="105" y2="-1" transform="matrix(0 1 1 0 2.06348 0)" stroke="black" strokeWidth="2"/>
            <line x1="15.5635" x2="15.5635" y2="101" stroke="black" strokeWidth="2"/>
            <path d="M1.0813 105.006L2.08408 105.563L0.0735092 105L1.0813 105.006Z" fill="black"/>
            <path d="M2.07907 106.115L1.07127 106.109L0.0634766 106.103L2.07907 106.115ZM2.07907 106.115L0.0684929 105.551L1.07629 105.557L2.08408 105.563M2.08408 105.563L1.0813 105.006L0.0735092 105M2.08408 105.563L0.0735092 105M0.0735092 105L2.0891 105.012" stroke="black" strokeWidth="0.5"/>
            <path d="M15.4583 101.002L16.6428 101.561L14.2688 100.995L15.4583 101.002Z" fill="black"/>
            <path d="M16.6378 102.112L15.4483 102.105L14.2588 102.098L16.6378 102.112ZM16.6378 102.112L14.2638 101.546L15.4533 101.553L16.6428 101.561M16.6428 101.561L15.4583 101.002L14.2688 100.995M16.6428 101.561L14.2688 100.995M14.2688 100.995L16.6478 101.009" stroke="black" strokeWidth="0.5"/>
          </svg>

          {/* Seat */}
          <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: "-5px", marginLeft: "-3px"}}
          >
            <path d="M14.6553 10.6968L19.1553 0.196777L20.1553 12.6968L14.6553 10.6968Z" stroke="black" strokeLinecap="round"/>
            <path d="M9.65527 15.6968C6.94924 17.1175 0.155273 17.6968 0.155273 17.6968L9.15527 18.6968C9.15527 18.6968 12.2027 17.6731 14.1553 16.6968C16.4984 15.5252 20.6553 13.1968 20.6553 13.1968L14.1553 10.6968C14.1553 10.6968 11.8215 14.5594 9.65527 15.6968Z" fill="black" stroke="black" strokeWidth="0.3"/>
            <path d="M8.65527 18.1968L4.65527 4.19678L0.655273 17.419L8.65527 18.1968Z" stroke="black" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
}