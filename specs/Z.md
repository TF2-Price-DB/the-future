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

Split the Version Z body on `;`. There are at most ten fields.

| Field | Name                                                | Encoding           |
| ----: | :-------------------------------------------------- | :----------------- |
|     1 | `marketHashName`                                    | Glued String       |
|     2 | `tradable`, `marketable`, `craftable`, `festivized` | flag string        |
|     3 | `qualities`                                         | Glued String Array |
|     4 | `unusualEffects`                                    | Glued String Array |
|     5 | `killstreakers`                                     | Glued String Array |
|     6 | `sheens`                                            | Glued String Array |
|     7 | `warPaints`                                         | Glued String Array |
|     8 | `paints`                                            | Glued String Array |
|     9 | `killstreakParts`                                   | Glued String Array |
|    10 | `spells`                                            | Glued String Array |

Absent fields are interpreted as empty strings. For array fields, an empty
string means an empty array.

The body MUST NOT end with `;`. Serializers MUST remove trailing empty fields by
right-trimming trailing `;` characters. Parsers MUST reject a Version Z body
that ends with `;`.

Parsers MUST reject a Version Z body with more than ten fields.

## Flag Field

The second field is a flag string. Each flag is enabled by presence:

| Flag | Meaning    |
| :--- | :--------- |
| `T`  | Tradable   |
| `M`  | Marketable |
| `C`  | Craftable  |
| `F`  | Festivized |

Serializers SHOULD emit flags in this order: `T`, `M`, `C`, `F`.

Examples:

| Properties                      | Field |
| :------------------------------ | :---- |
| Tradable, Marketable            | `TM`  |
| Tradable, Marketable, Craftable | `TMC` |
| Marketable, Festivized          | `MF`  |
| Tradable, Craftable             | `TC`  |

## Creating A Version Z Body

Given a Steam item description object:

1. Read `market_hash_name` as `marketHashName`.
1. Read `tradable` as the `T` flag.
1. Read `marketable` as the `M` flag.
1. Set `craftable` unless the descriptions include exactly the text
   `( Not Usable in Crafting )`.
1. Set `festivized` when the descriptions include exactly the text `Festivized`.
1. Read qualities from tags whose `category` is `Quality`, using
   `localized_tag_name`.
1. Read unusual effects from descriptions matching `★ Unusual Effect: <effect>`.
1. If the descriptions mention `Case Global Unusual Effect(s)`, leave
   `unusualEffects` empty. These cases are not Unusuals. It just tells you which
   unusual effects can be unboxed from the case.
1. Read killstreakers from descriptions matching `Killstreaker: <value>`.
1. Read sheens from descriptions matching `Sheen: <value>`.
1. Read war paints from descriptions matching `✔ <value>`.
1. Read paints from descriptions matching `Paint Color: <value>`.
1. Read killstreak parts from descriptions matching `(<part>: <number>)`, and
   keep only `<part>`.
1. Read spells from descriptions matching
   `Halloween: <spell> (spell only active during event)`.

Descriptions with `type: "usertext"` are ignored.

## Parsing A Full HAT

A HAT can contain one or more versioned segments joined with `^`.

To parse:

1. Split the complete string on `^`.
1. The result MUST contain an even number of fields.
1. Odd-position fields are version names.
1. Even-position fields are version bodies.
1. Use the body whose version is `Z`.
1. Ignore versions the parser does not understand.

For example:

```text
Z^Dueling_Mini-Game;TC;Unique^Lex^Dueling_Mini-Game(5);TC;Unique
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
or adding special cases to existing fields. If an implementation needs more
information, it should define a new version name and publish its own rules.

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
Z^Collector's_Festivized_Professional_Killstreak_Amputator;TMCF;Collector's;;Fire_Horns;Agonizing_Emerald;;;;Exorcism
```

`Festivized` adds `F` to field 2. `Killstreaker:` becomes field 5, `Sheen:`
becomes field 6, and the Halloween spell becomes field 10.

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
Z^A_Handsome_Handy_Thing;MC;Unique;;;;A_Handsome_Handy_Thing
```

The checked `✔` description becomes field 7. This is a skin-style checked
collection entry rather than a decorated weapon war paint.

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
    { "value": "★ Unusual Effect: Community Sparkle" }
  ]
}
```

Produces:

```text
Z^Self-Made_Crawlspace_Critters_War_Paint_(Factory_New);C;Self-Made;Community_Sparkle
```

An unapplied war paint is the item itself, so the war paint name stays in field
1 and field 7 is empty. The unusual effect still becomes field 4.

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
