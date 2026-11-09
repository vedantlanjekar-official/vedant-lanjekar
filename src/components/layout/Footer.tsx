import { ArrowUp } from 'lucide-react';
import { identity } from '../../data/profile';
import { scrollToId } from '../../lib/motion';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.tagline}>{identity.tagline}</p>
        <div className={styles.row}>
          <span className="t-mono">© {new Date().getFullYear()} Vedant Lanjekar</span>
          <span className="t-mono">{identity.headline}</span>
          <button type="button" className={styles.top} onClick={() => scrollToId('top')}>
            <span className="t-mono">Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
