import { useLayoutEffect, useRef } from 'react';
import { Download, Mail, Phone } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { identity } from '../../data/profile';
import { contact, cv, profiles } from '../../data/contact';
import { heroPortrait } from '../../data/media';
import { gsap, prefersReducedMotion, scrollToId } from '../../lib/motion';
import { Magnetic } from '../interactions/Magnetic';
import styles from './Hero.module.css';

const github = profiles.find((p) => p.key === 'github')!;
const linkedin = profiles.find((p) => p.key === 'linkedin')!;

const QUICK_LINKS = [
  { label: `Call ${contact.phone}`, href: contact.phoneHref, Icon: Phone, external: false },
  { label: `Email ${contact.email}`, href: `mailto:${contact.email}`, Icon: Mail, external: false },
  { label: 'GitHub profile', href: github.url!, Icon: SiGithub, external: true },
  { label: 'LinkedIn profile', href: linkedin.url!, Icon: FaLinkedin, external: true },
];

export function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const firstLine = useRef<HTMLSpanElement>(null);
  const lastLine = useRef<HTMLSpanElement>(null);

  // Scroll-linked exit: content drifts up and dims, portrait recedes,
  // and the two name lines slide apart (first name right, last name left).
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const scrub = () => ({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
      });
      gsap.fromTo(firstLine.current, { x: 0 }, { x: () => window.innerWidth * 0.32, ease: 'none', scrollTrigger: scrub() });
      gsap.fromTo(lastLine.current, { x: 0 }, { x: () => -window.innerWidth * 0.32, ease: 'none', scrollTrigger: scrub() });
      gsap.to(content.current, {
        yPercent: -12,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(
        portrait.current,
        { scale: 1, yPercent: 0, opacity: 1 },
        {
          scale: 1.06,
          yPercent: 8,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" ref={root} className={styles.hero} data-started={started || undefined} aria-label="Introduction">
      <div ref={portrait} className={styles.portrait}>
        <div className={styles.portraitInner}>
        <img
          src={heroPortrait.thumb}
          srcSet={`${heroPortrait.thumb} 1100w, ${heroPortrait.large} 2400w`}
          sizes="(max-width: 900px) 100vw, 64vw"
          width={heroPortrait.w}
          height={heroPortrait.h}
          alt="Vedant Lanjekar, standing in a dark blazer and olive shirt against a black backdrop"
          {...{ fetchpriority: 'high' }}
          decoding="async"
        />
        </div>
      </div>

      <div ref={content} className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          <span>{contact.location}</span>
        </p>

        <h1 className={styles.name} aria-label={identity.name}>
          <span ref={firstLine} className={styles.nameLine} aria-hidden="true">
            <span>{identity.firstName}</span>
          </span>
          <span ref={lastLine} className={styles.nameLine} aria-hidden="true">
            <span>{identity.lastName}</span>
          </span>
        </h1>

        <p className={styles.headline}>
          {identity.headlineParts.map((part, i) => (
            <span key={part} className={styles.headPart} style={{ ['--i' as string]: i }}>
              {i > 0 && (
                <span className={styles.sep} aria-hidden="true">
                  |
                </span>
              )}
              {part}
            </span>
          ))}
        </p>

        <div className={styles.lower}>
          <p className={styles.tagline}>{identity.tagline}</p>
        </div>

        <ul className={styles.ctas} aria-label="Contact and profiles">
          {QUICK_LINKS.map(({ label, href, Icon, external }) => (
            <li key={href}>
              <Magnetic>
                <a
                  href={href}
                  className={styles.iconLink}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  title={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </Magnetic>
            </li>
          ))}
          <li>
            <Magnetic>
              <a href={cv.href} download={cv.fileName} className={styles.cvLink}>
                <Download size={16} aria-hidden="true" />
                <span className="t-mono">Download CV</span>
              </a>
            </Magnetic>
          </li>
        </ul>
      </div>

      <a href="#profile" className={styles.scroll} onClick={go('profile')} aria-label="Scroll to Professional Profile">
        <span className={styles.scrollLine} aria-hidden="true" />
        <span className="t-mono">Scroll</span>
      </a>
    </section>
  );
}
