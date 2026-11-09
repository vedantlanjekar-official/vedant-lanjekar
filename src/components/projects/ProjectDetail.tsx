import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { AivoraApp, Project } from '../../data/projects';
import { ExtLink } from '../ui/ExtLink';
import { TechLogo, hasLogo } from '../ui/TechLogo';
import { ProjectGlyph } from './ProjectGlyph';
import styles from './ProjectDetail.module.css';

export function StackList({ items }: { items: string[] }) {
  return (
    <ul className={styles.stack}>
      {items.map((s) => (
        <li key={s} className={styles.chip} data-logo={hasLogo(s) || undefined}>
          <TechLogo name={s} size={15} />
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

export function Objectives({ items }: { items: string[] }) {
  return (
    <ol className={styles.objectives}>
      {items.map((o, i) => (
        <li key={i}>
          <span className={styles.objNo}>{String(i + 1).padStart(2, '0')}</span>
          <p>{o}</p>
        </li>
      ))}
    </ol>
  );
}

function Block({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section className={styles.block} data-wide={wide || undefined}>
      <h3 className={styles.blockLabel}>{label}</h3>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}

export function AppDetail({ app }: { app: AivoraApp }) {
  return (
    <article className={styles.appDetail}>
      <header className={styles.appHead}>
        <span className={styles.appNo}>{app.no.padStart(2, '0')}</span>
        <h2 className={styles.appName}>{app.name}</h2>
        <p className={styles.appSub}>{app.subtitle}</p>
      </header>
      <ul className={styles.bullets}>
        {app.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className={styles.appLinks}>
        <ExtLink href={app.live} className={styles.linkBtn}>
          <span className="t-mono">Live platform</span>
        </ExtLink>
        <ExtLink href={app.repo} className={styles.linkBtnGhost}>
          <span className="t-mono">Source code</span>
        </ExtLink>
      </div>
      <Block label="Vision">
        <p className={styles.statement}>{app.vision}</p>
      </Block>
      <Block label="Mission">
        <p className={styles.statementSm}>{app.mission}</p>
      </Block>
      <Block label="Objectives" wide>
        <Objectives items={app.objectives} />
      </Block>
      <p className={styles.urls}>
        <span className="t-mono">Live platform</span> <span>{app.live}</span>
        <br />
        <span className="t-mono">Source code</span> <span>{app.repo}</span>
      </p>
    </article>
  );
}

interface Props {
  project: Project;
  onPrev?: () => void;
  onNext?: () => void;
  prevName?: string;
  nextName?: string;
  onOpenApp?: (i: number) => void;
}

export function ProjectDetail({ project: p, onPrev, onNext, prevName, nextName, onOpenApp }: Props) {
  return (
    <article className={styles.detail}>
      <header className={styles.head}>
        <div className={styles.headNum} aria-hidden="true">
          {p.num}
        </div>
        <div className={styles.headMain}>
          <p className={styles.headMeta}>
            <span className="t-mono">Project {p.num}</span>
            {p.duration && <span className="t-mono">{p.duration}</span>}
          </p>
          <h2 className={styles.name}>{p.name}</h2>
          {p.subtitle && <p className={styles.subtitle}>{p.subtitle}</p>}
        </div>
        <ProjectGlyph seed={p.name} className={styles.glyph} />
      </header>

      <div className={styles.grid}>
        {p.intro && (
          <Block label="Overview" wide>
            {!p.subtitle && (
              <p className={styles.statement}>
                {p.intro.lead}
                <em>{p.intro.leadEmphasis}</em>
              </p>
            )}
            <p className={styles.statementSm}>{p.intro.body}</p>
          </Block>
        )}

        <dl className={styles.facts}>
          {p.positioning && (
            <div>
              <dt className="t-mono">Positioning</dt>
              <dd>{p.positioning}</dd>
            </div>
          )}
          {p.fullForm && (
            <div>
              <dt className="t-mono">Full form</dt>
              <dd>{p.fullForm}</dd>
            </div>
          )}
          <div>
            <dt className="t-mono">Role</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt className="t-mono">Domains</dt>
            <dd>{p.domains}</dd>
          </div>
          {p.duration && (
            <div>
              <dt className="t-mono">Duration</dt>
              <dd>{p.duration}</dd>
            </div>
          )}
        </dl>

        {p.overview.length > 0 && (
          <Block label="Overview" wide>
            {p.overview.map((o, i) => (
              <p key={i} className={i === 0 ? styles.lead : styles.para}>
                {o}
              </p>
            ))}
          </Block>
        )}

        <div className={styles.vm}>
          <Block label="Vision">
            <p className={styles.statement}>{p.vision}</p>
          </Block>
          <Block label="Mission">
            <p className={styles.statementSm}>{p.mission}</p>
          </Block>
        </div>

        <Block label="Objectives" wide>
          <Objectives items={p.objectives} />
        </Block>

        {p.apps && (
          <Block label="Seven Applications" wide>
            <ol className={styles.apps}>
              {p.apps.map((a, i) => (
                <li key={a.name}>
                  <button type="button" className={styles.appRow} onClick={() => onOpenApp?.(i)}>
                    <span className={styles.appRowNo}>{a.no}</span>
                    <span className={styles.appRowName}>{a.name}</span>
                    <span className={styles.appRowSub}>{a.subtitle}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          </Block>
        )}

        {p.stack.length > 0 && (
          <Block label="Technical Stack" wide>
            <StackList items={p.stack} />
          </Block>
        )}
        {p.technologyAreas && (
          <Block label="Technology Areas" wide>
            <p className={styles.para}>{p.technologyAreas}</p>
          </Block>
        )}

        {p.publication && (
          <Block label="Research Publication" wide>
            <ul className={styles.pub}>
              {p.publication.map((x) => (
                <li key={x} className="t-mono-sm">
                  {x}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {p.ecosystem && (
          <Block label="Ecosystem Access" wide>
            <div className={styles.linkList}>
              <ExtLink href={p.ecosystem.mainPlatform}>Main platform — {p.ecosystem.mainPlatform}</ExtLink>
              <ExtLink href={p.ecosystem.mainRepository}>Main repository — {p.ecosystem.mainRepository}</ExtLink>
            </div>
          </Block>
        )}

        {p.repo && (
          <Block label="Repository" wide>
            <ExtLink href={p.repo}>{p.repo}</ExtLink>
          </Block>
        )}
      </div>

      {(onPrev || onNext) && (
        <nav className={styles.pager} aria-label="Project navigation">
          <button type="button" onClick={onPrev} className={styles.pagerBtn}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>
              <span className="t-mono">Previous</span>
              <span className={styles.pagerName}>{prevName}</span>
            </span>
          </button>
          <button type="button" onClick={onNext} className={styles.pagerBtn} data-next>
            <span>
              <span className="t-mono">Next</span>
              <span className={styles.pagerName}>{nextName}</span>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </nav>
      )}
    </article>
  );
}
