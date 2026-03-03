import styles from "./modules/About.module.css";
import { getImageURL } from "../utils";

export default function About() {
  const skills = [
        { id: 0, label: "JavaScript", icon: "skills/js.png" },
        { id: 1,label: "TypeScript", icon: "skills/ts.png" },
        { id: 2,label: "Python", icon: "skills/python.png" },
        { id: 3,label: "Java", icon: "skills/java.png" },
        { id: 4,label: "C#", icon: "skills/csharp.png" },
        { id: 5,label: "XAML", icon: "skills/xaml.png" },
        { id: 0,label: "HTML", icon: "skills/html.png" },
        { id: 6,label: "CSS", icon: "skills/css.png" },
        { id: 7,label: "React", icon: "skills/react.png" },
        { id: 8,label: "Node.js", icon: "skills/node.png" },
        { id: 9,label: "Git", icon: "skills/git.png" },
        { id: 10,label: "Figma", icon: "skills/figma.png" },
        { id: 11,label: "Firebase", icon: "skills/firebase.png" },
        { id: 12,label: "MongoDB", icon: "skills/mongo.png" },
  ];

  return (
    <section id="about" className={`${styles.aboutContainer}`}>
      <h2>About Me</h2>
      
        <div className={`${styles.textContainer}`}>
          <p className={styles.description}>
            I design and build software with <strong>people</strong> in mind. Backed by a joint degree in Computer Science and Cognitive Psychology, 
            I focus on creating <strong>intuitive and thoughtful</strong> user experiences.
            <br />
            <br />
            Prev @ Delsys, PVH (Calvin Klein & Tommy Hilfiger)
          </p>
          
        </div>
        <div className={`${styles.skillsContainer}`}>
              <h3>Skills</h3>
              <ul className={styles.skillsList}>
                
                {skills.map(({ id, label, icon }) => (
                  <li key={id} className={`${styles.skillItem} code`}>
                    <img
                      className={styles.skillImg}
                      src={getImageURL(icon)}
                      alt={`${label} icon`}
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          
    </section>
  );
}
