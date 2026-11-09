import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { ImageAsset } from '../../data/types';
import { lockScroll, pushOverlay } from '../../lib/motion';
import styles from './ImageViewer.module.css';

export interface ViewerItem {
  image: ImageAsset;
  title: string;
  caption?: string;
}

interface Props {
  items: ViewerItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  label: string;
}

/** Accessible full-screen image dialog with keyboard navigation and zoom. */
export function ImageViewer({ items, index, onClose, onIndex, label }: Props) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const [loaded, setLoaded] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setZoom(false);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  const overlay = useRef<ReturnType<typeof pushOverlay> | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    lockScroll(true);
    overlay.current = pushOverlay();
    closeRef.current?.focus();
    return () => {
      overlay.current?.release();
      overlay.current = null;
      lockScroll(false);
      returnFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (overlay.current && !overlay.current.isTop()) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])'));
        if (!f.length) return;
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onClose]);

  // Preload neighbours for instant stepping.
  useEffect(() => {
    if (index === null || items.length < 2) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = items[(index + d + items.length) % items.length].image.large;
    });
  }, [index, items]);

  if (!open) return null;
  const item = items[index];
  const multi = items.length > 1;

  const onImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    setZoom((z) => !z);
  };
  const onImgMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return createPortal(
    <div
      ref={dialogRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${label}: ${item.title}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || zoom) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className={styles.top}>
        <p className={styles.counter} aria-live="polite">
          <span className="t-mono">{label}</span>
          {multi && (
            <span className="t-mono">
              {index + 1} of {items.length}
            </span>
          )}
        </p>
        <div className={styles.tools}>
          <button type="button" className={styles.btn} onClick={() => setZoom((z) => !z)} aria-label={zoom ? 'Zoom out' : 'Zoom in'}>
            {zoom ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </button>
          <button ref={closeRef} type="button" className={styles.btn} onClick={onClose} aria-label="Close viewer">
            <X size={16} />
          </button>
        </div>
      </div>

      <figure className={styles.stage} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img
          key={item.image.id + index}
          src={item.image.large}
          alt={item.caption ? `${item.title} — ${item.caption}` : item.title}
          width={item.image.w}
          height={item.image.h}
          className={styles.img}
          data-zoom={zoom || undefined}
          data-loaded={loaded || undefined}
          style={{ transformOrigin: origin }}
          onLoad={() => setLoaded(true)}
          onClick={onImgClick}
          onMouseMove={onImgMove}
          draggable={false}
        />
        {!loaded && <span className={styles.loading} aria-hidden="true" />}
      </figure>

      <div className={styles.bottom}>
        {multi && (
          <button type="button" className={styles.nav} onClick={() => go(-1)} aria-label="Previous image">
            <ChevronLeft size={18} />
          </button>
        )}
        <div className={styles.caption}>
          <p className={styles.captionTitle}>{item.title}</p>
          {item.caption && <p className={styles.captionSub}>{item.caption}</p>}
        </div>
        {multi && (
          <button type="button" className={styles.nav} onClick={() => go(1)} aria-label="Next image">
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
