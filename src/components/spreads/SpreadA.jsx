import { Link } from 'react-router-dom';
import styles from '../modules/Projects.module.css';

export default function SpreadA({ title, subtitle, tags, category, visual, href }) {
  return (
    <div className={`${styles.spread} ${styles.spreadA}`}>
      <div className={styles.leftEmpty} />
      <div className={styles.rightContent}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle} style={{ marginTop: '1rem' }}>{subtitle}</p>
        </div>
        <div className={styles.strip}>{visual}</div>
        <div className={styles.meta}>
          <p className={styles.tags}>{tags.join(', ')}</p>
          <p className={styles.category}>{category}</p>
          {href && <Link to={href} className={styles.link}>Case study →</Link>}
        </div>
      </div>
    </div>
  );
}
