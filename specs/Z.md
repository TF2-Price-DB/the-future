# HAT Version Z

A full Version Z HAT segment has this shape:

```text
Z^<body>
```

The body is a semicolon-separated list of fields. Text values are encoded as
[Glued Strings](./GluedString.md), and list values are encoded as Glued String
Arrays.

Examples:

```text
Z^The_Man_in_Slacks;TC;Unique
Z^Alien_Swarm_Parasite;TC;Unique;;;;;After_Eight
```

## Goals

Version Z is intended to be:

1. Deterministic: the same inventory description produces the same HAT.
1. Schema-free: a serializer reads the inventory response, not a separate TF2
   schema.
1. Portable: the rules are small enough to implement in any language.
1. Versioned: future formats can coexist with Z instead of mutating it.

## Body Fields

Split the Version Z body on `;`. There are at most eleven fields.

| Field | Name                                                          | Encoding           |
| ----: | :------------------------------------------------------------ | :----------------- |
|     1 | `marketHashName`                                              | Glued String       |
|     2 | `tradable`, `marketable`, `craftable`, `festivized`, `loaner` | flag string        |
|     3 | `qualities`                                                   | Glued String Array |
|     4 | `unusualEffects`                                              | Glued String Array |
|     5 | `killstreakers`                                               | Glued String Array |
|     6 | `sheens`                                                      | Glued String Array |
|     7 | `warPaints`                                                   | Glued String Array |
|     8 | `paints`                                                      | Glued String Array |
|     9 | `strangeParts`                                                | Glued String Array |
|    10 | `strangeFilters`                                              | Glued String Array |
|    11 | `spells`                                                      | Glued String Array |

Absent fields are interpreted as empty strings. For array fields, an empty
string means an empty array.

The body MUST NOT end with `;`. Serializers MUST remove trailing empty fields by
right-trimming trailing `;` characters. Parsers MUST reject a Version Z body
that ends with `;`.

Parsers MUST reject a Version Z body with more than eleven fields.

## Flag Field

The second field is a flag string. Each flag is enabled by presence:

| Flag | Meaning    |
| :--- | :--------- |
| `T`  | Tradable   |
| `M`  | Marketable |
| `C`  | Craftable  |
| `F`  | Festivized |
| `L`  | Loaner     |

Serializers SHOULD emit flags in this order: `T`, `M`, `C`, `F`, `L`.

Examples:

| Properties                      | Field |
| :------------------------------ | :---- |
| Tradable, Marketable            | `TM`  |
| Tradable, Marketable, Craftable | `TMC` |
| Marketable, Festivized          | `MF`  |
| Tradable, Craftable             | `TC`  |
| Loaner                          | `L`   |

## Creating A Version Z Body

Given a Steam item description object:

1. Read `market_hash_name` as `marketHashName`.
1. Read `tradable` as the `T` flag.
1. Read `marketable` as the `M` flag.
1. Set `craftable` unless the descriptions include any of these exact texts:

   - `( Not Usable in Crafting )`
   - `( Not Tradable, Marketable, or Usable in Crafting )`
   - `( Not Tradable, Marketable, Usable in Crafting, or Gift Wrappable )`

   These descriptions only determine `craftable`; continue reading `tradable`
   and `marketable` from their respective properties.
1. Set `festivized` when the descriptions include exactly the text `Festivized`.
1. Set `loaner` when the descriptions include exactly the text
   `( Loaner - Cannot be traded, marketed, crafted, or modified )`.
1. Read qualities from tags whose `category` is `Quality`, using
   `localized_tag_name`.
1. Read unusual effects from descriptions matching `★ Unusual Effect: <effect>`.
1. If the descriptions mention `Case Global Unusual Effect(s)`, leave
   `unusualEffects` empty. These cases are not Unusuals. It just tells you which
   unusual effects can be unboxed from the case.
1. Read killstreakers from descriptions matching `Killstreaker: <value>`.
1. Read sheens from descriptions matching `Sheen: <value>`.
1. If `market_hash_name` contains one of `(Factory New)`, `(Minimal Wear)`,
   `(Field-Tested)`, `(Well-Worn)`, or `(Battle Scarred)`, read war paints from
   descriptions matching `✔ <value>` (or `★ <value>` that does not match `★ Unusual Effect:`).
   The parentheses are part of the wear check. Otherwise, leave `warPaints` empty.
1. Read paints from descriptions matching `Paint Color: <value>`.
1. Read Strange Parts from descriptions matching `(<part>: <number>)` or
   `     <part>: <number>` (exactly five ASCII spaces before a non-whitespace
   character, without outer parentheses), and keep only `<part>`.
   Exclude these exact, case-sensitive counter names from
   `strangeParts`, regardless of the item: `Kill Assists`, `Übers`,
   `Sentry Kills`, `Health Dispensed to Teammates`, `Teammates Teleported`,
   `Teammates Whipped`, `Double Donks`, and `Humiliations`. These are built-in
   counters, not attached Strange Parts. Additionally, exclude `Kills` from the
   indented form only; preserve it in the parenthesized form, which can represent
   an attached cosmetic part.
1. A filtered counter has the form `(<part> (only <filter>): <number>)` or
   `     <part> (only <filter>): <number>`.
   The filter is part of the counter label, before the colon and count.
   Read `<part>` as the Strange Part (without the filter suffix) and `<filter>`
   as a Strange Filter. Both names MUST be nonempty. Parentheses inside
   `<filter>` may be nested and MUST be balanced; the outer `(only ...)` parentheses are not part of the value.
   Strange Filters apply to the item, so repeated filter names across multiple
   Strange Parts MUST be emitted only once. Apply the counter-name exclusions
   after removing the filter suffix. A filter on an excluded counter MUST still
   be included in `strangeFilters`.
1. Read spells from descriptions matching
   `Halloween: <spell> (spell only active during event)`.

Descriptions with `type: "usertext"` are ignored.

## Parsing A Full HAT

A HAT can contain one or more versioned segments joined with `^`.

To parse:

1. Split the complete string on `^`.
1. The result MUST contain an even number of tokens.
1. Odd-position tokens are version names.
1. Even-position tokens are version bodies.
1. Use the body whose version is `Z`.
1. Ignore versions the parser does not understand.

For example:

```text
Z^Dueling_Mini-Game;TM;Unique^Lex^Dueling_Mini-Game(5);TM;Unique
```

This contains a Version Z segment and a custom `Lex` segment. A parser that only
understands Z uses the Z body and ignores `Lex`.

## Field Examples

### Common Unique Item

```text
Z^The_Man_in_Slacks;TC;Unique
```

Interpreted as:

| Field | Value               |
| ----: | :------------------ |
|     1 | `The Man in Slacks` |
|     2 | tradable, craftable |
|     3 | `["Unique"]`        |

All absent fields are empty.

### Painted Item

```text
Z^Alien_Swarm_Parasite;TC;Unique;;;;;After_Eight
```

Interpreted as:

| Field | Value                  |
| ----: | :--------------------- |
|     1 | `Alien Swarm Parasite` |
|     2 | tradable, craftable    |
|     3 | `["Unique"]`           |
|     8 | `["After Eight"]`      |

Fields 4 through 7 are empty because the paint field is field 8.

## Version Z Is Fixed

Version Z MUST NOT be extended by appending new fields, changing field meanings,
or adding flags beyond those defined in this spec. If an implementation needs
more information, it should define a new version name and publish its own rules.

Multiple versions can be carried in the same HAT by concatenating segments with
`^`. This lets old parsers continue to read Z while newer parsers use a richer
version.

## Inventory Snippets

These snippets are copied from real inventory response bodies. They are trimmed
to the properties that Version Z reads.

### Name, Flags, And Quality

```json
{
  "market_hash_name": "Refined Metal",
  "tradable": 1,
  "marketable": 0,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Unique" }
  ],
  "descriptions": []
}
```

Produces:

```text
Z^Refined_Metal;TC;Unique
```

`market_hash_name` becomes field 1. `tradable = 1` adds `T`, `marketable = 0`
omits `M`, and the absence of `( Not Usable in Crafting )` adds `C`. The Quality
tag becomes field 3.

### Unusual Effect

```json
{
  "market_hash_name": "Strange Unusual A Handsome Handy Thing",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Unusual" }
  ],
  "descriptions": [
    { "value": "★ Unusual Effect: Circling Peace Sign" }
  ]
}
```

Produces:

```text
Z^Strange_Unusual_A_Handsome_Handy_Thing;TMC;Unusual;Circling_Peace_Sign
```

The `★ Unusual Effect:` description becomes field 4.

### Killstreaker, Sheen, Festivized, And Spell

```json
{
  "market_hash_name": "Collector's Festivized Professional Killstreak Amputator",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Collector's" }
  ],
  "descriptions": [
    { "value": "Festivized" },
    { "value": "Halloween: Exorcism (spell only active during event)" },
    { "value": "Killstreaker: Fire Horns" },
    { "value": "Sheen: Agonizing Emerald" }
  ]
}
```

Produces:

```text
Z^Collector's_Festivized_Professional_Killstreak_Amputator;TMCF;Collector's;;Fire_Horns;Agonizing_Emerald;;;;;Exorcism
```

`Festivized` adds `F` to field 2. `Killstreaker:` becomes field 5, `Sheen:`
becomes field 6, and the Halloween spell becomes field 11.

### Festive, Not Festivized

```json
{
  "market_hash_name": "Strange Festive Sapper",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Strange" }
  ],
  "descriptions": []
}
```

Produces:

```text
Z^Strange_Festive_Sapper;TMC;Strange
```

`Festive` is part of the item name and does not add `F` to field 2. Only the
exact `Festivized` description does that.

### Skin

```json
{
  "market_hash_name": "A Handsome Handy Thing",
  "tradable": 0,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Unique" }
  ],
  "descriptions": [
    { "value": "✔ A Handsome Handy Thing" }
  ]
}
```

Produces:

```text
Z^A_Handsome_Handy_Thing;MC;Unique
```

The checked `✔` description is ignored because the market hash name does not
contain a parenthesized wear. This is a skin-style checked collection entry
rather than a decorated weapon war paint.

### War Paint

```json
{
  "market_hash_name": "Hana Disciplinary Action (Field-Tested)",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Decorated Weapon" }
  ],
  "descriptions": [
    { "value": "✔ Hana War Paint" }
  ]
}
```

Produces:

```text
Z^Hana_Disciplinary_Action_(Field-Tested);TMC;Decorated_Weapon;;;;Hana_War_Paint
```

The checked `✔` description becomes field 7. The market hash name identifies the
applied weapon, while field 7 preserves that the source war paint is Hana War
Paint.

### War Paint On An Unusual Weapon

```json
{
  "market_hash_name": "Unusual Peppermint Swirl Rescue Ranger (Field-Tested)",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Unusual" }
  ],
  "descriptions": [
    { "value": "★ Unusual Effect: Hot" },
    { "value": "★ Peppermint Swirl War Paint" }
  ]
}
```

Produces:

```text
Z^Unusual_Peppermint_Swirl_Rescue_Ranger_(Field-Tested);TMC;Unusual;Hot;;;Peppermint_Swirl_War_Paint
```

The selected collection entry uses `★` instead of `✔`. Its value becomes field
7, while `Hot` becomes field 4. The shared star marker does not make
`Unusual Effect: Hot` a war paint. A legacy entry such as `★ Blitzkrieg Knife`
likewise contributes the complete value `Blitzkrieg Knife` to field 7.

### War Paint, Unapplied

```json
{
  "market_hash_name": "Self-Made Crawlspace Critters War Paint (Factory New)",
  "tradable": 0,
  "marketable": 0,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Self-Made" }
  ],
  "descriptions": [
    { "value": "★ Unusual Effect: Community Sparkle" },
    { "value": "★ Crawlspace Critters War Paint" }
  ]
}
```

Produces:

```text
Z^Self-Made_Crawlspace_Critters_War_Paint_(Factory_New);C;Self-Made;Community_Sparkle;;;Crawlspace_Critters_War_Paint
```

An unapplied war paint can also have a selected collection entry. Its full
market hash name stays in field 1, and the marked collection value becomes
field 7 under the same rule as an applied war paint. The unusual effect still
becomes field 4. Without a selected collection entry, field 7 remains empty;
the parser does not infer it from the market hash name or unusual effect.

### Paint

```json
{
  "market_hash_name": "A Brush with Death",
  "tradable": 0,
  "marketable": 0,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Unique" }
  ],
  "descriptions": [
    { "value": "Paint Color: After Eight" }
  ]
}
```

Produces:

```text
Z^A_Brush_with_Death;C;Unique;;;;;After_Eight
```

`Paint Color:` becomes field 8.

### Loaner

```json
{
  "market_hash_name": "Professional Killstreak C.A.P.P.E.R",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Unique" }
  ],
  "descriptions": [
    { "value": "Killstreaker: Hypno-Beam" },
    { "value": "Sheen: Mean Green" },
    { "value": "✔ The C.A.P.P.E.R" },
    {
      "value": "( Loaner - Cannot be traded, marketed, crafted, or modified )"
    }
  ]
}
```

Produces:

```text
Z^Professional_Killstreak_C.A.P.P.E.R;TMCL;Unique;;Hypno-Beam;Mean_Green
```

The loaner description adds `L` to field 2 after any other flags. The checked
description is ignored because the market hash name has no parenthesized wear.

### Strange Parts

```json
{
  "market_hash_name": "Strange AWPer Hand",
  "tradable": 1,
  "marketable": 1,
  "tags": [
    { "category": "Quality", "localized_tag_name": "Strange" }
  ],
  "descriptions": [
    { "value": "(Player Hits: 22420)" },
    { "value": "(Headshot Kills: 7797)" },
    { "value": "(Damage Dealt: 2539681)" }
  ]
}
```

Produces:

```text
Z^Strange_AWPer_Hand;TMC;Strange;;;;;;Damage_Dealt*cHeadshot_Kills*cPlayer_Hits
```

The counter values are ignored. The part names become field 9 and are sorted as
a Glued String Array.

A filtered counter such as
`(Robots Destroyed (only Mann Up (Advanced (Tour))): 34)` adds `Robots
Destroyed` to field 9 and `Mann Up (Advanced (Tour))` to field 10. The nested,
balanced parentheses remain part of the Strange Filter. If several Strange
Parts repeat that filter, field 10 still contains it only once.
