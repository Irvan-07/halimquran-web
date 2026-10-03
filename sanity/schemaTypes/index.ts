import type { SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { blockContent } from "./blockContent";
import { page } from "./page";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, article, page, blockContent];
