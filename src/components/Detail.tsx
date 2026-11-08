import { Fragment, useEffect, useRef, useState } from "react";
import { getCharacter } from "../data/characters";
import { padEntry, statTotal } from "../lib/dex";
import { STATS, raceStyle } from "../theme";
import type { Character } from "../types";
import { Medallion } from "./Medallion";

const KIND_LABEL = {
  ativa: "Ativa",
  passiva: "Passiva",
  suprema: "Suprema",
} as const;

interface DetailProps {
  character: Character;
  hasPrev: boolean;
  hasNext: boolean;
  prevName?: string;
  nextName?: string;
  inParty: boolean;
  partyCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleParty: () => void;
  onOpen: (id: string) => void;
  showParty: boolean;
}

export function Detail({
  character,
  hasPrev,
  hasNext,
  prevName,
  nextName,
  inParty,
  partyCount,
  onClose,
  onPrev,
  onNext,
  onToggleParty,
  onOpen,
  showParty,
}: DetailProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [formId, setFormId] = useState(character.forms?.[0]?.id ?? "base");
  const activeForm = character.forms?.find((form) => form.id === formId) ?? character.forms?.[0];
  const stats = activeForm?.stats ?? character.stats;
  const total = statTotal(stats);
  const related = character.related.map((id) => getCharacter(id)).filter((item): item is Character => Boolean(item));

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <aside className={character.anomalous ? "detail is-anomalous" : "detail"} aria-label={`Ficha de ${character.name}`}>
      <div className="detail-nav">
        <button type="button" className="text-btn" onClick={onPrev} disabled={!hasPrev} title={prevName} aria-label="Registro anterior">
          ←
        </button>
        <span className="num">{padEntry(character.number)}</span>
        <button type="button" className="text-btn" onClick={onNext} disabled={!hasNext} title={nextName} aria-label="Próximo registro">
          →
        </button>
        <button type="button" className="text-btn close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>

      <div className="seal">
        <span className="corner" aria-hidden="true" />
        <span className="corner" aria-hidden="true" />
        <span className="corner" aria-hidden="true" />
        <span className="corner" aria-hidden="true" />
        <Medallion character={character} size={300} variant="detail" />
      </div>

      <h2 ref={titleRef} tabIndex={-1}>{character.name}</h2>
      <p className="epithet detail-epithet">{character.epithet}</p>
      <p className="genus">{character.genus}</p>

      <div className="chips">
        <span className="race-chip" style={raceStyle(character.race)}>{character.race}</span>
        <span className="meta-chip">{character.era}</span>
        <span className="meta-chip" data-rarity={character.rarity}>{character.rarity}</span>
        {character.services?.map((service) => (
          <span className="service-chip" key={service}>{service}</span>
        ))}
      </div>

      {character.forms && character.forms.length > 0 && (
        <>
          <div className="forms" role="group" aria-label="Formas registradas">
            {character.forms.map((form, index) => (
              <Fragment key={form.id}>
                {index > 0 && <span className="evo" aria-hidden="true">→</span>}
                <button type="button" className="text-btn" aria-pressed={form.id === activeForm?.id} onClick={() => setFormId(form.id)}>
                  {form.label}
                </button>
              </Fragment>
            ))}
          </div>
          {activeForm && <p className="form-note">{activeForm.note}</p>}
        </>
      )}

      <blockquote className="voice">“{character.voice}”</blockquote>
      <p className="summary">{character.summary}</p>
      <p className="lore">{character.lore}</p>

      <div className="facts">
        <p className="fact"><span>Região</span>{character.region}</p>
        <p className="fact"><span>Aliança</span>{character.allegiance}</p>
        <p className="fact"><span>Estatura</span>{character.stature}</p>
        <p className="fact"><span>Presença</span>{character.presence}</p>
      </div>

      <h3 className="section-title">Atributos</h3>
      <p className="index-line">
        {character.anomalous ? "Índice instável" : `Índice ${total} / 600`}
      </p>
      <div className="stats">
        {STATS.map((stat) => {
          const value = stats[stat.key];
          return (
            <div className="stat" key={`${activeForm?.id ?? "base"}-${stat.key}`}>
              <div className="stat-top">
                <span>{stat.label}</span>
                <strong>{character.anomalous ? "??" : value}</strong>
              </div>
              <div className="bar">
                <i style={{ ["--v" as string]: `${character.anomalous ? 100 : value}%`, ["--stat" as string]: stat.color }} />
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="section-title">Habilidades</h3>
      <div className="abilities">
        {character.abilities.map((ability) => (
          <article className="ability" key={ability.name}>
            <header>
              <strong>{ability.name}</strong>
              <span className={`kind kind-${ability.kind}`}>{KIND_LABEL[ability.kind]}</span>
            </header>
            <p>{ability.text}</p>
          </article>
        ))}
      </div>

      <h3 className="section-title">Resistências</h3>
      <div className="tags">
        {character.strengths.map((item) => (
          <span className="tag good" key={item}>{item}</span>
        ))}
      </div>
      <h3 className="section-title">Fraquezas</h3>
      <div className="tags">
        {character.weaknesses.map((item) => (
          <span className="tag bad" key={item}>{item}</span>
        ))}
      </div>

      <h3 className="section-title">Registros ligados</h3>
      <div className="related-grid">
        {related.map((item) => (
          <button type="button" key={item.id} className="related" style={raceStyle(item.race)} onClick={() => onOpen(item.id)}>
            <Medallion character={item} size={46} variant="related" />
            <span>
              <strong>{item.name}</strong>
              <em>{item.epithet}</em>
            </span>
          </button>
        ))}
      </div>

      {showParty && (
        <button type="button" className={inParty ? "recruit is-on" : "recruit"} onClick={onToggleParty}>
          {inParty ? "Dispensar da comitiva" : `Registrar na comitiva (${partyCount}/6)`}
        </button>
      )}
    </aside>
  );
}
