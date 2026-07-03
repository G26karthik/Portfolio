import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const SCRAMBLE_CHARS = '01<>/_\\|=+*';

/** Text that decodes on hover/focus — the system's AI motif. */
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

/** Magnetic hover pull — desktop (fine pointer) only. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic ${className ?? ''}`}>
      {children}
    </div>
  );
}

/** Infinite CSS marquee. Content is duplicated for the seamless loop. */
export function Marquee({
  items,
  reverse = false,
  duration = 28,
  className,
  separator = '·',
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  separator?: string;
}) {
  const strip = (hidden: boolean) => (
    <div className="marquee-strip" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span className="marquee-item" key={i}>
          {it} <span className="marquee-sep">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className ?? ''}`}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      {strip(false)}
      {strip(true)}
    </div>
  );
}

/** Numbered section header with scroll-triggered reveal. */
export function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-head-inner', {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      });
      gsap.from('.rule', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="section-head" ref={ref}>
      <div className="section-head-inner">
        <p className="kicker">
          {index} / {kicker}
        </p>
        <h2 className="display">{title}</h2>
      </div>
      <div className="rule" />
    </div>
  );
}

/** Spec-sheet stat that counts up when it enters the viewport. */
export function StatCounter({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 1.6,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        el.textContent = `${Math.round(obj.n)}${suffix}`;
      },
    });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => tween.play(),
    });
    return () => {
      st.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <div className="stat">
      <span className="stat-value" ref={ref}>
        0{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
