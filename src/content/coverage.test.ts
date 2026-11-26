import { test } from "node:test";
import assert from "node:assert/strict";
import { coverageFraction, notImplementedCount, operationCoverage } from "./coverage.ts";

test("states coverage with thousands separators, as the coverage page does", () => {
  assert.equal(coverageFraction({ implemented: 510, defined: 3306, botocoreVersion: "x" }), "510 of 3,306");
});

test("counts every operation Stratus does not implement as a 501", () => {
  assert.equal(notImplementedCount({ implemented: 510, defined: 3306, botocoreVersion: "x" }), 2796);
});

test("never claims more operations than AWS defines", () => {
  assert.ok(operationCoverage.implemented > 0);
  assert.ok(operationCoverage.implemented <= operationCoverage.defined);
});
