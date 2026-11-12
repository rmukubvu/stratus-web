// The step-by-step getting started guide (/get-started) and the home page's
// quick start. Every command here was run against a real Stratus release.

import { installOptions } from "./install.ts";
import type { CodeSample } from "./site.ts";

export type GuideStep = {
  id: string;
  title: string;
  body: string;
  samples: CodeSample[];
};

const awsEnvUnix = `export AWS_ENDPOINT_URL=http://localhost:4566
export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1`;

const awsEnvWindows = `$env:AWS_ENDPOINT_URL = "http://localhost:4566"
$env:AWS_ACCESS_KEY_ID = "test"
$env:AWS_SECRET_ACCESS_KEY = "test"
$env:AWS_DEFAULT_REGION = "us-east-1"`;

export const guideSteps: GuideStep[] = [
  {
    id: "install",
    title: "Install Stratus",
    body: "One binary, nothing else to set up. Pick your OS.",
    samples: installOptions.map((o) => ({ label: o.os, language: o.language, code: o.code })),
  },
  {
    id: "start",
    title: "Start it",
    body: "Leave it running in its own terminal. Docker is only needed for Lambda functions and the real database, cache and Kafka engines; everything else runs inside the binary.",
    samples: [
      {
        label: "Terminal",
        language: "sh",
        code: `stratus          # AWS on localhost:4566, opens the portal in your browser
stratus serve    # the same without the portal, for servers and CI`,
      },
    ],
  },
  {
    id: "connect",
    title: "Point your AWS tools at it",
    body: "In a second terminal, set these once. The AWS CLI and AWS SDKs read them, so your code needs no changes. Any credentials work unless you turn on IAM enforcement.",
    samples: [
      { label: "macOS / Linux", language: "sh", code: awsEnvUnix },
      { label: "Windows", language: "powershell", code: awsEnvWindows },
    ],
  },
  {
    id: "try",
    title: "Make something",
    body: "Use the AWS CLI (v2) exactly as you would against AWS. Here is a bucket and a queue.",
    samples: [
      {
        label: "Terminal",
        language: "sh",
        code: `aws s3 mb s3://demo
aws sqs create-queue --queue-name jobs
aws s3 ls`,
      },
    ],
  },
  {
    id: "reset",
    title: "Get back to a clean slate",
    body: "Save the state you want every test to start from, then roll back to it in milliseconds, or wipe services entirely.",
    samples: [
      {
        label: "Terminal",
        language: "sh",
        code: `stratus snapshot save clean      # after your setup
stratus snapshot restore clean   # back to it, ~11 ms
stratus reset s3 sqs             # or wipe just these services`,
      },
    ],
  },
  {
    id: "test",
    title: "Run your tests in one command",
    body: "stratus ci starts a private Stratus on a free port, points your command at it, and removes everything afterwards, pass or fail. No server to start first.",
    samples: [
      {
        label: "Terminal",
        language: "sh",
        code: `stratus ci -- npm test
stratus ci -- pytest
stratus ci --seed ./snapshots/clean -- go test ./...   # start from a snapshot`,
      },
    ],
  },
  {
    id: "ci",
    title: "Add it to GitHub Actions",
    body: "The action installs Stratus and runs your tests the same way, on Linux, macOS and Windows runners.",
    samples: [
      {
        label: ".github/workflows/test.yml",
        language: "yaml",
        code: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: rmukubvu/stratus@main
        with:
          run: npm test`,
      },
    ],
  },
  {
    id: "agent",
    title: "Let your coding agent drive it",
    body: "Over MCP, an agent can check Stratus is up, save and restore state, inject faults and ask why a call failed. --start gives it a throwaway instance of its own.",
    samples: [
      { label: "Claude Code", language: "sh", code: "claude mcp add stratus -- stratus mcp --start" },
      {
        label: "Other MCP clients",
        language: "json",
        code: `{
  "mcpServers": {
    "stratus": { "command": "stratus", "args": ["mcp", "--start"] }
  }
}`,
      },
    ],
  },
];

export const quickstartSamples: CodeSample[] = [
  {
    label: "macOS / Linux",
    language: "sh",
    code: `stratus                 # terminal 1: AWS on localhost:4566

${awsEnvUnix}
aws s3 mb s3://demo     # terminal 2: use it like AWS`,
  },
  {
    label: "Windows",
    language: "powershell",
    code: `stratus                 # window 1: AWS on localhost:4566

${awsEnvWindows}
aws s3 mb s3://demo     # window 2: use it like AWS`,
  },
];
