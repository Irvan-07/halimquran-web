import { defineConfig } from "sanity";
import baseConfig from "../sanity.config";

// The Studio hosted by Sanity (halimquran.sanity.studio) is the same Studio as
// the one embedded at /studio in the storefront, minus the "/studio" base
// path: a hosted Studio is served from the root of its own domain.
const { basePath: _embeddedBasePath, ...hostedConfig } = baseConfig;

export default defineConfig(hostedConfig);
