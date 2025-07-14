import styles from "./modules/Hero.module.css";

export default function Hero() {
  const firstName = "MAHIKA CHADHA";

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        HELLO, I&#39;M{" "}
        {firstName.split("").map((char, index) => (
          <span key={index} className={styles.letter}>
            {char == " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <h1 className={styles.title}>I&#39;M A SOFTWARE ENGINEER</h1>
      <button className={styles.button}>Learn More ↓</button>
    </section>
  );
}
