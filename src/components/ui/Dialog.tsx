import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { lockScroll, pushOverlay } from '../../lib/motion';
import styles from './Dialog.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  variant?: 'panel' | 'drawer';
  toolbar?: ReactNode;
  scrollKey?: string;
}

/** Full-screen panel / side drawer with focus trap, Esc to close, and focus return. */
export function Dialog({ open, onClose, label, children, variant = 'panel', toolbar, scrollKey }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement;
    lockScroll(true);
    const overlay = pushOverlay();
    requestAnimationFrame(() => closeBtn.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (!overlay.isTop()) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
      }
      if (e.key === 'Tab' && ref.current) {
        const f = Array.from(
          ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
        ).filter((el) => el.offsetParent !== null);
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
    return () => {
      window.removeEventListener('keydown', onKey);
      overlay.release();
      lockScroll(false);
      returnTo.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (open && body.current) body.current.scrollTop = 0;
  }, [open, scrollKey]);

  if (!open) return null;

  return createPortal(
    <div className={styles.backdrop} data-variant={variant} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className={styles.panel} role="dialog" aria-modal="true" aria-label={label}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>{toolbar}</div>
          <button ref={closeBtn} type="button" className={styles.close} onClick={onClose}>
            <span className="t-mono">Close</span>
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div ref={body} className={styles.body} data-lenis-prevent>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
