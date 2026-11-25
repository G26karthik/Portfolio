---
kind: case
title: "QNC"
kicker: "Quantum ML research · Geometry conservation in VQCs"
hook: "A journal paper, in minor revision, proving that a variational quantum classifier only rotates its encoded states, and showing where neural collapse can still appear: in the measured outputs."
year: 2026
order: 2
specimen: qnc
field: "class caps rotating rigidly on a Bloch sphere"
role: "First author · 4 authors"
metrics:
  - { value: "56/56", label: "Runs where geometry conservation held to rounding error (single-instance, at 4, 6 and 8 qubits)" }
  - { value: "2000", label: "Untrained circuits per data seed, all above the trained circuit's within-class variability (NC1)" }
  - { value: "0.937", label: "Test accuracy on MNIST (three classes), with 0.920 on Fashion-MNIST, comparable to classical baselines" }
  - { value: "2", label: "IBM quantum processors that ran a trained circuit" }
skills: ["Quantum machine learning", "Theory and proof", "Numerical verification", "Quantum hardware experiments", "Scientific writing"]
stack: ["Python", "PennyLane", "IBM Quantum hardware", "PyTorch", "LaTeX"]
links: []
pipeline:
  - { name: "Prove", detail: "Geometry conservation: a classifier that encodes each input once only rotates the encoded states" }
  - { name: "Train VQCs", detail: "PennyLane classifiers on MNIST and Fashion-MNIST (three classes)" }
  - { name: "Check conservation", detail: "Within-class variance and class-mean overlaps in all 56 single-instance runs at 4, 6 and 8 qubits" }
  - { name: "Measure collapse", detail: "NC1 of the measured outputs against 2000 untrained circuits per data seed" }
  - { name: "Hardware run", detail: "A trained circuit run on two IBM quantum processors" }
next:
  - "Revision: the paper is in minor revision, and the code will be released on acceptance."
  - "Follow-up: confidence-controlled Pauli-path simulation for VQC training, which is in progress."
  - "Scale: the evidence covers 4, 6 and 8 qubits, so larger circuits are the next place to test geometry conservation."
---

## The question

Neural collapse is a geometry classical networks reach late in training: samples of the same class squeeze together around their class mean. I wanted to know what training can and cannot do to the geometry of encoded states in a variational quantum classifier (VQC), and where collapse can actually be measured.

## What the paper proves

A VQC that encodes each input once only rotates the encoded states. I call this **geometry conservation**: training keeps the within-class variance and the overlaps between class means fixed, so it is a rotation, not a contraction. The encoding, not the training, fixes which class geometry the classifier can reach.

## How I tested it

The classifiers are built in PennyLane and trained on MNIST and Fashion-MNIST (three classes). Conservation held to rounding error in all **56 single-instance runs** at 4, 6 and 8 qubits. To judge collapse against a fair baseline, I compared each trained circuit with **2000 untrained circuits** per data seed. A trained circuit was also run on **two IBM quantum processors**.

## What I found

Collapse appears in the measured outputs. Their within-class variability (NC1) ends below **all 2000 untrained circuits** per data seed, and a small circuit reaches **0.937** test accuracy on MNIST and **0.920** on Fashion-MNIST, comparable to classical baselines.

The paper is "Geometry Conservation in Variational Quantum Classifiers and Where Neural Collapse Can Appear". I am first author, with Puja S Prasad (corresponding author), Pankaj Kumar and Partha Pratim Roy. It is a journal paper in minor revision, and the code will be released on acceptance.

## What I took from it

The state space conserves geometry, so collapse has to be looked for in what a measurement can see. Separating what training can change from what the encoding fixes is the contribution, and it points the design effort at the encoding.

Comparing against untrained circuits made the collapse result a measured effect with a baseline, not a single number: the untrained circuits set the bar the trained one had to clear.
