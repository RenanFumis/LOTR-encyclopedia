import type { RefObject } from "react";
import { ERAS, RACES, RARITIES, type DexFilters, type Race, type ViewMode } from "../types";

interface ToolbarProps {
  filters: DexFilters;
  view: ViewMode;
  count: number;
  total: number;
  dirty: boolean;
  searchRef: RefObject<HTMLInputElement | null>;
  onChange: (patch: Partial<DexFilters>) => void;
  onView: (view: ViewMode) => void;
  onClear: () => void;
  showParty: boolean;
  races?: readonly Race[];
}

export function Toolbar({ filters, view, count, total, dirty, searchRef, onChange, onView, onClear, showParty, races = RACES }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label className="search">
          <span className="sr-only">Buscar registro</span>
          <input
            ref={searchRef}
            type="search"
            placeholder="Buscar registro..."
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            autoComplete="off"
          />
        </label>
        <label className="field">
          <span>Raça</span>
          <select value={filters.race} onChange={(event) => onChange({ race: event.target.value as DexFilters["race"] })}>
            <option value="Todas">Todas</option>
            {races.map((race) => (
              <option key={race} value={race}>{race}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Era</span>
          <select value={filters.era} onChange={(event) => onChange({ era: event.target.value as DexFilters["era"] })}>
            <option value="Todas">Todas</option>
            {ERAS.map((era) => (
              <option key={era} value={era}>{era}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Raridade</span>
          <select value={filters.rarity} onChange={(event) => onChange({ rarity: event.target.value as DexFilters["rarity"] })}>
            <option value="Todas">Todas</option>
            {RARITIES.map((rarity) => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Ordem</span>
          <select value={filters.sort} onChange={(event) => onChange({ sort: event.target.value as DexFilters["sort"] })}>
            <option value="numero">Número</option>
            <option value="nome">Nome</option>
            <option value="indice">Índice</option>
          </select>
        </label>
        <div className="view-toggle" role="group" aria-label="Modo de exibição">
          <button type="button" className="text-btn" aria-pressed={view === "grade"} onClick={() => onView("grade")}>Grade</button>
          <button type="button" className="text-btn" aria-pressed={view === "lista"} onClick={() => onView("lista")}>Lista</button>
        </div>
      </div>
      <div className="toolbar-foot">
        <p className="result-line">Exibindo {count} de {total}</p>
        {showParty && (
          <button type="button" className={filters.partyOnly ? "text-btn is-pressed" : "text-btn"} aria-pressed={filters.partyOnly} onClick={() => onChange({ partyOnly: !filters.partyOnly })}>
            Só a comitiva
          </button>
        )}
        {dirty && (
          <button type="button" className="text-btn" onClick={onClear}>Limpar filtros</button>
        )}
      </div>
    </div>
  );
}
