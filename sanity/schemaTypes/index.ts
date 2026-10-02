import type { SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { blockContent } from "./blockContent";
import { page } from "./page";

export const schemaTypes: SchemaTypeDefinition[] = [article, page, blockContent];
