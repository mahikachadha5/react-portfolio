import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProjects } from "../utils";
import styles from "./modules/ProjectDetail.module.css";
import global from "../App.module.css";

import { motion } from "framer-motion";

export default function ProjectDetail() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = projects.find((p) => p.id.toString() === id);
  if (!project) return <div>Project not found</div>;

  const {
    name,
    imageUrl,
    sourceCode,
    skills,
    longDesc,
    description,
  } = project;


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      {error ? (
        <div>An error occured: {error}</div>
      ) : (
        <div>
          {" "}
          <motion.div
            className={styles.projectDetailContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className={styles.navigation}>
              <button
                onClick={() => {
                  navigate("/", { state: { returnToProjectId: id } });
                }}
                className={styles.backButton}
              >
               ⥆⁀*•ˋ‧. ⊹ ₊ Back to projects
              </button>
            </div>

            <div className={styles.contentWrapper}>
              <motion.header
                className={styles.secondaryHeader}
                variants={itemVariants}
              >
                <h1 className={global["heading-lg"]}>{name}</h1>
              </motion.header>

              <motion.div
                className={styles.heroImageContainer}
                variants={itemVariants}
              >
                <img src={imageUrl} alt={name} className={styles.heroImage} />
              </motion.div>

              <motion.div
                className={styles.projectMeta}
                variants={itemVariants}
              >
                <div className={`${styles.skillsContainer} code `}>
                  {skills.map((skill, index) => (
                    <span key={index} className={`${global["skill"]} code `}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className={styles.projectContent}
                variants={itemVariants}
              >
                <div className={styles.descriptionSection}>
                  <h3 className={styles.sectionHeader}>Overview</h3>
                  <p className={styles.projectDescription}>
                    {longDesc || description}
                  </p>
                </div>

                {sourceCode && (
                  <div className={styles.linkSection}>
                    <a
                      href={sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      View Project →
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
