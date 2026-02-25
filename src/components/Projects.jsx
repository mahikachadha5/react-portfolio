import { useState, useEffect, useRef } from "react";
import { getProjects } from "../utils";
import styles from "./modules/Projects.module.css";
import global from "../App.module.css"
import { Link, useLocation } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const location = useLocation();

  const NAV_HEIGHT = 70;
  const SCROLL_PER_PROJECT = 900;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1000px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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

  useEffect(() => {
    if (projects.length === 0 || !location.state?.returnToProjectId) return;

    const projectIndex = projects.findIndex(
      (p) => p.id.toString() === location.state.returnToProjectId
    );

    if (projectIndex !== -1 && sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const targetScroll = sectionTop - NAV_HEIGHT + (projectIndex * SCROLL_PER_PROJECT);

      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });
    }
  }, [projects, location]);

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
      style={{ height: loading || isMobile ? 'auto' : calculateSectionHeight() }}
    >
      <div
        className={styles.sticky}
        style={{ top: isMobile ? 'auto' : NAV_HEIGHT, position: isMobile ? 'static' : 'sticky', height: isMobile ? 'auto' : undefined }}
      >
        <header className={styles.header}>
          <h2>Projects</h2>
        </header>

        {loading && <div className={styles.loading}>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && isMobile ? (
          <div className={styles.mobileList}>
            {projects.map((project, index) => (
              <div key={project.id} className={styles.mobileCard}>
                <div className={styles.mobileCardHeader}>
                  <span className={styles.number}>{String(index + 1).padStart(3, '0')}</span>
                  <h3 className={styles.title}>{project.name}</h3>
                </div>
                <div className={styles.imageWrap}>
                  <img src={project.imageUrl} alt={project.name} className={styles.image} />
                </div>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.skills}>
                  {project.skills.map((skill, i) => (
                    <span key={i} className={`${global["skill"]}`}>{skill}</span>
                  ))}
                </div>
                <div className={styles.buttons}>
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                      Try it!
                    </a>
                  ) : project.clickable ? (
                    <Link to={`/projects/${project.id}`} className={styles.viewLink}>
                      Learn More
                    </Link>
                  ) : null}
                  {project.sourceCode === "comingsoon" ? (
                    <span className={styles.comingSoon}>Coming soon</span>
                  ) : project.sourceCode ? (
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className={styles.codeLink}>
                      View code
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : !loading && !error ? (
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
                      {String(index + 1).padStart(3, '0')}
                    </span>
                    <h3 className={styles.title}>{project.name}</h3>
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
                      <span key={i} className={`${global["skill"]}`}>{skill}</span>
                    ))}
                  </div>

                  <div className={styles.buttons}>
                    {projects[activeIndex].demoUrl ? (
                      <a
                        href={projects[activeIndex].demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewLink}
                      >
                        Try It!
                      </a>
                    ) : projects[activeIndex].clickable ? (
                      <Link
                        to={`/projects/${projects[activeIndex].id}`}
                        className={styles.viewLink}
                      >
                        Learn More
                      </Link>
                    ) : null}

                    {projects[activeIndex].sourceCode === "comingsoon" ? (
                      <span className={styles.comingSoon}>Coming soon</span>
                    ) : projects[activeIndex].sourceCode ? (
                      <a
                        href={projects[activeIndex].sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.codeLink}
                      >
                        View code
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : null}
      </div>
    </section>
  );
}
