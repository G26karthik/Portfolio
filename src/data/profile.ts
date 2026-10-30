// Single source for identity, links and headline proof. Every number here is
// copied from 29-10-26/, UPDATES.md or the master CV in sources/ (verified 2026-10-29); scripts/audit-content.mjs checks them.

export const profile = {
  name: 'G. Karthik Koundinya',
  role: 'Applied AI Engineer and Researcher',
  location: 'Hyderabad, India',
  email: 'Karthikofficialmain@gmail.com',
  phone: '+91 82476 97251', // published with Karthik's consent, for recruiters
  tel: '+918247697251',
  line: 'I build AI systems that hold up on data they have never seen, and I research how LLMs and quantum models behave.',
  description:
    'Applied AI engineer and researcher in Hyderabad. 38th of 32,000+ teams at the Amazon ML Challenge 2026, three first-author papers on quantum ML, LLM quantization and coding-agent security, and 24 merged open-source PRs across 18 projects including PyTorch, pandas and mem0.',
};

export const links = {
  github: 'https://github.com/G26karthik',
  linkedin: 'https://www.linkedin.com/in/g-karthik26',
  leetcode: 'https://leetcode.com/u/G26KarthikK/',
  codechef: 'https://www.codechef.com/users/g26karthikk',
};

export const socials = [
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'LeetCode', href: links.leetcode },
  { label: 'CodeChef', href: links.codechef },
];

/** Headline results, most impressive first. */
export const proof = [
  { value: '#1', of: 'of 4,218', label: 'HackerRank Orchestrate, Oct 2026, Round 1', note: '~50,000 registered' },
  { value: '#38', of: 'of 32,000+ teams', label: 'Amazon ML Challenge 2026', note: 'team lead' },
  { value: '24', of: 'merged PRs', label: 'PyTorch, pandas, mem0, Hindsight +14 more', note: '338K+ combined stars' },
  { value: '3', of: 'first-author papers', label: 'Quantum ML, LLM quantization, agent security', note: 'In review or revision' },
];

/** What I'm doing right now. */
export const now = 'Ranked 1st of 4,218 in Round 1 of HackerRank Orchestrate (Oct 2026), revising my quantum-ML paper for Springer, with a quantization paper under review at RAIT 2027, and looking for applied AI and ML roles.';

export const about = [
  'I build AI systems end to end: agents, retrieval, ranking models and the infrastructure under them. I came to it as an engineer first, with a production REST API serving 5K+ users a day, a marketplace shipped as the only full-stack engineer, and fixes merged into PyTorch, pandas and mem0.',
  'Research is the other half. My first-author work covers quantum ML, low-bit quantization of Indic LLMs and leakage in coding agents. I write the hypothesis and the threshold down before I run the experiment, so the result means something when it comes in.',
];
