import { skills } from '../../data/skills';
import { Section, SectionHeader } from '../layout/Section';
import { TechLogo, hasLogo } from '../ui/TechLogo';
import styles from './TechnicalSkills.module.css';

export function TechnicalSkills() {
  return (
    <Section id="skills">
      <SectionHeader id="skills" layout="wide" />

      <div className={styles.grid}>
        {skills.map((cat) => (
          <section key={cat.num} className={styles.block} aria-labelledby={`skills-${cat.num}`}>
            <header className={styles.blockHead}>
              <h3 id={`skills-${cat.num}`} className={styles.title}>
                {cat.title}
              </h3>
              <span className={styles.count}>{cat.items.length}</span>
            </header>
            <ul className={styles.items}>
              {cat.items.map((name, i) => {
                const logo = hasLogo(name);
                return (
                  <li key={name} className={styles.item} data-wordmark={!logo || undefined} style={{ ['--i' as string]: i }}>
                    {logo && <TechLogo name={name} size={18} className={styles.logo} />}
                    <span className={styles.itemName}>{name}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
