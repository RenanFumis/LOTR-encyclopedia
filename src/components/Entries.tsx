import type { Character } from "../types";
import { padEntry, statTotal } from "../lib/dex";
import { raceStyle } from "../theme";
import { Medallion } from "./Medallion";

interface EntryProps {
  character: Character;
  selected: boolean;
  inParty: boolean;
  index: number;
  onSelect: (id: string) => void;
}

function IndexMark({ character }: { character: Character }) {
  const total = statTotal(character.stats);
  return (
    <span className="indice" title="Soma dos seis atributos. O máximo é 600.">
      <span className="mini-bar" aria-hidden="true">
        <i style={{ width: `${(total / 600) * 100}%` }} />
      </span>
      {character.anomalous ? "Índice instável" : `Índice ${total}`}
    </span>
  );
}

export function DexCard({ character, selected, inParty, index, onSelect }: EntryProps) {
  return (
    <button
      type="button"
      id={`entry-${character.id}`}
      className={selected ? "card is-selected" : "card"}
      data-anomalous={character.anomalous ? "true" : "false"}
      data-rarity={character.rarity}
      aria-pressed={selected}
      style={{ ...raceStyle(character.race), animationDelay: `${Math.min(index, 12) * 28}ms` }}
      onClick={() => onSelect(character.id)}
    >
      <span className="card-top">
        <span className="num">{padEntry(character.number)}</span>
        <span className="card-top-right">
          {inParty && (
            <span className="pip">
              <span className="sr-only">Na comitiva</span>
            </span>
          )}
          <span className="rarity">{character.rarity}</span>
        </span>
      </span>
      <Medallion character={character} size={132} variant="card" />
      <span className="card-name">{character.name}</span>
      <span className="epithet">{character.epithet}</span>
      <span className="card-meta">
        <span className="race-chip">{character.race}</span>
        <IndexMark character={character} />
      </span>
    </button>
  );
}

export function DexRow({ character, selected, inParty, index, onSelect }: EntryProps) {
  const total = statTotal(character.stats);
  return (
    <button
      type="button"
      id={`entry-${character.id}`}
      className={selected ? "row is-selected" : "row"}
      data-anomalous={character.anomalous ? "true" : "false"}
      data-rarity={character.rarity}
      aria-pressed={selected}
      style={{ ...raceStyle(character.race), animationDelay: `${Math.min(index, 12) * 28}ms` }}
      onClick={() => onSelect(character.id)}
    >
      <span className="num">{padEntry(character.number)}</span>
      <Medallion character={character} size={58} variant="card" />
      <span className="row-copy">
        <span className="card-name">
          {character.name}
          {inParty && <span className="pip" aria-label="Na comitiva" />}
        </span>
        <span className="epithet">{character.epithet}</span>
      </span>
      <span className="race-chip">{character.race}</span>
      <span className="region">{character.region}</span>
      <span className="indice indice-plain">{character.anomalous ? "???" : total}</span>
    </button>
  );
}
