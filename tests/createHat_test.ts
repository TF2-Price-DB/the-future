import { unparseHatVersionZ } from "../src/createHat.ts";

Deno.test("unparseHatVersionZ rejects trailing semicolons", () => {
  assertThrows(
    () => unparseHatVersionZ("Alien_Swarm_Parasite;TC;Unique;;;;;;;"),
    "Invalid Hat Version Z: trailing semicolons are disallowed",
  );
});

Deno.test("unparseHatVersionZ rejects too many semicolons", () => {
  assertThrows(
    () => unparseHatVersionZ("1;2;3;4;5;6;7;8;9;10;11"),
    "Invalid Hat Version Z: too many fields",
  );
});

function assertThrows(fn: () => unknown, message: string) {
  try {
    fn();
  } catch (error) {
    if (error instanceof Error && error.message === message) return;
    throw error;
  }

  throw new Error(`Expected function to throw ${JSON.stringify(message)}`);
}
