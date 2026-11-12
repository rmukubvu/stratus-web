import { test } from "node:test";
import assert from "node:assert/strict";
import { installOptions, releaseAssetUrl, releasesPage, stratusVersion } from "./install.ts";

test("builds release asset URLs the way GoReleaser names them", () => {
  assert.equal(
    releaseAssetUrl("Linux", "x86_64", "0.2.0"),
    "https://github.com/rmukubvu/stratus/releases/download/v0.2.0/stratus_0.2.0_Linux_x86_64.tar.gz",
  );
  assert.equal(
    releaseAssetUrl("Windows", "arm64", "0.2.0"),
    "https://github.com/rmukubvu/stratus/releases/download/v0.2.0/stratus_0.2.0_Windows_arm64.zip",
  );
});

test("offers one install option per OS", () => {
  assert.deepEqual(
    installOptions.map((o) => o.os),
    ["macOS", "Linux", "Windows"],
  );
});

test("pins every download to the current version", () => {
  const downloads = installOptions.flatMap((o) => o.code.match(/https:\/\/\S+/g) ?? []);
  assert.ok(downloads.length > 0);
  for (const url of downloads) {
    assert.ok(url.includes(`/v${stratusVersion}/`), url);
  }
  assert.ok(releasesPage.endsWith(`/v${stratusVersion}`));
});
