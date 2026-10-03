"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

// Document types that exist exactly once: shown as a single entry at the
// top of the Studio, and can't be created again, duplicated or deleted.
const SINGLETONS = ["siteSettings"];
const SINGLETON_ACTIONS = ["publish", "discardChanges", "restore"];

export default defineConfig({
  name: "halimquran",
  title: "Halim Quran",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten")
          .items([
            S.listItem()
              .title("Pengaturan Situs")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Pengaturan Situs")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() ?? "")),
          ]),
    }),
  ],
  document: {
    actions: (prev, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.includes(action))
        : prev,
  },
});
