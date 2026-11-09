import { useLayoutEffect, useRef } from 'react';
import { education } from '../../data/education';
import { logo } from '../../data/media';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { SgpaChart } from './SgpaChart';
import styles from './Education.module.css';

const SCHOOL = {
  dypcoei: {
    logo: logo.dypcoei,
    campus: logo.dypcoeiCampus,
    name: 'Dr. D. Y. Patil College of Engineering & Innovation',
  },
  newHorizon: { logo: logo.newHorizon, campus: logo.newHorizonCampus, name: 'New Horizon Public School' },
  indianSchool: { logo: logo.indianSchool, campus: logo.indianSchoolCampus, name: 'The Indian School, Bahrain' },
};

export function Education() {
  const line = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 60%', scrub: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  const [degree, ...rest] = education;
  const degreeSchool = SCHOOL[degree.logo];

  return (
    <Section id="education" tone="raised">
      <SectionHeader id="education" layout="split" />

      <div className={styles.timeline}>
        <div className={styles.rail} aria-hidden="true">
          <div ref={line} className={styles.railFill} />
        </div>
        <ol ref={list} className={styles.list}>
          <li className={styles.degree}>
            <div className={styles.marker} aria-hidden="true" />
            <div className={styles.degreeHead}>
              <Reveal className={styles.num}>{degree.num}</Reveal>
              <div>
                <h3 className={styles.degreeTitle}>
                  <MaskText>{degree.title}</MaskText>
                </h3>
                <Reveal delay={100} className={styles.institution}>
                  <span className={styles.logoPlate}>
                    <img src={degreeSchool.logo.thumb} alt={`${degreeSchool.name} logo`} loading="lazy" />
                  </span>
                  <span>{degree.institution}</span>
                </Reveal>
              </div>
            </div>

            <div className={styles.degreeBody}>
              <Reveal className={styles.facts}>
                <dl>
                  {degree.rows.map((r) => (
                    <div key={r.label} className={styles.fact}>
                      <dt className="t-mono">{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
                <figure className={styles.campus}>
                  <img
                    src={degreeSchool.campus.thumb}
                    alt={`${degreeSchool.name} campus`}
                    loading="lazy"
                    decoding="async"
                    width={degreeSchool.campus.w}
                    height={degreeSchool.campus.h}
                  />
                </figure>
              </Reveal>

              <Reveal delay={120} className={styles.sgpa}>
                <SgpaChart data={degree.sgpa!} />
              </Reveal>
            </div>
          </li>

          {rest.map((e) => {
            const school = SCHOOL[e.logo];
            const campus = e.campus ? SCHOOL[e.campus].campus : null;
            const score = e.rows.find((r) => r.label === 'Score');
            const facts = e.rows.filter((r) => r.label !== 'Score');
            return (
              <li key={e.id} className={styles.school}>
                <div className={styles.marker} aria-hidden="true" />
                <Reveal className={styles.num}>{e.num}</Reveal>
                <div className={styles.schoolMain}>
                  <h3 className={styles.schoolTitle}>
                    <MaskText>{e.title}</MaskText>
                  </h3>
                  {e.schoolRecords && <p className={styles.schoolName}>{e.institution}</p>}

                  {facts.length > 0 && (
                    <Reveal delay={80}>
                      <dl className={styles.inlineFacts}>
                        {facts.map((r) => (
                          <div key={r.label}>
                            <dt className="t-mono">{r.label}</dt>
                            <dd>{r.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </Reveal>
                  )}

                  {score && (
                    <Reveal delay={120} className={styles.scoreRow}>
                      <div className={styles.scoreBlock}>
                        <span className="t-mono">{score.label}</span>
                        <span className={styles.scoreBig}>{score.value}</span>
                      </div>
                    </Reveal>
                  )}

                  {e.schoolRecords?.map((s) => (
                    <Reveal key={s.school} delay={80}>
                      <table className={styles.recordTable}>
                        <caption className="sr-only">{s.school}</caption>
                        <thead>
                          <tr>
                            <th scope="col">Academic Period</th>
                            <th scope="col">Board</th>
                            <th scope="col">Overall Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.records.map((r) => (
                            <tr key={r.period}>
                              <td>{r.period}</td>
                              <td>{r.board}</td>
                              <td className={styles.score}>{r.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={120} className={styles.schoolAside}>
                  <span className={styles.logoPlate}>
                    <img src={school.logo.thumb} alt={`${school.name} logo`} loading="lazy" />
                  </span>
                  {campus && (
                    <figure className={styles.campusSmall}>
                      <img src={campus.thumb} alt={`${school.name} campus`} loading="lazy" decoding="async" />
                    </figure>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
