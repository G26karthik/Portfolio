const ITEMS = [
  'CodeChef 2483 ★6 — #6 India · #76 global',
  'LeetCode 2665 · Guardian — top ~0.1% globally',
  'Aspire Leaders Program — Aspire Institute, founded at Harvard',
  'B.Tech CSE · Geethanjali College of Engineering & Technology · 2023–2027',
  '20+ certifications — MongoDB · Oracle · Stanford ML · DeepLearning.AI · IBM',
];

export function OffClock() {
  return (
    <section id="offclock" className="offclock">
      <p className="kicker">07 / OFF THE CLOCK</p>
      <p className="offclock-note">The stats that stay out of the headline.</p>
      <ul className="offclock-list">
        {ITEMS.map((it) => (
          <li className="offclock-item" key={it}>
            {it}
          </li>
        ))}
      </ul>
    </section>
  );
}
