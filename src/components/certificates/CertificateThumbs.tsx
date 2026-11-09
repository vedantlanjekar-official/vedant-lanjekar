import { useState } from 'react';
import type { Certificate } from '../../data/types';
import { ImageViewer } from '../ui/ImageViewer';
import styles from './CertificateThumbs.module.css';

interface Props {
  items: Certificate[];
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

/** A row of small document previews that open the full certificate viewer. */
export function CertificateThumbs({ items, label, size = 'sm', className }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  if (!items.length) return null;
  return (
    <>
      <ul className={[styles.row, className].filter(Boolean).join(' ')} data-size={size}>
        {items.map((c, i) => (
          <li key={c.image.id + i}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => setIndex(i)}
              aria-label={`View ${c.title}${c.caption ? ` — ${c.caption}` : ''}`}
            >
              <img
                src={c.image.thumb}
                alt=""
                width={c.image.w}
                height={c.image.h}
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: `${c.image.w} / ${c.image.h}` }}
              />
            </button>
          </li>
        ))}
      </ul>
      <ImageViewer items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} label={label} />
    </>
  );
}
