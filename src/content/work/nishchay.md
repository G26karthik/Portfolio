---
kind: product
title: "Nishchay"
kicker: "Razorpay AI Buildathon · COD risk decisions"
hook: "Decides which cash-on-delivery orders to flag for return-to-origin risk, pricing each decision in the merchant's own rupees."
users: "Merchants who ship cash-on-delivery orders and need to choose which ones to flag, knowing a wrongly flagged good customer costs margin too."
year: 2026
order: 5
specimen: nishchay
field: "a cost surface with the decision threshold marked"
role: "Built end to end"
metrics:
  - { value: "₹72.9L", label: "Net vs the merchant's existing rule on 44,288 held-out orders (~₹18.8 lakh/month)" }
  - { value: "0.677", label: "PR-AUC on the held-out orders, against a 0.304 no-skill baseline" }
  - { value: "0.986", label: "Recall on the same held-out orders" }
  - { value: "18,827", label: "Live agent calls used to measure each enrichment agent's lift" }
skills: ["Probability calibration", "Conformal prediction", "Cost-sensitive decisions", "Drift monitoring", "Agent evaluation", "Strict typing and tests"]
stack: ["Python", "LightGBM", "scikit-learn", "river", "FastAPI", "SQLAlchemy", "React", "Vite", "TypeScript", "OpenAI-compatible agents", "CatBoost (benchmark)", "TabPFN (benchmark)"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/Nishchay" }
pipeline:
  - { name: "Simulate", detail: "Agent-based order simulator calibrated to published RTO statistics" }
  - { name: "Features", detail: "27 tabular and 9 graph features per order" }
  - { name: "Score", detail: "LightGBM, then isotonic calibration, then conformal intervals" }
  - { name: "Decide", detail: "Four-action cost argmin derives the threshold from merchant costs" }
  - { name: "Enrich", detail: "3 bounded agents run after scoring; they cannot delay or change decisions" }
  - { name: "Monitor", detail: "Drift detection with ADWIN, Page-Hinkley and PSI" }
next:
  - "Recalibrate the conformal intervals per merchant. On 151,112 real e-commerce transactions coverage was 75% against a nominal 90%, so that is the first step before a new merchant goes live."
  - "Measure the rupee gain on live merchant traffic. Today it is measured on held-out evaluation orders."
  - "Keep each agent on evidence. They run after the score, so one that does not move PR-AUC can be dropped without touching a decision."
---

## What it does

When a cash-on-delivery order is refused, it goes back to the merchant: return to origin, or RTO. Flagging risky orders cuts that cost, but every good customer wrongly flagged costs margin as well, and most rules ignore the second cost. I built Nishchay for the Razorpay AI Buildathon (Track 02, AI Risk Manager) to make that trade in the merchant's own rupees.

## How it is built

An agent-based order simulator, calibrated to published RTO statistics, supplies the orders. Each one gets 27 tabular and 9 graph features. LightGBM scores it, isotonic calibration turns the score into a probability I can price, and conformal prediction adds an interval.

The decision is a four-action cost `argmin`. There is no hand-set cut-off: the threshold is derived from the merchant's costs, including the margin lost by wrongly flagging good customers. CatBoost and TabPFN ran as benchmarks.

LLMs stay off the decision path. Three bounded agents enrich an order only after the score is returned, and a failure-injection endpoint, `?simulate_failure=agent_timeout`, shows live that a stalled agent cannot delay or change a decision.

The service runs on FastAPI and SQLAlchemy with a React + Vite + TypeScript front end. Drift monitoring uses ADWIN, Page-Hinkley and PSI, and the codebase is strict-typed (ruff + mypy strict).

## Results

On **44,288 held-out orders**, a 116-day window never touched during development, the policy nets **₹72.9 lakh (~₹18.8 lakh/month)** against the merchant's existing rule. PR-AUC is **0.677** against a 0.304 no-skill baseline, at **0.986 recall**. The false-positive cost is its own line in the report, not folded into the total.

Because the agents sit after the score, each one can be measured on its own. Across **18,827 live agent calls**, the Address Agent's lift came out at +0.0038 PR-AUC (95% CI [−0.012, +0.019]), so the decision path stays model-only.

To test transfer, I ran the system on **151,112 real e-commerce transactions**. Conformal coverage there was 75% against a nominal 90%, which shows exactly where intervals need recalibrating for a new merchant.

## What I took from it

Pricing decisions in rupees changes the conversation. A threshold derived from costs can be explained to a merchant, and a hand-picked cut-off can't.

Putting LLMs after the score made them safe to ship and easy to evaluate. Coverage guarantees are only as good as the data they were calibrated on, which is why the 75% figure sits next to the ₹72.9 lakh one. I logged all 53 deviations from the original spec openly instead of rewriting the spec to match the build.
