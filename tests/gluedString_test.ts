import {
  fromGluedString,
  fromGluedStringArray,
  toGluedString,
  toGluedStringArray,
  toGluedStringValue,
} from "../src/gluedString.ts";

Deno.test("toGluedString encodes spaces, newlines, and underscores", () => {
  assertEquals(toGluedString("The Man in Slacks"), "The_Man_in_Slacks");
  assertEquals(toGluedString("With_Underscore"), "With*uUnderscore");
  assertEquals(toGluedString("Line one\nLine two"), "Line_one__Line_two");
});

Deno.test("fromGluedString decodes spaces, newlines, and underscores", () => {
  assertEquals(fromGluedString("The_Man_in_Slacks"), "The Man in Slacks");
  assertEquals(fromGluedString("With*uUnderscore"), "With_Underscore");
  assertEquals(fromGluedString("Line_one__Line_two"), "Line one\nLine two");
});

Deno.test("toGluedStringArray sorts and joins values", () => {
  assertEquals(
    toGluedStringArray(["Villainous Violet", "Team Shine"]),
    "Team_Shine*cVillainous_Violet",
  );
});

Deno.test("fromGluedStringArray decodes empty and populated arrays", () => {
  assertEquals(fromGluedStringArray(""), []);
  assertEquals(
    fromGluedStringArray("Team_Shine*cVillainous_Violet"),
    ["Team Shine", "Villainous Violet"],
  );
});

Deno.test("toGluedStringValue encodes reusable scalar values", () => {
  assertEquals(toGluedStringValue("The Man in Slacks"), "The_Man_in_Slacks");
  assertEquals(toGluedStringValue(["Unique"]), "Unique");
  assertEquals(toGluedStringValue(42), "42");
});

function assertEquals(actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) return;

  throw new Error(
    `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
  );
}
