import type { RefObject } from "react";
import type { Character, DexFilters, Race, ViewMode } from "../types";
import { Detail } from "./Detail";
import { DexCard, DexRow } from "./Entries";
import { Toolbar } from "./Toolbar";

interface DexBoardProps {
  asMain: boolean;
  filters: DexFilters;
  races: readonly Race[];
  view: ViewMode;
  visible: Character[];
  total: number;
  dirty: boolean;
  searchRef: RefObject<HTMLInputElement | null>;
  selected: Character | null;
  selectedId: string | null;
  party: string[];
  partyEnabled: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  prevName?: string;
  nextName?: string;
  onChange: (patch: Partial<DexFilters>) => void;
  onView: (view: ViewMode) => void;
  onClear: () => void;
  onSelect: (id: string) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleParty: () => void;
  onOpen: (id: string) => void;
}

export function DexBoard({
  asMain,
  filters,
  races,
  view,
  visible,
  total,
  dirty,
  searchRef,
  selected,
  selectedId,
  party,
  partyEnabled,
  hasPrev,
  hasNext,
  prevName,
  nextName,
  onChange,
  onView,
  onClear,
  onSelect,
  onClose,
  onPrev,
  onNext,
  onToggleParty,
  onOpen,
}: DexBoardProps) {
  const results = visible.length === 0 ? (
    <div className="empty">
      <p>
        {filters.partyOnly && party.length === 0
          ? "A comitiva ainda está vazia. Abra uma ficha e convoque um viajante."
          : "Nenhum registro com esses filtros."}
      </p>
      {dirty && (
        <button type="button" className="text-btn" onClick={onClear}>Limpar filtros</button>
      )}
    </div>
  ) : view === "grade" ? (
    <div className="grid">
      {visible.map((character, index) => (
        <DexCard
          key={character.id}
          character={character}
          selected={character.id === selectedId}
          inParty={partyEnabled && party.includes(character.id)}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </div>
  ) : (
    <div className="list">
      {visible.map((character, index) => (
        <DexRow
          key={character.id}
          character={character}
          selected={character.id === selectedId}
          inParty={partyEnabled && party.includes(character.id)}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </div>
  );

  return (
    <>
      <Toolbar
        filters={filters}
        races={races}
        view={view}
        count={visible.length}
        total={total}
        dirty={dirty}
        searchRef={searchRef}
        onChange={onChange}
        onView={onView}
        onClear={onClear}
        showParty={partyEnabled}
      />
      <div className={selected ? "workspace has-detail" : "workspace"}>
        {asMain ? <main id="conteudo">{results}</main> : <div>{results}</div>}
        {selected && (
          <Detail
            key={selected.id}
            character={selected}
            hasPrev={hasPrev}
            hasNext={hasNext}
            prevName={prevName}
            nextName={nextName}
            inParty={party.includes(selected.id)}
            partyCount={party.length}
            showParty={partyEnabled}
            onClose={onClose}
            onPrev={onPrev}
            onNext={onNext}
            onToggleParty={onToggleParty}
            onOpen={onOpen}
          />
        )}
      </div>
    </>
  );
}
