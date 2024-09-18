import React from 'react'

import styles from "./Contact.module.css"
import { getImageURl } from '../utils';

export default function Contact() {
    return (
        <footer id="contact" className={styles.contactSection}>
            <div className={styles.text}>
                <h2>Contact</h2>
                <p>Feel free to reach out!</p>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={getImageURl("contact/emailIcon.png")} alt="email icon" />
                    <a href="mailto:chadha.ma@northeastern.edu">chadha.ma@northeastern.edu</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageURl("contact/linkedinIcon.png")} alt="linkedin icon" />
                    <a href="https://www.linkedin.com/in/mahika-chadha-43b299211/">linkedin.com/mahikachadha</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageURl("contact/githubIcon.png")} alt="github icon" />
                    <a href="https://github.com/mahikachadha5">github.com/mahikachadha</a>
                </li>
            </ul>
            

            

        </footer>

    )
}