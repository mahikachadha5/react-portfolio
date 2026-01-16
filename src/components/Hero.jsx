import styles from "./modules/Hero.module.css";

export default function Hero() {
  const name = "Mahika Chadha";

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
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
        {name.split("").map((char, index) => (
          <span key={index} className={styles.letter}>
            {char == " " ? "\u00A0" : char}
          </span>
        ))}
        </h1>

        <div className={`${styles.description}`}>
          Design-Driven Software Engineer
        </div>
      </div>
    
      <button onClick={handleScrollToSection} className={styles.button}>
        . ݁₊ ⊹ ˖ .‧ˋ°•*⁀➵
      </button>
    </section>
  );
}
