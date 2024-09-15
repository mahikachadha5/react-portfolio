import React, {useState} from 'react';

import styles from "./Navbar.module.css"
import { getImageURl } from '../utils';

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`${styles.navbar} navbar`}>
            <a className={styles.title} href="/">Mahika Chadha</a>
            <div className={styles.menu}>
                <img className={styles.menuBtn} 
                src={menuOpen ? getImageURl("nav/closeIcon.png") : getImageURl("nav/menuIcon.png")} 
                onClick={() => setMenuOpen(!menuOpen)}
                alt='menu-button'
                />
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                onClick={() => setMenuOpen(false)}>
                    <li><a href="#about">about</a></li>
                    <li><a href="#experience">experience</a></li>
                    <li><a href="#projects">projects</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </div>
        </nav>

    )
}