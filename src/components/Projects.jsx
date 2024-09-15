import React from 'react'


const projectsData = [
    { id: 1, name: "Project 1", description: "This is a description", skills: ["React", "Node.js", "Express"], imageUrl: "/assets/projects/kindnessApp.png" },
    { id: 2, name: "Project 2", description: "This is a description", skills: ["React", "Node.js", "Express"], imageUrl: "/assets/projects/kindnessApp.png" },
    { id: 2, name: "Project 3", description: "This is a description", skills: ["React", "Node.js", "Express"], imageUrl: "/assets/projects/kindnessApp.png" },
];


import styles from "./Projects.module.css"

export default function Projects() {
    return (
        <section className={styles.projectsContainer}>
            <h2 className={styles.projectTitle}>PROJECTS</h2>
            <div className={styles.imgContainer}>
                {projectsData.map((project) => (
                    <div key={project.id} className={styles.project}>
                        <img src={project.imageUrl} alt={project.name} className={styles.projectImage} />
                        <div className={styles.projectOverlay}>
                            <h1 className={styles.projectName}>{project.name}</h1>
                            <p className={styles.projectDescription}>{project.description}</p>
                            <div className={styles.skills}>
                                {project.skills.map((skill, index) => (
                                    <div key={index} className={styles.skillItem}>{skill}</div>
                                ))}
                            </div>
                        </div>
                    </div>
            ))}
            </div>

        </section>

    )
    
    
}