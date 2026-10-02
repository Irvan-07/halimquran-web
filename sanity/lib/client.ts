import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Read-only client for published content. The dataset is public-read, so no
// token is needed (and none must ever be put in a NEXT_PUBLIC_ variable).
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
