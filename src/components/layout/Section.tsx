import type { ReactNode } from 'react';
import { sectionById } from '../../data/sections';
import { MaskText, Reveal } from '../interactions/Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: 'base' | 'raised';
  bleed?: boolean;
}

export function Section({ id, children, className, tone = 'base', bleed }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={[styles.section, className].filter(Boolean).join(' ')}
      data-tone={tone}
    >
      <div className={bleed ? undefined : 'container'}>{children}</div>
    </section>
  );
}

interface HeaderProps {
  id: string;
  kicker?: ReactNode;
  aside?: ReactNode;
  layout?: 'split' | 'stacked' | 'wide';
  title?: ReactNode;
}

export function SectionHeader({ id, kicker, aside, layout = 'split', title }: HeaderProps) {
  const meta = sectionById[id];
  return (
    <header className={styles.header} data-layout={layout}>
      <div className={styles.headMain}>
        <Reveal className={styles.index}>
          <span className={styles.num}>{meta.num}</span>
          <span className={styles.slash} aria-hidden="true" />
          <span className={styles.total}>16</span>
        </Reveal>
        <h2 id={`${id}-title`} className={`t-h2 ${styles.title}`}>
          <MaskText>{title ?? meta.title}</MaskText>
        </h2>
        {kicker && (
          <Reveal delay={120} className={styles.kicker}>
            {kicker}
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={200} className={styles.aside}>
          {aside}
        </Reveal>
      )}
    </header>
  );
}
