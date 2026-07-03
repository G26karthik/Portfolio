import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { Magnetic, Scramble, SectionHeading } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const modules = gsap.utils.toArray<HTMLElement>('.module');
      modules.forEach((mod, i) => {
        const card = mod.querySelector('.module-card');
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: mod, start: 'top 78%' },
        });
        // as the next module arrives, this one recedes into depth —
        // scale + brightness only, never opacity: cards must stay readable
        if (i < modules.length - 1) {
          gsap.fromTo(
            card,
            { filter: 'brightness(1)', scale: 1 },
            {
              scale: 0.965,
              filter: 'brightness(0.82)',
              transformOrigin: 'center top',
              ease: 'none',
              scrollTrigger: {
                trigger: modules[i + 1],
                start: 'top 85%',
                end: 'top 12%',
                scrub: true,
              },
            },
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root}>
      <SectionHeading index="02" kicker="FLAGSHIP WORK" title="Projects" />
      <div className="modules">
        {projects.map((p, i) => (
          <article className="module" key={p.id}>
            <div className="module-card">
              <span className="module-index display" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <header className="module-head">
                <span className="module-tags">
                  <span className="module-tag kicker">{p.tag}</span>
                  {p.award && <span className="module-award kicker">{p.award}</span>}
                </span>
                <div className="module-links">
                  <Magnetic strength={0.25}>
                    <a className="module-link" href={p.github} target="_blank" rel="noreferrer">
                      GITHUB ↗
                    </a>
                  </Magnetic>
                  {p.live && (
                    <Magnetic strength={0.25}>
                      <a className="module-link module-link-live" href={p.live} target="_blank" rel="noreferrer">
                        LIVE ↗
                      </a>
                    </Magnetic>
                  )}
                </div>
              </header>
              <h3 className="display module-name">
                <Scramble text={p.name} />
              </h3>
              <p className="module-problem">{p.problem}</p>
              <ul className="module-metrics">
                {p.metrics.map((m) => (
                  <li className="module-metric" key={m}>
                    {m}
                  </li>
                ))}
              </ul>
              <footer className="module-stack kicker">{p.stack.join(' · ')}</footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
