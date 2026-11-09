import { research, researchApps } from '../../data/research';
import { achievementImages } from '../../data/media';
import type { Certificate } from '../../data/types';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { Expandable } from '../ui/Expandable';
import { ExtLink } from '../ui/ExtLink';
import { Objectives, StackList } from '../projects/ProjectDetail';
import { CertificateThumbs } from '../certificates/CertificateThumbs';
import s from './shared.module.css';
import styles from './Research.module.css';

const RESEARCH_CERTS: Record<string, Certificate[]> = {
  '5.3': [achievementImages['9.2.4']],
};

export function Research() {
  return (
    <Section id="research" tone="raised">
      <SectionHeader id="research" layout="split" />

      <ol className={styles.index}>
        {research.map((r) => (
          <li key={r.num} className={styles.entry}>
            <div className={styles.entryHead}>
              <Reveal className={styles.num}>
                <span>{r.num}</span>
              </Reveal>

              <div className={styles.titleCol}>
                <h3 className={styles.title}>
                  <MaskText>{r.title}</MaskText>
                </h3>
                <Reveal delay={100}>
                  <dl className={styles.meta}>
                    {r.meta.map((m) => (
                      <div key={m.label}>
                        <dt className="t-mono">{m.label}</dt>
                        <dd>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              <Reveal delay={160} className={styles.citation}>
                {r.publication ? (
                  <>
                    <p className={styles.citeLabel}>Publication Details</p>
                    <dl className={styles.citeList}>
                      {r.publication.map((p) => (
                        <div key={p.label}>
                          <dt>{p.label}</dt>
                          <dd>{p.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : (
                  <>
                    <p className={styles.citeLabel}>Ecosystem Access</p>
                    <div className={styles.citeLinks}>
                      <ExtLink href={r.ecosystem!.mainPlatform}>Main Platform</ExtLink>
                      <ExtLink href={r.ecosystem!.mainRepository}>Main Repository</ExtLink>
                    </div>
                  </>
                )}
                {r.repository && (
                  <ExtLink href={r.repository} className={styles.repo}>
                    <span className="t-mono">Repository</span>
                  </ExtLink>
                )}
                {RESEARCH_CERTS[r.num] && (
                  <div className={styles.certs}>
                    <CertificateThumbs items={RESEARCH_CERTS[r.num]} label="Research" />
                  </div>
                )}
              </Reveal>
            </div>

            <Reveal delay={200} className={styles.expand}>
              <Expandable label="Read research overview" openLabel="Close research overview">
                <div className={styles.detail}>
                  <div className={s.block}>
                    <h4 className={s.label}>Research Overview</h4>
                    {r.overview.map((o, i) => (
                      <p key={i} className={s.body}>
                        {o}
                      </p>
                    ))}
                  </div>
                  <div className={`${s.block} ${s.vm}`}>
                    <div>
                      <h4 className={s.label}>Vision</h4>
                      <p className={s.statement}>{r.vision}</p>
                    </div>
                    <div>
                      <h4 className={s.label}>Mission</h4>
                      <p className={s.body}>{r.mission}</p>
                    </div>
                  </div>
                  <div className={s.block}>
                    <h4 className={s.label}>Research Objectives</h4>
                    <Objectives items={r.objectives} />
                  </div>

                  {r.showApps && (
                    <div className={s.block}>
                      <h4 className={s.label}>Seven Applications</h4>
                      <ol className={styles.apps}>
                        {researchApps.map((a) => (
                          <li key={a.name}>
                            <p className={styles.appName}>
                              <span>{a.no}.</span> {a.name} — {a.subtitle}
                            </p>
                            <ul className={s.bullets}>
                              {a.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                            <div className={styles.appLinks}>
                              <ExtLink href={a.live}>Live Platform: {a.live}</ExtLink>
                              <ExtLink href={a.repo}>Source Code: {a.repo}</ExtLink>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {r.ecosystem && (
                    <div className={s.block}>
                      <h4 className={s.label}>Ecosystem Access</h4>
                      <div className={styles.appLinks}>
                        <ExtLink href={r.ecosystem.mainPlatform}>Main Platform: {r.ecosystem.mainPlatform}</ExtLink>
                        <ExtLink href={r.ecosystem.mainRepository}>Main Repository: {r.ecosystem.mainRepository}</ExtLink>
                      </div>
                    </div>
                  )}

                  <div className={s.block}>
                    <h4 className={s.label}>{r.componentsLabel}</h4>
                    {r.components.length > 0 ? <StackList items={r.components} /> : <p className={s.body}>{r.technologyAreas}</p>}
                  </div>

                  {r.repository && (
                    <div className={s.block}>
                      <h4 className={s.label}>Repository</h4>
                      <ExtLink href={r.repository}>{r.repository}</ExtLink>
                    </div>
                  )}
                </div>
              </Expandable>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
