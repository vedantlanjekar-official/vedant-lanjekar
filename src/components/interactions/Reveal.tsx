import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  return observer;
}

export function observeReveal(el: Element | null) {
  if (!el) return () => {};
  const io = getObserver();
  io.observe(el);
  return () => io.unobserve(el);
}

interface RevealProps {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
}

/** Fades and lifts its content into view once, when it first enters the viewport. */
export function Reveal({ as = 'div', delay = 0, className, children, style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => observeReveal(ref.current), []);
  return createElement(
    as,
    {
      ref,
      id,
      className,
      'data-reveal': '',
      style: { ...style, ['--reveal-delay' as string]: `${delay}ms` },
    },
    children,
  );
}

/** Masked line reveal for headings: text slides up from behind a clipping edge. */
export function MaskText({
  children,
  as = 'span',
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => observeReveal(ref.current), []);
  return createElement(
    as,
    {
      ref,
      className: ['line-mask', className].filter(Boolean).join(' '),
      style: { ['--reveal-delay' as string]: `${delay}ms` },
    },
    createElement('span', null, children),
  );
}
