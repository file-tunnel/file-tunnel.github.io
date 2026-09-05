import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import {
  accountOnboardingHref,
  normalizeControlOrigin,
  onboardingOptions,
} from "../src/lib/onboarding.mjs";

test("onboarding keeps one-time, individual, and organization access distinct", () => {
  assert.deepEqual(
    onboardingOptions.map(({ mode }) => mode),
    ["one_time", "individual", "organization"],
  );
  assert.equal(onboardingOptions[0].href, "/clients/");
  assert.equal(onboardingOptions[1].href, null);
  assert.equal(onboardingOptions[2].href, null);
  assert.match(onboardingOptions[1].description, /Shared Auth/);
  assert.match(onboardingOptions[2].description, /membership and roles/);
});

test("control origin requires HTTPS except explicit loopback development", () => {
  assert.equal(normalizeControlOrigin("https://app.file-tunnel.example"), "https://app.file-tunnel.example");
  assert.equal(normalizeControlOrigin("https://app.file-tunnel.example:8443/"), "https://app.file-tunnel.example:8443");
  assert.equal(normalizeControlOrigin("http://127.0.0.1:3100"), "http://127.0.0.1:3100");
  assert.equal(normalizeControlOrigin("http://localhost:3100/"), "http://localhost:3100");
  assert.equal(normalizeControlOrigin("http://[::1]:3100"), "http://[::1]:3100");
});

test("control origin rejects credentials, remote cleartext, and URL suffixes", () => {
  for (const value of [
    "http://app.file-tunnel.example",
    "https://user:secret@app.file-tunnel.example",
    "https://app.file-tunnel.example/control",
    "https://app.file-tunnel.example/?mode=individual",
    "https://app.file-tunnel.example/#secret",
    "javascript:alert(1)",
    "not a URL",
    "",
    "https://" + "a".repeat(2050) + ".example",
  ]) {
    assert.equal(normalizeControlOrigin(value), null, value);
  }
});

test("account destinations contain only an allow-listed non-secret mode", () => {
  assert.equal(
    accountOnboardingHref("https://app.file-tunnel.example", "individual"),
    "https://app.file-tunnel.example/control/onboarding/start?mode=individual",
  );
  assert.equal(
    accountOnboardingHref("https://app.file-tunnel.example", "organization"),
    "https://app.file-tunnel.example/control/onboarding/start?mode=organization",
  );
  assert.equal(accountOnboardingHref(undefined, "individual"), null);
  assert.throws(
    () => accountOnboardingHref("https://app.file-tunnel.example", "one_time"),
    /individual or organization/,
  );
  assert.throws(
    () => accountOnboardingHref("https://app.file-tunnel.example", "admin"),
    /individual or organization/,
  );
});

test("onboarding page explains the identity and product authorization split", async () => {
  const source = await readFile(
    new URL("../src/pages/get-started.astro", import.meta.url),
    "utf8",
  );
  for (const phrase of [
    "one-time tunnel needs",
    "Shared Auth verifies the person",
    "File Tunnel verifies product access",
    "membership, roles, billing",
    "Account sign-in stays closed",
  ]) {
    assert.match(source, new RegExp(phrase));
  }
  assert.doesNotMatch(source, /oauth\/authorize|client_secret|pairing_secret|bearer_token/i);
  assert.doesNotMatch(source, /<form\b/i);
});
