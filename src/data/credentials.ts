// Placements are verified results (29-10-26 rules + UPDATES.md); state them plainly.
// The first four are featured on /achievements; the rest sit in a compact list.

export const placements = [
  { rank: '1st', of: '4,218 in Round 1', event: 'HackerRank Orchestrate, Oct 2026', note: 'About 50,000 registered.' },
  { rank: '38th', of: '32,000+ teams', event: 'Amazon ML Challenge 2026', note: 'Team lead. Invited to Amazon’s Applied Scientist Intern interview.' },
  { rank: '2nd', of: '', event: 'Ambient Intelligence Hackathon, May 2026', note: 'Prize for FounderOS, a voice-first AI chief of staff.' },
  { rank: '4th', of: 'in India', event: 'CodeChef, 6★, rating 2483', note: '28th globally.', href: 'https://www.codechef.com/users/g26karthikk' },
  { rank: '2,720', of: '', event: 'LeetCode Guardian', note: 'Top 0.06%, 575 of 888,637.', href: 'https://leetcode.com/u/G26KarthikK/' },
  { rank: 'Finalist', of: '', event: 'VoiceHack 2026, ML track', note: 'Call Quality Auto-Flagger.' },
] as { rank: string; of: string; event: string; note: string; href?: string }[];
export const featuredPlacements = 4;

/** "of 4,218 in Round 1" for counts, the text itself for anything else. */
export const ofText = (of: string) => (/^\d/.test(of) ? `of ${of}` : of);

/** Won or placed elsewhere (29-10-26 Professional Information, Hackathons). */
export const also = { rank: '5+', event: 'HiDevs, TRINIT, CodeCircuit and SmartBridge', note: 'Hackathons won or placed, in 24–48 hour builds.' };

// Certifications: 29-10-26/Professional Information GKK.txt, plus the previous portfolio's certifications.html
// (credential links). Curated for applied-AI hiring: six are featured, the rest sit in a collapsed list, and
// four off-topic or entry-level ones (IBM Web Development, Google IT Support, HackerRank Problem Solving,
// Cisco CCNA Introduction to Networks) are dropped. Aspire Leaders Program is an education line, not a certification.
// `logo` is a file in public/logos/ (simple-icons); `ini` draws an initials badge where none exists.
export const credly = 'https://www.credly.com/users/g26karthik';

export const issuers: { name: string; logo?: string; ini?: string; certs: { name: string; note?: string; href?: string }[] }[] = [
  {
    name: 'Microsoft', ini: 'MS',
    certs: [
      { name: 'AI-103: Designing and Implementing an Azure AI Solution' },
      { name: 'SQL AI Developer Associate', note: 'Exam DP-800: Developing AI-Enabled Database Solutions' },
      { name: 'Career Essentials in Generative AI', note: 'with LinkedIn', href: 'https://www.linkedin.com/learning/certificates/083a8c6ebaa5c94dd8948fff5e6e9d72a7a664dcf13c5ff33d26aa00aa630cbe' },
      { name: 'Orchestrating Multi-Agent Systems (Semantic Kernel)', note: 'Microsoft Learn' },
      { name: 'Developing RAG Pipelines with Azure AI Foundry', note: 'Microsoft Learn' },
      { name: 'Custom Tool Integration for AI Agents', note: 'Microsoft Learn' },
      { name: 'Azure OpenAI Service: Prompt Engineering, Document Intelligence, Vision & Speech', note: 'Microsoft Learn' },
    ],
  },
  {
    name: 'Oracle', logo: 'oracle',
    certs: [
      { name: 'OCI Generative AI Professional' },
      { name: 'OCI Developer Professional' },
      { name: 'OCI AI Foundations Associate' },
      { name: 'Associate Java Developer' },
    ],
  },
  {
    name: 'Stanford + DeepLearning.AI', ini: 'DL',
    certs: [
      { name: 'Machine Learning Specialization' },
      { name: 'Fine-Tuning Large Language Models', note: 'with Lamini', href: 'https://learn.deeplearning.ai/accomplishments/17236631-fc4c-4220-a5ae-e3e336ee1dcb' },
    ],
  },
  { name: 'Databricks', logo: 'databricks', certs: [{ name: 'Generative AI Fundamentals' }] },
  { name: 'MongoDB', logo: 'mongodb', certs: [{ name: 'Certified Associate Developer' }] },
  {
    name: 'Google', logo: 'google',
    certs: [
      { name: 'Building Real-World AI Applications with Gemini + Imagen', note: 'Cloud Skills Boost' },
      { name: 'Prompt Design in Vertex AI', note: 'Cloud Skills Boost' },
      { name: 'Full-Stack Application Development with Gemini APIs', note: 'Cloud Skills Boost' },
    ],
  },
  { name: 'AWS', ini: 'AWS', certs: [{ name: 'Generative AI: Art of the Possible' }] },
  { name: 'GitHub', logo: 'github', certs: [{ name: 'GitHub Foundations' }] },
  {
    name: 'IBM', ini: 'IBM',
    certs: [
      { name: 'DevOps and Software Engineering Specialization', note: 'Coursera', href: 'https://www.coursera.org/account/accomplishments/specialization/SRKQ4B85PSEU' },
      { name: 'Reinforcement Learning & Deep Learning Essentials', href: 'https://courses.cognitiveclass.ai/certificates/dcd99f780cdd43589a2ae0568cc681a9' },
    ],
  },
  { name: 'Hugging Face', logo: 'huggingface', certs: [{ name: 'NLP Course' }] },
];

/** The six that matter most for applied-AI roles: [issuer, certificate], each an entry in `issuers`. */
export const featuredCerts: [string, string][] = [
  ['Microsoft', 'AI-103: Designing and Implementing an Azure AI Solution'],
  ['Microsoft', 'SQL AI Developer Associate'],
  ['Oracle', 'OCI Generative AI Professional'],
  ['Stanford + DeepLearning.AI', 'Machine Learning Specialization'],
  ['Stanford + DeepLearning.AI', 'Fine-Tuning Large Language Models'],
  ['Databricks', 'Generative AI Fundamentals'],
];

export const certCount = issuers.reduce((n, i) => n + i.certs.length, 0);
