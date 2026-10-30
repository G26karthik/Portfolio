---
kind: product
title: "FounderOS"
kicker: "Ambient Intelligence Hackathon · Voice-first AI chief of staff"
hook: "A voice-first AI chief of staff for solo founders: it turns spoken thoughts into decisions, tasks and ideas, keeps them in semantic memory and answers questions about what the founder said."
users: "Solo founders who think out loud and want what they said to become a timeline of decisions, tasks and patterns, with full control over what is remembered."
placement: "2nd prize, Ambient Intelligence Hackathon"
year: 2026
order: 5
specimen: router
field: "one spoken stream splitting into decisions, tasks and ideas"
role: "Hackathon build, live in production"
metrics:
  - { value: "2nd", label: "Prize at the Ambient Intelligence Hackathon, Rise of 1 Man Army, May 2026" }
  - { value: "5", label: "Lyzr agents: three extractors run in parallel on every transcript, plus a pattern synthesizer and a question-answering agent" }
  - { value: "4", label: "Qdrant memory collections: decisions, tasks, ideas and patterns" }
  - { value: "1536", label: "Embedding dimensions (OpenAI text-embedding-3-small) behind semantic search" }
skills: ["Voice agents", "Semantic memory", "Parallel agent pipelines", "Privacy controls", "Full-stack delivery"]
stack: ["Python", "FastAPI", "Lyzr", "Qdrant Cloud", "OpenAI embeddings", "Omi", "React 19", "Vite", "Enkrypt AI", "Docker", "Vercel", "Render"]
links:
  - { label: "Live demo", href: "https://founder-os-pi-lemon.vercel.app/" }
  - { label: "GitHub", href: "https://github.com/G26karthik/FounderOS" }
pipeline:
  - { name: "Capture", detail: "An Omi device sends a conversation.completed webhook; the API answers 200 at once and works in the background so Omi never times out" }
  - { name: "Guard", detail: "An optional Enkrypt AI check screens the transcript for PII, toxicity and prompt injection" }
  - { name: "Extract", detail: "Three Lyzr agents run in parallel: decisions with rationale and confidence, tasks with status and blockers, ideas with themes" }
  - { name: "Remember", detail: "Entries are embedded and stored in four Qdrant collections with cosine search" }
  - { name: "Ask", detail: "Voice or text questions run a semantic search and a synthesis agent; a weekly digest surfaces recurring themes and blockers" }
next:
  - "Schedule the weekly pattern digest so it arrives without opening the dashboard."
  - "Link ideas to the decisions they led to: entries already carry linked-idea and referenced-decision fields ready to fill."
---

## What it does

Founders make dozens of decisions out loud and lose most of them. FounderOS listens through an Omi voice device, turns each conversation into structured decisions, tasks and ideas, and keeps them in a searchable memory. The founder can then ask what they decided about pricing last week, browse a filterable timeline, tick tasks off and read a digest of the patterns and blockers that keep recurring.

## How it is built

A FastAPI backend receives the Omi webhook and replies at once, then processes the transcript as a background task. Three Lyzr agents (a decision extractor, a task extractor and an idea extractor) run in parallel with `asyncio.gather`, so a transcript costs one round of latency, not three. Each extractor's output is normalized into typed entries: a decision carries its domain, rationale and confidence, a task its status, owner and blocker, an idea its theme.

Entries are embedded with OpenAI `text-embedding-3-small` and stored in four Qdrant collections: decisions, tasks, ideas and patterns. A question, spoken through the Web Speech API or typed, runs a semantic search and goes to a synthesis agent that answers from the founder's own history. A pattern synthesizer reads recent entries and writes the recurring themes back into memory.

Privacy is a first-class feature. The dashboard lists every collection with its count, deletes or edits a single entry and clears a whole collection. Only the extracted entries are stored and searched, not the raw conversation. The React 19 and Vite front end ships a dark-mode dashboard with a voice question panel, an activity timeline and a pattern view, deployed on Vercel with the API on Render and Docker Compose for local runs.

## Results

FounderOS won **2nd prize** at the Ambient Intelligence Hackathon, Rise of 1 Man Army, in May 2026. The product is live: the dashboard runs on Vercel and its backend answers health checks on Render. The repository's **24 commits** cover the backend, the agent pipeline, the memory layer and the full dashboard.

## What I took from it

Splitting one transcript into three narrow agents beat one broad prompt. Each agent has one job and one output shape, so the results are easy to normalize and store, and they run side by side. Treating privacy controls as part of the first version, not as an add-on, also shaped the data model: every memory is a separate entry a founder can see, edit or delete.
