import styles from "./modules/Hero.module.css";

export default function Hero() {
  const name = "MAHIKA CHADHA";

  const handleScrollToSection = () => {
    const targetElement = document.getElementById("projects");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="about" className={styles.container}>
      <h1 className={styles.title}>
        {name.split("").map((char, index) => (
          <span key={index} className={styles.letter}>
            {char == " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <div className={`${styles.description}`}>
        FULL-STACK DEVELOPMENT & UX-DRIVEN PROBLEM SOLVING
      </div>
      <button onClick={handleScrollToSection} className={styles.button}>
        VIEW MY WORK ↓
      </button>
    </section>
  );
}
