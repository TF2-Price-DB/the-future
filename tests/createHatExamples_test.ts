import { assertEquals } from "@std/assert";
import { createHatVersionZ, createHatVersionZProps } from "../src/createHat.ts";

function assertCreatesHat(
  description: Record<string, unknown>,
  expected: string,
) {
  assertEquals(
    `Z^${createHatVersionZ(createHatVersionZProps(description))}`,
    expected,
  );
}

Deno.test("Version Z example: Refined Metal", () => {
  // Source: data/inv.db inventory steam64=76561197960265749, assetid=5224504578
  assertCreatesHat({
    "appid": 440,
    "classid": "2674",
    "instanceid": "11040547",
    "currency": 0,
    "background_color": "3C352E",
    "icon_url":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEbZQsUYhTkhzJWhsO1Mv6NGucF1Ygzt8ZQijJukFMiMrbhYDEwI1yRVKNfD6xorQ3qW3Jr6546DNPuou9IOVK4p4kWJaA",
    "icon_url_large":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEbZQsUYhTkhzJWhsO1Mv6NGucF1Ygzt8ZQijJukFMiMrbhYDEwI1yRVKNfD6xorQ3qW3Jr6546DNPuou9IOVK4p4kWJaA",
    "tradable": 1,
    "actions": [
      {
        "link":
          "http://wiki.teamfortress.com/scripts/itemredirect.php?id=5002&lang=en_US",
        "name": "Item Wiki Page...",
      },
    ],
    "name": "Refined Metal",
    "name_color": "7D6D00",
    "type": "Level 3 Craft Item",
    "market_name": "Refined Metal",
    "market_hash_name": "Refined Metal",
    "commodity": 0,
    "market_tradable_restriction": 7,
    "market_marketable_restriction": 0,
    "marketable": 0,
    "tags": [
      {
        "category": "Quality",
        "internal_name": "Unique",
        "localized_category_name": "Quality",
        "localized_tag_name": "Unique",
        "color": "7D6D00",
      },
      {
        "category": "Type",
        "internal_name": "Craft Item",
        "localized_category_name": "Type",
        "localized_tag_name": "Craft Item",
      },
    ],
    "sealed": 0,
    "sealed_type": 0,
  }, "Z^Refined_Metal;TC;Unique");
});

Deno.test("Version Z example: Abominable Cosmetic Case with global unusual effects", () => {
  // Source: data/inv.db inventory steam64=76561198036272372, assetid=16880066796
  assertCreatesHat({
    "appid": 440,
    "classid": "2569425568",
    "instanceid": "0",
    "currency": 0,
    "background_color": "3C352E",
    "icon_url":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIYxQcWA_ruwdAidvjMviZBucMnuUs4IRc5jpqgwZ-euLnZTMxcFTBA_VYXvY8oF_uXCJkvsJiBdbu8rhTLQrms4rGO-V-OdlSX56H3KbZ_po",
    "icon_url_large":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIYxQcWA_ruwdAidvjMviZBucMnuUs4IRc5jpqgwZ-euLnZTMxcFTBA_VYXvY8oF_uXCJkvsJiBdbu8rhTLQrms4rGO-V-OdlSX56H3KbZ_po",
    "descriptions": [
      {
        "value":
          "This Case is locked and requires an\nAbominable Cosmetic Key to open.\n\nContains a community made item\nfrom the Abominable Cosmetic Collection.",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": "Contents may be Strange or an Unusual Jungle Inferno Hat",
        "color": "7ea9d1",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": "Abominable Cosmetic Collection",
        "name": "attribute",
      },
      {
        "value": "    The War Eagle",
        "color": "eb4b4b",
        "name": "attribute",
      },
      {
        "value": "    Quizzical Quetzal",
        "color": "eb4b4b",
        "name": "attribute",
      },
      {
        "value": "    Jungle Jersey",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    Tropical Toad",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    The Aztec Aggressor",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    The Hunter in Darkness",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    D-Eye-Monds",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Transparent Trousers",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    The Croaking Hazard",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Rifleman's Regalia",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Bait and Bite",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Nuke",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Attack Packs",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Shellmet",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Forest Footwear",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Most Dangerous Mane",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Classy Capper",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Pithy Professional",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Conagher's Utility Idol",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Fireman's Essentials",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": "Case Global Unusual Effect(s)",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Green Confetti",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Purple Confetti",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Haunted Ghosts",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Green Energy",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Purple Energy",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Circling TF Logo",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Massed Flies",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Burning Flames",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Scorching Flames",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Searing Plasma",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Vivid Plasma",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Sunbeams",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Circling Peace Sign",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Circling Heart",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Stormy Storm",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Blizzardy Storm",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Nuts n' Bolts",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Orbiting Planets",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Orbiting Fire",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Bubbling",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Smoking",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Steaming",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Kill-a-Watt",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Terror-Watt",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Cloud 9",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Aces High",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Dead Presidents",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Miami Nights",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": "★ Unusual Effect: Disco Beat Down",
        "color": "ffd700",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": "Case Global Bonus Item(s)",
        "name": "attribute",
      },
      {
        "value":
          "Paint Cans!\nTaunt Unusualifiers!\nMvM Tickets!\nAnd TF2 Tools!",
        "name": "attribute",
      },
      {
        "value": "Inspect for full list of unusual effects and more details",
        "name": "attribute",
      },
    ],
    "tradable": 1,
    "actions": [
      {
        "link":
          "http://wiki.teamfortress.com/scripts/itemredirect.php?id=5871&lang=en_US",
        "name": "Item Wiki Page...",
      },
      {
        "link":
          "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D3370103730958384407",
        "name": "Inspect in Game...",
      },
    ],
    "name": "Abominable Cosmetic Case",
    "name_color": "7D6D00",
    "type": "",
    "market_name": "Abominable Cosmetic Case",
    "market_hash_name": "Abominable Cosmetic Case",
    "market_actions": [
      {
        "link":
          "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D3370103730958384407",
        "name": "Inspect in Game...",
      },
    ],
    "commodity": 1,
    "market_tradable_restriction": 7,
    "market_marketable_restriction": 0,
    "marketable": 1,
    "tags": [
      {
        "category": "Quality",
        "internal_name": "Unique",
        "localized_category_name": "Quality",
        "localized_tag_name": "Unique",
        "color": "7D6D00",
      },
      {
        "category": "Type",
        "internal_name": "Supply Crate",
        "localized_category_name": "Type",
        "localized_tag_name": "Crate",
      },
      {
        "category": "Collection",
        "internal_name": "Campaign3Cosmetics_Case1_collection",
        "localized_category_name": "Collection",
        "localized_tag_name": "Abominable Cosmetic Collection",
      },
    ],
    "sealed": 0,
    "sealed_type": 0,
  }, "Z^Abominable_Cosmetic_Case;TMC;Unique");
});

Deno.test("Version Z example: Strange Unusual A Handsome Handy Thing", () => {
  // Source: data/inv.db inventory steam64=76561198069527288, assetid=15573287602
  assertCreatesHat(
    {
      "appid": 440,
      "classid": "6886203553",
      "instanceid": "7766849968",
      "currency": 0,
      "background_color": "3C352E",
      "icon_url":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUmyhzBChsz_MuaEAe4HpNY095dQlzU6kgIjbOWwZG8yKwbDUvYIXqZp8V3oUX5m7cI0UoPmp70HKl684YHYc-57Xaw6tE8",
      "icon_url_large":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUmyhzBChsz_MuaEAe4HpNY095dQlzU6kgIjbOWwZG8yKwbDUvYIXqZp8V3oUX5m7cI0UoPmp70HKl684YHYc-57Xaw6tE8",
      "descriptions": [
        {
          "value": "Mercenary Grade Handsome Hand",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "Style: Fresh",
          "color": "756b5e",
          "name": "attribute",
        },
        {
          "value": "★ Unusual Effect: Circling Peace Sign",
          "color": "ffd700",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "Wicked Windfall Collection",
          "name": "attribute",
        },
        {
          "value": "    Balloonicorpse",
          "color": "eb4b4b",
          "name": "attribute",
        },
        {
          "value": "    All Hallows' Hatte",
          "color": "eb4b4b",
          "name": "attribute",
        },
        {
          "value": "    Misfortune Fedora",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Wavefinder",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    The Fire Tooth",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Wrap-a-Khamon",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Glow from Below",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Gourd Grin",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Sir Pumpkinton",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Impish Ears",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Eye-See-You",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Semi-Tame Trapper's Hat",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Calamitous Cauldron",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    The Seared Sorcerer",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Goblineer",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Handsome Devil",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "★ A Handsome Handy Thing",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Hollowed Helm",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Flavorful Baggies",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    King Cardbeard",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    The Boom Boxers",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    The Ghoul Box",
          "color": "4b69ff",
          "name": "attribute",
        },
      ],
      "tradable": 1,
      "actions": [
        {
          "link":
            "http://wiki.teamfortress.com/scripts/itemredirect.php?id=31129&lang=en_US",
          "name": "Item Wiki Page...",
        },
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D5475803355100033031",
          "name": "Inspect in Game...",
        },
      ],
      "fraudwarnings": [
        'This item has been renamed.\nOriginal name: "A Handsome Handy Thing"',
      ],
      "name": "''did you guys know pyro is jewish''",
      "name_color": "8650AC",
      "type": "Strange Handsome Hand - Points Scored: 1110",
      "market_name": "Strange Unusual A Handsome Handy Thing",
      "market_hash_name": "Strange Unusual A Handsome Handy Thing",
      "market_actions": [
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D5475803355100033031",
          "name": "Inspect in Game...",
        },
      ],
      "commodity": 0,
      "market_tradable_restriction": 7,
      "market_marketable_restriction": 0,
      "marketable": 1,
      "tags": [
        {
          "category": "Quality",
          "internal_name": "rarity4",
          "localized_category_name": "Quality",
          "localized_tag_name": "Unusual",
          "color": "8650AC",
        },
        {
          "category": "Type",
          "internal_name": "misc",
          "localized_category_name": "Type",
          "localized_tag_name": "Cosmetic",
        },
        {
          "category": "Class",
          "internal_name": "Scout",
          "localized_category_name": "Class",
          "localized_tag_name": "Scout",
        },
        {
          "category": "Class",
          "internal_name": "Sniper",
          "localized_category_name": "Class",
          "localized_tag_name": "Sniper",
        },
        {
          "category": "Class",
          "internal_name": "Soldier",
          "localized_category_name": "Class",
          "localized_tag_name": "Soldier",
        },
        {
          "category": "Class",
          "internal_name": "Demoman",
          "localized_category_name": "Class",
          "localized_tag_name": "Demoman",
        },
        {
          "category": "Class",
          "internal_name": "Medic",
          "localized_category_name": "Class",
          "localized_tag_name": "Medic",
        },
        {
          "category": "Class",
          "internal_name": "Heavy",
          "localized_category_name": "Class",
          "localized_tag_name": "Heavy",
        },
        {
          "category": "Class",
          "internal_name": "Pyro",
          "localized_category_name": "Class",
          "localized_tag_name": "Pyro",
        },
        {
          "category": "Class",
          "internal_name": "Spy",
          "localized_category_name": "Class",
          "localized_tag_name": "Spy",
        },
        {
          "category": "Class",
          "internal_name": "Engineer",
          "localized_category_name": "Class",
          "localized_tag_name": "Engineer",
        },
        {
          "category": "Rarity",
          "internal_name": "Rarity_Rare",
          "localized_category_name": "Grade",
          "localized_tag_name": "Mercenary",
          "color": "4b69ff",
        },
        {
          "category": "Collection",
          "internal_name": "halloween2020_collection_name",
          "localized_category_name": "Collection",
          "localized_tag_name": "Wicked Windfall Collection",
        },
      ],
      "sealed": 0,
      "sealed_type": 0,
    },
    "Z^Strange_Unusual_A_Handsome_Handy_Thing;TMC;Unusual;Circling_Peace_Sign",
  );
});

Deno.test("Version Z example: Collector's Festivized Professional Killstreak Amputator", () => {
  // Source: data/inv.db inventory steam64=76561198060126263, assetid=16737813295
  assertCreatesHat(
    {
      "appid": 440,
      "classid": "8101026056",
      "instanceid": "625237672",
      "currency": 0,
      "background_color": "3C352E",
      "icon_url":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEMaQkUTxr2vTx8mMnvA-aHAfQ_ktk664Ma2glqnBFuIOKhPyVYdAHRFalIWbs78Au1DyI3vZ5gV4G38u4FKAno5YSUYLAkMIodH8HUXvCAMgj86Bk7nuEDeJ6xkmPM",
      "icon_url_large":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEMaQkUTxr2vTx8mMnvA-aHAfQ_ktk664Ma2glqnBFuIOKhPyVYdAHRFalIWbs78Au1DyI3vZ5gV4G38u4FKAno5YSUYLAkMIodH8HUXvCAMgj86Bk7nuEDeJ6xkmPM",
      "descriptions": [
        {
          "value": "Festivized",
          "color": "ffd700",
          "name": "attribute",
        },
        {
          "value": "When weapon is active:",
          "name": "attribute",
        },
        {
          "value": "+3 health regenerated per second on wearer",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Alt-Fire: Applies a healing effect to all nearby teammates",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Halloween: Exorcism (spell only active during event)",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Killstreaker: Fire Horns",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Sheen: Agonizing Emerald",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Killstreaks Active",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "-20% damage penalty",
          "color": "d83636",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "The Medieval Medic",
          "color": "e1e10f",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "The Amputator",
          "color": "8b8989",
          "name": "attribute",
        },
        {
          "value": "Crusader's Crossbow",
          "color": "8b8989",
          "name": "attribute",
        },
        {
          "value": "Berliner's Bucket Helm",
          "color": "8b8989",
          "name": "attribute",
        },
      ],
      "tradable": 1,
      "actions": [
        {
          "link":
            "http://wiki.teamfortress.com/scripts/itemredirect.php?id=304&lang=en_US",
          "name": "Item Wiki Page...",
        },
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D750491603853599840",
          "name": "Inspect in Game...",
        },
      ],
      "fraudwarnings": [
        'This item has been renamed.\nOriginal name: "Amputator"',
      ],
      "name": "''Chthonic Channeler (Collector's - Exo)''",
      "name_color": "AA0000",
      "type": "Level 15 Bonesaw",
      "market_name": "Collector's Festivized Professional Killstreak Amputator",
      "market_hash_name":
        "Collector's Festivized Professional Killstreak Amputator",
      "market_actions": [
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D750491603853599840",
          "name": "Inspect in Game...",
        },
      ],
      "commodity": 0,
      "market_tradable_restriction": 7,
      "market_marketable_restriction": 0,
      "marketable": 1,
      "tags": [
        {
          "category": "Quality",
          "internal_name": "collectors",
          "localized_category_name": "Quality",
          "localized_tag_name": "Collector's",
          "color": "AA0000",
        },
        {
          "category": "Type",
          "internal_name": "melee",
          "localized_category_name": "Type",
          "localized_tag_name": "Melee weapon",
        },
        {
          "category": "Class",
          "internal_name": "Medic",
          "localized_category_name": "Class",
          "localized_tag_name": "Medic",
        },
      ],
      "sealed": 0,
      "sealed_type": 0,
    },
    "Z^Collector's_Festivized_Professional_Killstreak_Amputator;TMCF;Collector's;;Fire_Horns;Agonizing_Emerald;;;;;Exorcism",
  );
});

Deno.test("Version Z example: Strange Festive Sapper", () => {
  // Source: data/inv.db inventory steam64=76561198114402400, assetid=16838432177
  assertCreatesHat({
    "appid": 440,
    "classid": "1336077339",
    "instanceid": "62856742",
    "currency": 0,
    "background_color": "3C352E",
    "icon_url":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUxQQTQvnqgdbhcn1Mv6NGucF1Yk248EG3TM7kgArZruxY25ic1bBWfgNWPNi91i5DXZivMZmBIfu9LlIOVK4xnyVxPE",
    "icon_url_large":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUxQQTQvnqgdbhcn1Mv6NGucF1Yk248EG3TM7kgArZruxY25ic1bBWfgNWPNi91i5DXZivMZmBIfu9LlIOVK4xnyVxPE",
    "descriptions": [
      {
        "value":
          "Place on enemy buildings to disable and slowly drain away its health.  Placing a sapper does not remove your disguise",
        "name": "attribute",
      },
    ],
    "tradable": 1,
    "actions": [
      {
        "link":
          "http://wiki.teamfortress.com/scripts/itemredirect.php?id=1080&lang=en_US",
        "name": "Item Wiki Page...",
      },
    ],
    "name": "Strange Festive Sapper",
    "name_color": "CF6A32",
    "type": "Limited Strange Sapper - Buildings Sapped: 0",
    "market_name": "Strange Festive Sapper",
    "market_hash_name": "Strange Festive Sapper",
    "commodity": 0,
    "market_tradable_restriction": 7,
    "market_marketable_restriction": 0,
    "marketable": 1,
    "tags": [
      {
        "category": "Quality",
        "internal_name": "strange",
        "localized_category_name": "Quality",
        "localized_tag_name": "Strange",
        "color": "CF6A32",
      },
      {
        "category": "Type",
        "internal_name": "building",
        "localized_category_name": "Type",
        "localized_tag_name": "Building",
      },
      {
        "category": "Class",
        "internal_name": "Spy",
        "localized_category_name": "Class",
        "localized_tag_name": "Spy",
      },
    ],
    "sealed": 0,
    "sealed_type": 0,
  }, "Z^Strange_Festive_Sapper;TMC;Strange");
});

Deno.test("Version Z example: A Handsome Handy Thing", () => {
  // Source: data/inv.db inventory steam64=76561198116723769, assetid=16930927178
  assertCreatesHat({
    "appid": 440,
    "classid": "4019200950",
    "instanceid": "8381452738",
    "currency": 0,
    "background_color": "3C352E",
    "icon_url":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUmyhzBChsz_MuaEAe4HpNY095dQlzU6kgIjbOWwZG8yKwbDUvYIXqZp8V3oUX5m7cI0UoPmp70HKl684YHYc-57Xaw6tE8",
    "icon_url_large":
      "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUmyhzBChsz_MuaEAe4HpNY095dQlzU6kgIjbOWwZG8yKwbDUvYIXqZp8V3oUX5m7cI0UoPmp70HKl684YHYc-57Xaw6tE8",
    "descriptions": [
      {
        "value": "Mercenary Grade Handsome Hand",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "Style: Fresh",
        "color": "756b5e",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": "Wicked Windfall Collection",
        "name": "attribute",
      },
      {
        "value": "    Balloonicorpse",
        "color": "eb4b4b",
        "name": "attribute",
      },
      {
        "value": "    All Hallows' Hatte",
        "color": "eb4b4b",
        "name": "attribute",
      },
      {
        "value": "    Misfortune Fedora",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    Wavefinder",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    The Fire Tooth",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    Wrap-a-Khamon",
        "color": "d32ce6",
        "name": "attribute",
      },
      {
        "value": "    Glow from Below",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Gourd Grin",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Sir Pumpkinton",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Impish Ears",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Eye-See-You",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Semi-Tame Trapper's Hat",
        "color": "8847ff",
        "name": "attribute",
      },
      {
        "value": "    Calamitous Cauldron",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Seared Sorcerer",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Goblineer",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Handsome Devil",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "✔ A Handsome Handy Thing",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Hollowed Helm",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    Flavorful Baggies",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    King Cardbeard",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Boom Boxers",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "    The Ghoul Box",
        "color": "4b69ff",
        "name": "attribute",
      },
      {
        "value": "\nTradable After: Wednesday, April 22, 2026 (7:00:00) GMT",
        "color": "d83636",
        "name": "attribute",
      },
    ],
    "tradable": 0,
    "actions": [
      {
        "link":
          "http://wiki.teamfortress.com/scripts/itemredirect.php?id=31129&lang=en_US",
        "name": "Item Wiki Page...",
      },
      {
        "link":
          "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D14119262634505533477",
        "name": "Inspect in Game...",
      },
    ],
    "name": "A Handsome Handy Thing",
    "name_color": "7D6D00",
    "type": "Level 89 Handsome Hand",
    "market_name": "A Handsome Handy Thing",
    "market_hash_name": "A Handsome Handy Thing",
    "market_actions": [
      {
        "link":
          "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D14119262634505533477",
        "name": "Inspect in Game...",
      },
    ],
    "commodity": 0,
    "market_tradable_restriction": 7,
    "market_marketable_restriction": 0,
    "marketable": 1,
    "tags": [
      {
        "category": "Quality",
        "internal_name": "Unique",
        "localized_category_name": "Quality",
        "localized_tag_name": "Unique",
        "color": "7D6D00",
      },
      {
        "category": "Type",
        "internal_name": "misc",
        "localized_category_name": "Type",
        "localized_tag_name": "Cosmetic",
      },
      {
        "category": "Class",
        "internal_name": "Scout",
        "localized_category_name": "Class",
        "localized_tag_name": "Scout",
      },
      {
        "category": "Class",
        "internal_name": "Sniper",
        "localized_category_name": "Class",
        "localized_tag_name": "Sniper",
      },
      {
        "category": "Class",
        "internal_name": "Soldier",
        "localized_category_name": "Class",
        "localized_tag_name": "Soldier",
      },
      {
        "category": "Class",
        "internal_name": "Demoman",
        "localized_category_name": "Class",
        "localized_tag_name": "Demoman",
      },
      {
        "category": "Class",
        "internal_name": "Medic",
        "localized_category_name": "Class",
        "localized_tag_name": "Medic",
      },
      {
        "category": "Class",
        "internal_name": "Heavy",
        "localized_category_name": "Class",
        "localized_tag_name": "Heavy",
      },
      {
        "category": "Class",
        "internal_name": "Pyro",
        "localized_category_name": "Class",
        "localized_tag_name": "Pyro",
      },
      {
        "category": "Class",
        "internal_name": "Spy",
        "localized_category_name": "Class",
        "localized_tag_name": "Spy",
      },
      {
        "category": "Class",
        "internal_name": "Engineer",
        "localized_category_name": "Class",
        "localized_tag_name": "Engineer",
      },
      {
        "category": "Rarity",
        "internal_name": "Rarity_Rare",
        "localized_category_name": "Grade",
        "localized_tag_name": "Mercenary",
        "color": "4b69ff",
      },
      {
        "category": "Collection",
        "internal_name": "halloween2020_collection_name",
        "localized_category_name": "Collection",
        "localized_tag_name": "Wicked Windfall Collection",
      },
    ],
    "sealed": 0,
    "sealed_type": 0,
  }, "Z^A_Handsome_Handy_Thing;MC;Unique");
});

Deno.test("Version Z example: Hana Disciplinary Action (Field-Tested)", () => {
  // Source: data/inv.db inventory steam64=76561197965158062, assetid=7693784029
  assertCreatesHat(
    {
      "appid": 440,
      "classid": "2655187418",
      "instanceid": "3244073870",
      "currency": 0,
      "background_color": "3C352E",
      "icon_url":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEMaQkUTxr2vTx8mMnvA-aHAfQ_ktk664MayTdinxVwPffnYmRYexDHDPQKC8ot8Qn-Wmlr7cQ7ANHuo-kFLV--4IOQNLV-Mt0aHZSDWf6HYwD8vEIx06EIfcOKvmqxiuckYQvM",
      "icon_url_large":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEMaQkUTxr2vTx8mMnvA-aHAfQ_ktk664MayTdinxVwPffnYmRYexDHDPQKC8ot8Qn-Wmlr7cQ7ANHuo-kFLV--4IOQNLV-Mt0aHZSDWf6HYwD8vEIx06EIfcOKvmqxiuckYQvM",
      "descriptions": [
        {
          "value": "Commando Grade Riding Crop (Field-Tested)",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value":
            "On Hit Teammate: Boosts both players' speed for several seconds",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "-25% damage penalty",
          "color": "d83636",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "The General's Formals",
          "color": "e1e10f",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "The Mantreads",
          "color": "8b8989",
          "name": "attribute",
        },
        {
          "value": "The Disciplinary Action",
          "color": "8b8989",
          "name": "attribute",
        },
        {
          "value": "Armored Authority",
          "color": "8b8989",
          "name": "attribute",
        },
        {
          "value": "Fancy Dress Uniform",
          "color": "8b8989",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "Winter 2017 Collection",
          "name": "attribute",
        },
        {
          "value": "    Miami Element War Paint",
          "color": "eb4b4b",
          "name": "attribute",
        },
        {
          "value": "    Jazzy War Paint",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Mosaic War Paint",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Cosmic Calamity War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "✔ Hana War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Uranium War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Neo Tokyo War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Hazard Warning War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Damascus and Mahogany War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Dovetailed War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Alien Tech War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Cabin Fevered War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Polar Surprise War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Bomber Soul War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Geometrical Teams War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
      ],
      "tradable": 1,
      "actions": [
        {
          "link":
            "http://wiki.teamfortress.com/scripts/itemredirect.php?id=447&lang=en_US",
          "name": "Item Wiki Page...",
        },
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D7810449477495420729",
          "name": "Inspect in Game...",
        },
      ],
      "name": "Hana Disciplinary Action",
      "name_color": "FAFAFA",
      "type": "",
      "market_name": "Hana Disciplinary Action (Field-Tested)",
      "market_hash_name": "Hana Disciplinary Action (Field-Tested)",
      "market_actions": [
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D7810449477495420729",
          "name": "Inspect in Game...",
        },
      ],
      "commodity": 0,
      "market_tradable_restriction": 7,
      "market_marketable_restriction": 0,
      "marketable": 1,
      "tags": [
        {
          "category": "Quality",
          "internal_name": "paintkitweapon",
          "localized_category_name": "Quality",
          "localized_tag_name": "Decorated Weapon",
          "color": "FAFAFA",
        },
        {
          "category": "Type",
          "internal_name": "melee",
          "localized_category_name": "Type",
          "localized_tag_name": "Melee weapon",
        },
        {
          "category": "Class",
          "internal_name": "Soldier",
          "localized_category_name": "Class",
          "localized_tag_name": "Soldier",
        },
        {
          "category": "Exterior",
          "internal_name": "TFUI_InvTooltip_FieldTested",
          "localized_category_name": "Exterior",
          "localized_tag_name": "Field-Tested",
        },
      ],
      "sealed": 0,
      "sealed_type": 0,
    },
    "Z^Hana_Disciplinary_Action_(Field-Tested);TMC;Decorated_Weapon;;;;Hana_War_Paint",
  );
});

Deno.test("Version Z example: Self-Made Crawlspace Critters War Paint (Factory New)", () => {
  // Source: data/inv.db inventory steam64=76561198086475372, assetid=9287474299
  assertCreatesHat(
    {
      "appid": 440,
      "classid": "4019199794",
      "instanceid": "16044344",
      "currency": 0,
      "background_color": "3C352E",
      "icon_url":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEMaQkUTxr2vTx8mMnvA-aHAfQ_ktk664MayTdinxVwPffnZmZYexDHDPkLD6MF4w3tG3Z8uJA1AoHlo79XeVnrsILHMLcpNN9FScPRU_HTYQ2p7R87gqYOLJGPqDSvg3rcepm6vw",
      "icon_url_large":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEMaQkUTxr2vTx8mMnvA-aHAfQ_ktk664MayTdinxVwPffnZmZYexDHDPkLD6MF4w3tG3Z8uJA1AoHlo79XeVnrsILHMLcpNN9FScPRU_HTYQ2p7R87gqYOLJGPqDSvg3rcepm6vw",
      "descriptions": [
        {
          "value": "Commando Grade War Paint (Factory New)",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "★ Unusual Effect: Community Sparkle",
          "color": "ffd700",
          "name": "attribute",
        },
        {
          "value": "I made this!",
          "name": "attribute",
        },
        {
          "value": "Can be redeemed for an item with the same pattern.",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "Scream Fortress XII Collection",
          "name": "attribute",
        },
        {
          "value": "    Spectrum Splattered War Paint",
          "color": "eb4b4b",
          "name": "attribute",
        },
        {
          "value": "    Pumpkin Pied War Paint",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Mummified Mimic War Paint",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Helldriver War Paint",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Sweet Toothed War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "★ Crawlspace Critters War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Raving Dead War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Spider's Cluster War Paint",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Candy Coated War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Portal Plastered War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Death Deluxe War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Eyestalker War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Gourdy Green War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Spider Season War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Organ-ically Hellraised War Paint",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "This is a limited use item. Uses: 1",
          "color": "00a000",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "( Not Tradable, Marketable, or Usable in Crafting )",
          "name": "attribute",
        },
      ],
      "tradable": 0,
      "actions": [
        {
          "link":
            "http://wiki.teamfortress.com/scripts/itemredirect.php?id=17261&lang=en_US",
          "name": "Item Wiki Page...",
        },
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D5614558103352563621",
          "name": "Inspect in Game...",
        },
      ],
      "name": "Self-Made Crawlspace Critters War Paint",
      "name_color": "70B04A",
      "type": "",
      "market_name": "Self-Made Crawlspace Critters War Paint (Factory New)",
      "market_hash_name":
        "Self-Made Crawlspace Critters War Paint (Factory New)",
      "market_actions": [
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D5614558103352563621",
          "name": "Inspect in Game...",
        },
      ],
      "commodity": 0,
      "market_tradable_restriction": 7,
      "market_marketable_restriction": 0,
      "marketable": 0,
      "tags": [
        {
          "category": "Quality",
          "internal_name": "selfmade",
          "localized_category_name": "Quality",
          "localized_tag_name": "Self-Made",
          "color": "70B04A",
        },
        {
          "category": "Type",
          "internal_name": "TF_PaintKitTool",
          "localized_category_name": "Type",
          "localized_tag_name": "War Paint",
        },
        {
          "category": "Rarity",
          "internal_name": "Rarity_Mythical",
          "localized_category_name": "Grade",
          "localized_tag_name": "Commando",
          "color": "8847ff",
        },
        {
          "category": "Collection",
          "internal_name": "Halloween2020Paintkits_collection",
          "localized_category_name": "Collection",
          "localized_tag_name": "Scream Fortress XII Collection",
        },
        {
          "category": "Exterior",
          "internal_name": "TFUI_InvTooltip_FactoryNew",
          "localized_category_name": "Exterior",
          "localized_tag_name": "Factory New",
        },
      ],
      "sealed": 0,
      "sealed_type": 0,
    },
    "Z^Self-Made_Crawlspace_Critters_War_Paint_(Factory_New);C;Self-Made;Community_Sparkle",
  );
});

Deno.test("Version Z example: A Brush with Death", () => {
  // Source: data/inv.db inventory steam64=76561199220873840, assetid=16674838965
  assertCreatesHat({
    "appid": 440,
    "classid": "780613288",
    "instanceid": "8033463271",
    "currency": 0,
    "background_color": "3C352E",
    "icon_url":
      "IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfTbLfJME5hnqWSMU5OD2NtbxicOnChXOjLx2Sk5MbUqMcbBnQz4ruyeU3L2ZDuWf3CKI1NtGeoNWi-KkWHwtK_ALWSYA795XQ1WKacF8DdBP8GJOEdr1IMNr2DhkkAuShN7JJAeJFniyyZCNL99niRcNcUFX_mCkzY",
    "icon_url_large":
      "IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfTbLfJME5hnqWSMU5OD2NtbxicOnChXOjLx2Sk5MbUqMcbBnQz4ruyeU3L2ZDuWf3CKI1NtGeoNWi-KkWHwtK_ALWSYA795XQ1WKacF8DdBP8GJOEdr1IMNr2DhkkAuShN7JJAeJFniyyZCNL99niRcNcUFX_mCkzY",
    "descriptions": [
      {
        "value": "Crafted by Supernova.1",
        "color": "7ea9d1",
        "name": "attribute",
      },
      {
        "value": "Paint Color: After Eight",
        "color": "756b5e",
        "name": "attribute",
      },
      {
        "value": "",
        "name": "attribute",
      },
      {
        "value": " ",
        "name": "attribute",
      },
      {
        "value": "( Not Tradable or Marketable )",
        "name": "attribute",
      },
    ],
    "tradable": 0,
    "actions": [
      {
        "link":
          "http://wiki.teamfortress.com/scripts/itemredirect.php?id=30186&lang=en_US",
        "name": "Item Wiki Page...",
      },
      {
        "link":
          "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D11932267152999242366",
        "name": "Inspect in Game...",
      },
    ],
    "name": "A Brush with Death",
    "name_color": "7D6D00",
    "type": "Level 45 Facial Hair",
    "market_name": "A Brush with Death",
    "market_hash_name": "A Brush with Death",
    "market_actions": [
      {
        "link":
          "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D11932267152999242366",
        "name": "Inspect in Game...",
      },
    ],
    "commodity": 0,
    "market_tradable_restriction": 7,
    "market_marketable_restriction": 0,
    "marketable": 0,
    "tags": [
      {
        "category": "Quality",
        "internal_name": "Unique",
        "localized_category_name": "Quality",
        "localized_tag_name": "Unique",
        "color": "7D6D00",
      },
      {
        "category": "Type",
        "internal_name": "misc",
        "localized_category_name": "Type",
        "localized_tag_name": "Cosmetic",
      },
      {
        "category": "Class",
        "internal_name": "Medic",
        "localized_category_name": "Class",
        "localized_tag_name": "Medic",
      },
    ],
    "sealed": 0,
    "sealed_type": 0,
  }, "Z^A_Brush_with_Death;C;Unique;;;;;After_Eight");
});

Deno.test("Version Z example: Loaner Professional Killstreak C.A.P.P.E.R", () => {
  // Source: data/inv.db inventory steam64=76561198177872379, assetid=12124120510
  assertCreatesHat(
    {
      "appid": 440,
      "classid": "3760386686",
      "instanceid": "1240807770",
      "currency": 0,
      "background_color": "3C352E",
      "icon_url":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUw4fSxrxsTdNt9jvHuaDBN8Mmsgy4N4E3Dc6l1h9bbviZGRlJwWTA_VcWvQ-owu_CnA0v5E1DY7jpuNfel--qsKYZN03T_GK",
      "icon_url_large":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUw4fSxrxsTdNt9jvHuaDBN8Mmsgy4N4E3Dc6l1h9bbviZGRlJwWTA_VcWvQ-owu_CnA0v5E1DY7jpuNfel--qsKYZN03T_GK",
      "descriptions": [
        {
          "value": "Commando Grade Pistol",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "Killstreaker: Hypno-Beam",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Sheen: Mean Green",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Killstreaks Active",
          "color": "7ea9d1",
          "name": "attribute",
        },
        {
          "value": "Turn your enemies into ash!",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value": "Confidential Collection",
          "name": "attribute",
        },
        {
          "value": "    Batsaber",
          "color": "eb4b4b",
          "name": "attribute",
        },
        {
          "value": "    Space Hamster Hammy",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "    Taunt: Burstchester",
          "color": "d32ce6",
          "name": "attribute",
        },
        {
          "value": "✔ The C.A.P.P.E.R",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Phononaut",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    Jupiter Jetpack",
          "color": "8847ff",
          "name": "attribute",
        },
        {
          "value": "    The Space Diver",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    Cadet Visor",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    The Graylien",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": "    A Head Full of Hot Air",
          "color": "4b69ff",
          "name": "attribute",
        },
        {
          "value": " ",
          "name": "attribute",
        },
        {
          "value":
            "( Loaner - Cannot be traded, marketed, crafted, or modified )",
          "name": "attribute",
        },
      ],
      "tradable": 1,
      "actions": [
        {
          "link":
            "http://wiki.teamfortress.com/scripts/itemredirect.php?id=30666&lang=en_US",
          "name": "Item Wiki Page...",
        },
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D943828614521557104",
          "name": "Inspect in Game...",
        },
      ],
      "name": "Professional Killstreak C.A.P.P.E.R",
      "name_color": "7D6D00",
      "type": "Level 1 Pistol",
      "market_name": "Professional Killstreak C.A.P.P.E.R",
      "market_hash_name": "Professional Killstreak C.A.P.P.E.R",
      "market_actions": [
        {
          "link":
            "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D943828614521557104",
          "name": "Inspect in Game...",
        },
      ],
      "commodity": 0,
      "market_tradable_restriction": 7,
      "market_marketable_restriction": 0,
      "marketable": 1,
      "tags": [
        {
          "category": "Quality",
          "internal_name": "Unique",
          "localized_category_name": "Quality",
          "localized_tag_name": "Unique",
          "color": "7D6D00",
        },
        {
          "category": "Type",
          "internal_name": "secondary",
          "localized_category_name": "Type",
          "localized_tag_name": "Secondary weapon",
        },
        {
          "category": "Class",
          "internal_name": "Scout",
          "localized_category_name": "Class",
          "localized_tag_name": "Scout",
        },
        {
          "category": "Class",
          "internal_name": "Engineer",
          "localized_category_name": "Class",
          "localized_tag_name": "Engineer",
        },
        {
          "category": "Rarity",
          "internal_name": "Rarity_Mythical",
          "localized_category_name": "Grade",
          "localized_tag_name": "Commando",
          "color": "8847ff",
        },
        {
          "category": "Collection",
          "internal_name": "Invasion_collection_02",
          "localized_category_name": "Collection",
          "localized_tag_name": "Confidential Collection",
        },
      ],
      "sealed": 0,
      "sealed_type": 0,
    },
    "Z^Professional_Killstreak_C.A.P.P.E.R;TMCL;Unique;;Hypno-Beam;Mean_Green",
  );
});

Deno.test("Version Z example: Strange AWPer Hand", () => {
  // Source: data/inv.db inventory steam64=76561198006544512, assetid=3556559280
  assertCreatesHat(
    {
      "appid": 440,
      "classid": "1336082785",
      "instanceid": "8313712827",
      "currency": 0,
      "background_color": "3C352E",
      "icon_url":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUwQCWhTduS9Tt8TnH_WJRuJZyoMx5MMMi2FtlVUuZbblM29hKwaUBaVYDfRuoVu7DCIxvsZmVoH457UBFLISf9s",
      "icon_url_large":
        "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIUwQCWhTduS9Tt8TnH_WJRuJZyoMx5MMMi2FtlVUuZbblM29hKwaUBaVYDfRuoVu7DCIxvsZmVoH457UBFLISf9s",
      "descriptions": [
        {
          "value": "(Player Hits: 22420)",
          "color": "756b5e",
          "name": "attribute",
        },
        {
          "value": "(Headshot Kills: 7797)",
          "color": "756b5e",
          "name": "attribute",
        },
        {
          "value": "(Damage Dealt: 2539681)",
          "color": "756b5e",
          "name": "attribute",
        },
        {
          "value":
            "This controversial bolt-action beaut is banned in thousands of countries, and with good reason: You could really hurt someone with this thing.",
          "name": "attribute",
        },
      ],
      "tradable": 1,
      "actions": [
        {
          "link":
            "http://wiki.teamfortress.com/scripts/itemredirect.php?id=851&lang=en_US",
          "name": "Item Wiki Page...",
        },
      ],
      "name": "Strange AWPer Hand",
      "name_color": "CF6A32",
      "type": "Strange Sniper Rifle - Kills: 9473",
      "market_name": "Strange AWPer Hand",
      "market_hash_name": "Strange AWPer Hand",
      "commodity": 0,
      "market_tradable_restriction": 7,
      "market_marketable_restriction": 0,
      "marketable": 1,
      "tags": [
        {
          "category": "Quality",
          "internal_name": "strange",
          "localized_category_name": "Quality",
          "localized_tag_name": "Strange",
          "color": "CF6A32",
        },
        {
          "category": "Type",
          "internal_name": "primary",
          "localized_category_name": "Type",
          "localized_tag_name": "Primary weapon",
        },
        {
          "category": "Class",
          "internal_name": "Sniper",
          "localized_category_name": "Class",
          "localized_tag_name": "Sniper",
        },
      ],
      "sealed": 0,
      "sealed_type": 0,
    },
    "Z^Strange_AWPer_Hand;TMC;Strange;;;;;;Damage_Dealt*cHeadshot_Kills*cPlayer_Hits",
  );
});
