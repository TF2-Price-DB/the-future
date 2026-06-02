# Hats, a successor to SKU

### Because the "Standard" SKU is just a pile of heuristics in a trench coat.

Let’s be honest: the current Team Fortress 2 SKU "standard" is a disaster.
Everyone 'tries to do what Marketplace does.' It’s a fragile web of
slightly-broken interoperability held together by hard-coded exceptions,
schema-based rules, and "trust me bro" heuristics. Every library has its own
flavor, every dev has their own outdated set of half-complete edge cases, and
the moment Valve adds an apostrophe to a name, we all rush to patch.

**We are done with heuristics.**

The Hat proposal ditches the guesswork and builds a consistent, deterministic
string for every single item in Team Fortress 2. No more schemas. No more
prayers. No more maintaining a historical archive of Valve’s typos.

---

## The Problem

Currently, to parse an item, you need:

1. A local copy of the schema
1. A history of every change Valve has made to the schema since 2007
1. A prayer
1. A mountain of if-else statements

If you want to build something for the community, you hit the "edge case wall"
immediately. You’re not coding; you’re curating a museum of Valve’s whims. The
current ecosystem forces every developer to reinvent the same fragile parser,
debugging why `Ubersaw` ≠ `Übersaw` at 3 AM.

This stops now. The schema is dead, and we killed it.

---

## The Proposal: Simple. Deterministic. Eternal.

### 1. The "Lazy" Foundation

Everyone understands the TF2 inventory description JSON. If you don't, you
aren't parsing TF2 items in the first place.

The ancestor of a Hat is simply that description JSON. We start with what Valve
actually gives us, not what we wish they gave us. This is far to unique, every
item would have its own Hat. Let's strip down this json until it contains _just
enough_ information to identify an item, but no further. Important, we do not
_add_ any information that was not part of the response.

### 2. The Deterministic Contract

Now we have a minimal json blob, but that is not human friendly. Let's put the
properties in a standard order, and drop their names. We don’t need to encode
property names like `effect` or `paint`. We just need to agree on a consistent
versioned order.

1. Market Hash Name
1. Tradable, Marketable, Craftable, Festivized
1. Quality
1. Unusual Effect(s)
1. Killstreaker
1. Sheen
1. Skin / Warpaint
1. Paint
1. Halloween Spells
1. Strange Parts

To make this more human friendly than a JSON array, join the array with `;`
characters and replace whitespace in the string with non-whitespace characters.
Add a `^`+`version` in front and a `^` at the end, and you're done. We get a
consistent (albeit long) Hat.

Same item, same string, across every implementation in any language. The schema
is not needed to create this string, unlike SKU strings. We can agree on the
Hat, even if you haven't updated yours in the last year.

### 3. The Authority System (Short & URL-Safe)

Long Hats are ugly and don't fit in URLs or BackpackTF character limits, I hear
you! You want them short and URL-safe.

Enter the **Authority Model**. Think Bitly for TF2 items:

- Send `$TRefined_Metal;0;0;1;0;Unique;;;;;;;$` to an Authority
- The Authority gives you `$T000-01D$` . A short alias, a "Short Hat"
- Anyone can query the Authority to resolve the alias back to the original Long
  Hat

I’m acting as the first Authority. Others can (and should) exist. This system
should not rely on _one_ server in _one_ datacenter somewhere.

### 4. The "Tits Up" Insurance

We’ve all seen APIs crumble under load or go offline when the host shuts it
down. To prevent this from becoming a centralized point of failure, every
Authority **must** generate a static export of their entire mapping table every
few minutes. This file must be cached by a CDN.

If an Authority goes tits up, they upload that static file on GitHub. Every
other authority can download it, and every old SKU remains resolvable forever.

### 5. Evolution via Concatenation

Standards change. Valve adds new properties. Instead of a global "flag day"
where everyone updates their code simultaneously, Hats are versioned through
concatenation.

A SKU string can contain Version 1, Version 2, and Version 3 data all
concatenated together. Parsers split them and use the highest version they
recognize.

**Example:**

```
$v1_data$v2_data$v3_data$
```

Old parsers read `v1`. New parsers read `v3`. No breaking changes. Perfect
built-in backwards (and forwards) compatibility.

---

## The Controversial Part: Valve Renaming Items

Valve renames things with every minor update. They add apostrophes and umlauts,
capitalize letters for aesthetics, and add/remove spaces on a whim.

**The old way:** Maintain a massive internal mapping of every name change in
history so `Ubersaw` and `Übersaw` match, bloating your code with if-elses for
linguistic archaeology.

**The Hat way:** We encode what we see.

If Valve adds an umlaut, capitalizes something, or changes anything we care
about, it’s a new item. When you sign in to TF2, your item is replaced with the
newly created one. If we want to smart-map them to be the same, you are back to
keeping a history of changes.

We provide a snapshot of reality, not a history lesson. We are not a museum of
decisions by Valve’s linguistics department.

---

## The Bottom Line

Stop building heuristics. Start building standards.

**Hat** is a contract, not just one library. It’s a promise that
`Strange Knife|Team Shine|...` means the same thing in Python, Rust, or that
weird Node.js script you wrote at 2 AM.

No schemas. No guessing. No maintenance of Valve's typo diary.

Just deterministic strings. Finally.

curl -L https://store.pricedb.io/inventories-2026-04-17.sqlite3.db.br -o inv.db.br
brotli -d --rm inv.db.br
sqlite3 inv.db

.schema