# Glued String

A Glued String is the string encoding used by HAT fields and version bodies that
need text without whitespace.

## Glued String

A Glued String is produced from one text value.

To encode:

1. Reject input containing `*`, because `*` introduces Glued String escapes such
   as `*u` and Glued String Array separators such as `*c`.
1. Reject input containing `^`, because `^` separates HAT versions and bodies.
1. Reject input containing two spaces in a row, because it would encode to `__`,
   which is the same as a newline.
1. Reject input containing a newline followed by a space, because it would
   encode to `___`, which could decode as newline-space or space-newline.
1. Reject input containing a space followed by a newline, because it would
   encode to `___`, which could decode as space-newline or newline-space.
1. Replace every `_` with `*u`.
1. Replace every newline with `__`.
1. Replace every space with `_`.

To decode:

1. Replace every `__` with a newline.
1. Replace every `_` with a space.
1. Replace every `*u` with `_`.

Examples:

| Text                 | Glued String         |
| :------------------- | :------------------- |
| `The Man in Slacks`  | `The_Man_in_Slacks`  |
| `With_Underscore`    | `With*uUnderscore`   |
| `Line one\nLine two` | `Line_one__Line_two` |

## Glued String Array

A Glued String Array is a sorted list of Glued Strings. Sorting makes arrays
deterministic.

Glued String Array uses the same ordering as JavaScript's default
`Array.prototype.sort()` for strings: values are compared as UTF-16 code unit
sequences in ascending order. Other sorting algorithms are valid if they produce
identical results for TF2 items.

To encode:

1. Sort the text values.
1. Encode every element as a Glued String.
1. Join the encoded elements with `*c`.

To decode:

1. If the encoded array is empty, return an empty array.
1. Otherwise, split the encoded array on `*c`.
1. Decode every element as a Glued String.

Examples:

| Array                                 | Glued String Array              |
| :------------------------------------ | :------------------------------ |
| `[]`                                  | ``                              |
| `["Unique"]`                          | `Unique`                        |
| `["Villainous Violet", "Team Shine"]` | `Team_Shine*cVillainous_Violet` |

Because `*c` is the array separator, a Glued String Array element MUST NOT
contain raw `*`. This is already guaranteed by the Glued String encoder.
