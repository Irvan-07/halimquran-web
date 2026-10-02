import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Accepts any Sanity image field (with hotspot/crop) and returns a builder,
// e.g. urlFor(article.coverImage).width(1200).auto("format").url()
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
