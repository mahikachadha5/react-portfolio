import styles from "./modules/Contact.module.css";

const contacts = [
  { label: "EMAIL", link: "mailto:chadhama5@gmail.com" },
  { label: "LINKEDIN", link: "https://www.linkedin.com/in/mahika-chadha-43b299211/" },
  { label: "GITHUB", link: "https://github.com/mahikachadha5" },
];

export default function Contact() {
  return (
    <footer id="contact" className={styles.contactSection}>
      <div className={styles.mainContent}>
        <div>
          <h1 className={styles.text}>Let's work together</h1>
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.copyright}>© 2026</p>
        <ul className={styles.links}>
          {contacts.map(({ label, link }, index) => (
            <li key={index} className={styles.link}>
              <a href={link} target="_blank" rel="noopener noreferrer">{label}</a>
              {index < contacts.length - 1 && <span className={styles.dot}></span>}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
