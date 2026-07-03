import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { StatCounter } from '../components/ui';

gsap.registerPlugin(ScrollTrigger, SplitText);

const STATEMENT =
  'High-throughput AI infra, agents, retrieval, edge inference. Engineered end to end and ' +
  'measured at every step. Built for one thing: performance that survives contact with production.';

export function Specs() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      const split = new SplitText('.specs-statement', { type: 'words' });
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=130%',
          pin: '.specs-pin',
          scrub: 0.5,
        },
      })
        .from(split.words, {
          opacity: 0.1,
          stagger: 0.06,
          ease: 'none',
        })
        .from('.specs-stats', { y: 40, opacity: 0, duration: 1.2, ease: 'power2.out' }, '>-0.4');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="specs" className="specs" ref={root}>
      <div className="specs-pin">
        <p className="kicker">01 / SYSTEM SPECS</p>
        <p className="specs-statement">{STATEMENT}</p>
        <div className="specs-stats">
          <StatCounter value={13} label="merged PRs · pandas, matplotlib, mem0 +" />
          <StatCounter value={59} label="public repositories" />
          <StatCounter value={5} suffix="+" label="hackathon podiums" />
          <StatCounter value={20} suffix="+" label="certifications" />
        </div>
      </div>
    </section>
  );
}
