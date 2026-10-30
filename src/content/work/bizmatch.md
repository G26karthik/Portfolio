---
kind: case
title: "BizMatch"
kicker: "Amazon ML Challenge 2026 · Entity resolution"
hook: "Finds every real copy of a business across ~10M noisy records and sets aside the look-alike decoys."
placement: "Rank 38 of 32,000+ teams"
year: 2026
order: 1
specimen: bizmatch
field: "~10M noisy records collapsing into entity clusters"
role: "Team lead · 4 people"
metrics:
  - { value: "38", label: "Final rank out of 32,000+ teams in the Amazon ML Challenge 2026" }
  - { value: "0.990", label: "Best public-leaderboard macro F0.5, up from 0.921 at the first submission" }
  - { value: "98.75%", label: "Candidate recall at ~5 candidates per business (TF-IDF + fine-tuned multilingual-e5)" }
  - { value: "+0.0039", label: "Gain from label-free France rules, confirmed by two independent statistical tests" }
skills: ["Entity resolution", "Retrieval and reranking", "Gradient boosting", "Validation design", "LLM fine-tuning (LoRA)", "Decision theory"]
stack: ["Python", "LightGBM", "Sentence-Transformers", "Transformers", "multilingual-e5", "bge-reranker-v2-m3", "Qwen3-Reranker", "Qwen2.5-7B + LoRA", "TF-IDF", "Parquet", "AWS EC2", "Kaggle", "Modal", "Lightning AI"]
links:
  - { label: "Full write-up", href: "https://g26karthik.dev/writing/amazon-ml-challenge-2026/" }
  - { label: "GitHub", href: "https://github.com/G26karthik/bizmatch-amazon-ml-2026" }
pipeline:
  - { name: "Retrieve", detail: "TF-IDF plus fine-tuned multilingual-e5, ~5 candidates per business" }
  - { name: "Feature cascade", detail: "57 pair features into a 3-stage out-of-fold LightGBM cascade" }
  - { name: "Rerank", detail: "7 cross-encoders fused by a LightGBM stacker" }
  - { name: "LoRA judges", detail: "Qwen2.5-7B LoRA judges inside a test-like recalibrator" }
  - { name: "Decide", detail: "Exact expected-F0.5 subset per business via a Poisson-binomial DP" }
next:
  - "Carry the validation recipe into the next matching or ranking problem from day one: split by entity, match the test density, match the kind of unmatched records."
  - "Keep rules as features the model can weigh. The France variants that fed the model beat the ones that overrode it."
  - "Reuse the label-free method wherever labels are missing: model the data generator, derive a rule, and keep it only when two independent tests agree."
---

## The problem

Amazon gave us ~10M noisy business records from two sources and one question: which of 1.7M reference businesses does each record belong to? Name, address and country were the only fields. The data covered the US, India and France. France had no labels, and the set was seeded with decoys built to look like real matches. The score was macro F0.5 per business, so precision weighed more than recall and every business counted equally.

I led Team Minutes, four of us from GCET. We finished 38th of 32,000+ teams, and Amazon invited the team to its Applied Scientist Intern interview.

## What we built

A funnel. TF-IDF and a fine-tuned multilingual-e5 bi-encoder gather candidates with **98.75% recall at ~5 candidates per business**, so everything downstream stays affordable. Each candidate pair gets 57 features and runs through a 3-stage out-of-fold LightGBM cascade. Seven cross-encoders (e5, bge-reranker-v2-m3, Qwen3-Reranker) re-read the uncertain pairs and a LightGBM stacker fuses their scores. Qwen2.5-7B LoRA judges sit inside a recalibrator built to behave like the test set.

The last step is a decision, not a threshold. F0.5 is scored per business, so a single global cut-off is the wrong tool. For each business I compute the exact expected F0.5 of the candidate subsets with a Poisson-binomial dynamic program and return the best one.

## What moved the score

**Validation.** Our early validation set matched neither the test density nor the kind of unmatched records in test. I rebuilt it, and afterwards it agreed with the test score to four decimals. A v3 change that gained +0.006 on the old validation had lost on the leaderboard. On the new one, offline numbers were trustworthy enough that I stopped guessing.

**France without labels.** We modeled how the data generator writes French records, derived rules from that model, and kept each one only after two independent statistical tests confirmed it. Together they added +0.0039.

**Free compute.** AWS EC2 spot, Kaggle 2×T4, a Modal H100, Lightning AI and a laptop RTX 4060. Every stage wrote resumable Parquet artifacts, so spot reclaims and a blocked cloud account did not stop the run.

## Results

We climbed from **0.921** at the first submission to **0.990 macro F0.5** on the public leaderboard and finished **rank 38 of 32,000+ teams**. Amazon's email confirmed a top-50 finish nationwide.

The engineering write-up, with the architecture and the leaderboard history drawn out, is in [Writing](/writing/amazon-ml-challenge-2026/).

## What I took from it

Validation design beat model changes. Optimize the metric you are scored on, at the level it is scored: expected F0.5 per business handled the trade between one sure match and several likely ones better than any threshold I could tune.

With no labels, model the generator and test the model before you trust it. And let the model have the last word: the French rules that fed it beat the ones that overrode it.
