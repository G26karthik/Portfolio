import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/experience';
import { SectionHeading } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.xp-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '.xp-wrap',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      });
      gsap.utils.toArray<HTMLElement>('.xp-row').forEach((row) => {
        gsap.from(row, {
          x: -28,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 82%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root}>
      <SectionHeading index="05" kicker="SEASON HISTORY" title="Experience" />
      <div className="xp-wrap">
        <div className="xp-line" aria-hidden="true" />
        {experience.map((x) => (
          <article className="xp-row" key={x.role + x.org}>
            <span className="xp-node" aria-hidden="true" />
            <header className="xp-head">
              <h3 className="xp-role">{x.role}</h3>
              <p className="xp-org">{x.org}</p>
              <p className="xp-period kicker">{x.period}</p>
            </header>
            <ul className="xp-points">
              {x.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {x.stack && <p className="xp-stack kicker">{x.stack}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
