import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Dot + lagging ring cursor. Renders nothing on coarse pointers. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (!dot.current || !ring.current) return;
    document.documentElement.classList.add('has-cursor');

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const isHoverable = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('a, button, [data-cursor]');

    const onOver = (e: MouseEvent) => {
      if (isHoverable(e.target) && ring.current) ring.current.classList.add('cursor-ring-active');
    };
    const onOut = (e: MouseEvent) => {
      if (isHoverable(e.target) && ring.current) ring.current.classList.remove('cursor-ring-active');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}
