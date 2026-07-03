import { useEffect, useRef } from 'react';
import { ScrambleIn } from '../components/ScrambleIn';

const PROFILES = [
  { label: 'GITHUB ↗', url: 'https://github.com/G26karthik' },
  { label: 'LINKEDIN ↗', url: 'https://www.linkedin.com/in/g-karthik26' },
  { label: 'CODECHEF ↗', url: 'https://www.codechef.com/users/g26karthikk' },
  { label: 'LEETCODE ↗', url: 'https://leetcode.com/u/G26KarthikK/' },
  { label: 'EMAIL', url: 'mailto:Karthikofficialmain@gmail.com' },
];

export function Hero({ entered }: { entered: boolean }) {
  const vidRef = useRef<HTMLVideoElement>(null);

  // Hero video is paused and scrubbed by horizontal mouse movement.
  // Seeks chain through the `seeked` event so frames are never dropped.
  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!fine || reduced) {
      if (!reduced) {
        vid.loop = true;
        vid.play().catch(() => {});
      }
      return;
    }

    vid.pause();
    let target = 0;
    let seeking = false;
    let lastX: number | null = null;

    const wrap = (t: number) => {
      const d = vid.duration;
      return ((t % d) + d) % d;
    };
    const seek = () => {
      if (seeking || !vid.duration) return;
      const next = wrap(target);
      if (Math.abs(next - vid.currentTime) < 0.02) return;
      seeking = true;
      vid.currentTime = next;
    };
    const onSeeked = () => {
      seeking = false;
      seek();
    };
    const onMove = (e: MouseEvent) => {
      if (!vid.duration) return;
      if (lastX !== null) {
        target += ((e.clientX - lastX) / window.innerWidth) * vid.duration * 0.8;
        seek();
      }
      lastX = e.clientX;
    };

    vid.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      vid.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section id="top" className="stage hero">
      <div className="video-bg" aria-hidden="true">
        <video ref={vidRef} src="/video/blackhole.mp4" muted playsInline preload="auto" />
      </div>
      <div className="hero-dots" aria-hidden="true" />
      <span className="hero-watermark" aria-hidden="true">
        Koundinya
      </span>

      <div className={`hero-content ${entered ? 'on' : ''}`}>
        <div className="hero-row">
          <div className="hero-col">
            <h1 className="hero-h1">
              <ScrambleIn text="G. Karthik" delay={200} triggered={entered} />
              <br />
              <ScrambleIn text="Koundinya" delay={500} triggered={entered} />
            </h1>
            <p className="hero-desc">
              Built at the intersection of systems engineering and applied AI. Agents, retrieval
              pipelines, and edge inference, engineered end to end and measured at every step.
            </p>
          </div>
          <p className="hero-h1 hero-h1-right" aria-label="Systems and AI Engineer">
            <ScrambleIn text="Systems &" delay={700} triggered={entered} />
            <br />
            <ScrambleIn text="AI Engineer" delay={1000} triggered={entered} />
          </p>
        </div>

        <nav className="hero-links" aria-label="Profiles">
          {PROFILES.map((p) => (
            <a
              key={p.label}
              href={p.url}
              target={p.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
            >
              {p.label}
            </a>
          ))}
        </nav>

        <p className="hero-avail">Open to SDE and AI engineer roles · 2026-27 · Hyderabad, IN</p>
      </div>
    </section>
  );
}
