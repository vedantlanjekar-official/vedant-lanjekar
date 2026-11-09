import type { IconType } from 'react-icons';
import { FaLinkedin, FaMicrosoft } from 'react-icons/fa';
import { SiFreelancer, SiGithub, SiInstagram, SiLeetcode } from 'react-icons/si';
import { ArrowUpRight, Download, Eye, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { contact, cv, profiles, type PlatformKey } from '../../data/contact';
import { Section, SectionHeader } from '../layout/Section';
import { MaskText, Reveal } from '../interactions/Reveal';
import { Magnetic } from '../interactions/Magnetic';
import { CopyButton } from '../ui/CopyButton';
import styles from './Contact.module.css';

const PLATFORM_ICONS: Record<PlatformKey, IconType> = {
  linkedin: FaLinkedin,
  github: SiGithub,
  leetcode: SiLeetcode,
  microsoftLearn: FaMicrosoft,
  freelancer: SiFreelancer,
  instagram: SiInstagram,
};

export function Contact() {
  return (
    <Section id="contact" className={styles.section}>
      <SectionHeader id="contact" layout="split" />

      <div className={styles.primary}>
        <div className={styles.emailBlock}>
          <Reveal className={styles.k}>
            <Mail size={14} aria-hidden="true" />
            <span className="t-mono">Email</span>
          </Reveal>
          <Magnetic strength={4}>
            <a href={`mailto:${contact.email}`} className={styles.email}>
              <MaskText>{contact.email}</MaskText>
            </a>
          </Magnetic>
          <Reveal delay={100}>
            <CopyButton value={contact.email} label="email address" />
          </Reveal>
        </div>

        <div className={styles.secondary}>
          <Reveal className={styles.detail}>
            <span className={styles.k}>
              <Phone size={14} aria-hidden="true" />
              <span className="t-mono">Phone</span>
            </span>
            <a href={contact.phoneHref} className={styles.value}>
              {contact.phone}
            </a>
            <CopyButton value={contact.phone} label="phone number" />
          </Reveal>
          <Reveal delay={80} className={styles.detail}>
            <span className={styles.k}>
              <MapPin size={14} aria-hidden="true" />
              <span className="t-mono">Location</span>
            </span>
            <span className={styles.value}>{contact.location}</span>
          </Reveal>
        </div>
      </div>

      <Reveal className={styles.cv}>
        <span className={styles.cvIcon} aria-hidden="true">
          <FileText size={22} />
        </span>
        <span className={styles.cvText}>
          <span className="t-mono">Curriculum Vitae</span>
          <span className={styles.cvName}>Vedant Lanjekar — CV</span>
          <span className={styles.cvMeta}>PDF</span>
        </span>
        <span className={styles.cvActions}>
          <a href={cv.href} target="_blank" rel="noopener noreferrer" className={styles.cvBtn}>
            <Eye size={15} aria-hidden="true" />
            <span className="t-mono">View</span>
            <span className="sr-only">CV (opens in a new tab)</span>
          </a>
          <a href={cv.href} download={cv.fileName} className={`${styles.cvBtn} ${styles.cvPrimary}`}>
            <Download size={15} aria-hidden="true" />
            <span className="t-mono">Download</span>
            <span className="sr-only">CV</span>
          </a>
        </span>
      </Reveal>

      <div className={styles.profilesHead}>
        <h3 className={styles.profilesTitle}>Professional Profiles</h3>
      </div>
      <ul className={styles.profiles}>
        {profiles.map((p, i) => {
          const Icon = PLATFORM_ICONS[p.key];
          const inner = (
            <>
              <span className={styles.pIcon}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className={styles.pText}>
                <span className={styles.pName}>{p.platform}</span>
                <span className={styles.pId}>{p.identifier}</span>
              </span>
            </>
          );
          return (
            <Reveal as="li" key={p.key} delay={(i % 3) * 70} className={styles.profile}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.pLink}>
                  {inner}
                  <ArrowUpRight size={18} className={styles.pArrow} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <div className={styles.pLink}>
                  {inner}
                  <CopyButton value={p.identifier} label={p.platform} />
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
