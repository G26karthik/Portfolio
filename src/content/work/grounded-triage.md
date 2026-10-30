---
kind: product
title: "Grounded Support Triage"
kicker: "HackerRank Orchestrate, May 2026 · Multi-agent RAG"
hook: "Reads a support ticket, finds the answer in the product docs, checks the citations, then replies or escalates."
users: "Support teams that want every automated reply grounded in their own documentation, with a human for anything the docs do not cover."
placement: "12th of 1,349 participants with all four submissions"
year: 2026
order: 6
specimen: triage
field: "a 774-document corpus funnelling to one grounded answer"
role: "Solo · 24-hour build"
metrics:
  - { value: "12th", label: "Place of 1,349 participants with all four submissions, HackerRank Orchestrate May 2026 (12,885 registered, 48 countries)" }
  - { value: "774", label: "Documents in the retrieval corpus across HackerRank, Claude and Visa support" }
  - { value: "0–2", label: "LLM calls for a typical ticket, thanks to regex fast paths" }
skills: ["LangGraph agents", "Hybrid retrieval and reranking", "Answer verification", "Latency and cost control"]
stack: ["Python", "LangGraph", "Claude", "Gemini", "BM25", "SentenceTransformers", "bge-small-en-v1.5"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/grounded-support-triage" }
pipeline:
  - { name: "Classify", detail: "Regex fast paths and structured routing before any LLM call" }
  - { name: "Retrieve", detail: "BM25 plus bge-small-en-v1.5 dense embeddings over 774 documents" }
  - { name: "Rerank", detail: "Cross-encoder reranking of the retrieved candidates" }
  - { name: "Verify", detail: "Deterministic critic checks citations and hard facts" }
  - { name: "Respond", detail: "Reply with grounded citations, or escalate" }
next:
  - "Publish an accuracy figure from a held-out labeled ticket set, using the evaluation CLI that already exists."
  - "Extend the critic from citation and hard-fact checks to claim-level support checks."
  - "Carry the hold-out discipline from my later builds back into this one."
---

## What it does

A support ticket either has an answer in the product documentation or it needs a human. A bot that guesses wrong in either direction does damage: it invents an answer, or it escalates something the docs already cover. HackerRank Orchestrate's first edition (May 2026), a 24-hour build where the challenge itself is agentic AI, asked for a system that triages tickets across HackerRank, Claude and Visa support corpora. Entries were judged on output accuracy against hidden labels, code quality, the AI-collaboration chat transcript and a 30-minute AI-judge voice interview.

## How it is built

A LangGraph multi-agent pipeline with four jobs: classify, retrieve, verify, then reply or escalate. Every ticket leaves a traceable execution flow, so a wrong answer can be followed back to the step that produced it.

Classification starts cheap. Regex fast paths and structured routing handle the common shapes of ticket without a model, which keeps a typical ticket at **0–2 LLM calls**. That helps latency and cost, and it leaves fewer places where a model can go wrong.

Retrieval is hybrid over a **774-document** corpus. BM25 catches exact product terms, dense embeddings (`bge-small-en-v1.5`) catch paraphrases, and a cross-encoder reranks the candidates.

The part I care most about is the critic. Before a reply goes out, a deterministic layer checks its citations and hard facts against the retrieved documents and blocks answers they do not support. The LLM steps use Claude and Gemini, but the final gate is code.

I also built an evaluation CLI, tracing and observability tooling, so I could see where tickets went during the build rather than after it.

## Results

**12th place** of 1,349 participants with all four submissions (12,885 registered from 48 countries). Typical tickets ran at 0–2 LLM calls.

## What I took from it

Checks belong around the model, in code, not inside the prompt. The critic is a small amount of deterministic code, and it is what made a generated reply safe enough to send.

Not every ticket needs an LLM. Routing the easy cases with regex made the system cheaper and easier to debug, and it kept the model budget for the tickets that needed it.

This was my first Orchestrate. The same idea, code around the model and a closed check before output, became the "signals, never verdicts" design of my August entry. The hold-out discipline came later, from the post-mortem on my August entry.
