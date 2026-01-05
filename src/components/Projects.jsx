import { useState, useEffect } from "react";
import { getProjects } from "../utils";
import styles from "./modules/Projects.module.css";
import global from "../App.module.css";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <div
      id="projects"
      data-component="projectCard"
      className={`${styles.projectsContainer} project`}
    >
      {loading && <div className={styles.loading}>Loading projects...</div>}

      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && (
        <div className={`${styles.imgContainer} project`}>
          {projects.map((project) => (
            <div key={project.id} className={`${styles.project} project`}>
              <Link
                className={`${styles.projectLink} project`}
                to={`/projects/${project.id}`}
              >
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className={`${styles.projectImage} project`}
                />
                <div className={`${styles.projectOverlay} project`}>
                  <h1 className={`${styles.projectName} project`}>
                    {project.name}
                  </h1>
                  <p className={`${styles.projectDescription} project`}>
                    {project.description}
                  </p>
                  <div className={`${styles.skills} project`}>
                    {project.skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`${styles.skillItem} project`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
