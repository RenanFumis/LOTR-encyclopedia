export type Race =
  | "Hobbit"
  | "Elfo"
  | "Meio-elfo"
  | "Anão"
  | "Humano"
  | "Maia"
  | "Ent"
  | "Dragão"
  | "Aranha"
  | "Nazgûl"
  | "Águia"
  | "Mearas"
  | "Beorniano"
  | "Enigma";

export type Era = "Primeira Era" | "Segunda Era" | "Terceira Era" | "Fora do tempo";

export type Rarity = "comum" | "incomum" | "raro" | "lendário" | "mítico";

export type SortKey = "numero" | "nome" | "indice";

export type ViewMode = "grade" | "lista";

export type SigilId =
  | "ring"
  | "leaf"
  | "horn"
  | "mug"
  | "book"
  | "staff"
  | "sword"
  | "bow"
  | "axe"
  | "shield"
  | "hand"
  | "tree"
  | "star"
  | "evenstar"
  | "circlet"
  | "sun"
  | "tower"
  | "bird"
  | "eye"
  | "wraith"
  | "flame"
  | "spider"
  | "whisper"
  | "crown"
  | "helm"
  | "spear"
  | "branch"
  | "throne"
  | "ent"
  | "mountain"
  | "arrow"
  | "dragon"
  | "paw"
  | "eagle"
  | "horseshoe"
  | "banner"
  | "blade"
  | "gem"
  | "moon"
  | "ship"
  | "flower";

export interface Stats {
  forca: number;
  agilidade: number;
  sabedoria: number;
  coragem: number;
  poder: number;
  vontade: number;
}

export interface Ability {
  name: string;
  kind: "ativa" | "passiva" | "suprema";
  text: string;
}

export interface CharacterForm {
  id: string;
  label: string;
  note: string;
  stats: Stats;
}

export interface Character {
  id: string;
  number: number;
  name: string;
  epithet: string;
  genus: string;
  race: Race;
  region: string;
  allegiance: string;
  era: Era;
  rarity: Rarity;
  stature: string;
  presence: string;
  summary: string;
  lore: string;
  voice: string;
  sigil: SigilId;
  stats: Stats;
  abilities: Ability[];
  strengths: string[];
  weaknesses: string[];
  related: string[];
  services?: string[];
  anomalous?: boolean;
  forms?: CharacterForm[];
}

export interface DexFilters {
  query: string;
  race: Race | "Todas";
  era: Era | "Todas";
  rarity: Rarity | "Todas";
  sort: SortKey;
  partyOnly: boolean;
}

export const RACES: Race[] = [
  "Hobbit",
  "Elfo",
  "Meio-elfo",
  "Anão",
  "Humano",
  "Maia",
  "Ent",
  "Dragão",
  "Aranha",
  "Nazgûl",
  "Águia",
  "Mearas",
  "Beorniano",
  "Enigma",
];

export const ERAS: Era[] = ["Terceira Era", "Segunda Era", "Primeira Era", "Fora do tempo"];

export const RARITIES: Rarity[] = ["comum", "incomum", "raro", "lendário", "mítico"];
