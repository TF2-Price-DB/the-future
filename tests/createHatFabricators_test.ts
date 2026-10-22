import { assertEquals } from "@std/assert";
import {
  createHatVersionZ,
  createHatVersionZProps,
  unparseHatVersionZ,
} from "../src/createHat.ts";

for (
  const example of [
    {
      tier: "Professional",
      description: "(Killstreaker: Singularity, Sheen: Deadly Daffodil)",
      killstreakers: ["Singularity"],
      sheens: ["Deadly Daffodil"],
      suffix: ";;Singularity;Deadly_Daffodil",
    },
    {
      tier: "Specialized",
      description: "(Sheen: Mean Green)",
      killstreakers: [],
      sheens: ["Mean Green"],
      suffix: ";;;Mean_Green",
    },
  ]
) {
  Deno.test(`Version Z parses ${example.tier} killstreak fabricator output attributes`, () => {
    const kit = `${example.tier} Killstreak Grenade Launcher Kit`;
    const props = createHatVersionZProps({
      market_hash_name: `${kit} Fabricator`,
      tradable: 1,
      marketable: 1,
      tags: [{ category: "Quality", localized_tag_name: "Unique" }],
      descriptions: [
        { value: kit },
        { value: example.description },
      ],
    });

    assertEquals(props.killstreakers, example.killstreakers);
    assertEquals(props.sheens, example.sheens);
    const hat = createHatVersionZ(props);
    assertEquals(
      hat,
      `${example.tier}_Killstreak_Grenade_Launcher_Kit_Fabricator;TMC;Unique${example.suffix}`,
    );
    assertEquals(unparseHatVersionZ(hat), props);
  });
}

Deno.test("createHatVersionZProps sorts separate and fabricator attributes together", () => {
  const props = createHatVersionZProps({
    market_hash_name: "Mixed attributes",
    descriptions: [
      { value: "Killstreaker: Singularity" },
      { value: "Sheen: Mean Green" },
      { value: "(Killstreaker: Fire Horns, Sheen: Deadly Daffodil)" },
      { value: "(Sheen: Agonizing Emerald)" },
    ],
  });

  assertEquals(props.killstreakers, ["Fire Horns", "Singularity"]);
  assertEquals(props.sheens, [
    "Agonizing Emerald",
    "Deadly Daffodil",
    "Mean Green",
  ]);
});
