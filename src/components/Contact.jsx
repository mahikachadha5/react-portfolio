import styles from "./modules/Contact.module.css";
import { getImageURL } from "../utils";

const contacts = [
  {
    label: "chadhama5@gmail.com",
    icon: "contact/emailIcon.png",
    link: "mailto:chadhama5@gmail.com",
    alt: "email icon",
  },
  {
    label: "linkedin.com/mahikachadha",
    icon: "contact/linkedinIcon.png",
    link: "https://www.linkedin.com/in/mahika-chadha-43b299211/",
    alt: "linkedin icon",
  },
  {
    label: "github.com/mahikachadha",
    icon: "contact/githubIcon.png",
    link: "https://github.com/mahikachadha5",
    alt: "github icon",
  },
];

export default function Contact() {
  return (
    <footer id="contact" className={styles.contactSection}>
      <div className={styles.text}>
        <h2>CONTACT ME</h2>
      </div>
      <ul className={styles.links}>
        {contacts.map(({ label, icon, link, alt }, index) => (
          <li key={index} className={styles.link}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={getImageURL(icon)} alt={alt} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
