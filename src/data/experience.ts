export interface Experience {
  role: string;
  org: string;
  period: string;
  points: string[];
  stack?: string;
}

export const experience: Experience[] = [
  {
    role: 'Tech Intern · AI & Backend',
    org: 'Hecta',
    period: 'Jun 2026 - Present',
    points: [
      'Engineering high-throughput RAG retrieval systems and backend data-scaling infrastructure.',
      'Architected and co-developed a production agent end to end; now driving ML pipelining and prediction workstreams.',
      'Designed a DAG pipeline architecture adopted by the team for parallel build-out.',
    ],
    stack: 'Python · RAG · ML Pipelines · Backend Infra',
  },
  {
    role: 'Full Stack Engineering Intern',
    org: 'Stealth Startup',
    period: 'Jan-Apr 2026',
    points: [
      'Sole full-stack engineer. Architected a scalable social platform from concept to deployment-ready.',
      '~50% fewer database calls and ~30% latency improvement from restructured request pipelines.',
      'Led a 0 to 1 platform migration and real-time systems on Supabase + AWS EC2.',
    ],
    stack: 'Next.js · Node.js · TypeScript · Supabase · PostgreSQL · AWS',
  },
  {
    role: 'Open Source Contributor',
    org: 'pandas · matplotlib · sqlfluff · mem0 · sktime +',
    period: 'Oct 2025 - Present',
    points: [
      '13 merged and 2 open PRs across 11 repositories, including tier-1 data-science libraries.',
      'Parser features, memory-leak fixes, vector-store integrations and regression tests.',
    ],
  },
  {
    role: 'AI & Frontend Development Intern',
    org: 'Edunet Foundation',
    period: 'Aug-Oct 2025',
    points: [
      'Built an AI lecture audio-to-notes generator (Whisper + T5 + DistilBART) for 60+ minute lectures.',
      '~80% inference-efficiency improvement via GPU-accelerated Whisper with caching.',
    ],
    stack: 'Python · PyTorch · Whisper · React',
  },
  {
    role: 'Web Development & SEO Intern',
    org: 'Badakarobar',
    period: 'Mar-Jun 2025',
    points: [
      '~45% Lighthouse performance improvement across responsive landing pages.',
      'Automated sitemap generation with Python, eliminating a recurring manual workflow.',
    ],
  },
];
