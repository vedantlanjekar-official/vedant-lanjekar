import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { achievementGroups, achievementsSummary, prizeMoney } from '../../data/achievements';
import { achievementArchive, achievementImages } from '../../data/media';
import type { Certificate } from '../../data/types';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { ImageViewer } from '../ui/ImageViewer';
import styles from './Achievements.module.css';

const tier = (position: string) => (/^winner|presentation winner/i.test(position) ? 'win' : /runner/i.test(position) ? 'runner' : 'finalist');

const groupLabel = (title: string) => {
  const m = title.match(/^(\d{4})/);
  return m ? { text: m[1], word: false } : { text: 'Additional', word: true };
};

interface RowProps {
  num: string;
  event: string;
  recognition?: string;
  details?: ReactNode;
  position?: string;
  level?: string;
  cert?: Certificate;
  onView?: () => void;
}

function Row({ num, event, recognition, details, position, level, cert, onView }: RowProps) {
  return (
    <div className={styles.row} data-cert={cert ? '' : undefined}>
      <span className={styles.num}>{num}</span>
      <div className={styles.main}>
        <h4 className={styles.event}>{event}</h4>
        {recognition && <p className={styles.recognition}>{recognition}</p>}
        {details}
      </div>
      {(position || level) && (
        <div className={styles.status}>
          {position && (
            <span className={styles.position} data-tier={tier(position)}>
              {position}
            </span>
          )}
          {level && <span className={styles.level}>{level}</span>}
        </div>
      )}
      {cert && onView && (
        <button type="button" className={styles.cert} onClick={onView} aria-label={`View certificate: ${cert.title}`}>
          <span className={styles.certFrame}>
            <img src={cert.image.thumb} alt="" width={cert.image.w} height={cert.image.h} loading="lazy" decoding="async" />
          </span>
        </button>
      )}
    </div>
  );
}

export function Achievements() {
  const prize = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<number | null>(null);

  const certNums = Object.keys(achievementImages);
  const viewerItems = [...certNums.map((n) => achievementImages[n]), ...achievementArchive];
  const lastGroup = achievementGroups[achievementGroups.length - 1].num;

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        prize.current,
        { xPercent: -6 },
        { xPercent: 4, ease: 'none', scrollTrigger: { trigger: prize.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>(`.${styles.groupFill}`).forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="achievements">
      <div ref={root}>
        <SectionHeader id="achievements" layout="split" kicker={achievementsSummary} />

        <div className={styles.prizeWrap}>
          <div ref={prize} className={styles.prize}>
            <MaskText as="span" className={styles.amount}>
              {prizeMoney.amount}
            </MaskText>
          </div>
          <Reveal className={styles.prizeLabel}>
            <span className={styles.prizeDot} aria-hidden="true" />
            <span className="t-mono">{prizeMoney.label}</span>
          </Reveal>
        </div>

        <div className={styles.groups}>
          {achievementGroups.map((g) => {
            const label = groupLabel(g.title);
            return (
              <section key={g.num} className={styles.group} aria-labelledby={`ach-${g.num}`}>
                <div className={styles.groupSide}>
                  <div className={styles.groupSticky}>
                    <span className={styles.groupYear} data-word={label.word || undefined} aria-hidden="true">
                      {label.text}
                    </span>
                    <h3 id={`ach-${g.num}`} className={styles.groupTitle}>
                      <span className="t-mono">{g.num}</span> {g.title}
                    </h3>
                  </div>
                  <div className={styles.groupRail} aria-hidden="true">
                    <div className={styles.groupFill} />
                  </div>
                </div>
                <div>
                  <ol className={styles.rows}>
                    {g.items.map((a) => (
                      <Reveal key={a.num} as="li">
                        <Row
                          num={a.num}
                          event={a.event}
                          recognition={a.recognition}
                          position={a.position}
                          level={a.level}
                          details={
                            <dl className={styles.details}>
                              <div>
                                <dt className="t-mono">Organizer</dt>
                                <dd>{a.organizer}</dd>
                              </div>
                              {a.project && (
                                <div>
                                  <dt className="t-mono">{a.projectLabel ?? 'Project'}</dt>
                                  <dd>{a.project}</dd>
                                </div>
                              )}
                            </dl>
                          }
                          cert={achievementImages[a.num]}
                          onView={() => setViewer(certNums.indexOf(a.num))}
                        />
                      </Reveal>
                    ))}
                  </ol>

                  {g.num === lastGroup && (
                    <>
                      <Reveal className={styles.subHead}>
                        <h4 className={styles.subTitle}>Certificate archive</h4>
                        <p className={styles.subText}>
                          Additional event certificates from the Hackathon, Ideathon, Project Exhibition and Conference collection.
                        </p>
                      </Reveal>
                      <ol className={styles.rows}>
                        {achievementArchive.map((c, i) => (
                          <Reveal key={c.image.id} as="li">
                            <Row
                              num={String(i + 1).padStart(2, '0')}
                              event={c.title}
                              recognition={c.caption}
                              cert={c}
                              onView={() => setViewer(certNums.length + i)}
                            />
                          </Reveal>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <ImageViewer
        items={viewerItems}
        index={viewer}
        onClose={() => setViewer(null)}
        onIndex={setViewer}
        label="Achievement certificates"
      />
    </Section>
  );
}
