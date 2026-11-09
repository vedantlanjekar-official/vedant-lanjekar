import { useLayoutEffect, useMemo, useRef, type CSSProperties, type FocusEvent } from 'react';
import { Maximize2 } from 'lucide-react';
import type { GalleryCollection } from '../../data/media';
import { getLenis, gsap, ScrollTrigger } from '../../lib/motion';
import styles from './GalleryCollage.module.css';

interface Props {
  collections: GalleryCollection[];
  /** Called with the photograph's position across all collections, in display order. */
  onOpen: (index: number) => void;
}

interface Placed {
  size: 'lg' | 'sm';
  col: number;
  row: number;
}

/**
 * Lays a collection out on a two-row grid of 16:9 cells: large photos fill a 2 × 2 block,
 * small ones stack in pairs, so every column is filled and every photo keeps its shape.
 */
function place(n: number): Placed[] {
  let big = Math.max(1, Math.round(n / 5));
  if ((n - big) % 2 !== 0) big = big > 1 ? big - 1 : big + 1;
  big = Math.min(big, n);
  const pairs = (n - big) / 2;
  const slots = big + pairs;
  const bigAt = new Set(Array.from({ length: big }, (_, i) => Math.floor((i * slots) / big)));

  const out: Placed[] = [];
  let col = 1;
  for (let s = 0; s < slots; s++) {
    if (bigAt.has(s)) {
      out.push({ size: 'lg', col, row: 1 });
      col += 2;
    } else {
      out.push({ size: 'sm', col, row: 1 }, { size: 'sm', col, row: 2 });
      col += 1;
    }
  }
  return out;
}

export function GalleryCollage({ collections, onOpen }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const current = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  const layout = useMemo(() => {
    let offset = 0;
    return collections.map((c) => {
      const cells = place(c.images.length).map((p, i) => ({ ...p, image: c.images[i], order: offset + i }));
      offset += c.images.length;
      return { name: c.name, cells };
    });
  }, [collections]);

  useLayoutEffect(() => {
    const root = stage.current!;
    const rail = track.current!;
    const mm = gsap.matchMedia();

    mm.add(
      {
        wide: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
        narrow: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { wide } = ctx.conditions as { wide: boolean; narrow: boolean };
        const groups = gsap.utils.toArray<HTMLElement>(`.${styles.collage}`, root);

        if (wide) {
          const distance = () => Math.max(0, rail.scrollWidth - root.clientWidth);
          const tween = gsap.to(rail, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (fill.current) fill.current.style.transform = `scaleX(${self.progress})`;
                if (!current.current) return;
                const mid = -(gsap.getProperty(rail, 'x') as number) + root.clientWidth / 2;
                let name = layout[0]?.name ?? '';
                for (const g of groups) if (g.offsetLeft <= mid) name = g.dataset.name ?? name;
                if (current.current.textContent !== name) current.current.textContent = name;
              },
            },
          });
          trigger.current = tween.scrollTrigger ?? null;

          groups.forEach((g, i) => {
            gsap.from(g.querySelectorAll(`.${styles.cell}`), {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.06,
              scrollTrigger:
                i === 0 ? { trigger: root, start: 'top 70%' } : { trigger: g, containerAnimation: tween, start: 'left 85%' },
            });
          });
        } else {
          groups.forEach((g) => {
            gsap.from(g.querySelectorAll(`.${styles.cell}`), {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1,
              ease: 'power3.out',
              stagger: 0.05,
              scrollTrigger: { trigger: g, start: 'top 80%' },
            });
          });
        }

        return () => {
          trigger.current = null;
        };
      },
      root,
    );

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [layout]);

  const onFocusCell = (e: FocusEvent<HTMLButtonElement>) => {
    const st = trigger.current;
    if (!st || !e.currentTarget.matches(':focus-visible')) return;
    const rail = track.current!;
    const cell = e.currentTarget;
    const distance = Math.max(1, rail.scrollWidth - stage.current!.clientWidth);
    const group = cell.closest(`.${styles.collage}`) as HTMLElement;
    const left = group.offsetLeft + cell.offsetLeft - stage.current!.clientWidth / 3;
    const p = Math.min(1, Math.max(0, left / distance));
    const y = st.start + p * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  };

  return (
    <div ref={stage} className={styles.stage}>
      <div ref={track} className={styles.track}>
        {layout.map((g, gi) => (
          <section key={g.name} className={styles.collage} data-name={g.name} aria-labelledby={`collage-${gi}`}>
            <h3 id={`collage-${gi}`} className={styles.name}>
              {g.name}
            </h3>
            <div className={styles.grid}>
              {g.cells.map((c) => (
                <button
                  key={c.order}
                  type="button"
                  className={styles.cell}
                  data-size={c.size}
                  style={{ ['--col' as string]: c.col, ['--row' as string]: c.row } as CSSProperties}
                  onClick={() => onOpen(c.order)}
                  onFocus={onFocusCell}
                  aria-label={`Open photograph — ${g.name}`}
                >
                  <span className={styles.photo}>
                    <img src={c.image.thumb} alt="" width={c.image.w} height={c.image.h} loading="lazy" decoding="async" draggable={false} />
                    <span className={styles.shade} aria-hidden="true" />
                    <Maximize2 className={styles.zoom} size={14} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className={styles.hud} aria-hidden="true">
        <span ref={current} className="t-mono">
          {layout[0]?.name}
        </span>
        <div className={styles.bar}>
          <div ref={fill} className={styles.fill} />
        </div>
        <span className="t-mono">Scroll to browse</span>
      </div>
    </div>
  );
}
