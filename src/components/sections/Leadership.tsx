import { useState } from 'react';
import { Building2, Droplet, Leaf } from 'lucide-react';
import { leadership } from '../../data/personal';
import { leadershipImages, socialActivityImages } from '../../data/media';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { ImageViewer } from '../ui/ImageViewer';
import s from './shared.module.css';
import styles from './Leadership.module.css';

const isBlood = (caption?: string) => /blood donation/i.test(caption ?? '');
const bloodCount = socialActivityImages.filter((c) => isBlood(c.caption)).length;
const roleCerts = leadership.flatMap((l) => leadershipImages[l.num] ?? []);

export function Leadership() {
  const [viewer, setViewer] = useState<number | null>(null);
  const [roleViewer, setRoleViewer] = useState<number | null>(null);
  return (
    <Section id="leadership" tone="raised">
      <SectionHeader id="leadership" layout="split" />

      <ol className={styles.roles}>
        {leadership.map((l) => {
          const cert = leadershipImages[l.num]?.[0];
          const [from, to] = l.duration.split('–');
          return (
            <Reveal as="li" key={l.num} className={styles.role}>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.when}>
                <span className={styles.num}>{l.num}</span>
                <span className={styles.years}>
                  <span>{from}</span>
                  {to && (
                    <>
                      <span className={styles.yearsDash} aria-hidden="true">
                        –
                      </span>
                      <span>{to}</span>
                    </>
                  )}
                </span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.designation}>
                  <MaskText>{l.designation}</MaskText>
                </h3>
                <p className={styles.org}>
                  <Building2 size={14} aria-hidden="true" />
                  {l.organization}
                </p>
                <h4 className={s.label}>Key Responsibilities</h4>
                <ul className={`${s.bullets} ${styles.duties}`}>
                  {l.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              {cert && (
                <button
                  type="button"
                  className={styles.roleCert}
                  onClick={() => setRoleViewer(roleCerts.indexOf(cert))}
                  aria-label={`View certificate: ${cert.title}`}
                >
                  <span className={styles.roleFrame}>
                    <img src={cert.image.thumb} alt="" width={cert.image.w} height={cert.image.h} loading="lazy" decoding="async" />
                  </span>
                  <span className={styles.roleCap}>
                    <span className={styles.roleCapTitle}>{cert.title}</span>
                  </span>
                </button>
              )}
            </Reveal>
          );
        })}
      </ol>

      <div className={styles.social}>
        <Reveal className={styles.socialHead}>
          <h3 className={styles.socialTitle}>Social Activity Certificates</h3>
          <dl className={styles.socialStats}>
            <div>
              <dt className="t-mono">Blood donation</dt>
              <dd>{String(bloodCount).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt className="t-mono">Community campaign</dt>
              <dd>{String(socialActivityImages.length - bloodCount).padStart(2, '0')}</dd>
            </div>
          </dl>
        </Reveal>

        <ul className={styles.socialGrid}>
          {socialActivityImages.map((c, i) => {
            const blood = isBlood(c.caption);
            const Icon = blood ? Droplet : Leaf;
            return (
              <Reveal as="li" key={c.image.id} delay={(i % 4) * 70}>
                <button
                  type="button"
                  className={styles.socialCard}
                  onClick={() => setViewer(i)}
                  aria-label={`View certificate: ${c.title} — ${c.caption}`}
                >
                  <span className={styles.socialFrame}>
                    <img src={c.image.thumb} alt="" width={c.image.w} height={c.image.h} loading="lazy" decoding="async" />
                  </span>
                  <span className={styles.socialBody}>
                    <span className={styles.socialMeta}>
                      <span className="t-mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.socialType} data-type={blood ? 'blood' : 'community'}>
                        <Icon size={12} aria-hidden="true" />
                        <span className="t-mono">{blood ? 'Blood donation' : 'Community'}</span>
                      </span>
                    </span>
                    <span className={styles.socialOrg}>{c.title}</span>
                    <span className={styles.socialCap}>{c.caption}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <ImageViewer
        items={roleCerts}
        index={roleViewer}
        onClose={() => setRoleViewer(null)}
        onIndex={setRoleViewer}
        label="Leadership certificates"
      />
      <ImageViewer
        items={socialActivityImages}
        index={viewer}
        onClose={() => setViewer(null)}
        onIndex={setViewer}
        label="Social activity certificates"
      />
    </Section>
  );
}
