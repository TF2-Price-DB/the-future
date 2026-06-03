# HAT, SKU rebooted

_Because the "Standard" SKU is just a pile of heuristics in a trench coat._

SKU only works because everyone has a list of hardcoded edge-cases and shocking
amounts of technical debt. Even forks of the same library do not agree on every
single SKU in the game. Everyone needs a copy of the tf2 schema to unparse them.
How about, we just _don't_?

## Pitch

Introducing `HAT`, a simple way to refer to an item, created from an inventory
response.

`Z^The_Man_in_Slacks;TC;Unique`

or

`Z^Alien_Swarm_Parasite;TC;Unique;;;;;After_Eight`

The rules to create these strings must be easy enough to write on the back of a
napkin, so that anyone willing can create a parser and unparsed for this in no
more than an hour.

## Glued String

TF2 item names can contain spaces and newlines. HAT avoids raw whitespace
because it is awkward in URLs and visually confusing in plain text. Spaces
become `_`, newlines become `__`, and real underscores are escaped as `*u`
first. This is called a _Glued String_. Arrays of Glued Strings are sorted and
joined with `*c`, which is called a _Glued String Array_.

See the [Glued String spec](./specs/GluedString.md) for the exact encoding and
decoding rules.

## Parsing

- Take the HAT and split the string on the Hat operator (caret) `^`.
- Assert that you have an even number of fields.
- The odd fields are versions, explained later.
- The even fields are the body of the HAT.
- The body of version `Z` MUST NOT end in `;`. Serializers MUST right trim all
  trailing `;` characters.
- Split the body of version `Z` on `;` to get parts
- Any absent fields are presumed to be an empty string.
- Interpret the parts in this manner

| Part | Name                                        | Encoding           |
| ---: | :------------------------------------------ | :----------------- |
|   1. | marketHashName                              | Glued String       |
|   2. | tradable, marketable, craftable, festivized | TMCF, by presence  |
|   3. | qualities                                   | Glued String Array |
|   4. | unusualEffects                              | Glued String Array |
|   5. | killstreakers                               | Glued String Array |
|   6. | sheens                                      | Glued String Array |
|   7. | warPaints                                   | Glued String Array |
|   8. | paints                                      | Glued String Array |
|   9. | killstreakParts                             | Glued String Array |
|  10. | spells                                      | Glued String Array |

The second field is indicated by presence in order. F.e. Tradable, Marketable is
`TM`; Tradable, Marketable, Craftable is `TMC`; Marketable, Festivized is `MF`.

A [full description](./specs/Z.md) of everything in version Z, including
[inventory snippets](./specs/Z.md#inventory-snippets) that show how real
description fields become HAT fields.

## Versions

This standard assumes that it will be superceeded. If somebody wants to extend
HAT, they can do so. SKU has been extended over time by adding non-standard
parts to it. HAT wants to avoid that. If you want to create your own flavor, you
should create your own version.

`Z^Dueling_Mini-Game;TC;Unique` is the version Z way of writing the common,
tradable, marketable, Dueling Mini-Game. Let's say you want to create a
different HAT depending on the number of uses the mini-game has remaining. You
MAY NOT alter the version Z HAT. You create your own forked flavor version;

`Lex^Dueling_Mini-Game(5);TC;Unique` This version is the `Lex` version. Your
custom version name may contain any glyph, besides whitespace and caret.

`Z^Dueling_Mini-Game;TC;Unique^Lex^Dueling_Mini-Game(5);TC;Unique` is the dual
mode way to describe a Dueling mini-game. A multi mode HAT is made through
combining `HAT1^HAT2`, `HAT1^HAT2^HAT3`, etc. This can improve compatibility
with systems that do not understand version `Lex` (yet). Systems are required to
discard any versions they do not understand.

## Migration

Moving an existing system to HAT does not need to be a fingers-crossed update.
Those things fail if your programs are complex enough or have permanent storage
you run migrations on. See [Migration](./MIGRATION.md) for a staged path from
legacy strings to multimode HAT strings.
