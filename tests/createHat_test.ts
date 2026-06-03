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

Deno.test("unparseHatVersionZ rejects too many semicolons", () => {
  assertThrows(
    () => unparseHatVersionZ("1;2;3;4;5;6;7;8;9;10;11"),
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
      killstreakParts: [],
      spells: [],
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
      killstreakParts: [],
      spells: [],
    },
  );
});
