---
kind: product
title: "AlgoSentinel"
kicker: "Personal project · Agentic code review"
hook: "Audits pull requests for complexity regressions by profiling the old and new function in a Docker sandbox across growing inputs, then posts a review backed by the fitted growth curve."
users: "Maintainers reviewing performance-sensitive changes, where a function quietly goes from O(n) to O(n²), still passes its unit tests and only falls over at scale in production."
year: 2026
order: 4
specimen: parallax
field: "timings at growing input sizes fitting a growth curve"
role: "Built end to end"
metrics:
  - { value: "55", label: "Composable tools in 4 namespaces: github 18, sandbox 14, complexity 13, optimizer 10" }
  - { value: "20+", label: "Tool calls per audit, kept coherent by a ContextManager that compresses older history" }
  - { value: "1.00", label: "F1 on the 5 golden eval cases, from O(n) to O(n²) through a mixed multi-function PR" }
  - { value: "26", label: "Tests: 18 unit and 8 integration" }
skills: ["Tool design", "Agent orchestration", "Performance analysis", "Sandboxed execution", "Evaluation harnesses", "Resilient API clients"]
stack: ["Python 3.11", "FastAPI", "Gemini", "Docker", "Pydantic", "scipy", "PyGithub", "structlog", "tenacity"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/algosentinel" }
pipeline:
  - { name: "Plan", detail: "A Gemini parent agent reads the pull request's details, diff and files and plans the audit" }
  - { name: "Isolate", detail: "For each changed function, a subagent with its own context and tools scoped to sandbox and complexity only" }
  - { name: "Profile", detail: "Old and new versions run in a Docker sandbox at input sizes from 10 to 10000" }
  - { name: "Fit", detail: "Timings are fitted to candidate complexity curves, the class is inferred, regressions are detected and severity is classified" }
  - { name: "Review", detail: "The parent turns the typed ComplexityReports into a review body and posts it to the pull request" }
next:
  - "Run subagents in parallel for multi-function pull requests."
  - "Cache timing results per function SHA so unchanged code is never profiled twice."
  - "Add richer input generators for graphs and trees, with property-based correctness checks."
  - "Chart complexity drift across a repository's pull request history."
---

## What it does

A pull request can turn a function from O(n) to O(n²) with every unit test still green. The slowdown only shows at production scale. AlgoSentinel catches it at review time. It profiles both versions of each changed function in a Docker sandbox across growing input sizes, fits the timings to complexity curves and posts a review backed by an actual growth curve.

## How it is built

A Gemini-driven parent agent plans the audit and selects tools from a registry of **55 tools in 4 namespaces**. Each tool registers with a Pydantic input model, the Gemini function schema is derived from it, and calls dispatch by name from a flat dictionary, so the registry stays simple as it grows.

The heavy analysis goes to a `FunctionAnalysisSubagent`. It has its own model client and message history and can only see the sandbox and complexity tools. It returns a typed `ComplexityReport` to the parent. A `ContextManager` pins the plan into every system prompt and compresses older tool history, which lets one audit run past **20 tool calls** without losing the thread.

The design choice I would defend is measurement over static analysis. Loop nesting misses a `sorted()` inside a loop and mis-estimates average-case dictionary behavior. Timing both versions from 10 to 10000 inputs and reporting the fitted class gives evidence an engineer can act on, and it makes the review comment concrete.

The production scaffolding is there as well: structlog JSON logging, tenacity retries with exponential backoff and jitter, a token-bucket rate limiter shared by the parent and every subagent, and a typed error hierarchy that separates retryable failures from fatal ones. A deterministic `full_audit.py` runs the same profile-and-review pipeline with no model calls, which is useful in CI.

## Results

The eval harness scores the complexity pipeline against **5 golden cases**: O(n) to O(n²), O(n log n) to O(n²), no regression, an improvement and a mixed multi-function change. It reaches **F1 1.00**. The repository has **26 tests**, 18 unit and 8 integration, and the 55-tool count is asserted by the service's health check.

## What I took from it

Tools should chain rather than dead-end. The profiler's structured output feeds the complexity chain, which feeds the review-body generator, so each step is checkable on its own. Scoping a subagent to only the tools it needs kept its context short and its behavior predictable, and a typed report between agents is what kept the audit reliable over a long session.
