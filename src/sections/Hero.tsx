import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { scrollToTarget } from '../lib/scrollState';

gsap.registerPlugin(ScrollTrigger, SplitText);

function istTime() {
  return new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [time, setTime] = useState(istTime);

  useEffect(() => {
    const id = setInterval(() => setTime(istTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.set('.hero-inner', { autoAlpha: 1 });
      if (reduced) return;

      const split = new SplitText('.hero-name .hero-line', { type: 'chars' });
      const tl = gsap.timeline();
      tl.from(split.chars, {
        yPercent: 115,
        duration: 1.05,
        stagger: 0.028,
        ease: 'power4.out',
      })
        .from(
          '.hero-portrait',
          { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power4.inOut' },
          0.15,
        )
        .from(
          '.hero-strap > *, .hero-actions > *',
          { y: 26, autoAlpha: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out' },
          '-=0.7',
        )
        .from('.hero-meta', { autoAlpha: 0, duration: 0.8 }, '-=0.35');

      gsap.to('.hero-inner', {
        yPercent: -14,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom 45%',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="top" className="hero" ref={root}>
      <span className="hero-watermark" aria-hidden="true">
        Koundinya
      </span>
      <div className="hero-inner">
        <div className="hero-left">
          <p className="kicker hero-kicker">PORTFOLIO / 2026 · HYDERABAD, IN · {time} IST</p>
          <h1 className="display hero-name">
            <span className="hero-mask">
              <span className="hero-line">G. KARTHIK</span>
            </span>
            <span className="hero-mask">
              <span className="hero-line hero-line-accent">KOUNDINYA</span>
            </span>
          </h1>
          <div className="hero-strap">
            <span className="hero-role">SYSTEMS &amp; AI ENGINEER</span>
            <p className="hero-tagline">
              High-throughput AI infra, agents &amp; RAG. Engineered end to end, measured at every
              step, shipped to production.
            </p>
          </div>
          <div className="hero-actions">
            <button className="hero-btn hero-btn-primary" onClick={() => scrollToTarget('#work')}>
              VIEW WORK ↓
            </button>
            <a className="hero-btn" href="https://github.com/G26karthik" target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
            <a
              className="hero-btn"
              href="https://www.linkedin.com/in/g-karthik26"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN ↗
            </a>
            <a
              className="hero-btn"
              href="https://www.codechef.com/users/g26karthikk"
              target="_blank"
              rel="noreferrer"
            >
              CODECHEF ↗
            </a>
            <a
              className="hero-btn"
              href="https://leetcode.com/u/G26KarthikK/"
              target="_blank"
              rel="noreferrer"
            >
              LEETCODE ↗
            </a>
            <a className="hero-btn" href="mailto:Karthikofficialmain@gmail.com">
              EMAIL
            </a>
          </div>
          <div className="hero-meta">
            <span className="hero-avail kicker">
              <span className="hero-avail-dot" aria-hidden="true" />
              OPEN TO SDE / AI ENGINEER ROLES · 2026-27
            </span>
          </div>
        </div>

        <figure className="hero-portrait">
          <img src="/portrait.jpg" alt="Portrait of G. Karthik Koundinya" loading="eager" />
          <figcaption className="hero-portrait-caption kicker">
            GKK · SYSTEMS &amp; AI ENGINEER
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
