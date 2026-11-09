import { useLayoutEffect, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { experience } from '../../data/experience';
import { experienceImages, logo } from '../../data/media';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { ExtLink } from '../ui/ExtLink';
import { CertificateThumbs } from '../certificates/CertificateThumbs';
import s from './shared.module.css';
import styles from './Experience.module.css';

const LOGO_ALT: Record<string, string> = {
  valmet: 'Valmet logo',
  bharat: 'Bharat Electrical & Engineering logo',
  dypcoei: 'Dr. D. Y. Patil College of Engineering & Innovation logo',
  acmegrade: 'Acmegrade logo',
};

const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`;

export function Experience() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 65%', end: 'bottom 70%', scrub: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <Section id="experience" tone="raised">
      <SectionHeader id="experience" layout="split" />

      <div className={styles.wrap}>
        <div className={styles.rail} aria-hidden="true">
          <div ref={fill} className={styles.railFill} />
        </div>
        <ol ref={list} className={styles.list}>
          {experience.map((x) => (
            <li key={x.num} className={styles.entry}>
              <div className={styles.side}>
                <div className={styles.sideSticky}>
                  <Reveal className={styles.num}>{x.num}</Reveal>
                  <Reveal delay={80} className={styles.logos}>
                    {x.logos.map((k) => (
                      <span key={k} className={styles.logoPlate}>
                        <img src={logo[k].thumb} alt={LOGO_ALT[k]} loading="lazy" decoding="async" />
                      </span>
                    ))}
                    {x.wordmarks?.map((w) => (
                      <span key={w} className={styles.wordmark}>
                        {w}
                      </span>
                    ))}
                  </Reveal>
                  <Reveal delay={120} className={styles.when}>
                    <span className={styles.duration}>{x.duration}</span>
                    <span className="t-mono">{x.workMode}</span>
                    {x.location && <span className="t-mono">{x.location}</span>}
                  </Reveal>
                </div>
              </div>

              <div className={styles.body}>
                <h3 className={styles.role}>
                  <MaskText>{x.role}</MaskText>
                </h3>
                <Reveal delay={80} className={styles.org}>
                  <span className="t-mono">{x.organizationLabel}</span>
                  {x.organizations.length > 1 ? (
                    <ol className={styles.orgList}>
                      {x.organizations.map((o, i) => (
                        <li key={o}>
                          <span className={styles.orgNo}>{i + 1}.</span> {o}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className={styles.orgName}>{x.organizations[0]}</p>
                  )}
                </Reveal>

                {x.organizationOverview && (
                  <Reveal className={s.block}>
                    <h4 className={s.label}>Organization Overview</h4>
                    <p className={s.body}>{x.organizationOverview}</p>
                    {x.website && (
                      <p className={styles.site}>
                        <span className="t-mono">Official Website</span>{' '}
                        <ExtLink href={x.website}>{x.website}</ExtLink>
                      </p>
                    )}
                  </Reveal>
                )}

                <Reveal className={s.block}>
                  <h4 className={s.label}>Role Overview</h4>
                  {x.roleOverview.map((r, i) => (
                    <p key={i} className={i === 0 ? styles.lead : s.body}>
                      {r}
                    </p>
                  ))}
                </Reveal>

                {x.applications && (
                  <Reveal className={s.block}>
                    <h4 className={s.label}>Applications Developed</h4>
                    {x.applicationsIntro && <p className={s.body}>{x.applicationsIntro}</p>}
                    <ol className={styles.apps}>
                      {x.applications.map((a, i) => (
                        <li key={a} style={{ ['--i' as string]: i }}>
                          <span className={styles.appNo}>{String(i + 1).padStart(2, '0')}</span>
                          <span className={styles.appName}>{a}</span>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                )}

                <Reveal className={s.block}>
                  <h4 className={s.label}>{x.contributionsTitle}</h4>
                  <ul className={s.bullets}>
                    {x.contributions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Reveal>

                <div className={styles.footer}>
                  {x.manager && (
                    <Reveal className={styles.manager}>
                      <p className={s.label}>Manager Contact</p>
                      <p className={styles.mName}>{x.manager.name}</p>
                      <p className={styles.mRole}>{x.manager.designation}</p>
                      <div className={styles.mLinks}>
                        {x.manager.mobile && (
                          <a href={telHref(x.manager.mobile)} className={styles.mLink}>
                            <Phone size={13} aria-hidden="true" />
                            <span className="t-mono">Mobile:</span> {x.manager.mobile}
                          </a>
                        )}
                        {x.manager.email && (
                          <a href={`mailto:${x.manager.email}`} className={styles.mLink}>
                            <Mail size={13} aria-hidden="true" />
                            <span className="t-mono">Email:</span> {x.manager.email}
                          </a>
                        )}
                      </div>
                    </Reveal>
                  )}
                  {experienceImages[x.num]?.length > 0 && (
                    <Reveal delay={100} className={styles.docs}>
                      <p className={s.label}>Documents</p>
                      <CertificateThumbs items={experienceImages[x.num]} label="Experience" size="md" />
                    </Reveal>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
