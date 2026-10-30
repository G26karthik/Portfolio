---
kind: product
title: "Closer"
kicker: "Last-Minute Life Saver hackathon · Deadline agent"
hook: "Turns a plain-English goal and deadline into finished work: drafted emails, calendar-blocked prep time, researched findings and generated documents, pausing only for the decisions that need a human."
users: "People facing a deadline who want the work executed for them, with every email left as a draft to review before anything is sent."
year: 2026
order: 7
specimen: router
field: "one goal splitting into email, calendar, research and document specialists"
role: "Built end to end"
metrics:
  - { value: "58", label: "Tests covering the planner, the evaluator judge, calendar slot-finding, the monitor, deadline time zones and human-decision resume" }
  - { value: "1–6", label: "Typed subtasks planned per goal, chosen from 5 capabilities and validated" }
  - { value: "<4 h", label: "Time to deadline at which a scheduled monitor steps in, at most once per 30 minutes per goal" }
  - { value: "2", label: "Maximum attempts per draft, with the judge's reason fed back on the retry" }
skills: ["Agent workflows", "Evaluator-optimizer loops", "Human-in-the-loop design", "Calendar and Gmail APIs", "Cloud deployment", "Testing and CI"]
stack: ["Python 3.12", "FastAPI", "Google ADK 2.3.0", "Gemini 3.5 Flash", "Firestore", "Firebase Auth", "Cloud Run", "Cloud Scheduler", "Gmail, Calendar and Docs APIs", "slowapi", "structlog", "GitHub Actions"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/Closer" }
pipeline:
  - { name: "Plan", detail: "Gemini decides which of the five capabilities apply to this goal and returns 1 to 6 typed subtasks, capped and validated" }
  - { name: "Execute", detail: "Only the specialists the plan asks for run: a Gmail draft, a free calendar slot, Search-grounded research, a Google Doc" }
  - { name: "Self-review", detail: "A second Gemini call judges each output; a miss retries once with the reason fed back, through the ADK's native retry configuration" }
  - { name: "Pause", detail: "A decision subtask pauses the workflow and shows a decision card; the answer resumes it exactly where it stopped" }
  - { name: "Monitor", detail: "A Cloud Scheduler sweep, outside the agent session, checks in-flight goals and intervenes when a deadline closes in" }
next:
  - "Move paused-workflow state from process memory into Firestore so Closer scales past a single instance."
  - "Add silent OAuth token refresh so a long session never asks the user to sign in again."
---

## What it does

You type a goal such as "Draft a thank-you email to the design team and schedule a 30-minute retro before Friday." Closer plans the work, runs only the specialists that goal needs, grades their output and pauses when a call needs your judgment. Emails stay as Gmail drafts, the calendar slot is found from real free time, research is grounded in live Google Search results and documents are created in Google Docs. Progress streams to the browser in real time from Firestore.

## How it is built

The workflow is a single Google ADK graph. Planning is dynamic: Gemini chooses which of five capabilities apply, so a goal that needs only an email produces one subtask and a complex one produces up to six. Every specialist checks the plan and skips itself when it was not asked for, which gives dynamic dispatch without branching the graph.

Self-review is a real evaluator-optimizer loop. A second, independent Gemini call grades each specialist's output. A low grade raises an `OutputQualityError`, which the ADK's own `RetryConfig` catches to regenerate the output with the reason attached. When a goal needs a human decision, the workflow yields a request, the UI shows a decision card and the run resumes from where it paused.

Details are computed, not guessed. The deadline's weekday comes from `strftime('%A')` instead of the model. Calendar scheduling merges overlapping `freebusy` windows and walks back from the deadline to find a block that is truly open. A proactive monitor runs as a plain async function behind Cloud Scheduler, deliberately outside the ADK session, so it can never re-enter a paused workflow.

It is built to be safe to run. Firestore rules gate every read by user ID and all writes happen server-side, both mutating endpoints are rate limited, responses carry security headers, agent text is escaped in the UI and the internal tick endpoint sits behind Cloud Run IAM. Gmail is draft-only, so nothing leaves the user's account without a review. A Cloud Build pipeline lints, builds and deploys, and CI runs `ruff`, then `pyright`, then `pytest`.

## Results

The repository has **58 tests** across planner subtask validation, the evaluator judge (accept, reject and malformed JSON), calendar slot-finding with overlapping and malformed busy windows, Firestore activity logging, monitor risk and deduplication logic, deadline time-zone normalization and human-decision resume. Across **27 commits**, a fixed five-step chain became the dynamic, self-reviewing workflow described above.

## What I took from it

Reliability comes from the shape of the workflow. Putting a judge between a model's draft and the world, keeping the monitor outside the agent's session and leaving every email as a draft let the agent act on its own while a person kept the final say.
