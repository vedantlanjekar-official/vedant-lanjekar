import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  Accessibility,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Lightbulb,
  MessagesSquare,
  Microscope,
  Network,
  Target,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { strengths } from '../../data/personal';
import { prefersReducedMotion } from '../../lib/motion';
import { Section, SectionHeader } from '../layout/Section';
import { Reveal } from '../interactions/Reveal';
import styles from './CoreStrengths.module.css';

const ICONS: LucideIcon[] = [Network, Workflow, Lightbulb, Zap, Microscope, Cpu, MessagesSquare, Users, Accessibility, Target];

const COUNT = strengths.length;
const R = 84;
const C = 2 * Math.PI * R;
const angleOf = (i: number) => (i / COUNT) * 360;
const pointOf = (i: number) => {
  const a = ((angleOf(i) - 90) * Math.PI) / 180;
  return { x: 100 + R * Math.cos(a), y: 100 + R * Math.sin(a) };
};

export function CoreStrengths() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) setAuto(false);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const choose = (i: number, focus = false) => {
    const next = (i + COUNT) % COUNT;
    setAuto(false);
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: COUNT - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      choose(map[e.key], true);
    }
  };

  const s = strengths[active];
  const Icon = ICONS[active];
  const running = auto && inView && !hover;

  return (
    <Section id="strengths">
      <SectionHeader id="strengths" layout="stacked" />
      <Reveal>
        <div
          ref={root}
          className={styles.explorer}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-label="Core strengths">
            {strengths.map((x, i) => {
              const TabIcon = ICONS[i];
              const selected = i === active;
              return (
                <button
                  key={x.num}
                  ref={(el) => (tabs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`strength-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="strength-panel"
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  data-active={selected || undefined}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className={styles.tabNum}>{x.num}</span>
                  <TabIcon className={styles.tabIcon} size={16} strokeWidth={1.6} aria-hidden="true" />
                  <span className={styles.tabTitle}>{x.title}</span>
                  {selected && auto && (
                    <span
                      key={active}
                      className={styles.timer}
                      style={{ animationPlayState: running ? 'running' : 'paused' }}
                      onAnimationEnd={() => setActive((a) => (a + 1) % COUNT)}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            className={styles.stage}
            role="tabpanel"
            id="strength-panel"
            aria-labelledby={`strength-tab-${active}`}
            aria-live={auto ? 'off' : 'polite'}
          >
            <div className={styles.dialWrap}>
              <svg className={styles.dial} viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r={R} className={styles.track} />
                <circle
                  cx="100"
                  cy="100"
                  r={R}
                  className={styles.arc}
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - (active + 1) / COUNT)}
                  transform="rotate(-90 100 100)"
                />
                <g className={styles.needle} style={{ transform: `rotate(${angleOf(active)}deg)` }}>
                  <line x1="100" y1="100" x2="100" y2={100 - R + 14} />
                </g>
                {strengths.map((x, i) => {
                  const p = pointOf(i);
                  return (
                    <circle
                      key={x.num}
                      cx={p.x}
                      cy={p.y}
                      r={i === active ? 6 : 3.5}
                      className={styles.node}
                      data-active={i === active || undefined}
                      data-passed={i < active || undefined}
                      onClick={() => choose(i)}
                    />
                  );
                })}
              </svg>
              <div className={styles.core} key={active}>
                <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.content} key={active}>
              <p className={styles.counter}>
                <span className="t-mono">{s.num}</span>
                <span className={styles.counterSep} aria-hidden="true" />
                <span className="t-mono">
                  {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
                </span>
              </p>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.text}</p>
            </div>

            <div className={styles.controls}>
              <button type="button" className={styles.ctrl} onClick={() => choose(active - 1)} aria-label="Previous strength">
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button type="button" className={styles.ctrl} onClick={() => choose(active + 1)} aria-label="Next strength">
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
