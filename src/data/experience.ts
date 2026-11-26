// From 29-10-26/Professional Information GKK.txt. RamanIQ bullets are verbatim by rule.

export const experience = [
  {
    role: 'AI Engineer Intern',
    org: 'RamanIQ',
    note: 'AI startup',
    when: 'Aug – Oct 2026',
    points: [
      'Built REFEREE, an autonomous research-review product combining multi-agent orchestration and deterministic pipelines for paper analysis, experiment execution and evidence-backed verdicts, reaching ~87% accuracy on reproduction evaluations, with 185 kernel tests guarding its trust rules.',
      'Built a pipeline that collected and triaged 36K+ research papers from seven venues (including NeurIPS, ICML, ICLR, CVPR and ACL) and curated 380+ compute-feasible reproduction candidates that run on one consumer GPU, benchmarking selected findings against Hugging Face reproduction reports.',
      'Opened 20+ pull requests (12 merged) across the Polymath platform and a pharma-IP product, delivering data connectors, UI improvements and backend features in collaboration with the engineering team.',
    ],
    stack: 'Python · multi-agent orchestration · Docker · FastAPI · React · Next.js · Postgres',
  },
  {
    role: 'Tech Intern',
    org: 'Hecta Proptech',
    when: 'Jun – Jul 2026',
    points: [
      'Built a machine learning model that predicts which bank auction notices will reach auction, so reviewers can concentrate on the ones it flags: 84.3% ROC-AUC on notices later than any it trained on, and 80% less manual review.',
      'The model is a CatBoost classifier with calibrated probabilities, trained on 175K+ notices using bank, city, notice stage, dues, dates, past conversion rates and text embeddings.',
      'Took it to production: it is served through a Flask REST API on the company website used by 5K+ people a day.',
      'Built property re-auction models, from a CatBoost Cox survival model (0.79 C-index) to a CatBoost + LightGBM ensemble trained on 28,822 auction events across 13,222 properties, with a Flask inference API.',
      'Built the entire agentic layer of an AI scraper (LangGraph, Playwright, FastAPI, Celery): when no ready-made script fits a site, the agent has Gemini write the scraper configuration. With an automated, tested pipeline around it, manual data-collection effort fell by about 80%.',
      'Architected the initial hybrid RAG retrieval platform.',
    ],
    stack: 'Python · CatBoost · LightGBM · BGE embeddings · Flask · FastAPI · Celery · LangGraph · Playwright · hybrid RAG · Docker',
  },
  {
    role: 'Full Stack Engineering Intern',
    org: 'chkchk',
    href: 'https://chkchk.ai',
    when: 'Jan – Apr 2026',
    points: [
      'Sole full-stack engineer, reporting to the CTO, on a marketplace where artists show their work and apply to gigs, and agencies post gigs and run hiring. Took it from concept to a deployment-ready platform and wrote 66 of the 74 commits.',
      'Cut database calls by about 50%: merged two-step lookups into single join count queries and stopped reading rows back after inserts. This also lowered the Supabase (PostgreSQL) bill.',
      'Cut latency by about 30%: ran independent queries in parallel and fetched only the columns each page used. Loading skeletons and AVIF/WebP images also made pages feel faster.',
      'Set up Row Level Security in PostgreSQL, deployed with PM2 and nginx, shipped the Android app (Capacitor 8) with deep links and back-button handling, and led the Panzee → chkchk rebrand.',
    ],
    stack: 'Next.js 16 · React 19 · TypeScript · Supabase · AWS EC2 · Flutter · Capacitor',
  },
];

/** URL fragment for a role card: /experience#ramaniq */
export const anchor = (org: string) => org.toLowerCase().replace(/\W+/g, '-');

export const education = {
  extra: 'Aspire Leaders Program, Aspire Institute (founded at Harvard University), 2025.',
  degree: 'B.Tech, Computer Science Engineering',
  school: 'Geethanjali College of Engineering and Technology, Hyderabad',
  when: '2023 – 2027',
  scores: 'CGPA 7.16/10 after six semesters · GRE 335/340 (Quantitative 170/170) · TOEFL iBT 5.0/6 (CEFR C1)',
  coursework: 'Data Structures & Algorithms · Operating Systems · Database Management Systems · Computer Networks · Object-Oriented Programming · Discrete Mathematics · Software Engineering · Theory of Computation · Computer Architecture · Linear Algebra & Probability · Design & Analysis of Algorithms · Artificial Intelligence · Statistics for Machine Learning',
};
