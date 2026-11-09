import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { ScrollTrigger } from '../../lib/motion';
import styles from './Expandable.module.css';

interface Props {
  label: ReactNode;
  openLabel?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/** Disclosure with animated height (CSS grid rows), keyboard and screen-reader friendly. */
export function Expandable({ label, openLabel, children, defaultOpen = false, className }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} data-open={open || undefined}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((o) => !o);
          // Layout below changes height; let ScrollTrigger re-measure after the transition.
          setTimeout(() => ScrollTrigger.refresh(), 650);
        }}
      >
        <span className={styles.icon} aria-hidden="true">
          <Plus size={14} />
        </span>
        <span className="t-mono">{open ? openLabel ?? label : label}</span>
      </button>
      <div id={id} className={styles.region} role="region" aria-hidden={!open}>
        <div className={styles.inner} {...(!open ? { inert: '' } : {})}>
          {children}
        </div>
      </div>
    </div>
  );
}
