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
      'Built the notice-to-auction conversion model end to end (OCR text cleaning, GPU text embeddings, feature engineering, CatBoost, isotonic calibration, batch CLI and Flask REST API) on 175K+ auction notices, reaching 84.3% ROC-AUC on an out-of-time test set and cutting manual review by 80%.',
      'Took it to production: the model is served through the REST API on the company website used by 5K+ people a day.',
      'Built property re-auction models, from a CatBoost Cox survival model (0.79 C-index) to a CatBoost + LightGBM ensemble trained on 28,822 auction events across 13,222 properties, with a Flask inference API.',
      'Built the entire agentic layer of an AI scraper (LangGraph, Playwright, FastAPI, Celery) and an end-to-end automation pipeline with automated testing, cutting manual data-collection effort by about 80%.',
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
      'Sole full-stack engineer, reporting to the CTO, taking a creative-talent marketplace from concept to a deployment-ready platform.',
      '~50% fewer database calls and ~30% lower latency from restructured request pipelines and query execution, which also lowered Supabase (PostgreSQL) costs.',
      'Supabase Realtime and Row Level Security on every table; shipped the Android app (Capacitor 8) and led the Panzee → chkchk rebrand.',
      'Authored 66 of 74 commits in the product repo.',
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
