import { interests } from '../../data/personal';
import { Section, SectionHeader } from '../layout/Section';
import { Reveal } from '../interactions/Reveal';
import { ExtLink } from '../ui/ExtLink';
import styles from './Interests.module.css';

export function Interests() {
  return (
    <Section id="interests" tone="raised">
      <SectionHeader id="interests" layout="split" />
      <ol className={styles.grid}>
        {interests.map((it, i) => (
          <Reveal as="li" key={it.num} className={styles.item} delay={(i % 3) * 80}>
            <span className={styles.num}>{it.num}</span>
            <h3 className={styles.title}>{it.title}</h3>
            <ul className={styles.points}>
              {it.points.map((p, pi) => (
                <li key={p}>
                  {p}
                  {it.link && it.link.afterPoint === pi && (
                    <span className={styles.link}>
                      <span className="t-mono">{it.link.label}:</span>{' '}
                      <ExtLink href={it.link.url}>{it.link.url}</ExtLink>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
