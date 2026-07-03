export interface Project {
  id: string;
  name: string;
  tag: string;
  award?: string;
  problem: string;
  metrics: string[];
  stack: string[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: 'algosentinel',
    name: 'AlgoSentinel',
    tag: 'Autonomous Agent',
    problem:
      'The regression that brings down production never fails a test. AlgoSentinel is an autonomous PR agent that profiles both versions of every changed function in a Docker sandbox, fits runtimes to complexity curves, and posts reviews backed by measured wall-clock evidence, not static analysis.',
    metrics: ['caught O(n) → O(n²) at R² = 0.99', '55 tools · 4 namespaces', '~89% eval accuracy · 25 tests'],
    stack: ['Python', 'FastAPI', 'Gemini', 'Docker'],
    github: 'https://github.com/G26karthik/AlgoSentinel',
  },
  {
    id: 'founderos',
    name: 'FounderOS',
    tag: 'Voice AI',
    award: '2nd Place · Ambient Intelligence Hackathon',
    problem:
      'A Voice AI Chief of Staff for solo founders: captures voice through Omi, fans it out to 4 parallel agents (decisions, tasks, ideas, patterns), stores everything in Qdrant with verified per-user isolation, and answers natural-language queries over your entire history.',
    metrics: ['92 tests · 84% coverage', '187k records/sec ingestion', 'perfect F1 · zero hallucinations in evals'],
    stack: ['Omi', 'Lyzr', 'Qdrant', 'FastAPI', 'Next.js', 'Redis', 'Celery'],
    github: 'https://github.com/G26karthik/FounderOS',
  },
  {
    id: 'triage',
    name: 'Grounded Support Triage',
    tag: 'Multi-Agent RAG',
    award: '#12 of 1,349 global · HackerRank Orchestrate',
    problem:
      'LangGraph multi-agent support triage where every reply is grounded in retrieved evidence or it does not go out. Hybrid BM25 + dense retrieval, domain specialists with mandatory citations, and a programmatic critic that verifies every hard fact.',
    metrics: ['zero pipeline errors', '0-2 LLM calls / ticket', 'AI judge interview: cleared'],
    stack: ['Python', 'LangGraph', 'Claude', 'Gemini'],
    github: 'https://github.com/G26karthik/grounded-support-triage',
  },
  {
    id: 'edgesentinel',
    name: 'EdgeSentinel',
    tag: 'Edge AI',
    problem:
      'Edge-native bot detection that classifies every HTTP request through a 5-stage ML cascade of vector fingerprinting, heuristics, and LLM fallback, running entirely on the Cloudflare free tier with zero external infrastructure.',
    metrics: ['sub-10ms request overhead', '5-stage detection cascade', '$0 infrastructure'],
    stack: ['TypeScript', 'Cloudflare Workers', 'Workers AI', 'Vectorize', 'Durable Objects'],
    github: 'https://github.com/G26karthik/EdgeSentinel',
  },
  {
    id: 'kvquant',
    name: 'KVQuant Lab',
    tag: 'LLM Research',
    problem:
      'Empirical study of LLM KV-cache compression extending TurboQuant (ICLR 2026): 8 quantization schemes across 12 benchmark suites, 9 paper theorems validated from first principles, and 6 original contributions documented in neither source paper.',
    metrics: ['4.65× compression', 'Recall@1 +73% (Adaptive QJL)', '100% NIAH recall @ 3.2×'],
    stack: ['Python', 'PyTorch', 'Transformers'],
    github: 'https://github.com/G26karthik/kvquant-lab',
  },
  {
    id: 'avia',
    name: 'Avia',
    tag: 'AI SaaS · Live',
    problem:
      'Insurance-fraud investigation SaaS scoring claims across three risk dimensions with an XGBoost + Isolation Forest ensemble, SHAP-interpretable decision traces, and multimodal Gemini document intake. Deployed and live.',
    metrics: ['3 risk scores · 0-100', 'SHAP decision traces', 'one-click SIU escalation'],
    stack: ['Python', 'FastAPI', 'React 19', 'XGBoost', 'Gemini'],
    github: 'https://github.com/G26karthik/Avia',
    live: 'https://avia-tau.vercel.app',
  },
];
