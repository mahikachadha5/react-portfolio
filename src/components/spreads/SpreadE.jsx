import { Link } from 'react-router-dom';
import styles from '../modules/Projects.module.css';

export default function SpreadE({ title, subtitle, tags, category, visual, href }) {
  return (
    <div className={`${styles.spread} ${styles.spreadE}`}>
      <div className={styles.topRow}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.sheetWrap}>{visual}</div>
      </div>
      <div className={styles.meta}>
        <p className={styles.tags}>{tags.join(', ')}</p>
        <p className={styles.category}>{category}</p>
        {href && <Link to={href} className={styles.link}>Case study →</Link>}
      </div>
    </div>
  );
}
