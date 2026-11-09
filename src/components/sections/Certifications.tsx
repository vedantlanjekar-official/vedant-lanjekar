import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { certificationImages } from '../../data/media';
import { Section, SectionHeader } from '../layout/Section';
import { Reveal } from '../interactions/Reveal';
import { ImageViewer } from '../ui/ImageViewer';
import styles from './Certifications.module.css';

const items = certifications.map((c) => certificationImages[c.num]);

export function Certifications() {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const cert = items[active];

  return (
    <Section id="certifications">
      <SectionHeader id="certifications" layout="split" />

      <div className={styles.wrap}>
        <ol className={styles.list}>
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.num} delay={(i % 5) * 50} className={styles.item}>
              <button
                type="button"
                className={styles.row}
                data-active={active === i || undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  setActive(i);
                  setViewer(i);
                }}
                aria-label={`${c.num} ${c.provider} — ${c.title}. View certificate`}
              >
                <span className={styles.num}>{c.num}</span>
                <span className={styles.main}>
                  <span className={styles.provider}>{c.provider}</span>
                  <span className={styles.title}>{c.title}</span>
                  {(c.institution || c.programType) && (
                    <span className={styles.sub}>
                      {c.institution && (
                        <>
                          <span className="t-mono">Institution:</span> {c.institution}
                        </>
                      )}
                      {c.programType && (
                        <>
                          <span className="t-mono">Program Type:</span> {c.programType}
                        </>
                      )}
                    </span>
                  )}
                  <span className={styles.learning}>
                    <span className="t-mono">Key Learning Areas</span>
                    <span>{c.learning}</span>
                  </span>
                </span>
                <span className={styles.thumb} aria-hidden="true">
                  <img src={items[i].image.thumb} alt="" loading="lazy" decoding="async" />
                </span>
              </button>
            </Reveal>
          ))}
        </ol>

        <div className={styles.previewCol} aria-hidden="true">
          <div className={styles.preview}>
            <div className={styles.frame}>
              {items.map((it, i) => (
                <img
                  key={it.image.id}
                  src={it.image.thumb}
                  srcSet={`${it.image.thumb} 900w, ${it.image.large} 2400w`}
                  sizes="40vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  data-on={active === i || undefined}
                  className={styles.previewImg}
                />
              ))}
            </div>
            <div className={styles.previewMeta}>
              <span className="t-mono">{certifications[active].num}</span>
              <span className={styles.previewTitle}>{cert.title}</span>
              <button type="button" tabIndex={-1} className={styles.expand} onClick={() => setViewer(active)}>
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImageViewer items={items} index={viewer} onClose={() => setViewer(null)} onIndex={setViewer} label="Certifications" />
    </Section>
  );
}
