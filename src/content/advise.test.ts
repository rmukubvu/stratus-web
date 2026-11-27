import { test } from "node:test";
import assert from "node:assert/strict";
import { proofRuns, proofScenario, rejectedPercent, type ProofRun } from "./advise.ts";

const run = (over: Partial<ProofRun>): ProofRun => ({
  option: "x",
  verdict: "held",
  targetPerSecond: 100,
  ranPerSecond: 100,
  requests: 1000,
  throttled: 0,
  errors: 0,
  p99Ms: 1,
  ...over,
});

test("counts throttled and failed requests together as rejected", () => {
  assert.equal(rejectedPercent(run({ throttled: 150, errors: 50 })), 20);
});

test("reports no rejections for a run that sent nothing", () => {
  assert.equal(rejectedPercent(run({ requests: 0 })), 0);
});

// Stratus calls a proof held when under 1% of requests were throttled or failed
// (internal/advise/prove.go); copied numbers must agree with their verdicts.
test("every copied proof's verdict agrees with its numbers", () => {
  for (const r of proofRuns) {
    const rejected = (r.throttled + r.errors) / r.requests;
    if (r.verdict === "held") assert.ok(rejected <= 0.01, `${r.option} held with ${rejected} rejected`);
    if (r.verdict === "throttled") assert.ok(r.throttled / r.requests > 0.01 && r.throttledBy, `${r.option} throttled without cause`);
  }
});

test("the SNS run is throttled because the peak is above the regional publish quota", () => {
  assert.ok(proofScenario.peakPerSecond > proofScenario.snsPublishQuota);
  assert.ok(proofRuns.every((r) => r.targetPerSecond === proofScenario.peakPerSecond));
});
