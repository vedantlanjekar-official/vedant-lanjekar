import { useRef, useState } from 'react';
import { ventures, type Venture, type VentureBlock } from '../../data/ventures';
import { Section, SectionHeader } from '../layout/Section';
import { Reveal } from '../interactions/Reveal';
import { Expandable } from '../ui/Expandable';
import { Objectives } from '../projects/ProjectDetail';
import s from './shared.module.css';
import styles from './Ventures.module.css';

function Block({ b }: { b: VentureBlock }) {
  return (
    <div className={styles.vBlock}>
      <h5 className={s.label}>
        <span className={styles.blockNum}>{b.num}</span> {b.title}
      </h5>
      {b.intro?.map((t) => (
        <p key={t} className={s.body}>
          {t}
        </p>
      ))}
      {b.items && (
        <ol className={styles.items}>
          {b.items.map((it) => (
            <li key={it.title} className={styles.itemCard}>
              <span className={styles.itemNo}>{it.no}</span>
              <p className={styles.itemTitle}>{it.title}</p>
              {it.concept && (
                <p className={styles.itemConcept}>
                  <span className="t-mono">Concept:</span> {it.concept}
                </p>
              )}
              {it.text && <p className={styles.itemText}>{it.text}</p>}
              {it.bullets && (
                <ul className={s.bullets}>
                  {it.bullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}
      {b.bulletsIntro && <p className={s.body}>{b.bulletsIntro}</p>}
      {b.bullets && (
        <ul className={`${s.bullets} ${styles.blockBullets}`}>
          {b.bullets.map((x) => (
            <li key={x.text}>
              {x.label && <strong>{x.label}: </strong>}
              {x.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Dossier({ v }: { v: Venture }) {
  return (
    <article className={styles.dossier}>
      <header className={styles.dHead}>
        <div>
          <p className={styles.dNum}>{v.num}</p>
          <h3 className={styles.dName}>{v.name}</h3>
          <p className={styles.dSub}>{v.subtitle}</p>
        </div>
        <ul className={styles.badges} aria-label="Status">
          <li data-kind="stage">
            <span className="t-mono">Stage</span>
            <strong>{v.stage}</strong>
          </li>
          <li>
            <span className="t-mono">{v.typeLabel}</span>
            <strong>{v.type}</strong>
          </li>
        </ul>
      </header>

      <p className={styles.positioning}>
        <span className="t-mono">Positioning</span>
        <span className={styles.posText}>{v.positioning}</span>
      </p>

      <div className={styles.columns}>
        <dl className={styles.facts}>
          {v.facts.map((f) => (
            <div key={f.label}>
              <dt className="t-mono">{f.label}</dt>
              <dd>
                {Array.isArray(f.value) ? (
                  <ul>
                    {f.value.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className={styles.main}>
          <div className={s.block} style={{ borderTop: 0, paddingTop: 0 }}>
            <h4 className={s.label}>{v.overviewTitle}</h4>
            {v.overview.map((o, i) => (
              <p key={i} className={i === 0 ? styles.lead : s.body}>
                {o}
              </p>
            ))}
          </div>
          <div className={`${s.block} ${s.vm}`}>
            <div>
              <h4 className={s.label}>Vision</h4>
              {v.vision.map((t) => (
                <p key={t} className={s.statement}>
                  {t}
                </p>
              ))}
            </div>
            <div>
              <h4 className={s.label}>Mission</h4>
              <p className={s.body}>{v.mission}</p>
            </div>
          </div>
          <div className={s.block}>
            <h4 className={s.label}>Objectives</h4>
            <Objectives items={v.objectives} />
          </div>

          <div className={s.block}>
            <Expandable
              label={`Explore ${v.blocks.map((b) => b.title).join(' · ')}`}
              openLabel="Collapse details"
            >
              <div className={styles.blocks}>
                {v.blocks.map((b) => (
                  <Block key={b.num} b={b} />
                ))}
              </div>
            </Expandable>
          </div>

          {v.team && (
            <div className={s.block}>
              <h4 className={s.label}>{v.teamTitle}</h4>
              <table className={styles.team}>
                <thead>
                  <tr>
                    <th scope="col">Member</th>
                    <th scope="col">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {v.team.map((t) => (
                    <tr key={t.member}>
                      <td>{t.member}</td>
                      <td>{t.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {v.teamNote && <p className={styles.note}>{v.teamNote}</p>}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function Ventures() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + ventures.length) % ventures.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <Section id="ventures">
      <SectionHeader id="ventures" layout="split" />

      <Reveal>
        <div role="tablist" aria-label="Ventures and initiatives" className={styles.tablist}>
          {ventures.map((v, i) => (
            <button
              key={v.num}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`venture-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`venture-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className={styles.tabNum}>{v.num}</span>
              <span className={styles.tabName}>{v.name}</span>
              <span className={styles.tabMeta}>
                {v.stage} · {v.type}
              </span>
              <span className={styles.tabBar} aria-hidden="true" />
            </button>
          ))}
        </div>
      </Reveal>

      {ventures.map((v, i) => (
        <div
          key={v.num}
          role="tabpanel"
          id={`venture-panel-${i}`}
          aria-labelledby={`venture-tab-${i}`}
          hidden={active !== i}
          className={styles.panel}
        >
          <Dossier v={v} />
        </div>
      ))}
    </Section>
  );
}
