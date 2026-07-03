import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTarget } from '../lib/scrollState';
import { Scramble } from './ui';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: 'WORK', target: '#work' },
  { label: 'OSS', target: '#oss' },
  { label: 'EXPERIENCE', target: '#experience' },
  { label: 'CONTACT', target: '#contact' },
];

export function Nav({ onPalette }: { onPalette: () => void }) {
  const progress = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!progress.current) return;
    const tween = gsap.to(progress.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <header className="nav">
      <div className="scroll-progress" ref={progress} aria-hidden="true" />
      <a
        className="nav-logo"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget('#top');
        }}
      >
        <span className="nav-logo-mark" aria-hidden="true" />
        GKK<span className="nav-logo-cursor">_</span>
      </a>

      <nav className="nav-links" aria-label="Sections">
        {LINKS.map((l) => (
          <a
            key={l.target}
            href={l.target}
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(l.target);
            }}
          >
            <Scramble text={l.label} />
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button
          className="nav-btn"
          onClick={onPalette}
          aria-label="Open command palette"
          title="Ctrl+K"
        >
          ⌘K
        </button>
      </div>
    </header>
  );
}
