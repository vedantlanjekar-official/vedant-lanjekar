import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Shared, mutable state read inside animation frames. Never put this in React state. */
export const scrollState = { y: 0, velocity: 0, progress: 0, direction: 1 };
export const pointerState = { x: 0, y: 0, nx: 0, ny: 0, active: false };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis) return lenis;
  const reduced = prefersReducedMotion();
  lenis = new Lenis({
    duration: reduced ? 0 : 1.1,
    smoothWheel: !reduced,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', (e: Lenis) => {
    scrollState.y = e.scroll;
    scrollState.velocity = e.velocity;
    scrollState.progress = e.progress;
    scrollState.direction = e.direction || 1;
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  window.addEventListener(
    'pointermove',
    (e) => {
      pointerState.x = e.clientX;
      pointerState.y = e.clientY;
      pointerState.nx = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.ny = -((e.clientY / window.innerHeight) * 2 - 1);
      pointerState.active = true;
    },
    { passive: true },
  );

  return lenis;
}

export const getLenis = () => lenis;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis)
    lenis.scrollTo(el, { offset: id === 'top' ? 0 : -8, duration: prefersReducedMotion() ? 0 : 1.4, force: true });
  else el.scrollIntoView();
}

let lockCount = 0;
let loadingLock = false;

function applyLock() {
  const locked = loadingLock || lockCount > 0;
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? 'hidden' : '';
}

/** Reference-counted so nested overlays don't release each other's lock. */
export function lockScroll(lock: boolean) {
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  applyLock();
}

/** Idempotent lock held while the preloader is on screen. */
export function setLoadingLock(locked: boolean) {
  loadingLock = locked;
  applyLock();
}

const overlayStack: symbol[] = [];

/** Registers an overlay; returns helpers to test whether it is topmost and to unregister. */
export function pushOverlay() {
  const id = Symbol('overlay');
  overlayStack.push(id);
  return {
    isTop: () => overlayStack[overlayStack.length - 1] === id,
    release: () => {
      const i = overlayStack.indexOf(id);
      if (i >= 0) overlayStack.splice(i, 1);
    },
  };
}
