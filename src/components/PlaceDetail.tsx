import { useEffect, useRef } from "react";
import { resolvePlaceRecord } from "../data/place-lore";
import { placeImageSrc, type PlaceCard } from "../data/places";

export function PlaceDetail({
  place,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
}: {
  place: PlaceCard;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const record = resolvePlaceRecord(place.id, place);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

      <h2 ref={titleRef} tabIndex={-1}>{place.name}</h2>
      <p className="epithet detail-epithet">{record.epithet}</p>

      {record.eras.length > 0 && (
        <div className="chips" aria-label="Eras">
          {record.eras.map((era) => (
            <span className="meta-chip" key={era}>{era}</span>
          ))}
        </div>
      )}

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
    </aside>
  );
}
