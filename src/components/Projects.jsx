import { useState, useEffect, useRef } from "react";
import { getProjects } from "../utils";
import styles from "./modules/Projects.module.css";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);

  const NAV_HEIGHT = 70;
  const SCROLL_PER_PROJECT = 900;

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

  useEffect(() => {
    if (projects.length === 0) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolledPast = Math.max(0, NAV_HEIGHT - rect.top);

      if (scrolledPast <= 0) {
        setActiveIndex(0);
        return;
      }

      const newIndex = Math.floor(scrolledPast / SCROLL_PER_PROJECT);
      const clampedIndex = Math.min(Math.max(0, newIndex), projects.length - 1);

      setActiveIndex(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects]);

  const calculateSectionHeight = () => {
    if (projects.length === 0) return 'auto';
    const scrollRoom = (projects.length - 1) * SCROLL_PER_PROJECT;
    return `calc(100vh + ${scrollRoom}px)`;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.section}
      style={{ height: loading ? 'auto' : calculateSectionHeight() }}
    >
      <div
        className={styles.sticky}
        style={{ top: NAV_HEIGHT }}
      >
        <header className={styles.header}>
          <h2>Projects</h2>
        </header>

        {loading && <div className={styles.loading}>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && (
          <div className={styles.layout}>

            <div className={styles.titlesList}>
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={project.id}
                    className={`${styles.titleRow} ${isActive ? styles.active : ''}`}
                  >
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <Link
                      to={`/projects/${project.id}`}
                      className={styles.titleLink}
                    >
                      <h3 className={styles.title}>{project.name}</h3>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className={styles.contentArea}>
              {projects[activeIndex] && (
                <div className={styles.projectContent}>
                  <div className={styles.imageWrap}>
                    <img
                      src={projects[activeIndex].imageUrl}
                      alt={projects[activeIndex].name}
                      className={styles.image}
                    />
                  </div>

                  <p className={styles.description}>
                    {projects[activeIndex].description}
                  </p>

                  <div className={styles.skills}>
                    {projects[activeIndex].skills.map((skill, i) => (
                      <span key={i} className={styles.skill}>{skill}</span>
                    ))}
                  </div>

                  <div className={styles.buttons}>
                    <Link
                      to={`/projects/${projects[activeIndex].id}`}
                      className={styles.viewLink}
                    >
                      Learn More →
                    </Link>

                    {projects[activeIndex].sourceCode === "comingsoon" ? (
                      <span className={styles.comingSoon}>Coming soon</span>
                    ) : projects[activeIndex].sourceCode ? (
                      <a
                        href={projects[activeIndex].sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.codeLink}
                      >
                        View code →
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
