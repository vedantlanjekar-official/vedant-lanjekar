import { languages } from '../../data/personal';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import styles from './Languages.module.css';

export function Languages() {
  return (
    <Section id="languages" className={styles.section}>
      <SectionHeader id="languages" layout="split" />
      <ul className={styles.list}>
        {languages.map((l, i) => (
          <li key={l.num} className={styles.item}>
            <Reveal className={styles.meta} delay={i * 80}>
              <span className={styles.num}>
                {l.num}
                {l.native && <span className={styles.english}>{l.name}</span>}
              </span>
              <span className={styles.label}>Proficiency Level</span>
            </Reveal>
            {l.native ? (
              <h3 className={`${styles.name} ${styles.native}`} lang={l.native.lang} aria-label={`${l.name} (${l.native.text})`}>
                <MaskText delay={i * 80}>{l.native.text}</MaskText>
              </h3>
            ) : (
              <h3 className={styles.name}>
                <MaskText delay={i * 80}>{l.name}</MaskText>
              </h3>
            )}
            <Reveal as="p" className={styles.level} delay={120 + i * 80}>
              {l.proficiency}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
