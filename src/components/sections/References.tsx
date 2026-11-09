import { Mail, Phone } from 'lucide-react';
import { references } from '../../data/contact';
import { Section, SectionHeader } from '../layout/Section';
import { Reveal } from '../interactions/Reveal';
import styles from './References.module.css';

const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`;

export function References() {
  return (
    <Section id="references" tone="raised">
      <SectionHeader id="references" layout="split" />
      <ul className={styles.list}>
        {references.map((r, i) => (
          <Reveal as="li" key={r.num} className={styles.card} delay={i * 90}>
            <span className={styles.index} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.name}>{r.name}</h3>
            <p className={styles.designation}>
              <span className="t-mono">Designation</span>
              <span>{r.designation}</span>
            </p>
            <div className={styles.links}>
              <a href={`mailto:${r.email}`} className={styles.link}>
                <Mail size={14} aria-hidden="true" />
                <span className="t-mono">Email:</span>
                <span>{r.email}</span>
              </a>
              <a href={tel(r.phone)} className={styles.link}>
                <Phone size={14} aria-hidden="true" />
                <span className="t-mono">Contact Number:</span>
                <span>{r.phone}</span>
              </a>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
