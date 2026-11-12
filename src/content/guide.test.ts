import { test } from "node:test";
import assert from "node:assert/strict";
import { guideSteps, quickstartSamples } from "./guide.ts";

test("gives every guide step a unique anchor and at least one sample", () => {
  const ids = guideSteps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const step of guideSteps) {
    assert.ok(step.samples.length > 0, `${step.id} has no sample`);
  }
});

test("starts with installing and covers CI and agents", () => {
  assert.equal(guideSteps[0].id, "install");
  for (const id of ["start", "connect", "test", "ci", "agent"]) {
    assert.ok(guideSteps.some((s) => s.id === id), `missing ${id}`);
  }
});

test("offers Windows commands wherever shell syntax differs", () => {
  const connect = guideSteps.find((s) => s.id === "connect");
  assert.ok(connect?.samples.some((s) => s.language === "powershell"));
  assert.ok(quickstartSamples.some((s) => s.language === "powershell"));
});
