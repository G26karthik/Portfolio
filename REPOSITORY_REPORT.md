# REPOSITORY REPORT — G26karthik

> **Analysis Date:** 2026-06-26
> **Profile:** [github.com/G26karthik](https://github.com/G26karthik)
> **Note:** This represents the latest, comprehensive ground truth based on GitHub data, covering all 59 repositories. Flagship projects include deeply quantified metrics for direct resume integration.

---

## 🏆 Tier 1: Flagship Repositories

### [algosentinel](https://github.com/G26karthik/algosentinel) (Python)
- **Architecture:** Autonomous PR agent utilizing a parent-child Gemini orchestration framework with 55 composable tools across multiple namespaces (github/sandbox/complexity).
- **Core Value:** Replaces static code analysis with dynamic, Docker-sandboxed execution to physically profile function runtime and catch critical $O(n) \to O(n^2)$ algorithmic regressions before they merge.
- **Quantifiable Impact:** Processes 20+ continuous tool-call horizons per audit using context compression; automatically fits execution timings to theoretical complexity curves to generate data-backed PR review comments.

### [EdgeSentinel](https://github.com/G26karthik/EdgeSentinel) (TypeScript)
- **Architecture:** Cloudflare edge-native bot detection middleware leveraging Workers AI, Vectorize embeddings, and Durable Objects.
- **Core Value:** Provides a 5-layer classification cascade (Cache $\to$ Vector Fingerprinting $\to$ Heuristics $\to$ Llama 4 Scout 17B $\to$ GPT-4o fallback) to categorize every HTTP request with sub-10ms overhead.
- **Quantifiable Impact:** Achieves zero-race-condition, atomic per-IP rate limiting via Durable Objects and utilizes cosine similarity (>0.92) on `bge-small-en-v1.5` embeddings to catch User-Agent rotating bots entirely on Cloudflare's free tier.

### [grounded-support-triage](https://github.com/G26karthik/grounded-support-triage) (Python)
- **Architecture:** End-to-end LangGraph support triage system featuring hybrid BM25 + dense RAG and a programmatic citation critic.
- **Core Value:** Intelligently routes support tickets across 3 product domains (HackerRank/Claude/Visa) and produces grounded, verifiable replies without relying on LLM-as-a-judge for factual validation.
- **Quantifiable Impact:** Cost-optimized to require only 0–2 LLM calls per ticket via a regex fast-path, utilizing z-score fusion for high-accuracy retrieval and cross-encoder reranking.

### [kvquant-lab](https://github.com/G26karthik/kvquant-lab) (Python)
- **Architecture:** PyTorch 2.5.1 implementation of TurboQuant (ICLR 2026) and Memory Caching frameworks benchmarked on GPT-2 Medium (345M parameters).
- **Core Value:** Provides an empirical study of state-of-the-art KV cache compression for LLMs, evaluating WHT+Asymmetric 4-bit VQ and outlier channel splitting.
- **Quantifiable Impact:** Validated 9 theoretical paper theorems in practice, achieving a 3.2x KV cache compression ratio (5664 KB $\to$ 1740 KB) while sustaining 100% Needle In A Haystack (NIAH) recall and limiting perplexity degradation to just +6.1%.

### [MindSafe](https://github.com/G26karthik/MindSafe) (TypeScript)
- **Architecture:** Browser-based, privacy-first mental health screening dApp built with React 19, Vite, Gemini API, and Midnight Network ZK Smart Contracts.
- **Core Value:** Conducts adaptive clinical screenings (up to 12 questions) where conversational data never leaves the local `useState` browser session.
- **Quantifiable Impact:** Guarantees absolute user privacy by minting only a de-identified, cryptographically hashed Zero-Knowledge proof onto the blockchain, bypassing the need for user accounts entirely.

### [Avia](https://github.com/G26karthik/Avia) (Python)
- **Architecture:** Insurance fraud investigation SaaS featuring an XGBoost + Isolation Forest risk engine and a React/FastAPI full-stack.
- **Core Value:** Automates fraud detection by processing multimodal document extraction (PDFs/Images) directly through Gemini 2.5 Flash, generating human-readable decision traces.
- **Quantifiable Impact:** Delivers three-bucket ML risk scoring (Claim/Customer/Pattern Risk) on a 0–100 scale, utilizing SHAP-based feature explanations to create one-click investigator escalation packages.

### [ParkSentinel](https://github.com/G26karthik/ParkSentinel) (Python/TypeScript)
- **Architecture:** AI-powered parking enforcement intelligence dashboard utilizing FastAPI, DuckDB, Next.js, and Deck.gl.
- **Core Value:** Built for the Gridlock Hackathon (Flipkart x Bengaluru Traffic Police) to visualize, forecast, and manage parking-induced urban congestion.
- **Quantifiable Impact:** Analyzed over 115,400 parking violation records using GPU-accelerated HDBSCAN clustering and H3 hexbins to generate proactive 14-day Prophet forecasts and automated deployment recommendations.

### [Dual-AI-Assistant-s-Benchmark](https://github.com/G26karthik/Dual-AI-Assistant-s-Benchmark) (Python)
- **Architecture:** Side-by-side evaluation framework pitting Open Source models against Frontier models using shared token-budget memory and two-stage guardrails (Llama Guard 3).
- **Core Value:** A robust, reproducible eval pipeline utilizing a three-judge LLM panel and SelfCheckGPT consistency checks to validate agent behavior in adversarial scenarios.
- **Quantifiable Impact:** Benchmarks models across 5 standard datasets (TruthfulQA, ToxiGen, BOLD, etc.) while sharing a centralized 55-tool registry, completely deployed as a Hugging Face Space.

### [AI-Interview-Assistant](https://github.com/G26karthik/AI-Interview-Assistant) (JavaScript)
- **Architecture:** Browser-based technical interview application built with React and Redux-persist.
- **Core Value:** Autonomously conducts timed technical interviews by parsing uploaded resumes (PDF/DOCX) client-side and generating adaptive difficulty questions.
- **Quantifiable Impact:** Eliminates recruiter overhead by orchestrating an end-to-end flow: heuristic contact extraction, 6 timed questions (20s/60s/120s), JSON-structured AI scoring, and an exportable analytics dashboard.

### [UML-Designer](https://github.com/G26karthik/UML-Designer) (Python)
- **Architecture:** Prompt-to-diagram generation pipeline utilizing a Python backend and Mermaid.js rendering engine.
- **Core Value:** Instantly translates raw source code or natural language specifications into professional, structured UML class and sequence diagrams.
- **Quantifiable Impact:** Supports multi-language code parsing (Python, Java, C#, C++) bridging technical architectures with non-technical stakeholders through shareable, exportable visualizations.

### [Fog-Detection-System-for-Vehicles](https://github.com/G26karthik/Fog-Detection-System-for-Vehicles) (TypeScript)
- **Architecture:** Real-time computer vision system built with FastAPI, OpenCV, and Next.js.
- **Core Value:** Analyzes forward-facing camera feeds to determine the presence and intensity of fog, enhancing driver safety in low-visibility environments.
- **Quantifiable Impact:** Designed with a dual-interface approach, simultaneously providing a high-data Developer View for model tuning and a streamlined Driver View for critical, low-latency safety alerts.

---

## 🚀 Tier 2: Notable Projects & Hackathons

- **[Lost-and-Found](https://github.com/G26karthik/Lost-and-Found) (JavaScript):** Full-stack MERN application for campus item recovery, featuring JWT auth, Multer uploads, and Cloudinary storage. Deployed on Render for active campus usage.
- **[sandbox-warm-pool-controller](https://github.com/G26karthik/sandbox-warm-pool-controller) (Go):** Kubernetes CRD controller built with `controller-runtime` to pre-spawn gVisor/Kata sandboxes, effectively eliminating 1–5s cold starts for serverless workloads.
- **[FounderOS](https://github.com/G26karthik/FounderOS) (JavaScript):** Voice-first AI Chief of Staff integrating Omi, Lyzr, and Qdrant semantic memory to convert spoken founder thoughts into structured tasks.
- **[SupplySentinel](https://github.com/G26karthik/SupplySentinel) (Python):** Autonomous multi-agent supply chain risk monitor utilizing Gemini 2.5 Flash agents to continuously detect and deduplicate disruptions.
- **[VectorCart](https://github.com/G26karthik/VectorCart) (Python):** Production RAG shopping assistant using a hybrid FAISS vector retrieval system mapped to a PostgreSQL backend.
- **[Pin-Point-New-Gen-Logistics-App](https://github.com/G26karthik/Pin-Point-New-Gen-Logistics-App) (Dart):** Flutter last-meter delivery application featuring exact pin drops, race-safe rider claiming, and Gemini-powered navigation fallback.
- **[Nexus-Feed](https://github.com/G26karthik/Nexus-Feed) (TypeScript):** AI daily digest leveraging Next.js 16, Turso/Drizzle, and Tavily search to generate source-linked, infinite-drill-down news taxonomies.
- **[AI-Network-Traffic-Shaper](https://github.com/G26karthik/AI-Network-Traffic-Shaper) (Python):** Live packet capture ML classifier (80–90% accuracy) that automates Windows Firewall QoS shaping without relying on destination port leakage.
- **[BTIFIT](https://github.com/G26karthik/BTIFIT) (Python):** Full-stack NLU platform using a TF-IDF to LLM ranking pipeline for intent/entity extraction, backed by a 500-entry LRU cache.

---

## 📚 Tier 3: Coursework, Archives & Minor Repositories

*These repositories represent foundational coursework, early learning experiments, basic static sites, and minor forks.*

- **[Psychometric-Test-using-Java-and-MySql](https://github.com/G26karthik/Psychometric-Test-using-Java-and-MySql) (Java):** Console psychometric test utilizing JDBC for persistent user score analysis.
- **[QMS](https://github.com/G26karthik/QMS) (TypeScript):** Hierarchical coding question sheet with cross-level drag-and-drop and undo/redo state management via Zustand.
- **[Aura-Calender](https://github.com/G26karthik/Aura-Calender) (TypeScript):** Fully accessible Next.js 16 wall-calendar UI with dynamic theming and Vitest coverage.
- **[Supply-Chain-Auditor-Env](https://github.com/G26karthik/Supply-Chain-Auditor-Env) (Python):** Hugging Face space for autonomous agent evaluation against CVE lookups and dependency typosquatting.
- **[voice](https://github.com/G26karthik/voice) (Python):** Streamlit EdTech app converting lecture audio to notes via Whisper and T5/BART summarization.
- **[Skin-Disease](https://github.com/G26karthik/Skin-Disease) (Python):** Educational CNN ensemble for dermatology utilizing Grad-CAM explainability and data augmentation.
- **[Lumina-Search](https://github.com/G26karthik/Lumina-Search) (Python):** Hybrid vector + BM25 search engine over the 20 Newsgroups dataset.
- **[Call-Quality-Auto-Flagger-VoiceHack2026-](https://github.com/G26karthik/Call-Quality-Auto-Flagger-VoiceHack2026-) (Python):** ML pipeline (Gradient Boosting + Random Forest) for flagging risky healthcare calls.
- **[skill-productionize](https://github.com/G26karthik/skill-productionize) (None):** Shell utility for hardening and validating codebase production readiness.
- **[StreamCore---Adaptive-Bitrate-Session-Manager](https://github.com/G26karthik/StreamCore---Adaptive-Bitrate-Session-Manager) (Java):** OTT backend simulator leveraging Java 21 virtual threads and Redis session caches.
- **[AIV](https://github.com/G26karthik/AIV) (JavaScript):** Basic web application for AI-assisted interview preparation workflows.
- **[Antim---AI-Bereavement-Assistance-Agent](https://github.com/G26karthik/Antim---AI-Bereavement-Assistance-Agent) (CSS):** Empathy-driven static web interface for procedural bereavement guidance.
- **[Portfolio](https://github.com/G26karthik/Portfolio) (HTML):** Personal portfolio site featuring GSAP motion design and dark mode.
- **[finsight](https://github.com/G26karthik/finsight) (JavaScript):** Standard finance dashboard UI assessment build.
- **[AgriSure](https://github.com/G26karthik/AgriSure) (Python):** Python full-stack prototype application tailored for the agricultural fintech domain.
- **[Stock-Sentement-Analyzer](https://github.com/G26karthik/Stock-Sentement-Analyzer) (Python):** NLP Flask application analyzing market sentiment via Reddit discussions.
- **[Object-Detector-ml-yolov5](https://github.com/G26karthik/Object-Detector-ml-yolov5) (Jupyter Notebook):** Google Colab environment for training YOLO object detection models.
- **[Ai-search-tool](https://github.com/G26karthik/Ai-search-tool) (JavaScript):** Basic FastAPI and React search aggregation interface.
- **[backlink-tracker](https://github.com/G26karthik/backlink-tracker) (JavaScript):** Frontend React application prototype for SEO backlink monitoring.
- **[Habbit-Tracker](https://github.com/G26karthik/Habbit-Tracker) (JavaScript):** Full-stack Express/React application tracking daily streaks and usage analytics.
- **[Exam-Countdown](https://github.com/G26karthik/Exam-Countdown) (PHP):** Student dashboard UI utilizing a PHP/MySQL backend for prioritized exam tracking.
- **[Memory-matching-game](https://github.com/G26karthik/Memory-matching-game) (TypeScript):** Hackathon-built memory card game using React and Vite.
- **[Smart-Bridge-Mern-Stack](https://github.com/G26karthik/Smart-Bridge-Mern-Stack) (JavaScript):** Internship frontend tasks interfacing with random user and joke APIs.
- **[Flight-Booking-system-In-C](https://github.com/G26karthik/Flight-Booking-system-In-C) (C):** Console-based systems programming coursework for managing ticket bookings.
- **[Travel-Planner-Data-Structures-C-](https://github.com/G26karthik/Travel-Planner-Data-Structures-C-) (None):** Graph data structure implementation for calculating shortest city routes.
- **[Java-Projects](https://github.com/G26karthik/Java-Projects) (Java):** Early Object-Oriented Programming exercises (grade calculators, library managers).
- **[Dining-Philospher-for-OS-and-Word-Ladder-for-Daa](https://github.com/G26karthik/Dining-Philospher-for-OS-and-Word-Ladder-for-Daa) (Java):** Lab solutions for OS synchronization monitors and DAA graph searches.
- **[FakeNewsDetectionModel](https://github.com/G26karthik/FakeNewsDetectionModel) (Jupyter Notebook):** Supervised ML pipeline for NLP feature engineering on labeled headlines.
- **[YBI-internship-Machine-learning](https://github.com/G26karthik/YBI-internship-Machine-learning) (None):** Basic movie recommendation system experiments (collaborative filtering).
- **[lab-agile-planning](https://github.com/G26karthik/lab-agile-planning) (None):** IBM Agile coursework practicing GitHub issue workflows.
- **[agile-final-project](https://github.com/G26karthik/agile-final-project) (None):** IBM capstone project for agile product backlogs and sprint boards.
- **[IBM-github-final-project](https://github.com/G26karthik/IBM-github-final-project) (Shell):** Bash script calculator demonstrating basic open-source workflows.
- **[InternPedia-Web-Developer-Internship](https://github.com/G26karthik/InternPedia-Web-Developer-Internship) (HTML):** Collection of static web pages generated during an internship.
- **[TRINIT-hackathon-Basic-Project](https://github.com/G26karthik/TRINIT-hackathon-Basic-Project) (HTML):** Early foundational HTML hackathon submission.
- **[Civil-Sense--A-full-stack-application-implemented-in-MERN-stack-](https://github.com/G26karthik/Civil-Sense--A-full-stack-application-implemented-in-MERN-stack-) (HTML):** Basic MERN-stack proof of concept for civic reporting.
- **[Devops-Capstone-final](https://github.com/G26karthik/Devops-Capstone-final) (Python):** IBM coursework requirement for deployment pipelines.
- **[tdd-bdd-final-project](https://github.com/G26karthik/tdd-bdd-final-project) (None):** IBM coursework emphasizing test-driven development scenarios.
- **[runbook-ai](https://github.com/G26karthik/runbook-ai) (None):** Empty repository initialization.
- **[G26karthik](https://github.com/G26karthik/G26karthik) (None):** GitHub profile README containing bio, CodeChef/LeetCode ranks, and portfolio links.
- **[ME](https://github.com/G26karthik/ME) (None):** Legacy GitHub profile configuration repository.
