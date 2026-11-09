import { useEffect, useRef, useState } from 'react';
import styles from './SgpaChart.module.css';

interface Props {
  data: { semester: string; sgpa: string }[];
}

const W = 640;
const H = 300;
const PAD = { top: 28, right: 28, bottom: 34, left: 44 };
const Y_MIN = 9;
const Y_MAX = 10;
const TICKS = [9, 9.25, 9.5, 9.75, 10];

/** Interactive SGPA line chart with a per-semester readout under each point. */
export function SgpaChart({ data }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (innerW * i) / (data.length - 1);
  const y = (v: number) => PAD.top + innerH * (1 - (v - Y_MIN) / (Y_MAX - Y_MIN));
  const pts = data.map((d, i) => ({ x: x(i), y: y(parseFloat(d.sgpa)) }));
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1].x},${PAD.top + innerH} L${pts[0].x},${PAD.top + innerH} Z`;

  const shown = active ?? null;

  return (
    <div ref={root} className={styles.root} data-drawn={drawn || undefined}>
      <div className={styles.head}>
        <p className="t-mono">Semester-wise Academic Performance</p>
        <p className={styles.readout} aria-live="polite">
          {shown !== null ? (
            <>
              <span className="t-mono">{data[shown].semester}</span>
              <strong>{data[shown].sgpa}</strong>
              <span className="t-mono">SGPA</span>
            </>
          ) : (
            <span className="t-mono">Hover or focus a semester</span>
          )}
        </p>
      </div>

      <div className={styles.chartWrap} onMouseLeave={() => setActive(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
          <defs>
            <linearGradient id="sgpaArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#80E3C5" stopOpacity="0.22" />
              <stop offset="1" stopColor="#80E3C5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {TICKS.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className={styles.grid} />
              <text x={PAD.left - 10} y={y(t) + 4} className={styles.tick} textAnchor="end">
                {t.toFixed(2)}
              </text>
            </g>
          ))}

          {shown !== null && (
            <line x1={pts[shown].x} x2={pts[shown].x} y1={PAD.top} y2={PAD.top + innerH} className={styles.guide} />
          )}

          <path d={area} className={styles.area} fill="url(#sgpaArea)" />
          <path d={line} className={styles.line} pathLength={1} />

          {pts.map((p, i) => (
            <g key={i} className={styles.point} data-active={shown === i || undefined} style={{ ['--i' as string]: i }}>
              <circle cx={p.x} cy={p.y} r={14} className={styles.halo} />
              <circle cx={p.x} cy={p.y} r={4.5} className={styles.dot} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className={styles.value}>
                {data[i].sgpa}
              </text>
            </g>
          ))}

          {data.map((d, i) => (
            <text key={d.semester} x={x(i)} y={H - 8} textAnchor="middle" className={styles.xLabel}>
              {d.semester.replace('Semester ', '')}
            </text>
          ))}
        </svg>

        <div className={styles.hits}>
          {data.map((d, i) => (
            <button
              key={d.semester}
              type="button"
              className={styles.hit}
              style={{ left: `${(x(i) / W) * 100}%` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-label={`${d.semester}: SGPA ${d.sgpa}`}
            />
          ))}
        </div>
      </div>

      <ol className={styles.statements} style={{ ['--cols' as string]: data.length }}>
        {data.map((d, i) => (
          <li key={d.semester} data-active={shown === i || undefined} onMouseEnter={() => setActive(i)}>
            <span className={styles.semName}>{d.semester}</span>
            <span className={styles.semValue}>{d.sgpa}</span>
          </li>
        ))}
      </ol>

      <table className="sr-only">
        <caption>Semester-wise Academic Performance</caption>
        <thead>
          <tr>
            <th scope="col">Semester</th>
            <th scope="col">SGPA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.semester}>
              <th scope="row">{d.semester}</th>
              <td>{d.sgpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
