import { useState } from "react";

import styles from "./modules/Navbar.module.css";
import { getImageURL } from "../utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <img
        href="/"
        className={styles.title}
        src={getImageURL("nav/mc.svg")}
      />

      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageURL("nav/closeIcon.png")
              : getImageURL("nav/menuIcon.png")
          }
          onClick={() => setMenuOpen(!menuOpen)}
          alt="menu-button"
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#projects">PROJECTS</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
