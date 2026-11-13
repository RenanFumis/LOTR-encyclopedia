import { useEffect, useRef } from "react";
import { resolvePlaceRecord, type PlaceFigure } from "../data/place-lore";
import { placeImageSrc, type PlaceCard } from "../data/places";
import { BlockList, RichText } from "./RichText";

function FigureName({ figure, onOpen }: { figure: PlaceFigure; onOpen?: (id: string) => void }) {
  const entryId = figure.entryId;
  if (!entryId || !onOpen) return <span className="kindred-name">{figure.name}</span>;
  return (
    <button type="button" className="kindred-link" onClick={() => onOpen(entryId)}>
      {figure.name}
    </button>
  );
}

export function PlaceDetail({
  place,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
  onOpenEntry,
}: {
  place: PlaceCard;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenEntry?: (id: string) => void;
}) {
  const record = resolvePlaceRecord(place.id, place);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rich = Boolean(record.blocks?.length);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [place.id]);

  return (
    <aside className="detail place-detail" aria-label={`Ficha de ${place.name}`}>
      <div className="detail-nav">
        <button type="button" className="text-btn" onClick={onPrev} disabled={!hasPrev} aria-label="Lugar anterior">
          ←
        </button>
        <button type="button" className="text-btn" onClick={onNext} disabled={!hasNext} aria-label="Próximo lugar">
          →
        </button>
        <button type="button" className="text-btn close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>

      <div className="seal place-detail-seal">
        <span className="corner" aria-hidden="true" />
        <span className="corner" aria-hidden="true" />
        <span className="corner" aria-hidden="true" />
        <span className="corner" aria-hidden="true" />
        <img src={placeImageSrc(place.image)} alt="" />
      </div>

      <h2 ref={titleRef} tabIndex={-1} className={record.title ? "kindred-title" : undefined}>
        {record.title ?? place.name}
      </h2>
      <p className="epithet detail-epithet">{record.epithet}</p>

      {record.eras.length > 0 && (
        <div className="chips" aria-label="Eras">
          {record.eras.map((era) => (
            <span className="meta-chip" key={era}>{era}</span>
          ))}
        </div>
      )}

      {rich ? (
        <>
          {record.meta && record.meta.length > 0 && (
            <ul className="kindred-sources place-meta">
              {record.meta.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> <RichText text={item.value} />
                </li>
              ))}
            </ul>
          )}
          <BlockList blocks={record.blocks!} summaryFirst />
          {(record.figureGroups || record.figuresLead) && (
            <>
              <h3 className="section-title">{record.relatedHeading ?? "Personagens e povos relacionados"}</h3>
              {record.figuresLead && <BlockList blocks={record.figuresLead} />}
              {record.figureGroups?.map((group, index) => (
                <div key={group.title ?? `figures-${index}`}>
                  {group.title && <h3 className="section-title">{group.title}</h3>}
                  <ul className="kindred-figures">
                    {group.figures.map((figure) => (
                      <li key={figure.name}>
                        <FigureName figure={figure} onOpen={onOpenEntry} />
                        <span><RichText text={figure.note} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
          {record.sources && (
            <>
              <h3 className="section-title">{record.sources.heading ?? "Fontes bibliográficas"}</h3>
              {record.sources.intro && <p className="lore"><RichText text={record.sources.intro} /></p>}
              {record.sources.items && (
                <ul className="kindred-sources">
                  {record.sources.items.map((item) => (
                    <li key={item}><RichText text={item} /></li>
                  ))}
                </ul>
              )}
              {record.sources.groups?.map((group) => (
                <div key={group.title}>
                  <h3 className="section-title">{group.title}</h3>
                  {group.books.map((book) => (
                    <div key={book.title}>
                      <p className="kindred-book">{book.title}</p>
                      {book.lead && <p className="lore"><RichText text={book.lead} /></p>}
                      <ul className="kindred-sources">
                        {book.items.map((item) => (
                          <li key={item}><RichText text={item} /></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              {record.sources.observations && (
                <>
                  <h3 className="section-title">{record.sources.observations.heading}</h3>
                  {record.sources.observations.intro && (
                    <p className="lore"><RichText text={record.sources.observations.intro} /></p>
                  )}
                  <ul className="kindred-sources">
                    {record.sources.observations.items.map((item) => (
                      <li key={item}><RichText text={item} /></li>
                    ))}
                  </ul>
                </>
              )}
              {record.sources.note && <p className="kindred-note"><RichText text={record.sources.note} /></p>}
            </>
          )}
        </>
      ) : (
        <>
          <p className="summary">{place.text}</p>

          <h3 className="section-title">Nomes ao longo das Eras</h3>
          <p className="lore">{record.names}</p>

          {record.books.length > 0 && (
            <>
              <h3 className="section-title">Livros</h3>
              <p className="lore">{record.books.join(" · ")}</p>
            </>
          )}

          {record.figures.length > 0 && (
            <>
              <h3 className="section-title">Quem passou por ali</h3>
              <p className="lore">{record.figures.join(", ")}</p>
            </>
          )}

          <h3 className="section-title">O lugar</h3>
          {record.paragraphs.map((paragraph) => (
            <p className="lore" key={paragraph}>{paragraph}</p>
          ))}
        </>
      )}
    </aside>
  );
}
