import styles from "./modules/Contact.module.css";
import { getImageURL } from "../utils";

const contacts = [
  {
    icon: "contact/emailIcon.svg",
    link: "mailto:chadhama5@gmail.com",
    alt: "email icon",
  },
  {
    icon: "contact/linkedinIcon.svg",
    link: "https://www.linkedin.com/in/mahika-chadha-43b299211/",
    alt: "linkedin icon",
  },
  {
    icon: "contact/githubIcon.svg",
    link: "https://github.com/mahikachadha5",
    alt: "github icon",
  },
];

export default function Contact() {
  return (
    <footer id="contact" className={styles.contactSection}>
      <div className={styles.text}>
        <h1>Thanks for stopping by!</h1>
      </div>
      <ul className={styles.links}>
        {contacts.map(({ icon, link, alt }, index) => (
          <li key={index} className={styles.link}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={getImageURL(icon)} alt={alt} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
