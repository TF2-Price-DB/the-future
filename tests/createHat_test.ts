import { assertEquals, assertThrows } from "@std/assert";
import {
  createHatVersionZ,
  createHatVersionZProps,
  unparseHatVersionZ,
} from "../src/createHat.ts";

Deno.test("unparseHatVersionZ rejects trailing semicolons", () => {
  assertThrows(
    () => unparseHatVersionZ("Alien_Swarm_Parasite;TC;Unique;;;;;;;"),
    Error,
    "Invalid Hat Version Z: trailing semicolons are disallowed",
  );
});

Deno.test("unparseHatVersionZ rejects more than eleven fields", () => {
  assertThrows(
    () => unparseHatVersionZ("1;2;3;4;5;6;7;8;9;10;11;12"),
    Error,
    "Invalid Hat Version Z: too many fields",
  );
});

Deno.test("createHatVersionZ emits loaner as final flag", () => {
  assertEquals(
    createHatVersionZ({
      marketHashName: "Professional Killstreak C.A.P.P.E.R",
      tradable: true,
      marketable: true,
      craftable: true,
      festivized: true,
      loaner: true,
      qualities: ["Unique"],
      unusualEffects: [],
      killstreakers: [],
      sheens: [],
      warPaints: [],
      paints: [],
      strangeParts: [],
      spells: [],
      strangeFilters: [],
    }),
    "Professional_Killstreak_C.A.P.P.E.R;TMCFL;Unique",
  );
});

Deno.test("unparseHatVersionZ reads loaner flag", () => {
  assertEquals(
    unparseHatVersionZ("Professional_Killstreak_C.A.P.P.E.R;L;Unique"),
    {
      marketHashName: "Professional Killstreak C.A.P.P.E.R",
      tradable: false,
      marketable: false,
      craftable: false,
      festivized: false,
      loaner: true,
      qualities: ["Unique"],
      unusualEffects: [],
      killstreakers: [],
      sheens: [],
      warPaints: [],
      paints: [],
      strangeParts: [],
      spells: [],
      strangeFilters: [],
    },
  );
});

Deno.test("createHatVersionZProps separates Strange Parts and balanced Strange Filters", () => {
  const props = createHatVersionZProps({
    market_hash_name: "Strange Weapon",
    descriptions: [
      { value: "(Player Hits: 12)" },
      { value: "(Robots Destroyed: 34) (only Mann Up (Advanced (Tour)))" },
      { value: "(Robot Spies Destroyed: 5) (only Mann Up (Advanced (Tour)))" },
    ],
  });

  assertEquals(props.strangeParts, [
    "Player Hits",
    "Robot Spies Destroyed",
    "Robots Destroyed",
  ]);
  assertEquals(props.strangeFilters, ["Mann Up (Advanced (Tour))"]);
});

Deno.test("Version Z serializes and unparses Strange Filters after Strange Parts", () => {
  const props = createHatVersionZProps({
    market_hash_name: "Strange Weapon",
    descriptions: [
      { value: "(Robots Destroyed: 34) (only Mann Up (Advanced (Tour)))" },
    ],
  });
  const serialized = createHatVersionZ(props);

  assertEquals(
    serialized,
    "Strange_Weapon;C;;;;;;;Robots_Destroyed;Mann_Up_(Advanced_(Tour))",
  );
  assertEquals(unparseHatVersionZ(serialized), props);
});

Deno.test("createHatVersionZProps recognizes war paints only with a parenthesized wear", () => {
  for (
    const wear of [
      "Factory New",
      "Minimal Wear",
      "Field-Tested",
      "Well-Worn",
      "Battle Scarred",
    ]
  ) {
    assertEquals(
      createHatVersionZProps({
        market_hash_name: `Hana Disciplinary Action (${wear})`,
        descriptions: [{ value: "✔ Hana War Paint" }],
      }).warPaints,
      ["Hana War Paint"],
    );
  }

  for (
    const marketHashName of [
      "Hana Disciplinary Action",
      "Hana Disciplinary Action Field-Tested",
    ]
  ) {
    assertEquals(
      createHatVersionZProps({
        market_hash_name: marketHashName,
        descriptions: [{ value: "✔ Hana War Paint" }],
      }).warPaints,
      [],
    );
  }
});

Deno.test("Version Z separates starred war paints from unusual effects", () => {
  const props = createHatVersionZProps({
    market_hash_name: "Unusual Peppermint Swirl Rescue Ranger (Field-Tested)",
    tradable: 1,
    marketable: 1,
    tags: [{ category: "Quality", localized_tag_name: "Unusual" }],
    descriptions: [
      { value: "★ Unusual Effect: Hot" },
      { value: "Winter 2020 Collection" },
      { value: "    Gingerbread Winner War Paint" },
      { value: "★ Peppermint Swirl War Paint" },
      { value: "    Glacial Glazed War Paint" },
    ],
  });

  assertEquals(props.warPaints, ["Peppermint Swirl War Paint"]);
  assertEquals(props.unusualEffects, ["Hot"]);
  const serialized = createHatVersionZ(props);
  assertEquals(
    serialized,
    "Unusual_Peppermint_Swirl_Rescue_Ranger_(Field-Tested);TMC;Unusual;Hot;;;Peppermint_Swirl_War_Paint",
  );
  assertEquals(unparseHatVersionZ(serialized), props);
});

Deno.test("createHatVersionZProps preserves legacy starred collection names", () => {
  for (const skin of ["Blitzkrieg Knife", "Shot to Hell Pistol"]) {
    const props = createHatVersionZProps({
      market_hash_name: `Unusual Professional Killstreak ${skin} (Factory New)`,
      descriptions: [
        { value: "★ Unusual Effect: Cool" },
        { value: `★ ${skin}` },
      ],
    });
    assertEquals(props.warPaints, [skin]);
    assertEquals(props.unusualEffects, ["Cool"]);
  }
});
