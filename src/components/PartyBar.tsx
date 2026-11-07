import { shortName } from "../lib/dex";
import { raceStyle } from "../theme";
import type { Character } from "../types";
import { Medallion } from "./Medallion";

interface PartyBarProps {
  party: Character[];
  selectedId: string | null;
  onOpen: (id: string) => void;
  onRemove: (id: string) => void;
  onEmptySlot: () => void;
}

export function PartyBar({ party, selectedId, onOpen, onRemove, onEmptySlot }: PartyBarProps) {
  const slots = Array.from({ length: 6 }, (_, index) => party[index] ?? null);

  return (
    <aside className="party" aria-label="Comitiva">
      <div className="party-label">
        <strong>Comitiva</strong>
        <span>{party.length}/6</span>
      </div>
      <div className="slots">
        {slots.map((character, index) =>
          character ? (
            <div
              key={character.id}
              className={character.id === selectedId ? "slot is-filled is-on" : "slot is-filled"}
              style={raceStyle(character.race)}
            >
              <button type="button" className="slot-open" onClick={() => onOpen(character.id)} aria-label={`Abrir ficha de ${character.name}`}>
                <Medallion character={character} size={46} variant="party" />
                <span>{shortName(character.name)}</span>
              </button>
              <button type="button" className="slot-x" onClick={() => onRemove(character.id)} aria-label={`Dispensar ${character.name}`}>
                ×
              </button>
            </div>
          ) : (
            <button key={`vaga-${index}`} type="button" className="slot" onClick={onEmptySlot} aria-label={`Vaga ${index + 1} da comitiva`}>
              <span className="plus" aria-hidden="true">+</span>
              <span>Vaga</span>
            </button>
          ),
        )}
      </div>
    </aside>
  );
}
