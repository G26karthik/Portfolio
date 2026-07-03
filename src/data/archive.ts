export type ArchiveCat = 'agents' | 'fullstack' | 'systems' | 'research';

export const archiveCats: { id: ArchiveCat | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'agents', label: 'Agents / AI' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'systems', label: 'Systems' },
  { id: 'research', label: 'Research' },
];

export interface ArchiveItem {
  name: string;
  desc: string;
  cat: ArchiveCat;
  lang: string;
  url: string;
}

export const archive: ArchiveItem[] = [
  {
    name: 'SupplySentinel',
    desc: '3-agent autonomous supply-chain risk monitor with a self-correcting confidence loop',
    cat: 'agents',
    lang: 'Python',
    url: 'https://github.com/G26karthik/SupplySentinel',
  },
  {
    name: 'Dual AI Benchmark',
    desc: 'OSS vs frontier assistant evaluation — 1,000 runs, 3-judge LLM panel, live on HF Spaces',
    cat: 'research',
    lang: 'Python',
    url: 'https://github.com/G26karthik/Dual-AI-Assistant-s-Benchmark',
  },
  {
    name: 'ParkSentinel',
    desc: '115,400 parking violations → HDBSCAN hotspots + Prophet forecasts for Bengaluru Traffic Police',
    cat: 'agents',
    lang: 'Python · TS',
    url: 'https://github.com/G26karthik/ParkSentinel',
  },
  {
    name: 'Sandbox Warm Pool Controller',
    desc: 'Kubernetes CRD controller pre-warming gVisor/Kata pods — kills 1–5s cold starts',
    cat: 'systems',
    lang: 'Go',
    url: 'https://github.com/G26karthik/sandbox-warm-pool-controller',
  },
  {
    name: 'MindSafe',
    desc: 'Privacy-first mental-health screening dApp — VoiceHack 2026 privacy-track winner',
    cat: 'fullstack',
    lang: 'TypeScript',
    url: 'https://github.com/G26karthik/MindSafe',
  },
  {
    name: 'Supply-Chain-Auditor-Env',
    desc: 'Deterministic eval environment for AI security agents — CVE lookup, SBOM, typosquats',
    cat: 'research',
    lang: 'Python',
    url: 'https://github.com/G26karthik/Supply-Chain-Auditor-Env',
  },
  {
    name: 'Lumina Search',
    desc: 'Hybrid FAISS + BM25 retrieval engine with a content-hash cache — ~90% faster re-indexing',
    cat: 'systems',
    lang: 'Python',
    url: 'https://github.com/G26karthik/Lumina-Search',
  },
  {
    name: 'StreamCore',
    desc: 'OTT adaptive-bitrate session manager on Java 21 virtual threads + Redis hysteresis',
    cat: 'systems',
    lang: 'Java',
    url: 'https://github.com/G26karthik/StreamCore---Adaptive-Bitrate-Session-Manager',
  },
  {
    name: 'AI Network Traffic Shaper',
    desc: 'Real-time packet classifier (80–90% acc) driving automated Windows QoS enforcement',
    cat: 'systems',
    lang: 'Python',
    url: 'https://github.com/G26karthik/AI-Network-Traffic-Shaper',
  },
  {
    name: 'PinPoint AI',
    desc: 'Last-mile delivery app — pin-drop addressing, race-safe agent claiming, Gemini navigation',
    cat: 'fullstack',
    lang: 'Flutter',
    url: 'https://github.com/G26karthik/Pin-Point-New-Gen-Logistics-App',
  },
  {
    name: 'Nexus Feed',
    desc: 'AI daily digest with chain-of-thought summarization and lateral topic expansion',
    cat: 'fullstack',
    lang: 'TypeScript',
    url: 'https://github.com/G26karthik/Nexus-Feed',
  },
  {
    name: 'VectorCart',
    desc: 'RAG shopping assistant — PgVector similarity + Gemini embeddings over scraped catalogs',
    cat: 'agents',
    lang: 'Python',
    url: 'https://github.com/G26karthik/VectorCart',
  },
  {
    name: 'Skin-Disease DSS',
    desc: 'EfficientNet-B0 on HAM10000 — 81% val accuracy, Grad-CAM, <50ms inference',
    cat: 'research',
    lang: 'Python',
    url: 'https://github.com/G26karthik/Skin-Disease',
  },
  {
    name: 'Voice-to-Notes',
    desc: 'Lecture audio → notes, flashcards, MCQs — GPU Whisper with VAD, ~80% faster',
    cat: 'agents',
    lang: 'Python',
    url: 'https://github.com/G26karthik/voice',
  },
  {
    name: 'Fog4Det',
    desc: 'Real-time vehicle fog detection at ~100ms/frame, 20+ FPS sustained OpenCV pipeline',
    cat: 'fullstack',
    lang: 'Python · TS',
    url: 'https://github.com/G26karthik/Fog-Detection-System-for-Vehicles',
  },
  {
    name: 'Lost & Found',
    desc: 'Campus MERN platform used by 200+ students — JWT auth, Cloudinary media',
    cat: 'fullstack',
    lang: 'JavaScript',
    url: 'https://github.com/G26karthik/Lost-and-Found',
  },
  {
    name: 'UML Designer AI',
    desc: 'Code / natural language → UML diagrams across 4 languages, 3-service architecture',
    cat: 'fullstack',
    lang: 'Python · JS',
    url: 'https://github.com/G26karthik/UML-Designer',
  },
  {
    name: 'AI Interview Assistant',
    desc: 'Client-side resume parsing + timed streaming LLM interviews — zero backend',
    cat: 'fullstack',
    lang: 'JavaScript',
    url: 'https://github.com/G26karthik/AI-Interview-Assistant',
  },
];
