import { useState } from "react";

import styles from "./modules/Navbar.module.css";
import { getImageURl } from "../utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <img
        href="/"
        className={styles.title}
        src={getImageURl("nav/Vector.png")}
      />

      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageURl("nav/closeIcon.png")
              : getImageURl("nav/menuIcon.png")
          }
          onClick={() => setMenuOpen(!menuOpen)}
          alt="menu-button"
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
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
