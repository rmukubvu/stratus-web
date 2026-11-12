import { test } from "node:test";
import assert from "node:assert/strict";
import { allServices, dockerBackedServices, serviceCount, serviceGroups } from "./services.ts";

// Mirrors the service packages wired into internal/app/stack.go in the
// Stratus repo. Update both together when a service ships.
const EXPECTED_SERVICE_COUNT = 33;

test("lists every service Stratus ships", () => {
  assert.equal(serviceCount, EXPECTED_SERVICE_COUNT);
  assert.equal(allServices.length, serviceCount);
});

test("never lists a service twice", () => {
  const names = allServices.map((s) => s.name);
  assert.equal(new Set(names).size, names.length);
});

test("gives every group a unique id and at least one service", () => {
  const ids = serviceGroups.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const group of serviceGroups) {
    assert.ok(group.services.length > 0, `${group.id} is empty`);
  }
});

test("marks exactly the services that run real engines in Docker", () => {
  assert.deepEqual(dockerBackedServices.map((s) => s.name).sort(), ["ElastiCache", "Lambda", "MSK", "RDS"]);
});
