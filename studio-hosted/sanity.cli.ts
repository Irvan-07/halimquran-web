import { defineCliConfig } from "sanity/cli";

// Deployed on its own, outside the storefront: `cd studio-hosted && npx sanity deploy`.
// (The embedded Studio at /studio made the Cloudflare Worker too big for the free plan.)
export default defineCliConfig({
  api: { projectId: "mnu5ne8u", dataset: "production" },
  studioHost: "halimquran",
  deployment: { appId: "sjd4660ccysqakx0kcx8m6d8" },
});
