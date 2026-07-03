import type Lenis from 'lenis';

/**
 * Mutable singleton bridging DOM scroll (Lenis/ScrollTrigger) and the R3F
 * scene without triggering React re-renders. Written by useLenis + theme
 * toggle, read every frame inside useFrame.
 */
export const scrollState = {
  /** 0..1 across the whole page */
  progress: 0,
  /** smoothed scroll velocity, roughly -1..1 */
  velocity: 0,
  /** normalized cursor, -1..1 */
  mouseX: 0,
  mouseY: 0,
  /** 1 = dark, 0 = light — tweened on theme toggle */
  themeMix: 1,
};

/** Lenis instance shared with command palette / anchor navigation. */
export let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
}
