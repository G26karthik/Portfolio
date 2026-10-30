---
kind: product
title: "REFEREE"
kicker: "Built at RamanIQ · Claim verification for research papers"
hook: "Reads a research paper, lists its main claims, runs a test for each one in Docker and writes a two-page reviewer page: Verified, or Not verified with a reason."
users: "Reviewers and researchers who want a paper's claims checked against recorded runs. It assists a human reviewer and never decides a paper's fate."
year: 2026
order: 3
specimen: triage
field: "a paper's claims funnelling through Docker tests to one reviewer page"
role: "Applied AI Engineer Intern at RamanIQ"
metrics:
  - { value: "~87%", label: "Accuracy on evals and tests" }
  - { value: "36K+", label: "Research papers screened across NeurIPS, ICML, ICLR, CVPR and ACL, curating 380+ compute-feasible reproduction candidates" }
  - { value: "185", label: "Kernel tests, each one built to fail if a trust guarantee breaks" }
  - { value: "248", label: "Commits and 1.1 MB of Python and JavaScript in the repository" }
skills: ["Agent orchestration", "Claim verification", "Reproducibility", "Sandboxed execution", "Statistical decision rules", "Systems design"]
stack: ["Python", "Docker", "Claude Code workflows", "PyMuPDF", "Zenodo, DataCite and Hugging Face registries", "CUDA (when present)"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/referee" }
pipeline:
  - { name: "Read", detail: "Four reading lenses (overclaim, protocol, confound, contradiction) list the main claims; every quote a model gives must be found verbatim in the parsed PDF" }
  - { name: "Plan", detail: "A critic pass, then one test per main claim; public datasets are found through Zenodo, DataCite and Hugging Face" }
  - { name: "Run", detail: "Each test runs in a Docker container, experiment network off, checkout read-only, with command, image, commit and script hash recorded" }
  - { name: "Reconcile", detail: "Results are compared with the printed number using Student-t, exact binomial and sign tests, after checking that seeded replicates measure different things" }
  - { name: "Report", detail: "A two-page reviewer page whose decisions are computed from the ledger; model-written prose appears only if every status word, quote and number is backed by the record" }
next:
  - "Compare more sealed reviews with Hugging Face's reproduction records, using the existing reference command that attaches another record after the decisions are sealed."
  - "Spread claims across several GPUs: each claim already gets its own slot, and a check interrupted by a GPU out-of-memory is resumed."
---

## What it does

A paper makes claims, and checking them by hand takes days. REFEREE reads the paper, lists its main claims and gives each one a test. Each test runs in Docker and is recorded. The reviewer page then says, for each claim, Verified or Not verified, with one specific reason. It is a first pass that a human reviewer can trust to be traceable, and it never accepts or declines a paper. I built it at RamanIQ as an Applied AI Engineer Intern.

## How it is built

REFEREE combines multi-agent orchestration with a deterministic harness. Isolated Claude Code workers, one fresh context per task, do the reading, planning and script writing. The harness decides everything that matters. A model supplies a quote and the harness re-finds it in the parsed text, and a model's own status or verdict fields are never copied. Whether a task finished is read back from the harness's task list, not from the worker.

Execution is sealed. Every process runs in a Linux container with the experiment's network off and the authors' checkout mounted read-only, and each run leaves a record of the command, image, commit, script hash, timestamps, exit code and output. A result is then compared with the number the paper printed by arithmetic, not judgment: Student-t intervals for small samples, an exact binomial interval for counted trials, and an exact sign test that needs six replicates to reach 95%. The harness also checks that seeded replicates truly measure different things before it counts them as replicates.

Acquisition is careful too. Discovery finds public datasets a paper names but does not link, and the fetcher classifies every failure and validates content before it enters an experiment. A review continues after any stop, and one command lists everything unfinished with the arguments to resume it.

The reviewer page runs to about two pages. Each decision is computed from the ledger, and model-written explanations are published only when every status word is earned by a cited check, every quote is in the paper and every number is in the record. Another reproduction record, such as a Hugging Face logbook, is shown beside each claim after the decisions are sealed, and it never changes one.

## Results

REFEREE reached **~87% accuracy on evals and tests**. Beside it, I screened **36K+ research papers** across NeurIPS, ICML, ICLR, CVPR and ACL and curated **380+ compute-feasible reproduction candidates** by checking code and dataset availability, then benchmarked selected findings against Hugging Face reproduction reports.

The repository holds **248 commits** and **1.1 MB** of Python and JavaScript. A suite of **185 kernel tests** pins the trust guarantees, such as quotes resolving uniquely or not at all, printed numbers matching as standalone tokens and a refused run reconciling nothing.

## What I took from it

Put the judgment in code and give the model the reading. Because decisions come from recorded runs, every Verified or Not verified can be traced to a command, an image and a commit, and that is what makes a machine-written review something a person can rely on.

It also taught me to treat every guarantee as a test. The kernel suite exists so that each rule, from verbatim quotes to the six-replicate sign test, fails loudly the moment a change breaks it.
