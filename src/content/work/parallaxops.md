---
kind: product
title: "ParallaxOps"
kicker: "Personal project · Photographs to 3D"
hook: "Turns 15–60 overlapping photographs into a COLMAP 3D reconstruction on one laptop, then scores the geometry against ground truth."
users: "Anyone who needs a measured 3D model from ordinary photographs and wants it on their own machine, with no paid services."
year: 2026
order: 2
specimen: parallax
field: "a terrace point cloud under an arc of 23 cameras"
role: "Personal project"
metrics:
  - { value: "0.31%", label: "Camera position error as a share of rig spread, ETH3D terrace vs ground truth" }
  - { value: "0.52°", label: "Median camera rotation error on the same scene" }
  - { value: "23/23", label: "ETH3D terrace DSLR images registered, 87 s through the platform" }
  - { value: "433 ms", label: "API p95 during a reconstruction at 32 concurrent users, 0 errors (351 ms idle)" }
skills: ["Structure from motion", "Workflow orchestration", "Systems reliability", "Experiment design", "Point-cloud rendering"]
stack: ["Python 3.14", "COLMAP 4.2.1 (CUDA)", "pycolmap", "Open3D", "OpenCV", "Temporal", "Fastify 5", "Zod 4", "Drizzle", "PostgreSQL", "SeaweedFS (S3)", "Next.js 16", "React 19", "Three.js", "Prometheus", "GitHub Actions"]
links:
  - { label: "GitHub", href: "https://github.com/G26karthik/parallaxops" }
pipeline:
  - { name: "Upload", detail: "Presigned direct-to-storage uploads with size and SHA-256 signed into the URL" }
  - { name: "Orchestrate", detail: "Durable Temporal workflows, one heavy job per worker process" }
  - { name: "Reconstruct", detail: "COLMAP structure-from-motion; GPU dense reconstruction is opt-in" }
  - { name: "Quality check", detail: "Geometric QC plus a capture-order warning" }
  - { name: "View", detail: "PXLD multi-resolution point cloud in Three.js with camera frusta" }
next:
  - "Run the multi-host scale-out design on more than one host, then document it as a feature."
  - "Widen the ground-truth benchmark beyond the two scenes evaluated so far."
  - "Verify the Docker Compose path end to end."
  - "Add authentication when the platform leaves one machine. For now isolation is tenant scoping, a deliberate choice that keeps it local-first."
---

## What it does

You upload overlapping photographs. ParallaxOps reconstructs the scene with COLMAP structure-from-motion, shows progress on a live stage timeline, draws the point cloud with camera frusta in the browser, and reports how good the geometry is in numbers. The whole stack runs on one laptop (Ryzen 9, RTX 4060) with no paid services.

## How it is built

Uploads go straight to object storage (SeaweedFS, S3-compatible) through presigned URLs. The upload size and SHA-256 are signed into the URL, so the store, not the API, verifies the bytes. A tenant-scoped Fastify API hands work to durable Temporal workflows, and a worker runs COLMAP 4.2.1, with GPU dense reconstruction as an option. Never more than one heavy job runs at a time.

For the viewer I designed PXLD, a multi-resolution point-cloud format. The browser receives every point (up to 8M per cloud) but draws a coarse level first and fills in the rest.

I tested reliability against real processes (Postgres, object store, Temporal, worker, browser), not mocks. A worker hard-killed mid-job is retried on a new worker and the job completes with no orphan engine or scratch. Cancel reaches `CANCELLED` in **6.1 s**.

An outside code review came in, and I checked each item against the code. What held up got fixed: signed upload size and digest, cursor paging, lease-guarded background jobs, a worker-to-API event replay test and a capture-order QC warning. The repo has **199 automated tests**, and CI (actionlint, ruff, mypy on 3 OSs, Biome, tsc, vitest, web build) is green.

## Results

On the ETH3D *terrace* scene (23 DSLR images), measured against ground truth: **23/23 images registered**, camera position error **0.31% of rig spread**, **0.52°** median rotation error, **87 s** through the platform. A GPU dense run on the same scene produced **248K points**. The viewer draws the first PXLD level in **106 ms** and all 248K points in **147 ms** (software WebGL). API p95 is **351 ms** idle and **433 ms** during a reconstruction at 32 concurrent users, with 0 errors.

## The experiment that changed the design

I pre-registered a quality-aware compute controller. It lifted registered images by +27 to +37 points at 3× the cost, and the follow-up showed why that was not a win: registered-image fraction and reprojection error looked healthy on wrong geometry, with cameras 20–70× further from ground truth. So the platform now trusts the numbers scored against ground truth, not its own health signals. A dynamic-object masking experiment came out null. Both results are published in the repo.

Writing the plan down before running the experiment is what made those results usable. And killing real workers taught me more than mocks would have.
