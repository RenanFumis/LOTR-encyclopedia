import type { PlaceCard } from "./places";
import { eastRecords } from "./place-lore-east";
import { westRecords } from "./place-lore-west";

export type PlaceBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "ul"; items: string[] };

export type PlaceFigure = {
  name: string;
  note: string;
  entryId?: string;
};

export type PlaceFigureGroup = {
  title?: string;
  figures: PlaceFigure[];
};

export type PlaceSourceBook = {
  title: string;
  lead?: string;
  items: string[];
};

export type PlaceSourceGroup = {
  title: string;
  books: PlaceSourceBook[];
};

export type PlaceObservations = {
  heading: string;
  intro?: string;
  items: string[];
};

export type PlaceSources = {
  heading?: string;
  intro?: string;
  items?: string[];
  groups?: PlaceSourceGroup[];
  observations?: PlaceObservations;
  note?: string;
};

export type PlaceMeta = {
  label: string;
  value: string;
};

export type PlaceRecord = {
  epithet: string;
  eras: string[];
  names: string;
  books: string[];
  figures: string[];
  paragraphs: string[];
  title?: string;
  meta?: PlaceMeta[];
  blocks?: PlaceBlock[];
  figuresLead?: PlaceBlock[];
  figureGroups?: PlaceFigureGroup[];
  relatedHeading?: string;
  sources?: PlaceSources;
};

const records: Record<string, PlaceRecord> = { ...westRecords, ...eastRecords };

const alias: Record<string, string> = {
  "osgiliath-2": "osgiliath",
  "pelennor-2": "pelennor",
  "khazad-dum-2": "khazad-dum",
  "lothlorien-distante": "lothlorien",
  "moria-especial": "khazad-dum",
  "esgaroth-especial": "esgaroth-cidade",
  "isengard-especial": "isengard-era",
  "morannon-especial": "morannon-era",
  "orodruin-especial": "orodruin-era",
  "barad-dur-especial": "barad-dur-segunda",
};

export function resolvePlaceRecord(id: string, card: PlaceCard): PlaceRecord {
  return records[alias[id] ?? id] ?? {
    epithet: card.name,
    eras: [],
    names: card.name,
    books: [],
    figures: [],
    paragraphs: [card.text],
  };
}
