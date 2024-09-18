import React from 'react'

import styles from "./Hero.module.css"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef } from 'react';


import { getImageURl } from '../utils'

export default function Hero() {
    



    return (
        <section className={styles.container} >
            <div className={styles.content} >
                <h1 className={styles.title} >Hi, I'm Mahika!</h1>
                <p className={styles.description}>I'm a fourth-year student at Northeastern University studying 
                    Computer Science and Cognitive Psychology! I am really 
                    interested in full-stack development and the interfaces 
                    between people and technology! Reach out if you would like to hear more!
                </p>
                
                
                <a className={styles.contactBtn}href="mailto:chadhama5@gmail.com">Contact Me</a>
        </div>
        <div className={styles.imgHolder}><img src={getImageURl("contact/me.png")} alt="an image of mahika chadha" /></div>
            <div className={styles.topBlur}></div>
            <div className={styles.bottomBlur}></div>

        </section>
    )
}