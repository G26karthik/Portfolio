---
kind: product
title: "WhatsApp Notification Router"
kicker: "HackerRank Orchestrate, Aug 2026 · LLM routing"
hook: "Decides, per user, whether each WhatsApp message (text, image poster or voice note) should notify, digest or mute, and cites why."
users: "People whose WhatsApp never stops: each message is routed to notify now, hold for a digest, or mute, with a reason and the evidence behind it."
placement: "20th of 1,983 submissions"
year: 2026
order: 4
specimen: router
field: "one message stream splitting into notify, digest and mute"
role: "Solo · 24-hour build"
metrics:
  - { value: "20", label: "Rank out of 1,983 submissions; final score 78.3/100" }
  - { value: "37/40", label: "Rows that changed between runs with a fixed seed, which is why the router votes five times" }
  - { value: "8/8", label: "Impersonator-business and prompt-injection messages muted by deterministic overrides" }
  - { value: "1.3", label: "Rows in 40 that still change between runs after the 5-vote majority, down from about 3" }
skills: ["LLM evaluation", "Multimodal LLMs", "Prompt-injection defense", "Deterministic guardrails", "Retrieval (BM25)"]
stack: ["Python", "OpenAI gpt-5.6", "whisper-1", "Pydantic", "rank-bm25", "tenacity", "pandas", "pytest"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/whatsapp-notification-router" }
pipeline:
  - { name: "Ingest", detail: "13 relational CSVs, 412 past interactions, 20 images, 13 voice notes" }
  - { name: "Retrieve", detail: "Deterministic BM25 retrieval plus hard links between records" }
  - { name: "Extract signals", detail: "Risk and trust signals computed in code: signals, never verdicts" }
  - { name: "Vote", detail: "5-vote LLM majority over a closed bank of 27 reason templates" }
  - { name: "Derive", detail: "Code sets action, confidence and cited evidence; schema-valid by construction" }
  - { name: "Override", detail: "Deterministic injection, impersonator and high-risk-business overrides" }
next:
  - "Hold-out first. The post-mortem showed that a hold-out set turns local accuracy into an estimate, so it is the first thing I build now and every change, the last one included, is measured against it."
  - "Rebalance the evaluation toward the mute-heavy distribution of the real data."
  - "Push the remaining run-to-run variance (about 1.3 rows in 40) toward zero, for example with a larger vote or a calibrated tie-break."
---

## What it does

Every WhatsApp message needs a routing decision for its user: notify now, hold for a digest, or mute. Messages arrive as text, image posters and voice notes, and some come from impersonator businesses or carry prompt injections. In HackerRank Orchestrate's August 2026 edition, a 24-hour build where the challenge itself is agentic AI, the system had to return an action, a message type, a reason, a confidence and cited evidence for each message. The data was 13 relational CSVs, 412 historical interactions, 20 images and 13 voice notes, graded against hidden labels.

## How it is built

The design rule is "signals, never verdicts". Deterministic code does the retrieval (BM25 plus hard links between records) and extracts risk and trust signals. The LLM only picks a reason from a closed bank of **27 reason templates**. Code then derives the action, confidence and evidence, so every output is schema-valid by construction.

I measured the noise before fighting it. `temperature=0` was ruled out, and a fixed seed still changed **37 of 40** rows between runs. A **5-vote majority** halved run-to-run variance, from about 3 rows in 40 to 1.3.

Safety does not depend on the LLM agreeing. Untrusted message content is fenced, and deterministic overrides handle prompt injection, impersonators and high-risk businesses. A resumable per-vote cache meant **5 mid-run process kills** cost zero LLM calls.

## Results

Ranked **20th of 1,983** submissions with a final score of 78.3/100: chat transcript 9.6/10, code 25.8/30, AI-judge interview 24.6/30, output accuracy 18.3/30. All 6 impersonator-business messages and both injection attempts were muted.

Afterwards I cut **30% of the code** (the pipeline by 41%) and proved behavior byte-identical with a golden fingerprint of every prompt and context.

## What I took from it

I wrote the post-mortem myself. Locally the router scored **0.925**; on the hidden set it scored **61%**. The gap traces to the missing hold-out set: without one, 0.925 was never an estimate of performance on unseen data. The last changes before submission were not measured, and the data skewed toward mute.

The architecture held up. Closed vocabularies, code-derived outputs and deterministic overrides made every decision auditable, and every safety case landed. What I changed is the order of work: the hold-out set comes first, and every change gets measured against it.
