import { useEffect, useRef, useState } from 'react';
import { heroPortrait } from '../../data/media';
import { prefersReducedMotion } from '../../lib/motion';
import styles from './Preloader.module.css';

const WORDS = ['Build', 'with', 'Vedant', 'Lanjekar'];
const MIN_MS = 1500;
const MAX_MS = 3200;

// Icosahedron geometry for the 2D wireframe projection.
const T = (1 + Math.sqrt(5)) / 2;
const VERTS = [
  [-1, T, 0], [1, T, 0], [-1, -T, 0], [1, -T, 0],
  [0, -1, T], [0, 1, T], [0, -1, -T], [0, 1, -T],
  [T, 0, -1], [T, 0, 1], [-T, 0, -1], [-T, 0, 1],
];
const EDGES: [number, number][] = [];
for (let i = 0; i < VERTS.length; i++)
  for (let j = i + 1; j < VERTS.length; j++) {
    const d = Math.hypot(VERTS[i][0] - VERTS[j][0], VERTS[i][1] - VERTS[j][1], VERTS[i][2] - VERTS[j][2]);
    if (Math.abs(d - 2) < 0.01) EDGES.push([i, j]);
  }

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

export function Preloader({ onExit, onDone }: { onExit: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'exit' | 'gone'>('enter');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const reduced = useRef(prefersReducedMotion());

  // Real readiness: fonts + hero image.
  useEffect(() => {
    const start = performance.now();
    let ready = 0;
    const tasks = [document.fonts?.ready.then(() => undefined) ?? Promise.resolve(), preload(heroPortrait.large)];
    tasks.forEach((t) => t.then(() => (ready += 1)));

    let shown = 0;
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const target = Math.min(ready / tasks.length, elapsed / MIN_MS);
      const capped = elapsed > MAX_MS ? 1 : target;
      shown += (capped - shown) * 0.12;
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      if (pctRef.current) pctRef.current.textContent = String(Math.round(shown * 100)).padStart(3, '0');
      if (shown > 0.995) {
        setPhase('exit');
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase !== 'exit') return;
    onExit();
    const t = setTimeout(
      () => {
        setPhase('gone');
        onDone();
      },
      reduced.current ? 350 : 1150,
    );
    return () => clearTimeout(t);
  }, [phase, onExit, onDone]);

  // Wireframe icosahedron, drawn in 2D so it renders before WebGL is ready.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 220;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      const a = reduced.current ? 0.6 : t * 0.45;
      const b = reduced.current ? 0.3 : t * 0.28;
      ctx.clearRect(0, 0, size, size);
      const pts = VERTS.map(([x, y, z]) => {
        const x1 = x * Math.cos(a) - z * Math.sin(a);
        const z1 = x * Math.sin(a) + z * Math.cos(a);
        const y1 = y * Math.cos(b) - z1 * Math.sin(b);
        const z2 = y * Math.sin(b) + z1 * Math.cos(b);
        const p = 3.6 / (3.6 + z2 * 0.5);
        return [size / 2 + x1 * 48 * p, size / 2 + y1 * 48 * p, z2];
      });
      for (const [i, j] of EDGES) {
        const depth = (pts[i][2] + pts[j][2]) / 2;
        ctx.strokeStyle = `rgba(128, 227, 197, ${0.18 + (depth + 1.7) * 0.14})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(pts[i][0], pts[i][1]);
        ctx.lineTo(pts[j][0], pts[j][1]);
        ctx.stroke();
      }
      for (const [x, y, z] of pts) {
        ctx.fillStyle = `rgba(242, 242, 237, ${0.35 + (z + 1.7) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced.current) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === 'gone') return null;

  let letter = 0;
  return (
    <div
      className={styles.root}
      data-phase={phase}
      data-reduced={reduced.current || undefined}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.crosshair} aria-hidden="true">
        <span />
        <span />
      </div>
      <canvas ref={canvasRef} className={styles.object} aria-hidden="true" />

      <h1 className={styles.title} aria-label="Build with Vedant Lanjekar">
        {WORDS.map((w, wi) => (
          <span key={w} className={styles.word} data-accent={wi >= 2 || undefined} aria-hidden="true">
            {w.split('').map((ch) => {
              const i = letter++;
              return (
                <span key={i} className={styles.char} style={{ ['--i' as string]: i }}>
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      <div className={styles.meta} aria-hidden="true">
        <span className="t-mono">Initializing systems</span>
        <div className={styles.track}>
          <div ref={barRef} className={styles.bar} />
        </div>
        <span className="t-mono">
          <span ref={pctRef}>000</span>
        </span>
      </div>

      <div className={styles.corner} data-pos="tl" aria-hidden="true">
        <span className="t-mono">VL / 2026</span>
      </div>
      <div className={styles.corner} data-pos="br" aria-hidden="true">
        <span className="t-mono">AI · Full-Stack · Edge</span>
      </div>
    </div>
  );
}
