import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoBg } from '../components/VideoBg';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
      tl.fromTo('.manifesto-persp', { y: 60 }, { y: -120, ease: 'none', duration: 1 }, 0).fromTo(
        '.manifesto-text',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 0.2 },
        0.3,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" className="stage manifesto" ref={root}>
      <VideoBg src="/video/nebula.mp4" fade />
      <div className="manifesto-persp">
        <p className="manifesto-text">
          An engineering practice built on the architecture of measurement. Agents, retrieval
          pipelines, and edge models that ship with numbers attached. Claims become benchmarks.
          Benchmarks become evidence. Evidence goes to production.
        </p>
      </div>
    </section>
  );
}
