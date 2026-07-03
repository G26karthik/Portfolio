import { Reveal } from '../components/ui';
import { VideoBg } from '../components/VideoBg';

const CAPS = [
  {
    title: 'Agentic Systems',
    desc: 'Multi-agent orchestration with evaluated, evidence-backed behavior.',
  },
  {
    title: 'Retrieval Pipelines',
    desc: 'Hybrid grounded RAG, tested against strict factuality evals.',
  },
  {
    title: 'Edge Inference',
    desc: 'Sub-10ms overhead on constrained, zero-cost infrastructure.',
  },
  {
    title: 'Full-Stack Delivery',
    desc: 'From data layer to interface, carried all the way to production.',
  },
];

export function Capabilities() {
  return (
    <section className="stage caps">
      <VideoBg src="/video/blackhole.mp4" fade />
      <div className="caps-top">
        <Reveal>
          <h2 className="section-h">
            Adaptive
            <br />
            Engineering
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="caps-para">
            The stack follows the problem. Agents when workflows need autonomy, retrieval when
            answers need grounding, edge inference when latency is the product.
          </p>
        </Reveal>
      </div>
      <div className="caps-grid">
        {CAPS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1} y={20}>
            <h3 className="cap-title">{c.title}</h3>
            <p className="cap-desc">{c.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
