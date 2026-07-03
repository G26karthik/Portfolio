import { marqueeRepos, ossStats, pullRequests } from '../data/oss';
import { Reveal } from '../components/ui';

export function OpenSource() {
  return (
    <section id="oss" className="section">
      <div className="section-inner">
        <Reveal className="section-head">
          <p className="label">Field Proven · Open Source</p>
          <h2 className="section-h">
            {ossStats.merged} merged. {ossStats.open} open.
            <br />
            {ossStats.repos} repositories.
          </h2>
        </Reveal>
        <div>
          {pullRequests.map((pr) => (
            <a className="oss-row" key={pr.url} href={pr.url} target="_blank" rel="noreferrer">
              <div className="oss-main">
                <span className="oss-repo">{pr.repo}</span>
                <span className="oss-title">
                  {pr.title}. {pr.detail}
                </span>
              </div>
              <span className={`oss-status ${pr.status}`}>{pr.status}</span>
            </a>
          ))}
        </div>
        <p className="oss-repos-line">{marqueeRepos.join(' · ')}</p>
      </div>
    </section>
  );
}
