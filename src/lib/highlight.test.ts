import { test } from "node:test";
import assert from "node:assert/strict";
import { highlightLine } from "./highlight.ts";

test("splits a trailing shell comment from the command", () => {
  assert.deepEqual(highlightLine("stratus wait   # until ready", "sh"), [
    { kind: "plain", text: "stratus wait   " },
    { kind: "comment", text: "# until ready" },
  ]);
});

test("treats a whole-line comment as a comment", () => {
  assert.deepEqual(highlightLine("# Seed once", "sh"), [{ kind: "comment", text: "# Seed once" }]);
});

test("does not treat # inside a word or expression as a comment", () => {
  const tokens = highlightLine("runs-on: ${{ matrix.os }}", "yaml");
  assert.ok(tokens.every((t) => t.kind !== "comment"));
});

test("ignores comment markers inside strings", () => {
  assert.deepEqual(highlightLine('echo "a # b"', "sh"), [
    { kind: "plain", text: "echo " },
    { kind: "string", text: '"a # b"' },
  ]);
});

test("does not treat the // in a URL as a TypeScript comment", () => {
  const tokens = highlightLine("fetch(http://localhost:4566)", "ts");
  assert.ok(tokens.every((t) => t.kind !== "comment"));
});

test("highlights TypeScript line comments", () => {
  const tokens = highlightLine("await run(); // rolled back", "ts");
  assert.deepEqual(tokens.at(-1), { kind: "comment", text: "// rolled back" });
});

test("leaves an unterminated quote as plain text", () => {
  assert.deepEqual(highlightLine("it's fine", "python"), [{ kind: "plain", text: "it's fine" }]);
});

test("JSON has no comment syntax", () => {
  const tokens = highlightLine('{ "id": "#1" }', "json");
  assert.ok(tokens.every((t) => t.kind !== "comment"));
});
