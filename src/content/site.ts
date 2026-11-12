// All marketing copy and code samples for the site live here, so pages stay
// layout-only and claims can be checked against the Stratus docs in one place.

import { serviceCount } from "./services";

export const links = {
  repo: "https://github.com/rmukubvu/stratus",
  docs: "https://github.com/rmukubvu/stratus/tree/main/docs",
  controlApiDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/control-api.md",
  ciDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/ci.md",
  selfHostedDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/ci.md#self-hosted-runners",
  enginesDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/engines.md",
  chaosDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/chaos.md",
  fisDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/fis.md",
  agentsDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/agents.md",
  benchmarkDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/benchmark.md",
  agentDemo: "https://github.com/rmukubvu/stratus/tree/main/examples/agent-demo",
  sdkTs: "https://github.com/rmukubvu/stratus/tree/main/sdk/typescript",
  sdkPy: "https://github.com/rmukubvu/stratus/tree/main/sdk/python",
  npmPackage: "https://www.npmjs.com/package/stratus-emulator",
  pypiPackage: "https://pypi.org/project/stratus-emulator/",
  iamDoc: "https://github.com/rmukubvu/stratus/blob/main/docs/iam.md",
  awsEmulatorDocs: "https://docs.aws.amazon.com/emulator/",
  preflightRepo: "https://github.com/rmukubvu/preflight",
  kanu: "https://www.getkanu.com/",
} as const;

export const installCommand = "brew install rmukubvu/tap/stratus";

export type Stat = { value: string; label: string; detail: string };

export const stats: Stat[] = [
  { value: "89x", label: "faster test isolation", detail: "Snapshot restore vs. re-running setup between tests" },
  { value: "2.2 s", label: "for 200 tests", detail: "Isolation overhead, down from 196 s" },
  { value: String(serviceCount), label: "AWS services", detail: "From S3 and Lambda to real RDS, Kafka and Bedrock replay" },
  { value: "1", label: "binary, every OS", detail: "Linux, macOS and Windows. Docker only for real engines" },
];

export const worksWith = [
  "AWS CLI",
  "AWS SDKs",
  "AWS CDK",
  "Terraform",
  "GitHub Actions",
  "Claude Code",
  "Cursor",
  "Codex",
  "Any MCP client",
];

export type Pillar = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
};

export const pillars: Pillar[] = [
  {
    id: "control",
    kicker: "Control API",
    title: "A clean slate in milliseconds",
    body: "Health, reset, snapshot and restore over one JSON API. Snapshots hard-link blobs, so they stay fast even with large S3 objects.",
    bullets: ["/health and /ready probes", "Per-service or full reset", "Named, reusable snapshots"],
  },
  {
    id: "ci",
    kicker: "Clean, fast CI",
    title: "Every run gets its own AWS",
    body: "stratus ci starts a private instance on a free port, seeds it, runs your tests and removes everything after, pass or fail.",
    bullets: ["Seed once, fork many jobs", "Orphaned containers reaped", "GitHub Action, hosted or self-hosted"],
  },
  {
    id: "chaos",
    kicker: "Deterministic chaos",
    title: "Faults you can replay",
    body: "Seeded errors, throttling, latency and dropped events. Same seed, same faults, so a chaos failure is a bug you can debug, not a flake.",
    bullets: ["API calls and internal events", "AWS FIS templates run unchanged", "No mesh, sidecar or code changes"],
  },
  {
    id: "agents",
    kicker: "Agent-native",
    title: "Built for coding agents",
    body: "An MCP server, TypeScript and Python SDKs, and diagnostics written for LLMs that say why a call failed and whether it was your bug.",
    bullets: ["stratus mcp for any MCP client", "Typed SDKs with auto-cleanup", "Plain-language failure diagnosis"],
  },
];

export type CodeSample = {
  label: string;
  language: string;
  code: string;
  /** What the copy button copies when it should differ from the shown code, e.g. a command without its output. */
  copyText?: string;
};

export const heroTerminal = [
  { kind: "cmd", text: "stratus ci --seed ./snapshots/seeded -- go test ./..." },
  { kind: "dim", text: "→ private stratus on :52817 · fresh data dir" },
  { kind: "dim", text: "→ seeded from snapshot \"seeded\" in 12 ms" },
  { kind: "ok", text: "ok   orders/api        1.84s" },
  { kind: "ok", text: "ok   orders/worker     2.10s" },
  { kind: "ok", text: "ok   payments          0.97s" },
  { kind: "dim", text: "→ stopped 2 Lambda containers · removed data dir" },
  { kind: "done", text: "exit 0  ·  nothing left behind" },
] as const;

export const controlEndpoints = [
  { method: "GET", path: "/health", note: "Status and readiness" },
  { method: "POST", path: "/reset", note: "Wipe all, or just [\"s3\", \"sqs\"]" },
  { method: "POST", path: "/snapshots", note: "Capture everything as \"baseline\"" },
  { method: "POST", path: "/snapshots/{name}/restore", note: "Roll back to it" },
];

export const controlSample: CodeSample[] = [
  {
    label: "CLI",
    language: "sh",
    code: `stratus wait                     # until /ready says yes
./scripts/seed.sh                # tables, queues, buckets, lambdas
stratus snapshot save baseline

go test ./orders/...             # tests mutate state freely
stratus snapshot restore baseline  # ~11 ms back to known-good
stratus reset s3 sqs             # or wipe just a couple of services`,
  },
  {
    label: "HTTP",
    language: "sh",
    code: `curl -X POST localhost:4566/_stratus/control/v1/snapshots \\
  -d '{"name": "baseline"}'

curl -X POST localhost:4566/_stratus/control/v1/snapshots/baseline/restore

# Errors carry a stable code and a hint
{"error": {"code": "SnapshotNotFound",
           "hint": "list snapshots with GET /_stratus/control/v1/snapshots"}}`,
  },
];

export const ciSteps = [
  { title: "Fresh instance", body: "Free port, empty data directory, AWS_ENDPOINT_URL set for your command." },
  { title: "Seeded in ms", body: "Start from a seeded snapshot. Each job gets its own hard-linked copy." },
  { title: "Your tests run", body: "The exit code is yours. Infra failures exit 125, so you can tell them apart." },
  { title: "Nothing left behind", body: "Lambda, database and cache containers stopped and the data dir deleted, even on Ctrl-C." },
];

export type CiFeature = { title: string; body: string };

export const ciFeatures: CiFeature[] = [
  {
    title: "An isolated AWS per run",
    body: "Each run gets its own port, data directory and container names, so parallel jobs never see each other's writes.",
  },
  {
    title: "Seed once, fork many",
    body: "Start every job from one snapshot. Blobs are hard-linked, and RDS and ElastiCache come up with the rows and keys they held.",
  },
  {
    title: "Infra failures exit 125",
    body: "The exit code is your command's. If Stratus itself fails to start, you get 125, so a broken setup never looks like a failing test.",
  },
  {
    title: "Self-cleaning, even after a crash",
    body: "Containers are labelled with the instance, process and host that own them. The next start reaps anything a killed run left behind.",
  },
  {
    title: "GitHub Action, two ways",
    body: "Wrap one command with run, or start a background instance on a free port for later steps. A post step stops it and removes its containers when the job ends.",
  },
  {
    title: "Hosted and self-hosted runners",
    body: "Linux, macOS and Windows runners, and persistent self-hosted hosts running several jobs at once. Only Lambda and the real engines need Docker.",
  },
];

export const ciSample: CodeSample[] = [
  {
    label: "GitHub Action",
    language: "yaml",
    code: `jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: rmukubvu/stratus@main
        with:
          seed: ./fixtures/snapshots/seeded   # optional
          run: go test ./...`,
  },
  {
    label: "Background instance",
    language: "yaml",
    code: `steps:
  - uses: actions/checkout@v4
  - uses: rmukubvu/stratus@main   # free port, AWS_ENDPOINT_URL exported
    id: stratus
  - run: npm test
  - run: stratus snapshot save after-tests
  # post step: stops Stratus and removes its containers`,
  },
  {
    label: "Parallel jobs",
    language: "sh",
    code: `# Seed once
stratus serve --data-dir ./fixtures &
stratus wait && ./scripts/seed.sh
stratus snapshot save seeded

# Fork many: each job is isolated, writes never leak
stratus ci --seed ./fixtures/snapshots/seeded -- go test ./orders/...   &
stratus ci --seed ./fixtures/snapshots/seeded -- go test ./payments/... &
wait`,
  },
];

export type BenchmarkRow = { strategy: string; medianMs: number; total: string; speedup: string; highlight?: boolean };

export const benchmark: BenchmarkRow[] = [
  { strategy: "Fresh emulator + setup", medianMs: 982.1, total: "196.4 s", speedup: "1.0x" },
  { strategy: "Reset + setup", medianMs: 1028.2, total: "205.6 s", speedup: "1.0x" },
  { strategy: "Fresh from snapshot (--seed)", medianMs: 12.5, total: "2.5 s", speedup: "78x", highlight: true },
  { strategy: "Snapshot restore", medianMs: 11.1, total: "2.2 s", speedup: "89x", highlight: true },
];

export const eventPaths = ["SQS → Lambda", "Kinesis → Lambda", "DynamoDB Streams → Lambda", "SNS fan-out", "EventBridge targets", "Step Functions tasks", "Lambda destinations"];

export const chaosActions = ["throttle", "internal_error", "unavailable", "error", "latency", "drop", "cold_start", "function_error", "duplicate"];

export const chaosSample: CodeSample[] = [
  {
    label: "Native experiment",
    language: "json",
    code: `{
  "seed": 1234,
  "duration_seconds": 300,
  "rules": [
    { "id": "throttle-orders", "service": "dynamodb",
      "operation": "PutItem", "resource": "orders",
      "action": "throttle", "probability": 0.2 },
    { "id": "slow-s3", "service": "s3", "action": "latency",
      "latency": { "delay_ms": 400, "jitter_ms": 200 } },
    { "id": "cold-checkout", "service": "lambda",
      "resource": "checkout", "action": "cold_start", "max_hits": 1 }
  ]
}`,
  },
  {
    label: "AWS FIS",
    language: "sh",
    code: `export AWS_ENDPOINT_URL=http://localhost:4566

# The same templates you run against AWS, unchanged
aws fis create-experiment-template --cli-input-json file://template.json
aws fis start-experiment \\
  --experiment-template-id EXT123 --tags stratus:seed=42
aws fis get-experiment --id EXP456`,
  },
];

export const mcpTools = [
  "stratus_status",
  "stratus_connection_info",
  "stratus_diagnose",
  "stratus_reset",
  "stratus_snapshot_save",
  "stratus_snapshot_restore",
  "stratus_chaos_start",
  "stratus_chaos_stop",
];

export const mcpInstall = "claude mcp add stratus -- stratus mcp --start";

export type SdkInstall = { registry: string; command: string; href: string };

export const sdkInstalls: SdkInstall[] = [
  { registry: "npm", command: "npm install stratus-emulator", href: links.npmPackage },
  { registry: "PyPI", command: "pip install stratus-emulator", href: links.pypiPackage },
];

export const sdkSample: CodeSample[] = [
  {
    label: "TypeScript",
    language: "ts",
    code: `import { StratusClient } from "stratus-emulator";
import { S3Client } from "@aws-sdk/client-s3";

const stratus = new StratusClient();
await stratus.waitUntilReady();
const s3 = new S3Client(stratus.awsConfig());

// Rolled back afterwards, even if the test throws
await stratus.withSnapshot(() => runMyTest(s3));

// Throttle the first PutItem; the experiment always stops
await stratus.withChaos(
  { seed: 42, rules: [{ service: "dynamodb", operation: "PutItem",
                        action: "throttle", max_hits: 1 }] },
  () => runMyTest(s3),
);`,
  },
  {
    label: "Python",
    language: "python",
    code: `import boto3
from stratus_emulator import StratusClient

stratus = StratusClient()
stratus.wait_until_ready()
s3 = boto3.client("s3", **stratus.boto3_kwargs())

# Rolled back afterwards, even if the test raises
with stratus.snapshot_scope():
    run_my_test(s3)

# Why did it fail? Groups, likely cause, next step
print(stratus.diagnose(since="5m")["summary"])

# pytest: the stratus and stratus_isolated fixtures are built in`,
  },
];

export const diagnosis = {
  summary: "1 failed request in 1 group: 1 missing resource. Start with dynamodb PutItem (ResourceNotFoundException).",
  category: "missing_resource",
  cause: "The table \"orders\" does not exist in this account and region.",
  next: "Create it in your setup step before use, and check the name. List what exists with aws dynamodb list-tables.",
  yourBug: true,
};

export const demoSteps = [
  { title: "Seed and snapshot", body: "The agent runs setup once, then stratus_snapshot_save so every attempt starts identical." },
  { title: "Test fails", body: "ResourceNotFoundException, buried deep inside botocore." },
  { title: "Ask Stratus why", body: "stratus_diagnose: missing resource, your bug, here is the next step. The table is Orders, not orders." },
  { title: "Fix and restore", body: "One-line fix, stratus_snapshot_restore, rerun. Green." },
  { title: "Prove it under chaos", body: "Seed 42 throttles 30% of PutItem calls. The test still passes because the SDK retries." },
  { title: "Real vs injected", body: "Diagnostics splits it: 0 real failures, 11 injected and retried. Nothing to \"fix\"." },
];

export const quickstart: CodeSample[] = [
  {
    label: "Quick start",
    language: "sh",
    code: `brew install rmukubvu/tap/stratus   # or build from source with Go
stratus                             # AWS on localhost:4566

export AWS_ENDPOINT_URL=http://localhost:4566
aws s3 mb s3://demo && aws sqs create-queue --queue-name jobs`,
  },
];

// Every AWS Emulator claim below comes from its documentation
// (links.awsEmulatorDocs). Keep it factual: only list differences the docs
// state, and re-check them when the emulator ships notable changes.
export type ComparisonRow = { topic: string; awsEmulator: string; stratus: string };

export const emulatorComparison: ComparisonRow[] = [
  {
    topic: "API coverage",
    awsEmulator: "Aims to cover every AWS API model, strongest on the control plane",
    stratus: "33 services, focused on the behaviour integration tests depend on",
  },
  {
    topic: "State",
    awsEmulator: "Held in memory and cleared when it stops",
    stratus: "Named snapshots that restore in ~11 ms and fork into parallel jobs",
  },
  {
    topic: "IAM",
    awsEmulator: "Policies are not evaluated",
    stratus: "Opt-in enforcement or audit mode for IAM policies",
  },
  {
    topic: "Accounts and regions",
    awsEmulator: "Any account or region accepted, sharing one set of resources",
    stratus: "Separate resources for every account and region",
  },
  {
    topic: "Platforms",
    awsEmulator: "Native Linux packages; a Docker image you build on macOS and Windows",
    stratus: "One binary for Linux, macOS and Windows",
  },
];

export const stratusExtras = [
  "Real Lambda runtimes",
  "Real PostgreSQL, MySQL and Valkey",
  "Kafka via Redpanda",
  "Seeded chaos and FIS",
  "MCP server and LLM diagnostics",
  "stratus ci and a GitHub Action",
  "SES captured inbox",
  "Scheduler fast-forward clock",
  "Bedrock record and replay",
];
