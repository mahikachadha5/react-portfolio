import { getProjects } from "../utils";
import styles from "./modules/Projects.module.css";
import SpreadA from "./spreads/SpreadA";
import SpreadB from "./spreads/SpreadB";
import SpreadC from "./spreads/SpreadC";
import SpreadD from "./spreads/SpreadD";
import SpreadE from "./spreads/SpreadE";

const isVideo = (url) => url && /\.(mp4|webm|ogg)$/i.test(url);

const TEMPLATE_MAP = { A: SpreadA, B: SpreadB, C: SpreadC, D: SpreadD, E: SpreadE };

function makeVisual(project) {
  if (!project.imageUrl) return null;
  if (isVideo(project.imageUrl)) {
    return (
      <video
        src={project.imageUrl}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  return <img src={project.imageUrl} alt={project.name} />;
}

export default function Projects() {
  const projects = getProjects();

  return (
    <section id="projects" className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2>Projects</h2>
      </header>

      {projects.map((project) => {
        const Spread = TEMPLATE_MAP[project.template];
        if (!Spread) return null;

        return (
          <Spread
            key={project.id}
            title={project.name}
            subtitle={project.subtitle}
            tags={project.skills}
            category={project.category}
            visual={makeVisual(project)}
            href={project.clickable ? `/projects/${project.id}` : null}
          />
        );
      })}
    </section>
  );
}
