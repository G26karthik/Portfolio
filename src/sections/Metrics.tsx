import { Reveal } from '../components/ui';
import { VideoBg } from '../components/VideoBg';

const METRICS = [
  { value: '13', label: 'Merged PRs into pandas, matplotlib, sqlfluff, mem0' },
  { value: '187k', label: 'Records per second, streaming ingestion' },
  { value: '4.65x', label: 'KV-cache compression, validated in KVQuant Lab' },
];

export function Metrics() {
  return (
    <section id="metrics" className="stage metrics">
      <VideoBg src="/video/nebula.mp4" fade />
      <div className="metrics-inner">
        <Reveal className="metrics-label">
          <p className="label">Measured Performance</p>
        </Reveal>
        <div className="metrics-grid">
          {METRICS.map((m, i) => (
            <Reveal key={m.value} delay={i * 0.15} className="metric">
              <span className="metric-value">{m.value}</span>
              <p className="metric-label">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
