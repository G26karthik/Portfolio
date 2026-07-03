import { useEffect, useRef } from 'react';

/**
 * Full-bleed ambient video behind a stage. Autoplays muted and looping;
 * stays paused when the user prefers reduced motion.
 */
export function VideoBg({ src, fade = false }: { src: string; fade?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      vid.pause();
      return;
    }
    // some browsers ignore the autoplay attribute after hydration
    vid.play().catch(() => {});
  }, []);

  return (
    <div className="video-bg" aria-hidden="true">
      <video ref={ref} src={src} autoPlay muted loop playsInline preload="metadata" />
      {fade && <div className="video-fade" />}
    </div>
  );
}
