export const ossStats = { merged: 13, open: 2, repos: 11 };

export const marqueeRepos = [
  'pandas',
  'matplotlib',
  'sqlfluff',
  'mem0',
  'sktime',
  'hiring-agent',
  'naija-nutri-hub',
  'model-spec',
  'mifos-gazelle',
];

export interface PullRequest {
  repo: string;
  title: string;
  status: 'merged' | 'open';
  detail: string;
  url: string;
}

export const pullRequests: PullRequest[] = [
  {
    repo: 'pandas-dev/pandas',
    title: 'TST: regression test for PyArrow datetime merge with duplicates',
    status: 'merged',
    detail: 'Locked in a fix for merges crashing on duplicated PyArrow timestamps (GH#61926).',
    url: 'https://github.com/pandas-dev/pandas/pull/62592',
  },
  {
    repo: 'pandas-dev/pandas',
    title: 'STY: enforce Ruff B905 strict-zip in pandas/_config',
    status: 'merged',
    detail: 'Hardened set_option/option_context iteration against silent zip truncation.',
    url: 'https://github.com/pandas-dev/pandas/pull/62591',
  },
  {
    repo: 'pandas-dev/pandas',
    title: 'DOC: replace @Appender with inline docstring for DataFrame.items',
    status: 'merged',
    detail: 'Part of the codebase-wide effort removing dynamic docstring generation.',
    url: 'https://github.com/pandas-dev/pandas/pull/62600',
  },
  {
    repo: 'sqlfluff/sqlfluff',
    title: 'Add support for PostgreSQL OPERATOR() syntax',
    status: 'merged',
    detail: 'New QualifiedOperatorSegment via RegexParser, expanding the core dialect parser.',
    url: 'https://github.com/sqlfluff/sqlfluff/pull/7163',
  },
  {
    repo: 'mem0ai/mem0',
    title: 'feat: Azure AI Search vector store for the TypeScript SDK',
    status: 'merged',
    detail: '~646 LOC: hybrid search, scalar/binary quantization, OData filters, factory wiring.',
    url: 'https://github.com/mem0ai/mem0/pull/3549',
  },
  {
    repo: 'interviewstreet/hiring-agent',
    title: 'fix: context manager for PyMuPDF to prevent memory leaks',
    status: 'merged',
    detail: 'Stabilized batch PDF processing, validated across 50+ resume runs.',
    url: 'https://github.com/interviewstreet/hiring-agent/pull/133',
  },
  {
    repo: 'interviewstreet/hiring-agent',
    title: 'fix: UTF-8 encoding for cache writes on Windows',
    status: 'merged',
    detail: 'Eliminated cp1252 UnicodeEncodeError crashes for Windows users.',
    url: 'https://github.com/interviewstreet/hiring-agent/pull/129',
  },
  {
    repo: 'matplotlib/matplotlib',
    title: 'DOC: linear colorbar scale note for TwoSlopeNorm',
    status: 'merged',
    detail: 'Documented the workaround restoring legacy linear colorbar spacing.',
    url: 'https://github.com/matplotlib/matplotlib/pull/30639',
  },
  {
    repo: 'sktime/sktime',
    title: 'DOC: fix broken pytorch-forecasting references',
    status: 'merged',
    detail: 'Traced and repaired 8 dead URLs across 4 adapter classes.',
    url: 'https://github.com/sktime/sktime/pull/8923',
  },
  {
    repo: 'mlsanigeria/naija-nutri-hub',
    title: 'feat: OTP email verification on signup',
    status: 'merged',
    detail: 'Secure OTP flow with database rollback-on-failure, merged same day.',
    url: 'https://github.com/mlsanigeria/naija-nutri-hub/pull/52',
  },
  {
    repo: 'modelpack/model-spec',
    title: 'fix(schema): report example parsing errors in tests',
    status: 'open',
    detail: 'Go variable-scoping fix that un-silences swallowed validation failures.',
    url: 'https://github.com/modelpack/model-spec/pull/211',
  },
  {
    repo: 'openMF/mifos-gazelle',
    title: 'GAZ-42: fix invalid Kubernetes memory quantity',
    status: 'open',
    detail: '192Miq → 192Mi, prevents silent Helm deployment rejections.',
    url: 'https://github.com/openMF/mifos-gazelle/pull/140',
  },
];
