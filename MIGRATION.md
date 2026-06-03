# Migration

If your system currently uses SKU, or some special snowflake identifier,
changing it out is not a flip of a switch. That is fine. HAT versioning is
designed to let old and new identifiers live in the same string while your code,
databases, caches, URLs, and users catch up.

The important rule is simple: a HAT is a sequence of `version^body` pairs. If an
old identifier never used `^`, you can wrap it in a private version name without
changing the body at all.

## 1. Name your version

Pick a version name that is specific enough that nobody else is likely to use it
for a different format. Repository-style names work well, but keep them URL safe
so identifiers can travel through routes, links, logs, and copy-paste without
extra escaping.

For example, if your existing strings are produced by
[offish/tf2-sku](https://github.com/offish/tf2-sku), use:

```text
gh.offish.tf2-sku
```

Then migrate bare strings into versioned HAT pairs:

```text
if the identifier does not contain "^":
  replace it with "gh.offish.tf2-sku^" + identifier
```

So this SKU:

```text
5021;6
```

becomes:

```text
gh.offish.tf2-sku^5021;6
```

Your old parser can still parse the body `5021;6`. The only new work is to split
the outer HAT string, find the `gh.offish.tf2-sku` pair, and pass that pair's
body to the parser you already trust.

## 2. Teach readers to accept multimode HATs

Before changing what you write, change what you read.

A reader should:

1. Split the string on `^`.
1. Reject strings with an odd number of tokens.
1. Read tokens as `version, body, version, body`.
1. Pick the best version it understands.
1. Ignore versions it does not understand.

For a system halfway through migration, "best" usually means:

1. Prefer `Z` when the code can use the standard HAT form.
1. Fall back to your private version.
1. Reject the identifier only when no known version is present.

This makes new strings readable by new systems and still recoverable by old
systems that understand your version.

## 3. Start writing both versions

Once readers accept multimode HATs, write both the standard `Z` version and your
version in the same identifier:

```text
Z^Refined_Metal;TC;Unique^gh.offish.tf2-sku^5002;6
```

The standard version goes first by convention. Old code that has been updated
only enough to understand the wrapper can use `gh.offish.tf2-sku`. New code can
use `Z`.

Do not try to squeeze HAT data into your SKU body. Do not add non-standard
fields to `Z`. If you need extra data, add another version pair.

## 4. Backfill stored identifiers

After the reader accepts both forms, backfill storage in small, reversible
batches:

1. Convert every bare string to `your-version^body`.
1. When inventory data is available, prepend the matching `Z^standard-body^`.
1. Keep the pair until every dependent service, cache, URL handler, and client
   has stopped needing it.

If you cannot create a correct `Z` body for an old record, keep only the pair. A
partial or guessed `Z` HAT is worse than no `Z` HAT.

## 5. Retire the pair when it is boring

The version can be removed from newly written identifiers only after all
consumers you care about can read `Z`. Existing historical identifiers may keep
the pair forever. There is no need to rewrite the whole world on the same day.

At the end of the migration, your system can accept:

```text
gh.offish.tf2-sku^5002;6
Z^Refined_Metal;TC;Unique
Z^Refined_Metal;TC;Unique^gh.offish.tf2-sku^5002;6
```

and prefer the `Z` pair whenever it is present.

## Version name guidance

Custom version names may contain any glyph besides whitespace and `^`, but new
formats SHOULD use only URL-safe unreserved characters: letters, digits, `.`,
`_`, `-`, and `~`. In practice, choose names that are stable and attributable:

```text
gh.owner.repo
app.example.com.sku-v1
my-service.2026-legacy-sku
```
