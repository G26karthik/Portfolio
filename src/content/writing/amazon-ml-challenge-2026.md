---
title: "How Team Minutes finished 38th of 32,000+ at the Amazon ML Challenge 2026"
description: "The engineering behind a 0.990 macro F0.5 entity-resolution solution: validation design, retrieval, a LightGBM and cross-encoder stack, exact expected-F0.5 decisions and label-free rules for France."
date: 2026-10-29
minutes: 12
og: bizmatch
skills: ["Entity resolution", "Bi-encoder retrieval", "Cross-encoder reranking", "LightGBM stacking", "Out-of-fold validation", "LoRA fine-tuning (Qwen2.5-7B)", "Expected-metric decoding", "Paired bootstrap tests", "Label-free rule mining"]
---

In September 2026 my team, Minutes, finished 38th out of 32,000+ teams at the Amazon ML Challenge. We climbed from 0.921 to 0.990 macro F0.5 on the public leaderboard, and Amazon invited us to its Applied Scientist Intern interview. I led the four of us, all from GCET, and this is the engineering story: the problem, what we built, the experiments that moved the score, and what I'm taking into the next project.

If you only read one section, make it the one on validation. It decided the result more than any model did.

## The problem

Three sources of business records, each with a name, an address and a country, and no shared identifiers. Source 1 is a clean reference list. Sources 2 and 3 hold noisy copies of those businesses, mixed with decoys. For every Source 1 business, list its copies. The score is F0.5 averaged per business, so a wrong match costs about three times as much as a missed one, and a business with no copies is worth getting right too.

The training set has 2,206,821 businesses, 10,320,219 Source 2 and 3 records and 7,638,365 true pairs, all from the US and India. The test set has 1,732,544 businesses and adds France, with no labels at all: 259,452 of those businesses are French.

The noise is rich. Names change case and accents, gain brackets, swap legal forms (Inc, Pvt Ltd, SARL), reorder words, collect typos, turn into initials or web handles, or arrive in Devanagari, Bengali, Telugu, Tamil or Kannada. Addresses lose PIN codes, abbreviate "Road" and "Rue", and mistype house numbers. The decoys are built to look right: "Uptown Diner" next to "Uptown Diner Southside", or in France a *sibling* at the business's own address where the distinctive word is swapped for another real one ("Lille Club SARL" becomes "Lille Amicale SARL").

## Start from the record's side

Every Source 2 or 3 record belongs to at most one business, and that holds across all 7,638,365 training pairs. So instead of asking "what are this business's copies?", we ask each record "which business are you, if any?" and group the answers. That reframing turns the task into candidate search plus classification, and it let us run country by country.

The first version, one TF-IDF search and one LightGBM, scored 0.921. A second version with three searches and a pruning cascade reached 0.951. Then the interesting part started.

## Validation is where the score came from

The third version added collective features: how strongly other records already claim the same business. On our validation set it gained +0.006. On the leaderboard it dropped, from 0.951 to 0.948.

I took that as a measurement problem, not a modeling one. The test set had more unmatched records than training: 5.5 to 5.8 records per business against 4.7. A model that is rewarded for merging records into a business will look good on training-like data and hurt you on test data that holds more decoys.

| | Training | Test | Training, 19% hidden |
|---|---|---|---|
| Records per business | 4.7 | 5.5 to 5.8 | 5.77 |
| Records matching nothing | 26% | about 40% | 40% |

So we reshaped validation to look like test, in four moves.

1. **Split by business, never by pair.** A business joins validation when `hash(entity_id, seed 42) % 10 == 0`, and all its records go with it. A second hash splits validation into half A, which makes every choice, and half B, which is only ever used to report.
2. **Match the test density.** We hid 19% of Source 1 businesses from the candidate pool. Their records stay in the data but can no longer be matched, which reproduces the test set's share of unmatched records.
3. **Match the test difficulty.** The unmatched records in test look more like decoys, so we chose the decision rule on a stricter metric that counts every false match from an unmatched record three times.
4. **Compare with a paired bootstrap.** Every change was tested against its predecessor on the same 89,000 half-B businesses, which gives a confidence interval on the difference instead of one number.

Later we noticed something sharper. Empty-address records, which are almost always genuine copies, occur at the same rate per business in training and test (US 0.168 and 0.1665, India 0.139 and 0.138). So the extra test records are decoys with addresses, not copies of businesses missing from Source 1. We built a "test-like" validation without the records that exist only because of the hiding, and used it for the final calibration.

The payoff came near the end. A diagnostic submission scored our US and India predictions at 0.9913 on the test set, exactly the value validation half B had predicted. From then on, offline numbers were something I could act on.

## Finding candidates cheaply

Amazon's email listed what the ranking rewarded: private-leaderboard performance first, then blocking strategy and ML novelty, then candidate efficiency, where fewer candidates per record scored higher. That matched how we already worked. Everything downstream is expensive, so we spent effort making the candidate list short and complete.

For each record, inside its country, we pooled three TF-IDF searches (name plus address, address only, name only, widened when the address is empty) with a fine-tuned `multilingual-e5-small` bi-encoder over the raw "name | address" text, which reads Indian scripts natively. Normalisation transliterates Indian scripts and builds consonant skeletons, so "laaiph investtmentt" and "Life Investment" both become "lf inbstmnt".

One TF-IDF search kept 95.5% of true pairs. All searches plus the bi-encoder keep 98.9%. A small LightGBM then prunes weak candidates, and the cutoff is a trade I could measure on held-out businesses:

| Prune below | Candidates per business | True pairs kept |
|---|---|---|
| 0.001 | 6.27 | 98.93% |
| **0.01 (used)** | **4.82** | **98.75%** |
| 0.02 | 4.42 | 98.59% |
| 0.05 | 4.00 | 98.21% |

On the test set that left 9,365,329 pairs, 5.4 per business, out of about 26 per record before pruning.

## Ranking: features, a cascade and seven cross-encoders

Each surviving pair gets 57 features: RapidFuzz ratios and Jaro-Winkler on names and consonant skeletons, TF-IDF and bi-encoder cosines, house-number and postcode agreement, retrieval ranks, and the legal-form relation. A useful family describes competition: how much probability other records already place on the same business, and how close the runner-up is.

Those group features need out-of-fold probabilities to avoid leaking, so the model is a three-stage LightGBM cascade. Stage 1 uses two out-of-fold models. Stage 2 adds group features computed from stage-1 probabilities, and stage 3 recomputes them from stage 2. The final settings are a learning rate of 0.02, 383 leaves and early stopping on half A.

For the uncertain zone we fine-tuned seven cross-encoders: multilingual-e5 in small, base (two runs) and large, two bge-reranker-v2-m3 models and Qwen3-Reranker-0.6B. Each trained on 0.7 to 1.2 million pairs from records that never touch a validation business, so the stacker later learns from honest scores. The best single model reached a validation log-loss of 0.144. A LightGBM stacker, cross-fitted on half A with two folds by business, merges every cross-encoder logit with the cascade output and the raw pair similarities.

<figure class="fig">
<svg viewBox="0 0 360 887" role="img" aria-labelledby="fp-t"><title id="fp-t">The BizMatch pipeline from raw records to the matching file, in ten steps</title><g><rect class="bx" x="10" y="10" width="340" height="74" rx="8"/><text class="t" x="24" y="34">Raw records</text><text class="s" x="24" y="54">~10M noisy records: name, address,</text><text class="s" x="24" y="71">country</text></g><path class="ar" d="M180 86v10m-4 -4l4 4l4 -4"/><g><rect class="bx" x="10" y="100" width="340" height="74" rx="8"/><text class="t" x="24" y="124">Normalise</text><text class="s" x="24" y="144">Transliteration, abbreviations,</text><text class="s" x="24" y="161">consonant skeletons</text></g><path class="ar" d="M180 176v10m-4 -4l4 4l4 -4"/><g><rect class="bx" x="10" y="190" width="340" height="74" rx="8"/><text class="t" x="24" y="214">Candidate search</text><text class="s" x="24" y="234">3 TF-IDF searches + fine-tuned e5</text><text class="s" x="24" y="251">98.75% recall</text></g><path class="ar" d="M180 266v10m-4 -4l4 4l4 -4"/><g><rect class="bx" x="10" y="280" width="340" height="74" rx="8"/><text class="t" x="24" y="304">Pair features and pruning</text><text class="s" x="24" y="324">57 pair features</text><text class="s" x="24" y="341">stage-A LightGBM drops pairs below 0.01</text></g><path class="ar" d="M180 356v10m-4 -4l4 4l4 -4"/><g><rect class="bx" x="10" y="370" width="340" height="74" rx="8"/><text class="t" x="24" y="394">LightGBM cascade</text><text class="s" x="24" y="414">3 out-of-fold stages with</text><text class="s" x="24" y="431">competing-claim group features</text></g><path class="ar" d="M180 446v10m-4 -4l4 4l4 -4"/><g><rect class="bx" x="10" y="460" width="340" height="74" rx="8"/><text class="t" x="24" y="484">Cross-encoders</text><text class="s" x="24" y="504">7 models re-read the uncertain zone</text><text class="s" x="24" y="521">(e5, bge, Qwen3)</text></g><path class="ar" d="M180 536v10m-4 -4l4 4l4 -4"/><g><rect class="bx" x="10" y="550" width="340" height="57" rx="8"/><text class="t" x="24" y="574">Stacker</text><text class="s" x="24" y="594">Cross-fitted LightGBM merges every score</text></g><path class="ar" d="M180 609v10m-4 -4l4 4l4 -4"/><g class="hl"><rect class="bx" x="10" y="623" width="340" height="74" rx="8"/><text class="t" x="24" y="647">Decision</text><text class="s" x="24" y="667">Exact expected F0.5 per business</text><text class="s" x="24" y="684">(Poisson-binomial DP)</text></g><path class="ar" d="M180 699v10m-4 -4l4 4l4 -4"/><g><rect class="bx dash" x="10" y="713" width="340" height="74" rx="8"/><text class="t" x="24" y="737">Layers on top</text><text class="s" x="24" y="757">France rules · LoRA-judge recalibration</text><text class="s" x="24" y="774">3,744 additions</text></g><path class="ar" d="M180 789v10m-4 -4l4 4l4 -4"/><g class="hl"><rect class="bx" x="10" y="803" width="340" height="74" rx="8"/><text class="t" x="24" y="827">matching_results.tsv</text><text class="s" x="24" y="847">5,866,818 matches over</text><text class="s" x="24" y="864">1,732,544 businesses</text></g></svg>
<figcaption>The pipeline as a funnel. Each step removes work for the next one, and every stage writes Parquet so it can resume on another machine.</figcaption>
</figure>

## The decision is an optimisation, not a threshold

F0.5 is computed per business, so one global cut-off cannot be right for both a business with one sure copy and one with five likely ones. Instead, each record goes to its most probable business. For one business, with its assigned records sorted by probability, selecting the top k scores

```
F0.5 = 1.25·TP / (1.25·TP + FP + 0.25·FN)      FP = k - TP
```

where TP follows a Poisson-binomial distribution over the first k probabilities and FN one over the rest. An empty prediction scores 1 only when the business truly has no copies, which happens with probability ∏(1 - p). A dynamic program computes the exact expected F0.5 for every k, and we keep the best. For independent probabilities the best subset is always a prefix of the sorted list, so this is exact, not a heuristic. Probabilities are sharpened with an exponent of 1.5, chosen on half A, and leaderboard probes on either side confirmed it. We cap each business at 5 Source 2 and 6 Source 3 matches, mirroring the generator.

## France, with no labels

The US and India were at 0.9913. France was where the room was, at 0.953. With no French labels we studied how the generator builds French records, and found two label-free witnesses:

- A cap test. Copies are capped per business and source, so a class of genuine copies disappears at businesses whose other records already fill the cap, while decoys keep appearing there.
- A formatting marker. Copy noise puts the changed word in brackets for 4.2% of French copies and only 0.9% of decoys, and the model's probabilities don't depend on brackets, so the marker is an independent witness.

Using both, we removed same-address one-word swaps to another French vocabulary word (bracket share 0.8%, the sibling decoys) and kept swaps to a misspelling or a generic word like Fils, Cie or Associés (bracket share 6.0%, the signature of copies). The rules lifted our score by 0.0039, in line with what the markers predicted, and moved France from 0.953 to about 0.979.

## A recalibrator built like the test set

With the test-like validation in hand, we trained a residual LightGBM on the uncertain zone. Its inputs were the production probability, generator-operation features (legal-form relation, accents, brackets, word swaps, typo similarity), label-free "orphan" features, and the mean logit of two Qwen2.5-7B judges fine-tuned with LoRA on 400,000 training pairs each. On test-like half B it added +0.00037 (95% CI [+0.00025, +0.00050]) and stayed positive when we doubled the decoys. That run scored 0.990162, which is the best public-leaderboard score we reached.

## Results

<figure class="fig">
<svg viewBox="0 0 360 428" role="img" aria-labelledby="fr-t"><title id="fr-t">Public leaderboard macro F0.5 at eight stages, from 0.921 to 0.990162</title><text class="s lb" x="10" y="22">One TF-IDF search, one LightGBM</text><rect class="bar" x="10" y="30" width="48" height="14" rx="3"/><text class="t vl" x="66" y="42">0.921</text><text class="s lb" x="10" y="70">Three searches, pruning cascade</text><rect class="bar" x="10" y="78" width="117" height="14" rx="3"/><text class="t vl" x="135" y="90">0.951</text><text class="s lb" x="10" y="118">Collective features (validation said +0.006)</text><rect class="bar bad" x="10" y="126" width="110" height="14" rx="3"/><text class="t vl bad" x="128" y="138">0.948</text><text class="s lb" x="10" y="166">Test-like validation, bi-encoder</text><rect class="bar" x="10" y="174" width="149" height="14" rx="3"/><text class="t vl" x="167" y="186">0.965</text><text class="s lb" x="10" y="214">Cross-encoders and a stacker</text><rect class="bar" x="10" y="222" width="193" height="14" rx="3"/><text class="t vl" x="211" y="234">0.984</text><text class="s lb" x="10" y="262">Seven cross-encoders</text><rect class="bar" x="10" y="270" width="197" height="14" rx="3"/><text class="t vl" x="215" y="282">0.985628</text><text class="s lb" x="10" y="310">Generator-aware France rules</text><rect class="bar" x="10" y="318" width="206" height="14" rx="3"/><text class="t vl" x="224" y="330">0.989496</text><text class="s lb" x="10" y="358">Test-like recalibration, LoRA judges</text><rect class="bar hl" x="10" y="366" width="207" height="14" rx="3"/><text class="t vl hl" x="225" y="378">0.990162</text><text class="s" x="10" y="418">Bars start at 0.9, so length shows the gain, not a ratio.</text></svg>
<figcaption>Public-leaderboard macro F0.5 at each stage. The third bar is the lesson: a change that gained on validation lost on the leaderboard, so the next step was to rebuild validation.</figcaption>
</figure>

The final file adds 3,744 high-precision matches to that run. Each one had to be a record the calibrated model had not already scored, so every addition brought new information instead of overriding a judgement. Some came from structural rules measured on training truth: one-token names at an address that belongs to a single business (98% to 100% correct), initials and web handles on the same street (95% to 100%), and Indic-script names matched through a transliteration dictionary learned from training pairs (99%). The rest came from learned tie-breakers at 88% to 98% precision in the bands we used.

The submission holds 5,866,818 matches over 1,732,544 businesses, 3.39 per business against 3.46 true copies in training, with 99,324 businesses (5.7%) left empty against 5.6% in training. For every class of name change, accepted pairs per business matched true copies per business in training at ratios between 0.99 and 1.02.

## Built on free compute

None of us had sponsored compute, so we assembled it: AWS EC2 on promotional credits for the pipeline and the stack, Kaggle's 2×T4 and a Modal H100 for cross-encoders, Lightning AI for the LoRA judges and a laptop RTX 4060 for the bi-encoder. Every stage writes Parquet artifacts that another machine can pick up, long CPU jobs ran on spot instances under a watchdog that resumes from checkpoints, and each GPU job is a small script that uploads inputs and returns only scores. When AWS blocked our account on 26 September, a day before we submitted, that structure kept us moving. Every model is MIT or Apache-2.0 and at most 8B parameters, and we used only the provided data.

## What I am taking with me

- Build the validation set first. Reshape it to match test before trusting any improvement.
- Study how the data was made. After the core model worked, the biggest gains came from questions about the generator: how many unmatched records test holds, what they look like, and how a French copy gets written.
- Optimise the metric at the level it is scored. Expected F0.5 per business beat every threshold I could tune.
- Give rules to the model, not the last word. The French variants that fed the model beat the ones that overrode it.
- Make every stage resumable. It turned a blocked account from a crisis into a detour.

The code, the reproduction steps and a methodology document are in the [BizMatch repository](https://github.com/G26karthik/bizmatch-amazon-ml-2026). For a shorter summary of the project, see the [case study](/work/bizmatch/).
