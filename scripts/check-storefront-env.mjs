import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const STORE = "NEXT_PUBLIC_SCALEV_STORE_ID";
const KEY = "NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY";
const ORIGIN = "https://halimquran.com";
const HEADER = "x-scalev-storefront-api-key";
const requiredHeaders = [HEADER, "content-type", "x-scalev-guest-token"];
const looksReal = (value, prefix) =>
  typeof value === "string" && value === value.trim() &&
  new RegExp("^" + prefix + "[A-Za-z0-9_-]+$").test(value) &&
  !/^(?:store_|sfpk_)(?:example|placeholder|your[_-]?key|your[_-]?store|xxxxx|dummy|test)$/i.test(value);

export function validateStorefrontEnv(env, { release = false } = {}) {
  const synthetic = env.HALIM_SYNTHETIC_BUILD === "1";
  if (synthetic && (release || env.CI !== "true" || env.GITHUB_ACTIONS !== "true")) {
    return { ok: false, errors: ["HALIM_SYNTHETIC_BUILD is only allowed for isolated GitHub CI, never release."], synthetic: false };
  }
  if (synthetic) return { ok: true, errors: [], synthetic: true };
  const errors = [];
  if (!looksReal(env[STORE], "store_")) errors.push(STORE + " missing or invalid.");
  if (!looksReal(env[KEY], "sfpk_")) errors.push(KEY + " missing or invalid.");
  return { ok: errors.length === 0, errors, synthetic: false };
}

function assertOrigin(res) {
  const origin = res.headers.get("access-control-allow-origin");
  if (origin !== ORIGIN && origin !== "*") throw new Error("Scalev CORS does not allow the production origin.");
}

export async function verifyPaymentMethods(env, request = fetch) {
  const url = "https://api.scalev.com/v3/stores/" + encodeURIComponent(env[STORE]) + "/public/payment-methods";
  const preflight = await request(url, {
    method: "OPTIONS", redirect: "error", signal: AbortSignal.timeout(15000),
    headers: { Origin: ORIGIN, "Access-Control-Request-Method": "GET",
      "Access-Control-Request-Headers": requiredHeaders.join(",") },
  });
  if (!preflight.ok) throw new Error("Scalev CORS preflight HTTP " + preflight.status);
  assertOrigin(preflight);
  const headers = (preflight.headers.get("access-control-allow-headers") || "").toLowerCase().split(",").map(x => x.trim());
  if (!headers.includes("*") && !requiredHeaders.every(x => headers.includes(x))) {
    throw new Error("Scalev CORS preflight does not allow all storefront headers.");
  }
  const response = await request(url, {
    method: "GET", redirect: "error", signal: AbortSignal.timeout(15000),
    headers: { Origin: ORIGIN, [HEADER]: env[KEY], "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Scalev payment methods HTTP " + response.status);
  assertOrigin(response);
  const json = await response.json();
  if (!Array.isArray(json.data)) throw new Error("Scalev payment methods response shape invalid.");
  const count = json.data.filter(x => x && x.enabled === true && typeof x.code === "string" && x.code.length > 0).length;
  if (!count) throw new Error("Scalev returned no enabled payment methods.");
  return count;
}

async function main() {
  const live = process.argv.includes("--verify-live");
  const release = live || process.argv.includes("--release");
  // Use the same production .env precedence as Next.js, not shell sourcing.
  const require = createRequire(import.meta.url);
  const nextRequire = createRequire(require.resolve("next/package.json"));
  const { loadEnvConfig } = nextRequire("@next/env");
  loadEnvConfig(process.cwd(), false, { info() {}, error() {}, warn() {} });
  const result = validateStorefrontEnv(process.env, { release });
  if (!result.ok) {
    for (const error of result.errors) console.error("[storefront preflight] " + error);
    process.exitCode = 1;
    return;
  }
  if (result.synthetic) {
    console.log("[storefront preflight] isolated synthetic CI build; not releasable.");
    return;
  }
  console.log("[storefront preflight] required public configuration present; values withheld.");
  if (live) {
    try {
      const count = await verifyPaymentMethods(process.env);
      console.log("[storefront preflight] CORS and payment methods PASS; enabled count: " + count);
    } catch (error) {
      // Only emit our controlled diagnostics; fetch errors may contain a URL or credentials.
      const msg = error instanceof Error ? error.message : "";
      console.error("[storefront preflight] " + (/^Scalev (?:CORS|payment methods|returned)/.test(msg) ? msg : "Live read failed; inspect network and configuration privately."));
      process.exitCode = 1;
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => { console.error("[storefront preflight] Unable to load production build configuration."); process.exitCode = 1; });
}
