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
    caseStudy,
  } = project;

  const problem = caseStudy?.problem;
  const goal = caseStudy?.goal;
  const approach = caseStudy?.approach;
  const outcomes = caseStudy?.outcomes || [];
  const designIterations = caseStudy?.designIterations || [];
  const demoUrl = caseStudy?.demoUrl;

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

                {caseStudy && (
                  <div>
                    {problem && (
                      <>
                        <h3 className={styles.sectionHeader}>The Problem</h3>
                        <p className={styles.projectDescription}>{problem}</p>
                      </>
                    )}
                    {goal && (
                      <>
                        <h3 className={styles.sectionHeader}>The Goal</h3>
                        <p className={styles.projectDescription}>{goal}</p>
                      </>
                    )}

                    {approach && (
                      <>
                        <h3 className={styles.sectionHeader}>The Approach</h3>
                        <p className={styles.projectDescription}>{approach}</p>
                      </>
                    )}

                    {designIterations && designIterations.length > 0 && (
                      <>
                        <h3 className={`${styles.sectionHeader} design `}>
                          Design Iterations
                        </h3>
                        <div className={`${styles.designIterations} design `}>
                          {designIterations?.map((iteration, index) => (
                            <div
                              key={index}
                              className={`${styles.iterationBlock} design `}
                            >
                              <h3>{iteration.title}</h3>
                              <img
                                src={iteration.image}
                                alt={iteration.title}
                                className={`${styles.iterationImage} design `}
                              />
                              <p className={`${styles.iterationNotes} design `}>
                                {iteration.notes}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {outcomes && outcomes.length > 0 && (
                      <>
                        <h3 className={styles.sectionHeader}>Outcomes</h3>
                        {project.caseStudy.outcomes && (
                          <ul className={styles.outcomesList}>
                            {outcomes.map((outcome, index) => (
                              <li className={styles.outcome} key={index}>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}

                    {demoUrl && (
                      <div className={styles.linkSection}>
                        <a
                          href={demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                        >
                          View Demo →
                        </a>
                      </div>
                    )}
                  </div>
                )}

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
