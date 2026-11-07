import type { ViewMode } from "../types";

const PARTY = "lorthdex-party";
const SOUND = "lorthdex-sound";
const VIEW = "lorthdex-view";

export function readParty(): string[] {
  try {
    const raw = localStorage.getItem(PARTY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string").slice(0, 6);
  } catch {
    return [];
  }
}

export function writeParty(ids: string[]): void {
  try {
    localStorage.setItem(PARTY, JSON.stringify(ids));
  } catch {
    /* armazenamento indisponível */
  }
}

export function readSound(): boolean {
  try {
    return localStorage.getItem(SOUND) === "on";
  } catch {
    return false;
  }
}

export function writeSound(on: boolean): void {
  try {
    localStorage.setItem(SOUND, on ? "on" : "off");
  } catch {
    /* armazenamento indisponível */
  }
}

export function readView(): ViewMode {
  try {
    return localStorage.getItem(VIEW) === "lista" ? "lista" : "grade";
  } catch {
    return "grade";
  }
}

export function writeView(view: ViewMode): void {
  try {
    localStorage.setItem(VIEW, view);
  } catch {
    /* armazenamento indisponível */
  }
}
