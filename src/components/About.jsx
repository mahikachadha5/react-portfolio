import styles from "./modules/About.module.css";
import { getImageURL } from "../utils";

export default function About() {
  const skills = [
    {
      category: "Languages",
      items: [
        { label: "JavaScript", icon: "skills/js.png" },
        { label: "TypeScript", icon: "skills/ts.png" },
        { label: "Python", icon: "skills/python.png" },
        { label: "Java", icon: "skills/java.png" },
        { label: "C#", icon: "skills/csharp.png" },
        { label: "XAML", icon: "skills/xaml.png" },
        { label: "HTML", icon: "skills/html.png" },
        { label: "CSS", icon: "skills/css.png" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { label: "React", icon: "skills/react.png" },
        { label: "Node.js", icon: "skills/node.png" },
      ],
    },
    {
      category: "Other Tools",
      items: [
        { label: "Git", icon: "skills/git.png" },
        { label: "Figma", icon: "skills/figma.png" },
        { label: "Firebase", icon: "skills/firebase.png" },
        { label: "MongoDB", icon: "skills/mongo.png" },
      ],
    },
  ];

  return (
    <section id="about" className={`${styles.aboutContainer} code`}>
      <h2 className={`${styles.header}`}>About Me</h2>
      <div className={`${styles.contentContainer} code`}>
        <div className={`${styles.textContainer} code`}>
          <p className={styles.description}>
            I design and build software with <strong>people</strong> in mind.<br /><br />
            Backed by a joint degree in Computer Science and Cognitive Psychology, 
            I focus on creating <strong>intuitive and thoughtful</strong> user experiences.
            <br />
            <br />
            Prev @ Delsys, Calvin Klein & Tommy Hilfiger
          </p>
          
        </div>
        <div className={`${styles.skillsContainer} code`}>
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className={styles.skillsHeader}>{group.category}</h3>
              <ul className={styles.skillsList}>
                {group.items.map(({ label, icon }, index) => (
                  <li key={index} className={`${styles.skillItem} code`}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
