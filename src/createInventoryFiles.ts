import fs from "node:fs/promises";
import path from "node:path";

export async function createInventoryFiles(steam64s: string[]) {
  const DATA_DIR = path.join(
    path.dirname(import.meta.dirname!),
    "data",
    "inventories",
  );

  for (const id of steam64s) {
    const fullPath = path.join(DATA_DIR, `${id}.json`);
    const file = await fs.open(fullPath, "a");
    await file.close();
  }
}
