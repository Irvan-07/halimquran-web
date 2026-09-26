"use client";

import { useState } from "react";

/** Renders one `\n\n`-separated block of description text — either a plain
 * paragraph, or a "Header:\n- bullet\n- bullet" block as a labeled list. */
function DescriptionBlock({ block }: { block: string }) {
  const lines = block.split("\n").filter(Boolean);
  const [first, ...rest] = lines;
  const isList = first.trim().endsWith(":") && rest.length > 0;

  if (!isList) {
    return <p className="max-w-3xl text-sm text-foreground">{lines.join(" ")}</p>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-medium text-foreground">{first}</p>
      <ul className="flex max-w-3xl flex-col gap-1 pl-1 text-sm text-foreground">
        {rest.map((line, i) => (
          <li key={i}>{line.replace(/^[-✔]\s*/, "")}</li>
        ))}
      </ul>
    </div>
  );
}

// Matches the live PDP's collapsed-by-default description with a "Lihat
// Selengkapnya" toggle (the real copy is long — specs + several labeled
// feature blocks — so collapsing it keeps the page scannable).
export function ProductDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const blocks = text.split("\n\n");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-lg font-semibold text-foreground">Deskripsi</h2>
      <div className={`relative flex flex-col gap-4 ${!expanded ? "max-h-40 overflow-hidden" : ""}`}>
        {blocks.map((block, i) => (
          <DescriptionBlock key={i} block={block} />
        ))}
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-fit text-sm font-medium text-primary hover:underline"
      >
        {expanded ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
      </button>
    </div>
  );
}
