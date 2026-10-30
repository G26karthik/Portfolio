// Research shown on /research, the home page and the Ask corpus. Facts come from the QNC case study,
// 29-10-26/ and the master CV (sources/master-cv.txt); scripts/audit-content.mjs checks every number.

export interface Paper {
  id: string;
  title: string;
  status: string;
  venue: string;
  authors: string;
  topics: string[];
  abstract: string[];
  links: { label: string; href: string }[];
}

export const papers: Paper[] = [
  {
    id: 'qnc',
    title: 'Geometry Conservation in Variational Quantum Classifiers and Where Neural Collapse Can Appear',
    status: 'Major revision',
    venue: 'Quantum Machine Intelligence (Springer), submitted Aug 2026',
    authors: 'G Karthik Koundinya (first author, GCET), Puja S Prasad (corresponding) and Partha Pratim Roy, IIT (ISM) Dhanbad',
    topics: ['Quantum ML', 'PennyLane', 'IBM Quantum', 'PyTorch'],
    abstract: [
      'Earlier work proved that variational quantum classifiers reach Neural Collapse at the static optimum. I asked whether collapse emerges during training, and found that it does by an exact rotation, not a contraction: training conjugates every state by one global unitary.',
      'The rotation result holds to machine precision (~10⁻¹⁵ relative change) at 4, 6 and 8 qubits, on MNIST and Fashion-MNIST under two encodings, across a second optimizer and ansatz family, and on two IBM quantum backends. A matched classical MLP does the opposite: within-class scatter grows 27–163×.',
      'The study ran as preregistered science: 52 predictions across 10 stages, every threshold committed before its metric was computed, on a frozen spec with 173+ tests.',
    ],
    links: [{ label: 'Read the case study', href: '/work/qnc/' }, { label: 'Paper and code', href: 'https://github.com/G26karthik/QNC' }],
  },
  {
    id: 'rait',
    title: 'Language-Aware Calibration and Bit Allocation for Low-Bit Quantization of Indic Language Models',
    status: 'Under review',
    venue: 'RAIT 2027, IIT (ISM) Dhanbad',
    authors: 'G Karthik Koundinya (first author), with co-authors',
    topics: ['LLM quantization', 'GPTQ', 'Llama-3.2', 'Qwen2.5', 'Sarvam-1'],
    abstract: [
      'Quantization is what lets LLMs run on the 8GB-class GPUs and phones common in India, but its cost is not shared equally across languages. English-calibrated 3-bit GPTQ raises bits per byte 2.05× on Indic text against 1.15× on English (Llama-3.2-1B).',
      'A 2 × 2 design separates the language that decides where bits go from the language that calibrates the quantizer, with random-allocation controls and seed-level confidence intervals. Balanced English and Indic calibration cuts the Indic degradation ratio from 2.05 to 1.38 at a small English cost (1.15 to 1.19).',
      'The proposed allocator, SAMP-Q, adds gains on five of six models from 1B to 7B parameters. On Qwen2.5-3B the sensitivity estimates are dominated by outliers, which marks where the next version should focus.',
    ],
    links: [],
  },
  {
    id: 'canarycode',
    title: 'CANARYCODE: Benchmarking and Mitigating Sensitive-Data Leakage in LLM Coding Agents',
    status: 'Under revision',
    venue: 'Distributed Artificial Intelligence (DAI) 2026, AI Paper Track',
    authors: 'G Karthik Koundinya (first author)',
    topics: ['LLM agent security', 'Python', 'Presidio', 'statsmodels'],
    abstract: [
      'A benchmark of ten coding-agent tasks, each seeded with format-valid, checksum-valid, never-issued synthetic identifiers and paired with a test oracle that separates real task success from leakage, under benign and indirect prompt-injection conditions.',
      'Across 786 completed runs on three open-weight models, leakage was measured on eight output surfaces and compared with six third-party detectors and an LLM judge.',
      'The paper also introduces a two-layer, oracle-free mitigation and evaluates it against a matched control arm, with its reduction target preregistered before any run.',
    ],
    links: [],
  },
];

export const notes = [
  {
    name: 'KVQuant Lab',
    kind: 'Systems research',
    href: 'https://github.com/G26karthik/kvquant-lab',
    text: '4.65× KV-cache compression at near-baseline perplexity. An outlier-aware 2.5-bit extension of TurboQuant (ICLR 2026): 5664 KB → 957 KB, perplexity 4.68 vs 4.26. Adaptive QJL lifts Recall@1 from 38.8% to 67.4%, and MC-TurboQuant reaches 100% needle-in-a-haystack recall at 3.2× compression. A paper is in preparation. The theme matches the RAIT paper, low-bit quantization, but this one targets the KV cache and that one the weights.',
  },
  {
    name: 'TraceWarrant',
    kind: 'Evaluation research',
    href: 'https://github.com/G26karthik/tracewarrant',
    text: 'Do your traces support your performance claims? Median p95 error of 1.70% across 8 frozen held-out cells. Quality gates run before any performance modeling: when a real HotpotQA agent missed its preregistered gate (4/8 exact, F1 0.542), its performance study stayed locked instead of producing a number. That is the behavior the tool was built for.',
  },
];
