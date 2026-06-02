type HatVersionTProps = {
  marketHashName: string;
  tradable: boolean;
  marketable: boolean;
  craftable: boolean;
  festivized: boolean;
  qualities: string[];
  unusualEffects: string[];
  killstreakers: string[];
  sheens: string[];
  warPaints: string[];
  paints: string[];
  spells: string[];
  killstreakParts: string[];
};

export function createHatVersionT(props: HatVersionTProps): string {
  return toBasicCharacterSet(props.marketHashName) +
    ";" +
    (props.tradable ? "T" : "") +
    (props.marketable ? "M" : "") +
    (props.craftable ? "C" : "") +
    (props.festivized ? "F" : "") +
    ";" +
    toBasicCharacterSetArray(props.qualities) +
    ";" +
    toBasicCharacterSetArray(props.unusualEffects) +
    ";" +
    toBasicCharacterSetArray(props.killstreakers) +
    ";" +
    toBasicCharacterSetArray(props.sheens) +
    ";" +
    toBasicCharacterSetArray(props.warPaints) +
    ";" +
    toBasicCharacterSetArray(props.paints) +
    ";" +
    toBasicCharacterSetArray(props.spells) +
    ";" +
    toBasicCharacterSetArray(props.killstreakParts);
}

export function createHatVersionTProps(
  desc: Record<string, unknown>,
): HatVersionTProps {
  const tags = validateTags(desc.tags ?? []);
  const descriptions = validateSubDescriptions(desc.descriptions ?? []);

  const marketHashName = desc.market_hash_name as string;

  const tradable = !!desc.tradable;

  const marketable = !!desc.marketable;

  const craftable = pickDescriptions(
    descriptions,
    /^(?<parsed>\( Not Usable in Crafting \))$/,
  )
    .length === 0;

  const festivized = pickDescriptions(descriptions, /^(?<parsed>Festivized)$/)
    .length === 1;

  const qualities = pickTags(tags, "Quality");

  const listsUnusualEffects = pickDescriptions(
    descriptions,
    /(?<parsed>Case Global Unusual Effect\(s\))/,
  ).length !== 0;
  const unusualEffects = listsUnusualEffects
    ? []
    : pickDescriptions(descriptions, /^★ Unusual Effect: (?<parsed>.+)$/);

  const killstreakers = pickDescriptions(
    descriptions,
    /^Killstreaker: (?<parsed>.+)$/,
  );

  const sheens = pickDescriptions(descriptions, /^Sheen: (?<parsed>.+)$/);

  const warPaints = pickDescriptions(descriptions, /^✔ (?<parsed>.+)$/);

  const paints = pickDescriptions(descriptions, /^Paint Color: (?<parsed>.+)$/);

  const spells = pickDescriptions(
    descriptions,
    /^Halloween: (?<parsed>.+) \(spell only active during event\)$/,
  );

  const killstreakParts = pickDescriptions(
    descriptions,
    /^\((?<parsed>.+): \d+\)$/,
  );

  return {
    marketHashName,
    tradable,
    marketable,
    craftable,
    festivized,
    qualities,
    unusualEffects,
    killstreakers,
    sheens,
    warPaints,
    paints,
    spells,
    killstreakParts,
  };
}

export function unparseHatVersionT(serialized: string): HatVersionTProps {
  const parts = serialized.split(";");

  return {
    marketHashName: fromBasicCharacterSetString(parts[0]!),
    tradable: parts[1].includes("T"),
    marketable: parts[1].includes("M"),
    craftable: parts[1].includes("C"),
    festivized: parts[1].includes("F"),
    qualities: fromBasicCharacterSetArray(parts[2]!),
    unusualEffects: fromBasicCharacterSetArray(parts[3]!),
    killstreakers: fromBasicCharacterSetArray(parts[4]!),
    sheens: fromBasicCharacterSetArray(parts[5]!),
    warPaints: fromBasicCharacterSetArray(parts[6]!),
    paints: fromBasicCharacterSetArray(parts[7]!),
    spells: fromBasicCharacterSetArray(parts[8]!),
    killstreakParts: fromBasicCharacterSetArray(parts[9]!),
  };
}

function pickDescriptions(descriptions: Prop[], matcher: RegExp) {
  const out: string[] = [];

  for (const desc of descriptions) {
    if (typeof desc.value !== "string") {
      throw new Error("Could not read sub description", { cause: desc });
    }

    if (matcher.test(desc.value)) {
      out.push(matcher.exec(desc.value)!.groups!.parsed!);
    }
  }

  return out.sort();
}

type Tag = {
  category: unknown;
  localized_tag_name: string;
};
type Prop = { value: unknown };

function pickTags(tags: Tag[], category: string) {
  const out: string[] = [];

  for (const tag of tags) {
    if (tag.category === category) {
      out.push(tag.localized_tag_name);
    }
  }

  return out.sort();
}

function validateTags(tags: unknown): Tag[] {
  const out = [];

  if (!Array.isArray(tags)) {
    throw new Error("Could not read tags", { cause: tags });
  }

  for (const tag of tags as unknown[]) {
    if (
      typeof tag !== "object" || tag === null || !("category" in tag) ||
      !("localized_tag_name" in tag)
    ) {
      throw new Error("Yeet", { cause: tag });
    }
    const { localized_tag_name, category } = tag;
    if (
      typeof localized_tag_name !== "string" || typeof category !== "string"
    ) {
      throw new Error("Yeet", { cause: tag });
    }

    out.push({ localized_tag_name, category });
  }

  return out;
}

function validateSubDescriptions(subDescriptions: unknown): Prop[] {
  const out = [];

  if (!Array.isArray(subDescriptions)) {
    throw new Error("Could not read descriptions", { cause: subDescriptions });
  }

  for (const desc of subDescriptions as unknown[]) {
    if (typeof desc !== "object" || desc === null || !("value" in desc)) {
      throw new Error("Could not read sub description", { cause: desc });
    }

    if ("type" in desc && desc.type === "usertext") continue;
    out.push(desc);
  }

  return out;
}

function toBasicCharacterSet(unknown: unknown) {
  if (Array.isArray(unknown)) {
    return toBasicCharacterSetArray(unknown);
  }

  if (typeof unknown === "string") {
    return toBasicCharacterSetString(unknown);
  }

  if (typeof unknown === "number") {
    return unknown.toString();
  }

  throw new Error("Unreachable" + JSON.stringify(unknown));
}

function toBasicCharacterSetArray(arr: unknown[]) {
  return arr.map((x) => {
    if (typeof x !== "string") {
      throw new Error("Unreachable" + JSON.stringify(x));
    }

    return toBasicCharacterSetString(x);
  }).join("*c");
}

function fromBasicCharacterSetArray(string: string) {
  return string === ""
    ? []
    : string.split("*c").map(fromBasicCharacterSetString);
}

function toBasicCharacterSetString(string: string) {
  if (string.includes("*") || string.includes("^")) {
    throw new Error("Ambiguous encoding", { cause: string });
  }

  string = string
    .replaceAll("_", "*u")
    .replaceAll("\n", "*n")
    .replaceAll(" ", "_");
  if (!/^[a-z0-9_äéñòöü!#%*':,.()\-\?]*$/i.test(string)) {
    throw new Error(`Illegal character: ${JSON.stringify(string)}`);
  }

  return string;
}

function fromBasicCharacterSetString(string: string) {
  return string
    .replaceAll("_", " ")
    .replaceAll("*n", "\n")
    .replaceAll("*u", "_");
}
