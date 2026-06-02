import { DB } from "@deno.land/sqlite";
import { createHatVersionT, createHatVersionTProps } from "../src/createHat.ts";

if (!import.meta.main) {
  throw new Error(
    "This is an entrypoint, it cannot be imported from another file",
  );
}

const startedAt = performance.now();
function updateProgress(progress: number) {
  const now = performance.now();
  const secs = Math.floor(
    (now - startedAt) * (1 / progress) / 1000,
  );
  const perc = Math.floor(progress * 100);
  const eta = new Date(Date.now() + secs * 1000).toLocaleTimeString();
  console.log(
    `${perc}% ${secs}s remaining, ETA: ${eta}`,
  );
}

const db = new DB("data/inv.db");
db.execute(
  "CREATE TABLE IF NOT EXISTS inventories (steam64 text PRIMARY KEY, timestamp int NOT NULL, response_body text NOT NULL);",
);
function* loadInventories() {
  const total = db.query("SELECT COUNT(*) FROM inventories")[0][0] as number;
  const stmt = db.prepareQuery(
    "SELECT * FROM inventories WHERE ROWID BETWEEN ? AND ?",
  );
  const chunkSize = 64;
  let rowId = 0;

  for (let fetched = 0; fetched < total;) {
    const rows = stmt.all([rowId, rowId + chunkSize]);
    rowId += chunkSize;
    fetched += rows.length;
    yield { fetched, total, rows };
  }
}

db.execute("DROP TABLE IF EXISTS hats");
db.execute(
  "CREATE TABLE hats (steam64 text, assetid int, hat text NOT NULL, PRIMARY KEY (steam64, assetid)) WITHOUT ROWID;",
);
const insertStmt = db.prepareQuery(
  "INSERT INTO hats (steam64, assetid, hat) VALUES (?, ?, ?) ON CONFLICT (steam64, assetid) DO UPDATE SET hat = EXCLUDED.hat",
);
function storeHats(steam64: string, hats: [number, string][]) {
  db.transaction(() => {
    for (const [assetid, hat] of hats) {
      insertStmt.execute([steam64, assetid, hat]);
    }
  });
}

for (const { rows, fetched, total } of loadInventories()) {
  for (const [steam64, , invJson] of rows as [string, number, string][]) {
    const inv = JSON.parse(invJson);
    if (!inv.assets) {
      continue;
    }

    const { assets, descriptions } = inv;

    const descMap = new Map();
    for (const desc of descriptions) {
      const key = `${desc.classid}_${desc.instanceid}`;
      descMap.set(key, desc);
    }

    storeHats(
      steam64,
      assets.map(
        (a: { assetid: string; classid: string; instanceid: string }) => {
          const key = `${a.classid}_${a.instanceid}`;
          const desc = descMap.get(key)!;
          const hat = createHatVersionT(createHatVersionTProps(desc));
          return [+a.assetid, hat];
        },
      ),
    );
  }

  updateProgress(fetched / total);
}

console.log(
  "%cBuilding a hat to assetid index. This will take a while.",
  "color: cyan",
  new Date(),
);

db.execute("CREATE INDEX hats_reverse_idx ON hats(hat)");

console.log(
  "%cDone! Consider running VACUUM on your sqlite file.",
  "color: green",
);
