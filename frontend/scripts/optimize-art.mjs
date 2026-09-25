// Turns full-size artwork into web-ready plates.
//
//   art-originals/<name>.png|jpg|webp  →  public/images/<name>.webp
//
// Originals stay out of git (see .gitignore); only the small WebP copies ship.
// Usage: npm run art            (skips images already up to date)
//        npm run art -- --force (rebuilds everything)
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(root, "art-originals");
const OUT = path.join(root, "public", "images");

// The plate is shown at most ~520 CSS px tall; 1200px keeps it sharp on 2x screens
const MAX_SIZE = 1200;
const QUALITY = 82;
const INPUT = /\.(png|jpe?g|webp)$/i;

const force = process.argv.includes("--force");
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC).catch(() => [])).filter((f) => INPUT.test(f));

if (files.length === 0) {
  console.log(`No artwork found in ${path.relative(root, SRC)}/`);
  process.exit(0);
}

let before = 0;
let after = 0;
for (const file of files) {
  const src = path.join(SRC, file);
  const out = path.join(OUT, `${path.parse(file).name}.webp`);

  if (!force && (await mtime(out)) >= (await mtime(src))) {
    console.log(`  · ${file} (up to date)`);
    continue;
  }

  await sharp(src)
    // The page multiplies art onto the parchment, so transparency must become white
    .flatten({ background: "#ffffff" })
    .resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);

  const [srcSize, outSize] = [(await stat(src)).size, (await stat(out)).size];
  before += srcSize;
  after += outSize;
  console.log(`  ✓ ${file} → ${path.basename(out)}  ${kb(srcSize)} → ${kb(outSize)}`);
}

if (before > 0) console.log(`Done: ${kb(before)} → ${kb(after)}`);
