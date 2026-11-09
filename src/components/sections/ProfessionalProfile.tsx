import { focus, identity, summary } from '../../data/profile';
import { profilePortrait } from '../../data/media';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { TaglineObject } from '../interactions/TaglineObject';
import styles from './ProfessionalProfile.module.css';

export function ProfessionalProfile() {
  return (
    <Section id="profile" className={styles.section}>
      <div className={styles.techBg} aria-hidden="true">
        <span className={styles.scanline} />
      </div>

      <SectionHeader
        id="profile"
        layout="wide"
        aside={
          <dl className={styles.meta}>
            <div>
              <dt className="t-mono">Primary Professional Headline</dt>
              <dd>{identity.headline}</dd>
            </div>
            <div>
              <dt className="t-mono">Professional Positioning</dt>
              <dd>{identity.positioning}</dd>
            </div>
          </dl>
        }
      />

      <div className={styles.summaryGrid}>
        <Reveal className={styles.portraitWrap}>
          <figure className={styles.portrait}>
            <img
              src={profilePortrait.thumb}
              srcSet={`${profilePortrait.thumb} 800w, ${profilePortrait.large} 1600w`}
              sizes="(max-width: 900px) 60vw, 26vw"
              width={profilePortrait.w}
              height={profilePortrait.h}
              alt="Portrait of Vedant Lanjekar"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="t-mono">
              <span>1.1</span>
              <span>Professional Summary</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className={styles.summary}>
          <Reveal as="p" className={styles.lead}>
            {summary[0]}
          </Reveal>
          <div className={styles.rest}>
            {summary.slice(1).map((p, i) => (
              <Reveal as="p" key={i} delay={120 * (i + 1)} className="t-body">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.focus}>
        <div className={styles.focusHead}>
          <Reveal as="p" className="t-mono">
            1.2
          </Reveal>
          <h3 className="t-h3">
            <MaskText>Professional Focus</MaskText>
          </h3>
        </div>
        <ol className={styles.focusList}>
          {focus.map((f, i) => (
            <Reveal as="li" key={f.no} delay={(i % 4) * 70} className={styles.focusItem}>
              <span className={styles.focusNo}>{f.no}</span>
              <span className={styles.focusDomain}>{f.domain}</span>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className={styles.taglineRow}>
        <figure className={styles.tagline}>
          <Reveal as="p" className="t-mono">
            1.3 — Portfolio Tagline
          </Reveal>
          <blockquote>
            <MaskText as="span" className={styles.quote}>
              {identity.tagline}
            </MaskText>
          </blockquote>
        </figure>
        <Reveal delay={150} className={styles.taglineField}>
          <TaglineObject />
        </Reveal>
      </div>
    </Section>
  );
}
