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
    label: 'Backend / Full-Stack',
    items: [
      'FastAPI',
      'Node.js',
      'Next.js',
      'React',
      'Flask',
      'Spring Boot',
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
