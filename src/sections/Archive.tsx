import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { archive, archiveCats, type ArchiveCat } from '../data/archive';
import { SectionHeading } from '../components/ui';

gsap.registerPlugin(Flip);

export function Archive() {
  const [cat, setCat] = useState<'all' | ArchiveCat>('all');
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const onFilter = (next: 'all' | ArchiveCat) => {
    if (next === cat || !grid.current) return;
    flipState.current = Flip.getState(grid.current.querySelectorAll('.archive-item'));
    setCat(next);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.55,
      ease: 'power2.inOut',
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.3 }),
    });
    flipState.current = null;
  }, [cat]);

  return (
    <section id="archive">
      <SectionHeading index="04" kicker="FULL INVENTORY" title="Archive" />
      <div className="archive-filters" role="tablist" aria-label="Filter archive">
        {archiveCats.map((c) => (
          <button
            key={c.id}
            className={`archive-filter ${cat === c.id ? 'archive-filter-active' : ''}`}
            onClick={() => onFilter(c.id)}
            role="tab"
            aria-selected={cat === c.id}
          >
            {c.label}
          </button>
        ))}
      </div>
      <ul className="archive-grid" ref={grid}>
        {archive.map((item) => (
          <li
            key={item.name}
            className={`archive-item ${cat !== 'all' && item.cat !== cat ? 'archive-hidden' : ''}`}
            data-flip-id={item.name}
          >
            <a className="archive-link" href={item.url} target="_blank" rel="noreferrer">
              <span className="archive-name">{item.name}</span>
              <span className="archive-desc">{item.desc}</span>
              <span className="archive-meta kicker">
                {item.lang} <span className="archive-arrow">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a className="archive-more kicker" href="https://github.com/G26karthik?tab=repositories" target="_blank" rel="noreferrer">
        ALL 59 REPOSITORIES ON GITHUB ↗
      </a>
    </section>
  );
}
