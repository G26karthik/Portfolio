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
  /** Highest-quality PRs: listed first; the rest sit under "Show more". */
  top?: true;
}

export const ossStats = { contributions: 51, merged: 48, credited: 3, projects: 38, stars: '460K+' };

const gh = (repo: string, n: number) => `https://github.com/${repo}/pull/${n}`;

export const merged: PR[] = [
  { project: 'PyTorch', stars: '105.4K', n: '#199953', href: gh('pytorch/pytorch', 199953), what: 'SGD rejects NaN lr, momentum and weight_decay at construction instead of silently training on NaN.', area: 'ML', top: true },
  { project: 'mem0', stars: '68.8K', n: '#3549', href: gh('mem0ai/mem0', 3549), what: 'Azure AI Search vector store for the TypeScript SDK: hybrid search, quantization, OData filters (+754 lines).', area: 'Agents', top: true },
  { project: 'Hindsight', stars: '57.9K', n: '#5092', href: gh('vectorize-io/hindsight', 5092), what: 'Fixed two silent audit-log losses: GC-able fire-and-forget tasks and writes dropped at shutdown.', area: 'Agents', top: true },
  { project: 'Ruff', stars: '51.1K', n: '#30189', href: gh('astral-sh/ruff', 30189), what: 'The B028 and UP022 autofixes no longer produce broken code when a keyword argument has a parenthesized value, such as category=(DeprecationWarning).', area: 'Tooling', top: true },
  { project: 'pandas', stars: '50.5K', n: '#62592', href: gh('pandas-dev/pandas', 62592), what: 'Regression test for a PyArrow datetime merge (GH#61926).', area: 'Data' },
  { project: 'pandas', stars: '50.5K', n: '#62591', href: gh('pandas-dev/pandas', 62591), what: 'Ruff B905 strict-zip enforcement in pandas/_config.', area: 'Data' },
  { project: 'pandas', stars: '50.5K', n: '#62600', href: gh('pandas-dev/pandas', 62600), what: '@Appender to inline docstring migration for DataFrame.items().', area: 'Data' },
  { project: 'matplotlib', stars: '23.4K', n: '#30639', href: gh('matplotlib/matplotlib', 30639), what: 'Documented the TwoSlopeNorm linear colorbar workaround.', area: 'Data' },
  { project: 'tantivy', stars: '16.4K', n: '#3241', href: gh('quickwit-oss/tantivy', 3241), what: 'BitSet::clear now resets the cached length, so len() no longer reports the old count after a clear.', area: 'Data', top: true },
  { project: 'webpack-bundle-analyzer', stars: '12.7K', n: '#753', href: gh('webpack/webpack-bundle-analyzer', 753), what: 'A chunk with about 130,000 modules or more no longer crashes the analyzer with a call stack overflow.', area: 'Tooling', top: true },
  { project: 'sktime', stars: '10.1K', n: '#8923', href: gh('sktime/sktime', 8923), what: 'Repaired broken pytorch-forecasting doc references in forecaster adapters.', area: 'ML' },
  { project: 'SQLFluff', stars: '10.0K', n: '#7163', href: gh('sqlfluff/sqlfluff', 7163), what: 'PostgreSQL OPERATOR(schema.operator) parser via a new QualifiedOperatorSegment (+649 lines).', area: 'Tooling', top: true },
  { project: 'hiring-agent', stars: '7.3K', n: '#133', href: gh('interviewstreet/hiring-agent', 133), what: 'Fixed a PyMuPDF memory leak that grew by hundreds of MB over ~50-PDF batches.', area: 'Agents', top: true },
  { project: 'hiring-agent', stars: '7.3K', n: '#129', href: gh('interviewstreet/hiring-agent', 129), what: 'Fixed cross-platform UTF-8 cache-write failures on Windows.', area: 'Agents' },
  { project: 'mockery', stars: '7.2K', n: '#1208', href: gh('vektra/mockery', 1208), what: 'Removed an unused import from the replace-type example in the docs.', area: 'Tooling' },
  { project: 'authlib', stars: '5.4K', n: '#974', href: gh('authlib/authlib', 974), what: 'OAuth endpoints now answer insecure-transport requests with a proper error response instead of raising.', area: 'Tooling', top: true },
  { project: 'PyTorch-Ignite', stars: '4.8K', n: '#3876', href: gh('pytorch/ignite', 3876), what: 'ReduceLROnPlateauScheduler now respects min_lr instead of decaying past it.', area: 'ML', top: true },
  { project: 'Kinto', stars: '4.4K', n: '#3823', href: gh('Kinto/kinto', 3823), what: 'Search filters now match special characters in the search value literally, on both storage backends.', area: 'Data' },
  { project: 'NumPyro', stars: '2.8K', n: '#2364', href: gh('pyro-ppl/numpyro', 2364), what: 'Hurdle distributions over positive continuous bases now include zero in their support.', area: 'Science', top: true },
  { project: 'NumPyro', stars: '2.8K', n: '#2370', href: gh('pyro-ppl/numpyro', 2370), what: 'init_to_mean falls back to the median when a heavy-tailed prior has no finite mean.', area: 'Science' },
  { project: 'pulldown-cmark', stars: '2.8K', n: '#1192', href: gh('pulldown-cmark/pulldown-cmark', 1192), what: 'Fixed the strikethrough wording in the superscript and subscript spec.', area: 'Tooling' },
  { project: 'QuTiP', stars: '2.1K', n: '#3049', href: gh('qutip/qutip', 3049), what: 'rand_dm / rand_herm no longer hang forever on equal eigenvalues.', area: 'Science', top: true },
  { project: 'cspell', stars: '1.7K', n: '#9519', href: gh('streetsidesoftware/cspell', 9519), what: 'Cached issues are reported at the file’s current location, so a cache copied to another folder or machine no longer prints old paths.', area: 'Tooling' },
  { project: 'cspell', stars: '1.7K', n: '#9579', href: gh('streetsidesoftware/cspell', 9579), what: 'Added a Vim file type for .vim files and .vimrc.', area: 'Tooling' },
  { project: 'voxbento', stars: '1.5K', n: '#875', href: gh('fossasia/voxbento', 875), what: 'OpenAI chunked transcription labelled its 24 kHz audio as 16 kHz, so OpenAI heard it at 2/3 speed; each provider now declares its sample rate.', area: 'ML' },
  { project: 'JSXGraph', stars: '1.5K', n: '#848', href: gh('jsxgraph/jsxgraph', 848), what: 'JXG.Math.pow(0, x) now returns Infinity for negative x instead of 0, so x^(-2) gets a pole at x = 0.', area: 'Science' },
  { project: 'PyMC-Marketing', stars: '1.3K', n: '#3215', href: gh('pymc-labs/pymc-marketing', 3215), what: 'Fixed notebook equation rendering.', area: 'Science' },
  { project: 'PyMC-Marketing', stars: '1.3K', n: '#3206', href: gh('pymc-labs/pymc-marketing', 3206), what: 'Fixed extend_dataset.', area: 'Science' },
  { project: 'PyMC-Marketing', stars: '1.3K', n: '#3334', href: gh('pymc-labs/pymc-marketing', 3334), what: 'Silenced a sphinx-design 0.8 deprecation warning that was failing the docs build.', area: 'Science' },
  { project: 'Phobos (D standard library)', stars: '1.3K', n: '#11149', href: gh('dlang/phobos', 11149), what: 'BigInt to float and double conversion was wrong at 64-bit word boundaries and overflowed to infinity two binades early.', area: 'Tooling', top: true },
  { project: 'OWASP pytm', stars: '1.2K', n: '#390', href: gh('OWASP/pytm', 390), what: '--stale_days no longer warns a day early: the age is compared before it is rounded.', area: 'Tooling' },
  { project: 'NetworKit', stars: '884', n: '#1564', href: gh('networkit/networkit', 1564), what: 'SpectralColoring no longer raises IndexError on small graphs such as K2 and C4.', area: 'Science', top: true },
  { project: 'NetworKit', stars: '884', n: '#1572', href: gh('networkit/networkit', 1572), what: 'overview() no longer raises on an empty graph (ZeroDivisionError undirected, ValueError directed); it prints zeros.', area: 'Science' },
  { project: 'Doctrine MongoDB ODM', stars: '1.1K', n: '#3099', href: gh('doctrine/mongodb-odm', 3099), what: 'Documented MongoDB text indexes: attribute and XML mapping, the weights, default_language and language_override options, and when schema update recreates the index.', area: 'Data' },
  { project: 'sbi', stars: '882', n: '#2078', href: gh('sbi-dev/sbi', 2078), what: 'Sinkhorn solver behind wasserstein_2_squared now stops on marginal error and warns when unconverged.', area: 'Science' },
  { project: 'sbi', stars: '882', n: '#2079', href: gh('sbi-dev/sbi', 2079), what: 'MixtureDensityEstimator.log_prob was off by (D−1)·log(std) under structured z-scoring.', area: 'Science', top: true },
  { project: 'Sentient', stars: '719', n: '#553', href: gh('existence-master/Sentient', 553), what: 'A claimed memory save in a memory-off turn no longer triggers the stored-memory check.', area: 'Agents' },
  { project: 'bandersnatch', stars: '559', n: '#2402', href: gh('pypa/bandersnatch', 2402), what: 'The prerelease filter now matches projects whose PyPI name is not canonical, such as Django.', area: 'Tooling' },
  { project: 'Charon', stars: '477', n: '#1597', href: gh('AeneasVerif/charon', 1597), what: 'Fixed --dest-file and --dest-dir being resolved against the manifest directory instead of the working directory under charon cargo.', area: 'Tooling' },
  { project: 'toqito', stars: '293', n: '#1989', href: gh('vprusso/toqito', 1989), what: 'kraus_to_choi misread wrapped completely-positive Kraus lists.', area: 'Science' },
  { project: 'openfoodfacts-dart', stars: '231', n: '#1310', href: gh('openfoodfacts/openfoodfacts-dart', 1310), what: 'The barcode validator no longer accepts non-digit characters as an EAN.', area: 'Tooling' },
  { project: 'QuTiP-QIP', stars: '157', n: '#427', href: gh('qutip/qutip-qip', 427), what: 'Processor.run_state no longer mutates the caller’s collapse operators.', area: 'Science' },
  { project: 'PyMC-Extras', stars: '143', n: '#802', href: gh('pymc-devs/pymc-extras', 802), what: 'Deterministic Windows parallel-pathfinder test.', area: 'Science' },
  { project: 'Phoenix', stars: '88', n: '#1060', href: gh('HSF/phoenix', 1060), what: '"Extend to radius" on tracks now ends on the requested radius instead of one step short.', area: 'Science' },
  { project: 'ScyllaDB python-driver', stars: '82', n: '#1157', href: gh('scylladb/python-driver', 1157), what: 'VectorType now reports vector as its typename.', area: 'Data' },
  { project: 'naija-nutri-hub', stars: '24', n: '#52', href: gh('mlsanigeria/naija-nutri-hub', 52), what: 'Secure OTP email verification on signup, with rollback on failure.', area: 'Tooling' },
  { project: 'ArviZ-Stats', stars: '18', n: '#528', href: gh('arviz-devs/arviz-stats', 528), what: 'histogram gave boolean and unsigned-integer data fractional, mostly empty bins; it now bins them as integers.', area: 'Science' },
  { project: 'ArviZ-Stats', stars: '18', n: '#505', href: gh('arviz-devs/arviz-stats', 505), what: 'histogram put the two largest integer values in one bin; 0/1 data got a single bin.', area: 'Science' },
];

/** Merged PRs with the highest-quality ones first (order inside each group is unchanged). */
export const ranked: PR[] = [...merged.filter((p) => p.top), ...merged.filter((p) => !p.top)];

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
