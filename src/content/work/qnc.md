---
kind: case
title: "QNC"
kicker: "Quantum ML research · Neural collapse in VQCs"
hook: "A paper showing that training a variational quantum classifier rotates its states instead of contracting them, and where collapse can still appear."
year: 2026
order: 3
specimen: qnc
field: "class caps rotating rigidly on a Bloch sphere"
role: "First author · 3 authors"
metrics:
  - { value: "~10⁻¹⁵", label: "Relative change when checking the exact-rotation result at 4, 6 and 8 qubits: machine precision" }
  - { value: "2–3", label: "Orders of magnitude the measurement-visible projection decays during training" }
  - { value: "52", label: "Preregistered predictions across 10 stages, each threshold committed before its metric" }
  - { value: "2", label: "IBM quantum hardware backends used for verification: ibm_marrakesh and ibm_kingston" }
skills: ["Quantum machine learning", "Preregistered experiment design", "Proof and numerical verification", "Scientific writing"]
stack: ["Python", "PennyLane (default.qubit)", "IBM Quantum hardware", "PyTorch", "LaTeX (Springer sn-jnl)"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/QNC" }
pipeline:
  - { name: "Preregister", detail: "52 predictions over 10 stages, thresholds committed before metrics are computed" }
  - { name: "Train VQCs", detail: "PennyLane classifiers on MNIST and Fashion-MNIST, two encodings" }
  - { name: "Measure geometry", detail: "Full-Hilbert-space collapse witnesses and the measurement-visible projection" }
  - { name: "Prove", detail: "Proposition 3: training conjugates every state by one global unitary" }
  - { name: "Hardware check", detail: "Verification on ibm_marrakesh and ibm_kingston" }
  - { name: "Classical control", detail: "Matched classical MLP trained for comparison" }
next:
  - "Revision: the paper is in major revision at Quantum Machine Intelligence after 19 referee comments, and I am working through them."
  - "Follow-up: confidence-controlled Pauli-path simulation for VQC training, which is in progress."
  - "Scale: the evidence covers 4, 6 and 8 qubits, so larger circuits are the next place to test the rotation result."
---

## The question

Neural Collapse is a geometry classical networks reach late in training: samples of the same class squeeze together. Earlier work (Du et al., PRL 2023) proved that variational quantum circuits reach it, but only at the static global optimum. I wanted to know whether it actually emerges while a VQC is being trained, and by what route.

## How I ran it

As preregistered science. Before computing any metric I wrote down **52 predictions across 10 stages**, each with a committed threshold, then scored every one CONFIRMED, REFUTED or PARTIAL against a frozen spec. The code carries **173+ tests** and runtime physics assertions on every state: Hermitian, trace 1, positive semidefinite.

Experiments use PennyLane's `default.qubit` at 4, 6 and 8 qubits, on MNIST and Fashion-MNIST under two encodings, repeated with a second optimizer and a second ansatz family. A matched classical MLP is the control. Two IBM quantum hardware backends, `ibm_marrakesh` and `ibm_kingston`, verified the result.

## What I found

Proposition 3: what looks like collapse in a trained VQC is an **exact rotation, not a contraction**. Training conjugates every sample's state by one global unitary, so the geometry between states is conserved. The relative change is **~10⁻¹⁵**, machine precision, at 4, 6 and 8 qubits.

That explains why every full-Hilbert-space collapse witness comes back null. What does change is the projection a measurement can see, which decays by **2–3 orders of magnitude**. The classical MLP does the opposite: its within-class scatter grows **27–163×** in absolute terms.

The paper is "Geometry Conservation in Variational Quantum Classifiers and Where Neural Collapse Can Appear" (earlier title "Collapse by Rotation"). I am first author, with Puja S Prasad (corresponding author) and Partha Pratim Roy of IIT (ISM) Dhanbad. It was submitted to Springer's *Quantum Machine Intelligence* in August 2026 and is in major revision after 19 referee comments. The repo is public on GitHub.

## What I took from it

I set out to measure collapse in the state space and found conservation instead. The collapse lives only in what a measurement can see, and the proof explains why. That reframing is the contribution.

Preregistration changed how I read my own numbers. With thresholds fixed in advance, a REFUTED score is information, so I kept every one in the record instead of adjusting a metric until it passed.
