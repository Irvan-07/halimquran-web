import { test } from "node:test";
import assert from "node:assert/strict";
import { validateStorefrontEnv, verifyPaymentMethods } from "./check-storefront-env.mjs";

const configured = { NEXT_PUBLIC_SCALEV_STORE_ID: "store_fixture123", NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY: "sfpk_fixture456" };
const ci = { CI: "true", GITHUB_ACTIONS: "true", HALIM_SYNTHETIC_BUILD: "1" };
test("blocks missing configuration and placeholders", () => {
  assert.equal(validateStorefrontEnv({}).ok, false);
  assert.equal(validateStorefrontEnv({ ...configured, NEXT_PUBLIC_SCALEV_STORE_ID: "store_xxxxx" }).ok, false);
  assert.equal(validateStorefrontEnv({ ...configured, NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY: "sk_secret" }).ok, false);
  assert.equal(validateStorefrontEnv({ ...configured, NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY: "sfpk_" }).ok, false);
});
test("accepts public configuration without echoing values", () => {
  assert.deepEqual(validateStorefrontEnv(configured), { ok: true, errors: [], synthetic: false });
});
test("synthetic CI exception never passes release preflight", () => {
  assert.equal(validateStorefrontEnv(ci).synthetic, true);
  assert.equal(validateStorefrontEnv(ci, { release: true }).ok, false);
  assert.equal(validateStorefrontEnv({ HALIM_SYNTHETIC_BUILD: "1" }).ok, false);
});
const cors = { "access-control-allow-origin": "https://halimquran.com", "access-control-allow-headers": "Content-Type,X-Scalev-Storefront-Api-Key,X-Scalev-Guest-Token" };
test("live preflight only performs OPTIONS and GET and counts enabled methods", async () => {
  const methods = [];
  const count = await verifyPaymentMethods(configured, async (url, init) => {
    methods.push(init.method);
    assert.match(url, /\/public\/payment-methods$/);
    return init.method === "OPTIONS"
      ? new Response(null, { status: 204, headers: cors })
      : Response.json({ data: [{ code: "qris", enabled: true }, { code: "cod", enabled: false }] }, { headers: cors });
  });
  assert.deepEqual(methods, ["OPTIONS", "GET"]);
  assert.equal(count, 1);
});
test("blocks missing CORS, HTTP denial, and no enabled methods", async () => {
  await assert.rejects(() => verifyPaymentMethods(configured, async () => new Response(null, { status: 204 })), /CORS/);
  await assert.rejects(() => verifyPaymentMethods(configured, async (url, init) => init.method === "OPTIONS" ? new Response(null, { status: 204, headers: cors }) : new Response(null, { status: 403, headers: cors })), /HTTP 403/);
  await assert.rejects(() => verifyPaymentMethods(configured, async (url, init) => init.method === "OPTIONS" ? new Response(null, { status: 204, headers: cors }) : Response.json({ data: [] }, { headers: cors })), /no enabled/);
});
