export interface SkillRow {
  label: string;
  items: string[];
}

export const skillRows: SkillRow[] = [
  {
    label: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Go', 'C++', 'SQL', 'Dart'],
  },
  {
    label: 'AI / ML',
    items: [
      'PyTorch',
      'LangGraph',
      'LangChain',
      'Transformers',
      'Whisper',
      'FAISS',
      'scikit-learn',
      'TensorFlow',
      'Semantic Kernel',
    ],
  },
  {
    label: 'Full-Stack',
    items: [
      'Next.js',
      'React',
      'Node.js',
      'FastAPI',
      'Flask',
      'Spring Boot',
      'Flutter',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    label: 'Cloud / DevOps',
    items: [
      'AWS',
      'Google Cloud Run',
      'Cloudflare Workers',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Redis',
      'Prometheus',
    ],
  },
];
