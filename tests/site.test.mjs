import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("homepage names the product and the old workaround", async () => {
  const source = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
  assert.match(source, /Your files are on your phone/);
  assert.match(source, /Email was never a file-transfer protocol/);
  assert.match(source, /github\.com\/file-tunnel/);
});

test("site is intentionally analytics-free", async () => {
  const layout = await readFile(
    new URL("../src/layouts/SiteLayout.astro", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(layout, /google-analytics|googletagmanager|segment|mixpanel/i);
});
