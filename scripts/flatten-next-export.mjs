import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const exportDir = process.argv[2];

if (!exportDir) {
  console.error("Usage: node flatten-next-export.mjs <export-dir>");
  process.exit(1);
}

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next.")) {
        for (const nestedEntry of readdirSync(fullPath, { withFileTypes: true })) {
          if (!nestedEntry.isFile() || !nestedEntry.name.endsWith(".txt")) {
            continue;
          }

          const flatPath = join(directory, `${entry.name}.${nestedEntry.name}`);
          copyFileSync(join(fullPath, nestedEntry.name), flatPath);
        }
      }

      walk(fullPath);
    }
  }
}

if (!existsSync(exportDir) || !statSync(exportDir).isDirectory()) {
  console.error(`Export directory not found: ${exportDir}`);
  process.exit(1);
}

walk(exportDir);