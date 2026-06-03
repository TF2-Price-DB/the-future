# HAT Manifesto

The current Team Fortress 2 SKU ecosystem works because everyone maintains their
own pile of schema knowledge, historical exceptions, and hardcoded edge-cases.
All libraries are trying to implement the same thing, and update their list of
edge cases when they spot a difference between outputs.

HAT exists to stop that.

## No more heuristics

An item identifier should not require a local schema, a memory of every Valve
item rename, or a growing list of one-off rules. A standard identifier should
mean the same thing in every implementation. Same item, same string, everywhere.

## Inventory reality

The source of truth is the inventory response Valve gives us. A HAT is created
from that response, then reduced to the information needed to identify the item.
We do not add information that was not present. HAT describes the item as seen.

## Valve renames

Valve changes item names. Apostrophes appear. Umlauts appear. Capitalization and
spacing shift. The old SKU approach treats this as a mapping problem and asks
every project update their schema post-haste.

HAT does not do that. If Valve changes data that HAT records, the HAT changes.
The `Ubersaw` and The `Übersaw` (renamed in 2025/06) are two different items as
far as HAT is concerned. When you opened the game, Valve deleted your Ubersaw,
and gave you a new Übersaw, copying over all aspects other than the name.

## The promise

Stop guessing what every library would have done. Build identifiers from the
item data in front of you. No schemas. No guessing. No maintenance of Valve's
typo diary. Just deterministic strings.
