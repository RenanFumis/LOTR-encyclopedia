import type { CSSProperties } from "react";
import type { Race, Stats } from "./types";

export const raceTheme: Record<Race, { glow: string; deep: string; ink: string }> = {
  Hobbit: { glow: "#9cba72", deep: "#1d2a16", ink: "#e4f0cf" },
  Elfo: { glow: "#79c0d2", deep: "#10242c", ink: "#d7f4fb" },
  "Meio-elfo": { glow: "#6fbfc4", deep: "#102226", ink: "#d9fbff" },
  Anão: { glow: "#d3924a", deep: "#2c1c0e", ink: "#ffe1bf" },
  Homem: { glow: "#d15b4a", deep: "#2a1212", ink: "#ffd4cc" },
  Maia: { glow: "#f0d48a", deep: "#2a2416", ink: "#fff4d4" },
  Ent: { glow: "#5e9a62", deep: "#122016", ink: "#d9f5dc" },
  Dragão: { glow: "#e07a32", deep: "#2a140c", ink: "#ffd7bf" },
  Aranha: { glow: "#8d6bb8", deep: "#1c1428", ink: "#eadcff" },
  Nazgûl: { glow: "#8d93b5", deep: "#161820", ink: "#e4e7f5" },
  Águia: { glow: "#e6c56a", deep: "#26200e", ink: "#fff1c9" },
  Mearas: { glow: "#d9d3c5", deep: "#221e18", ink: "#f7f1e6" },
  Beorniano: { glow: "#b08a52", deep: "#24190f", ink: "#f3e2c8" },
  Enigma: { glow: "#e39ad4", deep: "#241424", ink: "#ffe3f6" },
};

export const STATS: { key: keyof Stats; label: string; color: string }[] = [
  { key: "forca", label: "Força", color: "#e07a5f" },
  { key: "agilidade", label: "Agilidade", color: "#7ec8e3" },
  { key: "sabedoria", label: "Sabedoria", color: "#e6c98a" },
  { key: "coragem", label: "Coragem", color: "#e3b34c" },
  { key: "poder", label: "Poder", color: "#c59be8" },
  { key: "vontade", label: "Vontade", color: "#9dcf7a" },
];

export function raceStyle(race: Race): CSSProperties {
  const theme = raceTheme[race];
  return {
    "--race": theme.glow,
    "--race-ink": theme.ink,
    "--race-deep": theme.deep,
  } as CSSProperties;
}
