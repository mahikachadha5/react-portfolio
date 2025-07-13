import styles from "./modules/Hero.module.css";

export default function Hero() {
  const firstName = "MAHIKA";
  const lastName = "CHADHA";

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>HELLO, I&#39;M</h1>
        <div className={styles.nameContainer}>
          <h1 className={styles.highlight}>
            {firstName.split("").map((char, index) => (
              <span key={index} className={styles.letter}>
                {char == " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <h1 className={styles.highlight}>
            {lastName.split("").map((char, index) => (
              <span key={index} className={styles.letter}>
                {char == " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
        <p className={styles.description}>
          I blend design, code, and cognitive science to build interfaces that
          not only look good but are intuitive, fast, and user-first. With a
          joint degree in Computer Science and Cognitive Psychology, I bringe a
          unique perspective to Software Engineering.
          <br />
          <br />
        </p>
      </div>
    </section>
  );
}
