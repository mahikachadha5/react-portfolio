import styles from "./modules/Hero.module.css";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  const name = "MAHIKA CHADHA";

  const handleScrollToSection = () => {
    const targetElement = document.getElementById("about");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        HELLO, I&#39;M{" "}
        {name.split("").map((char, index) => (
          <span key={index} className={styles.letter}>
            {char == " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <div className={`${styles.title} code`}>
        I'M A{" "}
        <Typewriter
          words={[
            "SOFTWARE ENGINEER",
            "UX DESIGNER",
            "FRONT-END DEVELOPER",
            "PROBLEM SOLVER",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={90}
          deleteSpeed={90}
          delaySpeed={1500}
        />
      </div>
      <button onClick={handleScrollToSection} className={styles.button}>
        Learn More ↓
      </button>
    </section>
  );
}
