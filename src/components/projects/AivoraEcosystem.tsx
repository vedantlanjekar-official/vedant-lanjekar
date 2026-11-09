import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { MaskText, Reveal } from '../interactions/Reveal';
import { ExtLink } from '../ui/ExtLink';
import styles from './AivoraEcosystem.module.css';

interface Props {
  project: Project;
  onOpenProject: () => void;
  onOpenApp: (i: number) => void;
}

const W = 800;
const H = 640;
const CX = W / 2;
const CY = H / 2;
const RX = 300;
const RY = 238;

export function AivoraEcosystem({ project, onOpenProject, onOpenApp }: Props) {
  const apps = project.apps!;
  const [hover, setHover] = useState<number | null>(null);
  const map = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  const pts = apps.map((_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / apps.length;
    return { x: CX + Math.cos(a) * RX, y: CY + Math.sin(a) * RY };
  });

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        map.current,
        { rotate: -6, scale: 0.92 },
        {
          rotate: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'center center', scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const active = hover ?? null;

  return (
    <div ref={wrap} className={styles.wrap}>
      <div className={styles.intro}>
        <Reveal className={styles.badge}>
          <span className={styles.num}>{project.num}</span>
          <span className="t-mono">{project.duration}</span>
        </Reveal>
        <h3 className={styles.name}>
          <MaskText>{project.name}</MaskText>
        </h3>
        <Reveal delay={80} as="p" className={styles.subtitle}>
          {project.subtitle}
        </Reveal>
        <Reveal delay={140} className={styles.meta}>
          <p>
            <span className="t-mono">Positioning</span>
            <span>{project.positioning}</span>
          </p>
          <p>
            <span className="t-mono">Full form</span>
            <span>{project.fullForm}</span>
          </p>
          <p>
            <span className="t-mono">Role</span>
            <span>{project.role}</span>
          </p>
        </Reveal>
        <Reveal delay={200} as="p" className={styles.overview}>
          {project.overview[0]}
        </Reveal>
        <Reveal delay={240} className={styles.actions}>
          <button type="button" className={styles.primary} onClick={onOpenProject}>
            <span className="t-mono">Open full project</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <ExtLink href={project.ecosystem!.mainPlatform} className={styles.secondary}>
            <span className="t-mono">Main platform</span>
          </ExtLink>
        </Reveal>
      </div>

      <div className={styles.mapCol}>
        <div ref={map} className={styles.map} data-active={active !== null || undefined}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} className={styles.orbit} />
            <ellipse cx={CX} cy={CY} rx={RX * 0.55} ry={RY * 0.55} className={styles.orbitInner} />
            {pts.map((p, i) => {
              const q = pts[(i + 1) % pts.length];
              return <line key={`r${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={styles.ring} />;
            })}
            {pts.map((p, i) => (
              <g key={`s${i}`} data-on={active === i || undefined} className={styles.spokeGroup}>
                <line x1={CX} y1={CY} x2={p.x} y2={p.y} className={styles.spoke} />
                <line
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  className={styles.pulse}
                  style={{ animationDelay: `${i * 0.45}s` }}
                />
              </g>
            ))}
            <circle cx={CX} cy={CY} r={58} className={styles.hubRing} />
            <circle cx={CX} cy={CY} r={86} className={styles.hubHalo} />
          </svg>

          <div className={styles.hub} style={{ left: '50%', top: '50%' }}>
            <span className="t-mono">Ecosystem</span>
            <strong>AIVORA</strong>
            <span className="t-mono">Labs</span>
          </div>

          {apps.map((a, i) => (
            <button
              key={a.name}
              type="button"
              className={styles.node}
              style={{ left: `${(pts[i].x / W) * 100}%`, top: `${(pts[i].y / H) * 100}%` }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => onOpenApp(i)}
              data-on={active === i || undefined}
              aria-label={`${a.name} — ${a.subtitle}. Open details`}
            >
              <span className={styles.nodeDot} aria-hidden="true">
                {a.no}
              </span>
              <span className={styles.nodeText}>
                <span className={styles.nodeName}>{a.name.replace('AIVORA ', '')}</span>
                <span className={styles.nodeSub}>{a.subtitle}</span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.readout} aria-live="polite">
          {active !== null ? (
            <>
              <span className="t-mono">
                {apps[active].no.padStart(2, '0')} / {apps.length.toString().padStart(2, '0')}
              </span>
              <p>{apps[active].bullets[0]}</p>
            </>
          ) : (
            <>
              <span className="t-mono">Seven Applications</span>
              <p>{project.overview[2]}</p>
            </>
          )}
        </div>

        <ol className={styles.list}>
          {apps.map((a, i) => (
            <li key={a.name}>
              <button type="button" onClick={() => onOpenApp(i)} className={styles.listBtn}>
                <span className={styles.listNo}>{a.no}</span>
                <span className={styles.listName}>{a.name}</span>
                <span className={styles.listSub}>{a.subtitle}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
