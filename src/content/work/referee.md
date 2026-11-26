---
kind: product
title: "REFEREE"
kicker: "Built at RamanIQ · Claim verification for research papers"
hook: "Reads a research paper, lists its main claims, runs a test for each one and writes a two-page reviewer page: Verified, or Not verified with a reason."
users: "Reviewers and researchers who want a paper's claims checked against recorded runs. It assists a human reviewer and never decides a paper's fate."
year: 2026
order: 3
specimen: triage
field: "a paper's claims funnelling through tests to one reviewer page"
role: "AI Engineer Intern at RamanIQ"
metrics:
  - { value: "~87%", label: "Accuracy on reproduction evaluations" }
  - { value: "36K+", label: "Research papers collected and triaged from seven venues, including NeurIPS, ICML, ICLR, CVPR and ACL" }
  - { value: "380+", label: "Compute-feasible reproduction candidates curated from them, each runnable on one consumer GPU" }
  - { value: "185", label: "Kernel tests, each one built to fail if a trust guarantee breaks" }
skills: ["Agent orchestration", "Claim verification", "Reproducibility", "Sandboxed execution", "Systems design"]
stack: ["Python", "Multi-agent orchestration", "Docker"]
links: []
pipeline:
  - { name: "Read", detail: "Lists the paper's main claims" }
  - { name: "Test", detail: "Runs a test for each claim and records the run" }
  - { name: "Report", detail: "A reviewer page marks each claim Verified or Not verified, with a reason" }
next:
  - "Check more papers against public reproduction reports."
---

## What it does

A paper makes claims, and checking them by hand takes days. REFEREE reads the paper, lists its main claims and gives each one a test. Each test run is recorded. The reviewer page then says, for each claim, Verified or Not verified, with one specific reason. It is a first pass that a human reviewer can trust to be traceable, and it never accepts or declines a paper. I built it at RamanIQ as an AI Engineer Intern.

## How it is built

REFEREE pairs several LLM agents with deterministic pipelines. Every verdict links to the recorded run behind it.

## Results

REFEREE reached **~87% accuracy on reproduction evaluations**. To feed it, I built a pipeline that collected and triaged **36K+ research papers** from seven venues, including NeurIPS, ICML, ICLR, CVPR and ACL, and curated **380+ compute-feasible reproduction candidates** that run on one consumer GPU, then benchmarked selected findings against Hugging Face reproduction reports.

A suite of **185 kernel tests** guards its trust rules.

## What I took from it

A machine-written review is useful when a person can trace each decision back to evidence. Writing a test for every guarantee is how I kept that true while the product changed.
