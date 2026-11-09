import { useState } from 'react';
import { galleryCollections } from '../../data/media';
import { galleryIntro } from '../../data/personal';
import { Section, SectionHeader } from '../layout/Section';
import { Reveal } from '../interactions/Reveal';
import { ImageViewer } from '../ui/ImageViewer';
import { GalleryCollage } from './GalleryCollage';
import styles from './Gallery.module.css';

const viewerItems = galleryCollections.flatMap((c) =>
  c.images.map((image) => ({ image, title: c.name, caption: 'Gallery — Photography and Visual Gallery' })),
);

export function Gallery() {
  const [viewer, setViewer] = useState<number | null>(null);

  return (
    <Section id="gallery" bleed className={styles.section}>
      <div className="container">
        <SectionHeader
          id="gallery"
          layout="wide"
          kicker={
            <span className={styles.kicker}>
              <span className="t-mono">{galleryIntro.num}</span> {galleryIntro.title}
            </span>
          }
        />
      </div>

      <div className={styles.stage}>
        <GalleryCollage collections={galleryCollections} onOpen={setViewer} />
      </div>

      <Reveal className={`container ${styles.footnote}`}>
        <span className="t-mono">Select any photograph to view it in full</span>
      </Reveal>

      <ImageViewer items={viewerItems} index={viewer} onClose={() => setViewer(null)} onIndex={setViewer} label="Gallery" />
    </Section>
  );
}
