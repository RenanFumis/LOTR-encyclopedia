import { useLayoutEffect, useRef, type RefObject } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapped = view === "grade" && selected !== null && visible.length > 0;

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const clear = () => {
      grid.style.gridTemplateRows = "";
      grid.style.removeProperty("--rows");
      const notch = grid.querySelector<HTMLElement>(":scope > .wrap-notch");
      if (!notch) return;
      notch.style.display = "none";
      notch.style.gridColumn = "";
      notch.style.gridRow = "";
    };

    if (!wrapped) {
      clear();
      return;
    }

    const fit = () => {
      if (!window.matchMedia("(min-width: 1040px)").matches) {
        clear();
        return;
      }
      const detail = grid.querySelector<HTMLElement>(":scope > .detail");
      const cards = [...grid.querySelectorAll<HTMLElement>(":scope > .card")];
      if (!detail || cards.length === 0) return;

      const previous = cards.map((card) => card.style.alignSelf);
      for (const card of cards) card.style.alignSelf = "start";
      const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
      const measured = cards.map((card) => Math.ceil(card.getBoundingClientRect().height));
      const target = Math.ceil(detail.getBoundingClientRect().height);
      cards.forEach((card, index) => {
        card.style.alignSelf = previous[index];
      });

      const heights: number[] = [];
      let used = 0;
      for (const height of measured) {
        const gapBefore = heights.length > 0 ? gap : 0;
        const next = used + gapBefore + height;
        if (next > target) {
          const room = target - used - gapBefore;
          const overflow = height - Math.max(room, 0);
          const cardWidth = cards[0].getBoundingClientRect().width;
          const detailWidth = detail.getBoundingClientRect().width;
          if (room > 0 && overflow * detailWidth < room * cardWidth) {
            heights.push(height);
            used = next;
          }
          break;
        }
        heights.push(height);
        used += gapBefore + height;
      }
      const notch = grid.querySelector<HTMLElement>(":scope > .wrap-notch");
      if (used < target) {
        const gapBefore = heights.length > 0 ? gap : 0;
        const deficit = Math.ceil(target - used - gapBefore);
        if (deficit > 0) heights.push(deficit);
        if (notch) {
          notch.style.display = "block";
          notch.style.gridColumn = "1";
          notch.style.gridRow = String(heights.length);
        }
      } else if (notch) {
        notch.style.display = "none";
      }

      const rows = heights.map((height) => `${height}px`).join(" ");
      if (grid.style.gridTemplateRows !== rows) grid.style.gridTemplateRows = rows;
      grid.style.setProperty("--rows", String(heights.length));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(grid);
    const detail = grid.querySelector<HTMLElement>(":scope > .detail");
    if (detail) observer.observe(detail);
    for (const card of grid.querySelectorAll<HTMLElement>(":scope > .card")) observer.observe(card);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [wrapped, selectedId, visible]);

  const sheet = selected ? (
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
  ) : null;

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
    <div className={wrapped ? "grid is-wrapped" : "grid"} ref={gridRef}>
      {wrapped && sheet}
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
      {wrapped && <div className="wrap-notch" aria-hidden="true" />}
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
        {sheet && !wrapped && sheet}
      </div>
    </>
  );
}
