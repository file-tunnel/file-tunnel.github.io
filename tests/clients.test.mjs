import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("client workbench includes every maintained language", async () => {
  const page = await readFile(
    new URL("../src/pages/clients.astro", import.meta.url),
    "utf8",
  );
  const layout = await readFile(
    new URL("../src/layouts/SiteLayout.astro", import.meta.url),
    "utf8",
  );

  for (const expected of [
    "Select client language",
    "TypeScript",
    "Rust",
    "Dart / Flutter",
    "Gleam",
    "ftnl-clients",
  ]) {
    assert.ok(page.includes(expected), `missing ${expected}`);
  }

  assert.match(page, /navigator\.clipboard/);
  assert.match(page, /prefers-reduced-motion/);
  assert.match(layout, /href="\/clients\/"/);
});
