import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpenText,
  Briefcase,
  BriefcaseBusiness,
  Compass,
  Cpu,
  FlaskConical,
  GraduationCap,
  Images,
  Languages,
  Layers,
  Mail,
  MapPin,
  MessageSquareQuote,
  Palette,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { sectionById, sections } from '../../data/sections';
import { contact } from '../../data/contact';
import { useActiveSection } from '../../hooks/useActiveSection';
import { lockScroll, scrollState, scrollToId } from '../../lib/motion';
import styles from './Navigation.module.css';

const IDS = sections.map((s) => s.id);

const SECTION_ICONS: Record<string, LucideIcon> = {
  profile: UserRound,
  education: GraduationCap,
  skills: Cpu,
  projects: Layers,
  research: FlaskConical,
  ventures: Rocket,
  experience: Briefcase,
  certifications: BadgeCheck,
  achievements: Trophy,
  leadership: Users,
  strengths: Sparkles,
  languages: Languages,
  interests: Palette,
  gallery: Images,
  contact: Send,
  references: MessageSquareQuote,
};

/** Menu grouping, in page order. */
const NAV_GROUPS: { title: string; Icon: LucideIcon; ids: string[] }[] = [
  { title: 'Background', Icon: Compass, ids: ['profile', 'education', 'skills'] },
  { title: 'Work', Icon: BriefcaseBusiness, ids: ['projects', 'research', 'ventures', 'experience'] },
  { title: 'Recognition', Icon: Award, ids: ['certifications', 'achievements', 'leadership'] },
  { title: 'Personal', Icon: BookOpenText, ids: ['strengths', 'languages', 'interests', 'gallery'] },
  { title: 'Connect', Icon: Mail, ids: ['references', 'contact'] },
];

export function Navigation({ visible }: { visible: boolean }) {
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = -1;
    let wasScrolled = false;
    const loop = () => {
      const p = scrollState.progress || window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (Math.abs(p - last) > 0.0005 && progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
        last = p;
      }
      const s = window.scrollY > 40;
      if (s !== wasScrolled) {
        wasScrolled = s;
        setScrolled(s);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const first = menuRef.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const f = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'));
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu close (and release its scroll lock) before moving.
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <header className={styles.bar} data-visible={visible || undefined} data-scrolled={scrolled || undefined} data-open={open || undefined}>
        <div className={styles.actions}>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.toggleText}>{open ? 'Close' : 'Index'}</span>
            <span className={styles.toggleIcon} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </header>

      <nav className={styles.rail} aria-label="Section progress" data-visible={visible || undefined}>
        <ol>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                className={styles.railItem}
                data-active={active === s.id || undefined}
                aria-current={active === s.id ? 'true' : undefined}
              >
                <span className={styles.railLabel}>{s.short}</span>
                <span className={styles.railTick} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div
        id="site-menu"
        ref={menuRef}
        className={styles.menu}
        data-open={open || undefined}
        aria-hidden={!open}
        {...(!open ? { inert: '' } : {})}
      >
        <nav className={styles.menuInner} aria-label="Portfolio index">
          <div className={styles.menuHead}>
            <p className={styles.menuName}>Vedant Lanjekar</p>
            <p className={`t-mono ${styles.menuLabel}`}>Portfolio Index</p>
          </div>

          <div className={styles.groups}>
            {NAV_GROUPS.map((g, gi) => (
              <section key={g.title} className={styles.group} style={{ ['--g' as string]: gi }} aria-label={g.title}>
                <h2 className={styles.groupTitle}>
                  <g.Icon size={14} aria-hidden="true" />
                  <span>{g.title}</span>
                </h2>
                <ul className={styles.menuList}>
                  {g.ids.map((id) => {
                    const s = sectionById[id];
                    const Icon = SECTION_ICONS[id];
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          onClick={go(id)}
                          className={styles.menuLink}
                          data-active={active === id || undefined}
                          aria-current={active === id ? 'true' : undefined}
                        >
                          <span className={styles.menuIcon} aria-hidden="true">
                            <Icon size={17} strokeWidth={1.6} />
                          </span>
                          <span className={styles.menuTitle}>{s.title}</span>
                          <ArrowUpRight size={15} className={styles.menuArrow} aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div className={styles.menuFoot}>
            <a href={`mailto:${contact.email}`} className={styles.footLink}>
              <Mail size={14} aria-hidden="true" />
              <span>{contact.email}</span>
            </a>
            <a href={contact.phoneHref} className={styles.footLink}>
              <Phone size={14} aria-hidden="true" />
              <span>{contact.phone}</span>
            </a>
            <span className={styles.footLink}>
              <MapPin size={14} aria-hidden="true" />
              <span>{contact.location}</span>
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
