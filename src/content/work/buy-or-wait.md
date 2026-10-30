---
kind: product
title: "Buy or Wait?"
kicker: "Agentic decision system · Exact-arithmetic cash flow"
hook: "Recommends pay in full, wait, installments, partial payments or decline from a 90-day cash-flow forecast. The LLM reads the documents; exact Decimal code does the money, and an independent verifier checks every plan."
users: "Anyone weighing a purchase against real cash flow: upcoming rent, pending debits, confirmed payroll, receipts and payslips."
year: 2026
order: 6
specimen: nishchay
field: "a cash-balance surface held above the minimum-balance floor"
role: "Built end to end"
metrics:
  - { value: "318", label: "Tests across 18 suites, run in about 5.0 seconds" }
  - { value: "233/250", label: "Decisions identical to an independent reference evaluator" }
  - { value: "25/25", label: "Explanations grounded in verified structured facts on the development sample" }
  - { value: "90", label: "Days of forecast, with the balance floor checked at the end of every calendar day" }
skills: ["Deterministic-first design", "Independent verification", "Differential and metamorphic testing", "LLM perception", "Exact arithmetic", "Content-addressed caching"]
stack: ["Python 3.11", "Exact Decimal arithmetic", "OpenAI vision", "unittest", "Content-hash cache"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/Buy-OR-Wait-Agentic-Decision-System" }
pipeline:
  - { name: "Perceive", detail: "An LLM reads payslips, bills and receipts and extracts facts from messages; each response is cached by content hash, model, prompt version and decoding settings" }
  - { name: "Resolve", detail: "Deterministic code converts currency, fits recurrences anchored to real payroll dates and builds the event stream" }
  - { name: "Simulate", detail: "A conservative day-by-day cash simulator: pending debits are reserved and unsettled credits are left out" }
  - { name: "Plan", detail: "A candidate planner ranks options by a fixed order: deadline, no spending changes, total cost, earliest payment, fewest payments, option ID" }
  - { name: "Verify", detail: "An independent verifier audits every obligation and a reference evaluator differential-tests the planner before the output is written" }
next:
  - "Teach the independent reference evaluator to model spending reductions. It already matches 233 of 250 decisions, and the other 17 are the requests that need them."
  - "Re-extract evidence with newer models through the existing live rebuild path; the content-addressed cache keeps each run separate."
---

## What it does

Whether a purchase is affordable cannot be read off today's balance. A user with 5,000 today may owe 3,500 in rent next week, and a user with 500 may have payroll landing in three days. Buy or Wait? recommends how to pay (in full, wait, installments or partial payments) or to decline, by simulating the next 90 days of confirmed income, committed debits and pending items. A recommendation counts as safe only if the balance stays at or above the user's chosen minimum at the end of every day in that window.

## How it is built

The core design rule is to keep evidence and arithmetic apart. An LLM is used only to perceive: it reads messy payslips, bills and receipts and pulls candidate facts out of chat messages. After that, all currency conversion, recurrence fitting, cash simulation, planning, ranking and verification run in plain Python standard library code with exact `Decimal` arithmetic. No financial decision is delegated to a model. Every model response is cached by the hash of its source, so a run can be replayed with zero model calls.

Correctness is built in several ways at once. An **independent verifier** replays each plan against the original obligations. A **reference evaluator** is a second implementation that differential-tests the production planner. The test suite includes metamorphic relations (renaming identifiers or permuting inputs must not change an outcome, and raising the minimum balance can never raise safe capacity), financial stress cases, harness-fault injection and a module of audit regressions. Ten fixes came out of adversarial audits, among them stopping a gym subscription without touching a pending gym-insurance debit, and refusing a payment plan that does not add up to the requested amount.

Explanations are checked too: a numeric claim that is not backed by the structured facts is refused, so the text can only say what the engine computed. A cropped, illegible image is tagged as unreadable instead of being guessed at.

## Results

The test suite has **318 tests across 18 suites** and runs in about **5.0 seconds**. Across all **250 evaluation requests**, the production planner and the independent reference evaluator agree on **233** decisions, and the full 250 are produced in about 4.7 seconds. On the 25-request development sample, explanations were grounded in verified facts **25/25** times, spending-change sets matched **22/25** and payment methods **20/25**.

## What I took from it

Separating perception from arithmetic made the system testable. The model's job is small and cacheable, while everything that touches money can be proven with exact numbers and checked by a second implementation. Independent audits found cases my own tests had missed, and turning each one into a regression test is what kept the planner safe as it grew.
