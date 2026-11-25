// Research shown on /research, the home page and the Ask corpus. Facts come from 29-10-26/ (updated 2026-11-25)
// and the master CV (sources/master-cv.txt); scripts/audit-content.mjs checks every number.

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
    status: 'Minor revision',
    venue: 'Journal paper',
    authors: 'G Karthik Koundinya (first author), Puja S Prasad (corresponding), Pankaj Kumar and Partha Pratim Roy',
    topics: ['Quantum ML', 'PennyLane', 'IBM Quantum', 'PyTorch'],
    abstract: [
      'The paper proves geometry conservation: a variational quantum classifier that encodes each input once only rotates the encoded states. Within-class variance and the overlaps between class means stay fixed during training, so the encoding fixes which class geometry training can reach.',
      'Conservation held to rounding error in all 56 single-instance runs at 4, 6 and 8 qubits, and a trained circuit was also run on two IBM quantum processors.',
      'Neural collapse shows up where a measurement can see it: the within-class variability of the measured outputs (NC1) ends below all 2000 untrained circuits per data seed, while a small circuit reaches 0.937 test accuracy on MNIST and 0.920 on Fashion-MNIST (three classes), comparable to classical baselines. Code will be released on acceptance.',
    ],
    links: [{ label: 'Read the case study', href: '/work/qnc/' }],
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
    kind: 'Research in progress',
    href: 'https://github.com/G26karthik/kvquant-lab',
    text: 'When does LLM KV-cache quantization actually work? This study in progress puts the TurboQuant (ICLR 2026) quantizers to the test on real attention heads, with one bit-accounting function and preregistered, logged runs. The theme matches the RAIT paper, low-bit quantization, but this one targets the KV cache and that one the weights.',
  },
  {
    name: 'TraceWarrant',
    kind: 'Evaluation research',
    href: 'https://github.com/G26karthik/tracewarrant',
    text: 'Do your traces support your performance claims? Median p95 error of 1.70% across 8 frozen held-out cells. Quality gates run before any performance modeling: when a real HotpotQA agent missed its preregistered gate (4/8 exact, F1 0.542), its performance study stayed locked instead of producing a number. That is the behavior the tool was built for.',
  },
];
