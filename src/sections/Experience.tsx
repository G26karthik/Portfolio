import { experience } from '../data/experience';
import { Reveal } from '../components/ui';

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <Reveal className="section-head">
          <p className="label">Experience</p>
          <h2 className="section-h">
            Where the reps
            <br />
            were earned.
          </h2>
        </Reveal>
        <div className="exp-list">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.08}>
              <div className="exp-card">
                <div className="exp-top">
                  <div>
                    <h3 className="exp-org">{e.org}</h3>
                    <p className="exp-role">{e.role}</p>
                  </div>
                  <span className="exp-period">{e.period}</span>
                </div>
                <ul className="exp-points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {e.stack && <p className="exp-stack">{e.stack}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
