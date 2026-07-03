import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { Reveal } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
        gsap.from(row, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="section" ref={root}>
      <div className="section-inner">
        <Reveal className="section-head">
          <p className="label">Selected Work</p>
          <h2 className="section-h">
            Six systems.
            <br />
            All measured.
          </h2>
        </Reveal>
        <div className="work-list">
          {projects.map((p, i) => (
            <article className="work-row" key={p.id}>
              <span className="work-idx">0{i + 1}</span>
              <div>
                <h3 className="work-name">
                  <a href={p.github} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                </h3>
                {p.award && <p className="work-award">{p.award}</p>}
                <p className="work-desc">{p.problem}</p>
                <p className="work-meta">
                  {p.metrics.join(' · ')} · {p.stack.join(' · ')}
                </p>
              </div>
              <div className="work-side">
                <span className="work-tag">{p.tag}</span>
                <div className="work-links">
                  <a href={p.github} target="_blank" rel="noreferrer">
                    GITHUB ↗
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      LIVE ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
