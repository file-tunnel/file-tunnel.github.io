const ACCOUNT_MODES = new Set(["individual", "organization"]);
const LOOPBACK_HOSTS = new Set(["127.0.0.1", "[::1]", "localhost"]);

export const onboardingOptions = Object.freeze([
  Object.freeze({
    mode: "one_time",
    eyebrow: "No account",
    title: "Move something now",
    description:
      "Open File Tunnel on the receiving device, scan its short-lived code, and send exactly what you choose.",
    details: Object.freeze([
      "No Shared Auth account",
      "One tunnel, scoped capabilities",
      "Automatic expiry",
    ]),
    action: "Choose a client",
    href: "/clients/",
  }),
  Object.freeze({
    mode: "individual",
    eyebrow: "Personal account",
    title: "Keep your devices connected",
    description:
      "Sign in through Shared Auth, then let File Tunnel authorize your devices, history, retention, and plan.",
    details: Object.freeze([
      "Personal device roster",
      "Encrypted history and sync",
      "Product-owned permissions",
    ]),
    action: "Sign in as an individual",
    href: null,
  }),
  Object.freeze({
    mode: "organization",
    eyebrow: "Team workspace",
    title: "Give every employee a safer path",
    description:
      "Authenticate through Shared Auth, then select or join a File Tunnel organization with separately verified membership and roles.",
    details: Object.freeze([
      "Managed employee access",
      "Workspace roles and policy",
      "Central billing and audit",
    ]),
    action: "Sign in for an organization",
    href: null,
  }),
]);

export function normalizeControlOrigin(value) {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) {
    return null;
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    return null;
  }
  const secure = url.protocol === "https:";
  const loopback = url.protocol === "http:" && LOOPBACK_HOSTS.has(url.hostname);
  if (!secure && !loopback) return null;
  return url.origin;
}

export function accountOnboardingHref(controlOrigin, mode) {
  if (!ACCOUNT_MODES.has(mode)) {
    throw new TypeError("account onboarding mode must be individual or organization");
  }
  const origin = normalizeControlOrigin(controlOrigin);
  if (origin === null) return null;
  const destination = new URL("/control/onboarding/start", origin);
  destination.searchParams.set("mode", mode);
  return destination.href;
}
