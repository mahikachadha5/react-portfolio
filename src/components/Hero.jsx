import styles from "./modules/Hero.module.css";

export default function Hero() {
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
        <h1 className={styles.title}>Mahika Chadha{" "}
          <span className={`${styles.title} ${styles.spin}`}>✧</span>
          <span className={`${styles.title} ${styles.stretch}`}>˖</span>
          °.
          </h1>
        <div className={styles.descriptionsContainer}>
          <div className={styles.mainDescription}>
            Design engineer who thinks in systems and psychology. I care deeply about craft and making experiences memorable.            
        </div>
        <div className={styles.description}>
            Background in Computer Science + Cognitive Psychology. Born in New Jersey, short stints in SF and Madrid, now back in New Jersey.
            <br />
            <br />
             Previously @ <a className={styles.link} href="https://www.calvinklein.us/en">Calvin Klein</a> and <a className={styles.link} href="https://delsys.com/">Delsys</a>.
            Currently building RL agents that can see and playing around with D3.js. 
            {/* <br /> */}
            {/* <br /> */}
            {/* Outside of work, I'm a self-proclaimed food critic, dog lover, avid tennis player, Alcaraz enthusiast, and devoted gym-goer.        */}
             </div>
        </div>
      </div>
    
      <button
        className={styles.scrollArrow}
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to projects"
      >
        <svg width="28" height="15" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 0.5L10.5 10.5" stroke="currentColor" strokeLinecap="round"/>
          <path d="M20.5 0.5L10.5 10.5" stroke="currentColor" strokeLinecap="round"/>
        </svg>
      </button>
    </section>
  );
}
