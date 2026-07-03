import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const SCRAMBLE_CHARS = '01<>/_\\|=+*';

/** Text that decodes on hover/focus. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const play = () => {
    const el = ref.current;
    if (!el) return;
    const restore = () => {
      el.textContent = text;
    };
    gsap.to(el, {
      duration: 0.7,
      scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 1.2 },
      ease: 'none',
      overwrite: true,
      onInterrupt: restore,
      onComplete: restore,
    });
  };

  return (
    <span ref={ref} className={className} onMouseEnter={play} onFocus={play}>
      {text}
    </span>
  );
}

/** Fade-up on scroll entry. */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      el,
      { y, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
