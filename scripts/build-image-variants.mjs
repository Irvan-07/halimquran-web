// Pre-generates the responsive WebP variants that lib/image-loader.ts points to,
// so no image is resized at request time (no per-request CPU, no transformation
// quota on any host). Runs before every build; output lives in public/_img
// (git-ignored) and is rebuilt only for sources that changed.
//   public/products/a/b.jpg  ->  public/_img/products/a/b.384.webp / .828.webp / .1280.webp
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const PUBLIC = join(process.cwd(), "public");
const OUT = join(PUBLIC, "_img");
const WIDTHS = [384, 828, 1280]; // keep in sync with BUCKETS in lib/image-loader.ts
const RASTER = new Set([".jpg", ".jpeg", ".png"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (full === OUT) continue;
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (RASTER.has(extname(name).toLowerCase())) yield full;
  }
}

let made = 0;
let skipped = 0;
for (const file of walk(PUBLIC)) {
  const rel = relative(PUBLIC, file);
  const base = join(OUT, rel.slice(0, rel.length - extname(rel).length));
  const srcTime = statSync(file).mtimeMs;
  let meta;
  for (const w of WIDTHS) {
    const target = `${base}.${w}.webp`;
    if (existsSync(target) && statSync(target).mtimeMs >= srcTime) {
      skipped++;
      continue;
    }
    mkdirSync(dirname(target), { recursive: true });
    // failOn "none": a slightly truncated JPEG still decodes (browsers show it
    // too) instead of failing the whole build.
    meta ??= await sharp(file, { failOn: "none" }).metadata();
    // Never upscale: a small source is just re-encoded at its own width.
    await sharp(file, { failOn: "none" })
      .rotate()
      .resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(target);
    made++;
  }
}
console.log(`image variants: ${made} written, ${skipped} up to date`);
