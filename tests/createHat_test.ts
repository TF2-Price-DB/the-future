import { assertThrows } from "@std/assert";
import { unparseHatVersionZ } from "../src/createHat.ts";

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
