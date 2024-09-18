import React, { useState } from 'react'

import { getImageURl } from '../utils';



const projectsData = [
    { id: 1, name: "My Portfolio", description: "This website!", longDesc: "Completed in 12 hours, deployed using Netlify, and fully responsive across all devices!", 
        skills: ["React.js", "Javascript", "CSS Modules"], imageUrl: getImageURl("projects/portfolio.png"), sourceCode: "https://github.com/mahikachadha5/react-portfolio" }, 
    { id: 2, name: "Spark", description: "Generate and track daily acts of kindness to spread positivity.", 
        longDesc: "A web app designed to inspire and encourage acts of kindness in everyday life. The app generates daily or weekly suggestions for good deeds, offering users simple yet impactful ways to make a positive difference. Users can track their completed acts of kindness, earning points and climbing a leaderboard that fosters a sense of community and friendly competition. ~in progress~", 
        skills: ["React", "Node.js", "Express", "Javascript"], imageUrl: getImageURl("projects/kindnessApp.png"),  },
    { id: 3, name: "Recipe Finder", description: "Discover and organize recipes tailored to your preferences and dietary needs", 
        longDesc: "The app allows users to discover a wide variety of recipes tailored to their dietary preferences and needs. Users can save their favorite recipes and even create shopping lists based on selected ingredients. The app also offers features like user authentication, allowing for a secure and personalized cooking experience that evolves with the user's tastes and preferences.", 
        skills: ["Android Studio", "Java", "Firebase", "RESTful API"], imageUrl: getImageURl("projects/recipeAppGif.gif"), sourceCode: "https://github.com/neu-cs4520/final-project-groups4finalproject-4" },
    { id: 4, name: "Travel Journal", description: "Travel journal of my trips while studying abroad.", longDesc: "This was my first solo React project, and a great way to compile my favorite memories and images from when I was abroad.", 
        skills: ["React", "Javascript", "CSS"], imageUrl: getImageURl("projects/travelJournal.png"), sourceCode: "https://v2.scrimba.com/s005kmodh3" },
    { id: 5, name: "Unplugged", description: "An app that helps you ~unplug~ from social media.", longDesc: "Unplugged is an app designed to help users discover engaging activities in their area, encouraging them to take a break from screens and connect with the world around them.", 
        skills: ["Figma"], imageUrl: getImageURl("projects/unplugged.png"), sourceCode: "https://www.figma.com/proto/H25mxEbFusN5oOlgVaOQI7/UNPLUGGED?node-id=226-1984&node-type=canvas&t=Z7aEin7uTfd3pfdX-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=85%3A1465&show-proto-sidebar=1" }, 
];


import styles from "./Projects.module.css"

export default function Projects() {

    const [ selectedProject, setSelectedProject ] = useState(null);
    const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsSidePanelOpen(true);
    }

    const handleClosePanel = () => {
        setIsSidePanelOpen(false);
    }


    return (
        <section id="projects" className={styles.projectsContainer}>
            <h2 className={styles.projectTitle}>Projects</h2>
            <p className={styles.comingSoon}>More coming soon!</p>
            <div className={styles.imgContainer}>
                {projectsData.map((project) => (
                    <div key={project.id} className={styles.project} onClick={() => handleProjectClick(project)}>
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

            {/* side panel */}
            <div className={`${styles.sidePanel} ${isSidePanelOpen ? styles.open : ''}`}>
                <img src="/assets/projects/backBtn.png" onClick={handleClosePanel} className={styles.closeBtn} />
                <hr className={styles.hr}/>
                {selectedProject && (
                    <div className={styles.sidePanelContent}>
                        <h2 className={styles.sidePanelTitle}>{selectedProject.name}</h2>
                        <img className={styles.sidePanelImg}src={selectedProject.imageUrl} alt="project image" />
                        <h2 className={styles.subheadings}>About</h2>
                        <p className={styles.sidePanelDesc}>{selectedProject.longDesc}</p>
                        <h2 className={styles.subheadings}>Technologies</h2>
                        <div className={styles.sidePanelSkills}>
                                {selectedProject.skills.map((skill, index) => (
                                    <div key={index} className={styles.sidePanelSkillItem}>{skill}</div>
                                ))}
                            </div>
                        <h2 className={styles.subheadings}>Take a Look</h2>
                        <a href={selectedProject.sourceCode} className={styles.sidePanelLink}>Click here to check it out!</a>
                        
                    </div>
                )}
            </div>
        </section>

    )


}