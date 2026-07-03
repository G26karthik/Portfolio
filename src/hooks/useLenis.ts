import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { scrollState, setLenis } from '../lib/scrollState';

/**
 * Smooth scroll + scroll state bridge. Under reduced motion, Lenis is
 * skipped and native scroll feeds scrollState instead.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    if (!enabled) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? window.scrollY / max : 0;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('mousemove', onMouse);
      };
    }

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      scrollState.progress = e.progress;
      // smooth the velocity so the 3D scene eases instead of jittering
      scrollState.velocity += (Math.max(-1.5, Math.min(1.5, e.velocity / 60)) - scrollState.velocity) * 0.12;
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // decay velocity when scrolling stops
    const decay = setInterval(() => {
      scrollState.velocity *= 0.92;
    }, 90);

    return () => {
      clearInterval(decay);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [enabled]);
}
