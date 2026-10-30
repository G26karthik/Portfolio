// From 29-10-26/Professional Information GKK.txt. RamanIQ bullets are verbatim by rule.

export const experience = [
  {
    role: 'Applied AI Engineer Intern',
    org: 'RamanIQ',
    note: 'AI startup',
    when: 'Aug – Oct 2026',
    points: [
      'Built REFEREE, an autonomous research-review product combining multi-agent orchestration and deterministic pipelines for paper analysis, experiment execution and evidence-backed verdicts; achieved ~87% accuracy on evals and tests.',
      'Screened 36K+ research papers across top venues (NeurIPS, ICML, ICLR, CVPR, ACL) and curated 380+ compute-feasible reproduction candidates by evaluating code and dataset availability, benchmarking selected findings against Hugging Face reproduction reports.',
      'Contributed 19+ pull requests across Polymath and Orbicular, delivering data connectors, UI improvements and backend features in collaboration with the engineering team.',
    ],
    stack: 'Python · multi-agent orchestration · Docker · FastAPI · React · Next.js · Postgres',
  },
  {
    role: 'Tech Engineer, AI and Backend',
    org: 'Hecta Proptech',
    when: 'Jun – Jul 2026',
    points: [
      'Built the preprocessing and feature pipeline behind a production REST API over 175K+ auction notices: CatBoost with GPU embeddings, 84.3% ROC-AUC, 80% less manual review.',
      'Shipped features to production serving 5K+ users per day.',
      'Trained a CatBoost Cox survival model (0.79 C-index) and deployed it behind a validated Flask inference API.',
      'Architected the initial hybrid RAG retrieval platform; co-built an AI scraping system that cut manual data collection ~80%.',
    ],
    stack: 'Python · CatBoost · GPU embeddings · Flask · Docker · hybrid RAG',
  },
  {
    role: 'Full Stack Engineering Intern',
    org: 'chkchk',
    href: 'https://chkchk.ai',
    when: 'Jan – Apr 2026',
    points: [
      'Sole full-stack engineer, reporting to the CTO, taking a creative-talent marketplace from concept to a deployment-ready platform.',
      '~50% fewer database calls and ~30% lower latency from restructured request pipelines and query execution.',
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
  coursework: 'Data Structures & Algorithms · Operating Systems · Database Management Systems · Computer Networks · Object-Oriented Programming · Discrete Mathematics · Software Engineering · Theory of Computation · Computer Architecture · Linear Algebra & Probability',
};
