import { archive } from '../data/archive';
import type { ArchiveCat } from '../data/archive';
import { Reveal } from '../components/ui';

const CAT_LABEL: Record<ArchiveCat, string> = {
  agents: 'Agents / AI',
  fullstack: 'Full-Stack',
  systems: 'Systems',
  research: 'Research',
};

export function IndexList() {
  return (
    <section id="index" className="section">
      <div className="section-inner">
        <Reveal className="section-head">
          <p className="label">Index</p>
          <h2 className="section-h">
            More systems.
            <br />
            Same standard.
          </h2>
        </Reveal>
        <div className="index-grid">
          {archive.map((item) => (
            <a className="index-row" key={item.name} href={item.url} target="_blank" rel="noreferrer">
              <span className="name">{item.name} ↗</span>
              <span className="cat">{CAT_LABEL[item.cat]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
