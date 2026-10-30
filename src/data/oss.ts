// Upstream PRs, status-tagged exactly as 29-10-26/Open Source Contributions.md.
// Stars from that file's §8 index. Never write "rejected".

export type Status = 'Merged' | 'Open' | 'Closed-Unmerged';

export interface PR {
  project: string;
  stars: string;
  n: string;
  href: string;
  what: string;
  area: 'ML' | 'Data' | 'Agents' | 'Science' | 'Tooling';
}

export const ossStats = { merged: 24, projects: 18, stars: '338K+' };

const gh = (repo: string, n: number) => `https://github.com/${repo}/pull/${n}`;

export const merged: PR[] = [
  { project: 'PyTorch', stars: '105.0K', n: '#199953', href: gh('pytorch/pytorch', 199953), what: 'SGD rejects NaN lr, momentum and weight_decay at construction instead of silently training on NaN.', area: 'ML' },
  { project: 'mem0', stars: '67.6K', n: '#3549', href: gh('mem0ai/mem0', 3549), what: 'Azure AI Search vector store for the TypeScript SDK: hybrid search, quantization, OData filters (+754 lines).', area: 'Agents' },
  { project: 'Hindsight', stars: '52.6K', n: '#5092', href: gh('vectorize-io/hindsight', 5092), what: 'Fixed two silent audit-log losses: GC-able fire-and-forget tasks and writes dropped at shutdown.', area: 'Agents' },
  { project: 'pandas', stars: '50.2K', n: '#62592', href: gh('pandas-dev/pandas', 62592), what: 'Regression test for a PyArrow datetime merge (GH#61926).', area: 'Data' },
  { project: 'pandas', stars: '50.2K', n: '#62591', href: gh('pandas-dev/pandas', 62591), what: 'Ruff B905 strict-zip enforcement in pandas/_config.', area: 'Data' },
  { project: 'pandas', stars: '50.2K', n: '#62600', href: gh('pandas-dev/pandas', 62600), what: '@Appender to inline docstring migration for DataFrame.items().', area: 'Data' },
  { project: 'matplotlib', stars: '23.4K', n: '#30639', href: gh('matplotlib/matplotlib', 30639), what: 'Documented the TwoSlopeNorm linear colorbar workaround.', area: 'Data' },
  { project: 'sktime', stars: '10.1K', n: '#8923', href: gh('sktime/sktime', 8923), what: 'Repaired broken pytorch-forecasting doc references in forecaster adapters.', area: 'ML' },
  { project: 'SQLFluff', stars: '10.0K', n: '#7163', href: gh('sqlfluff/sqlfluff', 7163), what: 'PostgreSQL OPERATOR(schema.operator) parser via a new QualifiedOperatorSegment (+649 lines).', area: 'Tooling' },
  { project: 'hiring-agent', stars: '7.3K', n: '#133', href: gh('interviewstreet/hiring-agent', 133), what: 'Fixed a PyMuPDF memory leak that grew by hundreds of MB over ~50-PDF batches.', area: 'Agents' },
  { project: 'hiring-agent', stars: '7.3K', n: '#129', href: gh('interviewstreet/hiring-agent', 129), what: 'Fixed cross-platform UTF-8 cache-write failures on Windows.', area: 'Agents' },
  { project: 'PyTorch-Ignite', stars: '4.8K', n: '#3876', href: gh('pytorch/ignite', 3876), what: 'ReduceLROnPlateauScheduler now respects min_lr instead of decaying past it.', area: 'ML' },
  { project: 'NumPyro', stars: '2.8K', n: '#2364', href: gh('pyro-ppl/numpyro', 2364), what: 'Hurdle distributions over positive continuous bases now include zero in their support.', area: 'Science' },
  { project: 'NumPyro', stars: '2.8K', n: '#2370', href: gh('pyro-ppl/numpyro', 2370), what: 'init_to_mean falls back to the median when a heavy-tailed prior has no finite mean.', area: 'Science' },
  { project: 'QuTiP', stars: '2.1K', n: '#3049', href: gh('qutip/qutip', 3049), what: 'rand_dm / rand_herm no longer hang forever on equal eigenvalues.', area: 'Science' },
  { project: 'PyMC-Marketing', stars: '1.3K', n: '#3215', href: gh('pymc-labs/pymc-marketing', 3215), what: 'Fixed notebook equation rendering.', area: 'Science' },
  { project: 'PyMC-Marketing', stars: '1.3K', n: '#3206', href: gh('pymc-labs/pymc-marketing', 3206), what: 'Fixed extend_dataset.', area: 'Science' },
  { project: 'sbi', stars: '876', n: '#2078', href: gh('sbi-dev/sbi', 2078), what: 'Sinkhorn solver behind wasserstein_2_squared now stops on marginal error and warns when unconverged.', area: 'Science' },
  { project: 'sbi', stars: '876', n: '#2079', href: gh('sbi-dev/sbi', 2079), what: 'MixtureDensityEstimator.log_prob was off by (D−1)·log(std) under structured z-scoring.', area: 'Science' },
  { project: 'toqito', stars: '292', n: '#1989', href: gh('vprusso/toqito', 1989), what: 'kraus_to_choi misread wrapped completely-positive Kraus lists.', area: 'Science' },
  { project: 'QuTiP-QIP', stars: '157', n: '#427', href: gh('qutip/qutip-qip', 427), what: 'Processor.run_state no longer mutates the caller’s collapse operators.', area: 'Science' },
  { project: 'PyMC-Extras', stars: '143', n: '#802', href: gh('pymc-devs/pymc-extras', 802), what: 'Deterministic Windows parallel-pathfinder test.', area: 'Science' },
  { project: 'naija-nutri-hub', stars: '24', n: '#52', href: gh('mlsanigeria/naija-nutri-hub', 52), what: 'Secure OTP email verification on signup, with rollback on failure.', area: 'Tooling' },
  { project: 'ArviZ-Stats', stars: '18', n: '#505', href: gh('arviz-devs/arviz-stats', 505), what: 'histogram put the two largest integer values in one bin; 0/1 data got a single bin.', area: 'Science' },
];

/** Credit without a merge. Safe phrasing only: the maintainer landed the fix. */
export const credited = [
  { project: 'Langfuse', status: 'Closed-Unmerged' as Status, text: 'Diagnosed a prompt-cache key collision (version 3 and label "3" shared one Redis key). Maintainers landed the fix as #15040, crediting my PR #14789.', href: gh('langfuse/langfuse', 14789) },
  { project: 'PyTensor', status: 'Closed-Unmerged' as Status, text: 'Found a numba Cholesky compile failure on read-only inputs. The maintainer landed the fix in #2558 with me as co-author (my PR #2548).', href: 'https://github.com/pymc-devs/pytensor/pull/2548' },
  { project: 'PyMC', status: 'Closed-Unmerged' as Status, text: 'Found wrong ExGaussian and SkewStudentT means. The maintainer landed the fix with me as co-author (my PR #8515).', href: 'https://github.com/pymc-devs/pymc/pull/8515' },
];

/** Langfuse security recognition: a separate story from the cache fix. */
export const hallOfFame = {
  text: 'Listed in the Langfuse Responsible Disclosure Hall of Fame (Jul 2026) for a responsibly disclosed project-role update issue.',
  href: 'https://langfuse.com/security/responsible-disclosure#hall-of-fame',
};
