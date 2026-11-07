import type { Character, SortKey, Stats } from "../types";

export function padEntry(number: number): string {
  return `#${String(number).padStart(3, "0")}`;
}

export function statTotal(stats: Stats): number {
  return stats.forca + stats.agilidade + stats.sabedoria + stats.coragem + stats.poder + stats.vontade;
}

export function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function matchesQuery(character: Character, query: string): boolean {
  const needle = normalize(query.trim());
  if (!needle) return true;
  const haystack = [
    character.name,
    character.epithet,
    character.genus,
    character.region,
    character.allegiance,
    character.race,
    character.era,
    character.rarity,
    ...character.abilities.map((ability) => `${ability.name} ${ability.text}`),
    ...character.strengths,
    ...character.weaknesses,
  ]
    .map(normalize)
    .join(" ");
  return haystack.includes(needle);
}

export function sortCharacters(list: Character[], sort: SortKey): Character[] {
  const next = [...list];
  if (sort === "nome") {
    next.sort((a, b) => a.name.localeCompare(b.name, "pt"));
  } else if (sort === "indice") {
    next.sort((a, b) => statTotal(b.stats) - statTotal(a.stats) || a.number - b.number);
  } else {
    next.sort((a, b) => a.number - b.number);
  }
  return next;
}

export function entryIdFromHash(hash: string): string | null {
  const match = hash.match(/^#\/registro\/([a-z0-9-]+)$/);
  return match?.[1] ?? null;
}

export function shortName(name: string): string {
  return name.replace(/,.*/, "").split(" ")[0] ?? name;
}
