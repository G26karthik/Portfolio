import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { marqueeRepos, ossStats, pullRequests } from '../data/oss';
import { Marquee, SectionHeading } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

export function OpenSource() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pr-row', {
        y: 26,
        opacity: 0,
        stagger: 0.05,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.pr-ledger', start: 'top 82%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="oss" ref={root}>
      <SectionHeading index="03" kicker="FIELD-PROVEN" title="Open Source" />
      <p className="oss-stats kicker">
        {ossStats.merged} MERGED · {ossStats.open} OPEN · {ossStats.repos} REPOSITORIES
      </p>
      <Marquee items={marqueeRepos} duration={26} className="oss-marquee display" />
      <ul className="pr-ledger">
        {pullRequests.map((pr) => (
          <li key={pr.url}>
            <a className="pr-row" href={pr.url} target="_blank" rel="noreferrer">
              <span className="pr-repo">{pr.repo}</span>
              <span className="pr-title">{pr.title}</span>
              <span className={`pr-pill pr-pill-${pr.status}`}>{pr.status}</span>
              <span className="pr-detail">{pr.detail}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
