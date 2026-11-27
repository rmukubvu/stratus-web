// Guided architecture decisions (`stratus advise`), from docs/advise.md in the
// Stratus repo. The proof runs below are the real run that page shows; copy
// new numbers from there rather than estimating them here.

import type { CodeSample, Stat } from "./site";

export const adviseDoc = "https://github.com/rmukubvu/stratus/blob/main/docs/advise.md";
export const adviseExample = "https://github.com/rmukubvu/stratus/blob/main/examples/advise-messaging/0001-order-events.md";

/** The options the messaging and eventing family weighs. */
export const messagingOptions = ["SQS standard", "SQS FIFO", "SNS fan-out to SQS", "EventBridge", "Kinesis Data Streams", "MSK"];

export const adviseSteps = [
  {
    title: "Ask",
    body: "Ordering, peak and average rate, message size, consumers, replay, retention, region and how much the team can run.",
  },
  {
    title: "Rule out and rank",
    body: "Options that break a hard requirement are ruled out. The rest are checked against AWS's default quotas at your peak and ranked.",
  },
  {
    title: "Prove under load",
    body: "k6 drives each candidate's producer path at your peak in its own throwaway account, under the quotas AWS enforces.",
  },
  {
    title: "Write it down",
    body: "An ADR in the MADR layout, and Terraform for the choice, applied to Stratus, re-planned for drift and destroyed.",
  },
];

export const adviseStats: Stat[] = [
  { value: String(messagingOptions.length), label: "messaging options weighed", detail: messagingOptions.join(", ") },
  { value: "0", label: "LLM calls inside Stratus", detail: "The rules are code. Every quota cites the AWS page it came from" },
  { value: "Offline", label: "cost estimates", detail: "From a dated snapshot of AWS's public price list, built into the binary" },
];

export type ProofVerdict = "held" | "throttled" | "failed" | "short";

export type ProofRun = {
  option: string;
  verdict: ProofVerdict;
  targetPerSecond: number;
  ranPerSecond: number;
  requests: number;
  throttled: number;
  errors: number;
  p99Ms: number;
  /** The quota rule that throttled the run, when one did. */
  throttledBy?: string;
};

/** The region and peak of the decision the proof runs below come from. */
export const proofScenario = { region: "af-south-1", peakPerSecond: 400, snsPublishQuota: 300 };

export const proofRuns: ProofRun[] = [
  { option: "EventBridge", verdict: "held", targetPerSecond: 400, ranPerSecond: 386, requests: 4005, throttled: 0, errors: 0, p99Ms: 11 },
  { option: "Kinesis", verdict: "held", targetPerSecond: 400, ranPerSecond: 398, requests: 3994, throttled: 0, errors: 0, p99Ms: 17 },
  {
    option: "SNS to SQS",
    verdict: "throttled",
    targetPerSecond: 400,
    ranPerSecond: 397,
    requests: 3997,
    throttled: 692,
    errors: 0,
    p99Ms: 53,
    throttledBy: "sns-publish-rate",
  },
];

/** The share of a run's requests that were throttled or failed, as a whole percentage. */
export function rejectedPercent({ requests, throttled, errors }: ProofRun): number {
  return requests === 0 ? 0 : Math.round(((throttled + errors) / requests) * 100);
}

export const adviseFeatures = [
  {
    title: "Every verdict has its reasons",
    body: "Ruled out, caveat, strength or not checked, each with the sentence that explains it. Unanswered questions are marked \"assumed (default)\" in the ADR so reviewers see what nobody said.",
  },
  {
    title: "Cost before you commit",
    body: "A monthly estimate per option at your average rate, from AWS on-demand list prices for your region, with the chosen option's line items so a reviewer can redo the sum.",
  },
  {
    title: "Proofs that can't share quotas",
    body: "Each candidate runs in its own throwaway account. --scale 0.1 runs at a tenth of the peak with every quota scaled alike, so a laptop can prove a design meant for 50,000/s.",
  },
  {
    title: "Agents hold the conversation",
    body: "Over MCP and both SDKs, an agent asks the person each pending question rather than guessing, and leaves the choice to them. Stratus supplies the facts.",
  },
];

export const adviseSample: CodeSample[] = [
  {
    label: "Ask",
    language: "text",
    copyText: 'stratus advise ask messaging --title "Order events"',
    code: `$ stratus advise ask messaging --title "Order events"
...
1. kinesis        fits with caveats   95/100  ~$345.04/month
     caveat: 3 consumers reading every record exceed
     2 MiB/s of shared reads per shard; use enhanced
     fan-out or more shards.
2. msk            fits with caveats   85/100  ~$612.43/month
3. sqs-standard   ruled out            0/100  ~$946.08/month
     ruled out: A consumed message is deleted, so it
     cannot be replayed.
...
Costs: on-demand list prices published 2026-11-26.`,
  },
  {
    label: "Prove",
    language: "text",
    copyText: "stratus advise prove adr-bc1c48247ef0 --duration 10s",
    code: `$ stratus advise prove adr-bc1c48247ef0 --duration 10s
eventbridge  held       target 400/s, ran 386/s,
                        0 throttled, p99 11 ms
kinesis      held       target 400/s, ran 398/s,
                        0 throttled, p99 17 ms
sns-sqs      throttled  target 400/s, ran 397/s,
                        692 throttled, p99 53 ms;
                        throttled by sns-publish-rate
msk          not proved: needs a Kafka client`,
  },
  {
    label: "Decide",
    language: "sh",
    code: `stratus advise decide adr-6cd89c5e69ce kinesis \\
  --why "consumers replay orders per customer"

# Terraform for the choice, test-deployed against Stratus
stratus advise terraform adr-6cd89c5e69ce \\
  --out infra/order-events --deploy
# test deploy passed: 1 resource applied; a plan straight
# after found nothing to change, and destroy removed everything

stratus advise adr adr-6cd89c5e69ce --out docs/adr/0001-order-events.md`,
  },
  {
    label: "TypeScript",
    language: "ts",
    code: `const d = await stratus.advise.start({
  family: "messaging",
  title: "Order events",
  answers: { replay: true, consumers: 3 },
});
const ranked = await stratus.advise.assess(d.id);
await stratus.advise.decide(d.id, ranked.recommended!, "we replay");
const tf = await stratus.advise.terraform(d.id);
await fs.writeFile("docs/adr/0001-order-events.md",
  await stratus.advise.adr(d.id));`,
  },
];
