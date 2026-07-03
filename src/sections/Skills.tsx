import { skillRows } from '../data/skills';
import { Marquee, SectionHeading } from '../components/ui';

export function Skills() {
  return (
    <section id="skills" className="skills">
      <SectionHeading index="06" kicker="LOADOUT" title="Skills" />
      <div className="skill-rows">
        {skillRows.map((row, i) => (
          <div className="skill-row" key={row.label}>
            <span className="skill-label kicker">{row.label}</span>
            <Marquee
              items={row.items}
              reverse={i % 2 === 1}
              duration={34 - i * 3}
              separator="/"
              className="skill-marquee"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
