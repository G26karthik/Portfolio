// Products and tools without a page of their own. The five with full pages (REFEREE, AlgoSentinel, FounderOS,
// Buy or Wait?, Closer) live in src/content/work. Facts come from 29-10-26/ and sources/; only public
// repositories are linked (checked with `gh repo view --json isPrivate`).

export const roles = ['Agents & LLM', 'ML', 'Research', 'Systems', 'Full stack', 'Security'] as const;
export type Role = (typeof roles)[number];

const gh = (r: string) => `https://github.com/G26karthik/${r}`;

export interface Project {
  name: string;
  what: string; // what it does
  who: string; // who it is for
  fact: string; // the key result
  stack: string[];
  skills: string[];
  roles: Role[];
  repo: string;
  live?: string;
}

export const indexProjects: Project[] = [
  {
    name: 'Setu', what: 'Turns WhatsApp and SMS stock updates into shortage forecasts and transfer recommendations. A person approves every transfer.',
    who: 'District health teams coordinating medicine stock.', fact: 'Transportation solver with a deterministic fallback',
    stack: ['React', 'Firebase', 'Node.js', 'Python', 'Gemini', 'Twilio', 'PuLP', 'Cloud Run'], skills: ['Structured extraction', 'Optimization', 'Human-in-the-loop design'],
    roles: ['Full stack', 'Agents & LLM'], repo: gh('Sethu-AI'), live: 'https://setu-health-net.web.app',
  },
  {
    name: 'ParallaxOps', what: 'Reconstructs a 3D scene from 15–60 overlapping photographs with COLMAP on one laptop, then scores the geometry against ground truth.',
    who: 'Anyone who needs a measured 3D model from ordinary photographs, on their own machine.', fact: '0.31% camera position error vs ground truth · 199 tests',
    stack: ['Python', 'COLMAP', 'Temporal', 'Fastify', 'PostgreSQL', 'Next.js', 'Three.js'], skills: ['Structure from motion', 'Workflow orchestration', 'Systems reliability'],
    roles: ['Systems', 'ML'], repo: gh('parallaxops'),
  },
  {
    name: 'Nishchay', what: 'Decides which cash-on-delivery orders to flag for return-to-origin risk, pricing each decision in the merchant\'s own rupees.',
    who: 'Merchants who ship cash-on-delivery orders.', fact: '₹72.9L net vs the existing rule on 44,288 held-out orders',
    stack: ['Python', 'LightGBM', 'scikit-learn', 'FastAPI', 'React'], skills: ['Probability calibration', 'Conformal prediction', 'Cost-sensitive decisions'],
    roles: ['ML', 'Full stack'], repo: gh('Nishchay'),
  },
  {
    name: 'WhatsApp Notification Router', what: 'Decides, per user, whether each WhatsApp message (text, image poster or voice note) should notify, digest or mute, and cites why.',
    who: 'People whose WhatsApp never stops.', fact: '5-vote majority cut run-to-run variance from about 3 rows in 40 to 1.3',
    stack: ['Python', 'OpenAI', 'whisper-1', 'Pydantic', 'rank-bm25', 'pytest'], skills: ['LLM evaluation', 'Prompt-injection defense', 'Deterministic guardrails'],
    roles: ['Agents & LLM', 'Security'], repo: gh('whatsapp-notification-router'),
  },
  {
    name: 'Grounded Support Triage', what: 'Reads a support ticket, finds the answer in the product docs, checks the citations, then replies or escalates.',
    who: 'Support teams that want every automated reply grounded in their own documentation.', fact: '774-document corpus, 0–2 LLM calls for a typical ticket',
    stack: ['Python', 'LangGraph', 'Claude', 'Gemini', 'BM25', 'SentenceTransformers'], skills: ['LangGraph agents', 'Hybrid retrieval', 'Answer verification'],
    roles: ['Agents & LLM'], repo: gh('grounded-support-triage'),
  },
  {
    name: 'Avia', what: 'Scores insurance claims on Claim, Customer and Pattern risk with XGBoost and Isolation Forest, explains them with SHAP and reads documents with Gemini.',
    who: 'Fraud investigators and SIU teams.', fact: '3 risk dimensions, live on Vercel',
    stack: ['Python', 'FastAPI', 'React 19', 'XGBoost', 'Isolation Forest', 'SHAP', 'Gemini'], skills: ['Anomaly detection', 'Explainability', 'Document AI'],
    roles: ['ML', 'Full stack'], repo: gh('Avia'), live: 'https://avia-tau.vercel.app',
  },
  {
    name: 'EdgeSentinel', what: 'Bot detection on Cloudflare Workers that combines vector similarity, heuristics and LLM inference in a five-stage pipeline.',
    who: 'Sites that want bot filtering at the edge.', fact: 'sub-10ms request overhead',
    stack: ['TypeScript', 'Cloudflare Workers', 'Workers AI', 'Vectorize', 'Durable Objects'], skills: ['Edge computing', 'Vector search', 'Rate limiting'],
    roles: ['Security', 'Systems'], repo: gh('EdgeSentinel'),
  },
  {
    name: 'Sandbox Warm Pool Controller', what: 'A Kubernetes controller that keeps gVisor and Kata sandbox pods warm so a caller claims a ready pod atomically.',
    who: 'Platform teams running isolated sandboxes.', fact: 'removes 1–5 s cold starts',
    stack: ['Go', 'controller-runtime', 'CRDs', 'Prometheus'], skills: ['Kubernetes controllers', 'State machines', 'Observability'],
    roles: ['Systems'], repo: gh('sandbox-warm-pool-controller'),
  },
  {
    name: 'Forensic Evidence Indexer', what: 'A read-only C++17 CLI that inventories a file tree with streaming SHA-256, a bounded worker pool and duplicate detection.',
    who: 'Investigators who need a safe inventory of a large file tree.', fact: 'producer-consumer pipeline with backpressure',
    stack: ['C++17', 'CMake', 'OpenSSL', 'GitHub Actions'], skills: ['Concurrency', 'Systems programming', 'Defensive I/O'],
    roles: ['Systems', 'Security'], repo: gh('Forensic-Evidence-Indexer'),
  },
  {
    name: 'TraceWarrant', what: 'Checks whether OpenTelemetry traces support a performance model of an agent system, and reports UNKNOWN instead of guessing.',
    who: 'Teams that put performance numbers on agentic systems.', fact: '1.70% median p95 error, 8 held-out cells',
    stack: ['Python', 'OpenTelemetry', 'SimPy', 'PydanticAI'], skills: ['Evaluation design', 'Preregistration', 'Observability'],
    roles: ['Research', 'Agents & LLM'], repo: gh('tracewarrant'),
  },
  {
    name: 'KVQuant Lab', what: 'LLM KV-cache compression that extends TurboQuant with outlier-aware 2.5-bit quantization.',
    who: 'People serving LLMs under tight memory budgets.', fact: '4.65× compression, perplexity 4.68 vs 4.26',
    stack: ['Python', 'PyTorch', 'Transformers'], skills: ['Quantization', 'LLM inference', 'Research reproduction'],
    roles: ['Research', 'ML', 'Systems'], repo: gh('kvquant-lab'),
  },
  {
    name: 'Dual AI Assistant Benchmark', what: 'Compares an open-source assistant with a frontier one across safety and reliability suites, judged by a three-model panel.',
    who: 'Teams choosing between open and frontier assistants.', fact: '1,000 runs, 5 suites, 3-judge panel',
    stack: ['Python', 'Gradio', 'Hugging Face Spaces', 'OpenRouter'], skills: ['LLM-as-judge evaluation', 'Guardrails', 'Benchmarking'],
    roles: ['Agents & LLM', 'Research'], repo: gh('Dual-AI-Assistant-s-Benchmark'), live: 'https://huggingface.co/spaces/LuciferMrng/dual-ai-assistant-benchmark-oss',
  },
  {
    name: 'productionize', what: 'One production-readiness skill that runs across eight AI coding environments and writes an audited PRODUCTION_CHANGES.md.',
    who: 'Engineers who build with AI coding agents.', fact: '8 agent environments',
    stack: ['Markdown', 'agent skills', 'AGENTS.md'], skills: ['Agent tooling', 'Production readiness', 'Portable workflows'],
    roles: ['Agents & LLM'], repo: gh('skill-productionize'),
  },
];

/** Earlier work, kept on GitHub and listed in one line each. */
export const archive = [
  { name: 'Lumina', what: 'Hybrid FAISS + BM25 search with a content-hash embedding cache, ~90% faster re-indexing.', stack: 'Python, FastAPI, FAISS', repo: gh('Lumina-Search'), live: 'https://lumina-search.streamlit.app/' },
  { name: 'ParkSentinel', what: 'Parking enforcement intelligence over 115,400 violation records: HDBSCAN hotspots and Prophet forecasts.', stack: 'Python, DuckDB, Next.js, Deck.gl', repo: gh('ParkSentinel') },
  { name: 'SupplySentinel', what: 'Three-agent supply-chain risk monitor with a self-correcting confidence loop.', stack: 'Python, Gemini, Cloud Run', repo: gh('SupplySentinel') },
  { name: 'Dermatology Decision Support', what: 'EfficientNet-B0 on HAM10000 with Grad-CAM: 81% validation accuracy, 2.8× faster training.', stack: 'PyTorch, Streamlit', repo: gh('Skin-Disease') },
  { name: 'MindSafe', what: 'Privacy-first mental-health screening; a ZK circuit stores only a hash of the score.', stack: 'React 19, Gemini, Midnight', repo: gh('MindSafe') },
  { name: 'Lost & Found', what: 'Campus MERN platform with JWT auth and Cloudinary media, used by 200+ students.', stack: 'MongoDB, Express, React, Node.js', repo: gh('Lost-and-Found'), live: 'https://lost-and-found-rdjb.onrender.com' },
];
