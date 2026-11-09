import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { isFinePointer, pointerState } from '../../lib/motion';
import { Reveal } from '../interactions/Reveal';
import { TechLogo } from '../ui/TechLogo';
import { ProjectGlyph } from './ProjectGlyph';
import styles from './ProjectIndex.module.css';

interface Props {
  projects: Project[];
  onOpen: (p: Project) => void;
}

export function ProjectIndex({ projects, onOpen }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const fine = useRef(false);

  useEffect(() => {
    fine.current = isFinePointer();
    if (!fine.current) return;
    let raf = 0;
    let x = pointerState.x;
    let y = pointerState.y;
    const loop = () => {
      x += (pointerState.x - x) * 0.14;
      y += (pointerState.y - y) * 0.14;
      if (preview.current) preview.current.style.transform = `translate3d(${x + 28}px, ${y - 120}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const current = hover !== null ? projects[hover] : null;

  return (
    <div className={styles.wrap}>
      <aside className={styles.side} aria-hidden="true">
        <div className={styles.sticky}>
          <span className="t-mono">Project index</span>
          <div className={styles.bigNum} key={current?.num ?? 'idle'}>
            {current ? current.num : '4.—'}
          </div>
          <p className={styles.sideName}>{current ? current.name : 'Select a project'}</p>
          {current?.role && <p className={styles.sideRole}>{current.role}</p>}
        </div>
      </aside>

      <ol className={styles.list}>
        {projects.map((p, i) => (
          <Reveal as="li" key={p.num} delay={(i % 4) * 50} className={styles.item}>
            <button
              type="button"
              className={styles.row}
              onClick={() => onOpen(p)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              data-active={hover === i || undefined}
              aria-label={`${p.num} ${p.name}${p.subtitle ? ` — ${p.subtitle}` : ''}. Open project details`}
            >
              <span className={styles.num}>{p.num}</span>
              <span className={styles.main}>
                <span className={styles.name}>{p.name}</span>
                {p.subtitle && <span className={styles.subtitle}>{p.subtitle}</span>}
              </span>
              <span className={styles.meta}>
                {p.duration && <span className={styles.duration}>{p.duration}</span>}
                <span className={styles.domains}>{p.domains}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
            </button>
          </Reveal>
        ))}
      </ol>

      <div ref={preview} className={styles.preview} data-visible={current !== null || undefined} aria-hidden="true">
        {current && (
          <>
            <ProjectGlyph seed={current.name} className={styles.previewGlyph} key={current.name} />
            <div className={styles.previewBody}>
              <span className={styles.previewNum}>{current.num}</span>
              <p className={styles.previewText}>{current.overview[0] ?? current.intro?.body}</p>
              <ul className={styles.previewStack}>
                {current.stack.slice(0, 4).map((s) => (
                  <li key={s}>
                    <TechLogo name={s} size={12} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
