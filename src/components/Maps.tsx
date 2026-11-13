import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mapImageSrc, regionMaps, type RegionMap } from "../data/maps";

function MapDetail({
  map,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
}: {
  map: RegionMap;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [map.id]);

  return (
    <aside className="detail place-detail" aria-label={`Mapa de ${map.name}`}>
      <div className="detail-nav">
        <button type="button" className="text-btn" onClick={onPrev} disabled={!hasPrev} aria-label="Mapa anterior">
          ←
        </button>
        <button type="button" className="text-btn" onClick={onNext} disabled={!hasNext} aria-label="Próximo mapa">
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
        <img src={mapImageSrc(map.image)} alt="" />
      </div>

      <h2 ref={titleRef} tabIndex={-1}>{map.name}</h2>
      <p className="epithet detail-epithet">{map.epithet}</p>

      <div className="chips" aria-label="Eras">
        {map.eras.map((era) => (
          <span className="meta-chip" key={era}>{era}</span>
        ))}
      </div>

      <p className="summary">{map.text}</p>

      <h3 className="section-title">A região</h3>
      {map.region.map((paragraph) => (
        <p className="lore" key={paragraph}>{paragraph}</p>
      ))}

      <h3 className="section-title">Acontecimentos</h3>
      {map.events.map((paragraph) => (
        <p className="lore" key={paragraph}>{paragraph}</p>
      ))}

      <h3 className="section-title">Livros</h3>
      <p className="lore">{map.books.join(" · ")}</p>
    </aside>
  );
}

function MapBoard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const index = regionMaps.findIndex((map) => map.id === selectedId);
  const selected = index >= 0 ? regionMaps[index] : null;
  const wrapped = selected !== null;

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
      const detail = grid.querySelector<HTMLElement>(":scope > .place-detail");
      const cards = [...grid.querySelectorAll<HTMLElement>(":scope > .place-card")];
      if (!detail || cards.length === 0) return;

      const previous = cards.map((card) => card.style.alignSelf);
      for (const card of cards) card.style.alignSelf = "start";
      const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
      const measured = cards.map((card) => Math.ceil(card.getBoundingClientRect().height));
      const target = Math.ceil(detail.getBoundingClientRect().height);
      cards.forEach((card, cardIndex) => {
        card.style.alignSelf = previous[cardIndex];
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
    const detail = grid.querySelector<HTMLElement>(":scope > .place-detail");
    if (detail) observer.observe(detail);
    for (const card of grid.querySelectorAll<HTMLElement>(":scope > .place-card")) observer.observe(card);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [wrapped, selectedId]);

  useEffect(() => {
    if (!selected) return;
    document.querySelector(".place-detail")?.scrollIntoView({ block: "start" });
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
      if (event.key === "Escape") {
        setSelectedId(null);
        return;
      }
      if (event.key === "ArrowRight" && index < regionMaps.length - 1) {
        event.preventDefault();
        setSelectedId(regionMaps[index + 1].id);
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        setSelectedId(regionMaps[index - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, selected]);

  return (
    <div className="place-sheet">
      <div className={wrapped ? "place-grid is-wrapped" : "place-grid"} ref={gridRef}>
        {selected && (
          <MapDetail
            map={selected}
            hasPrev={index > 0}
            hasNext={index < regionMaps.length - 1}
            onPrev={() => setSelectedId(regionMaps[index - 1].id)}
            onNext={() => setSelectedId(regionMaps[index + 1].id)}
            onClose={() => setSelectedId(null)}
          />
        )}
        {regionMaps.map((map) => (
          <article className={map.id === selectedId ? "place-card is-selected" : "place-card"} key={map.id}>
            <button
              type="button"
              className="place-card-hit"
              aria-pressed={map.id === selectedId}
              onClick={() => setSelectedId((current) => (current === map.id ? null : map.id))}
            >
              <img src={mapImageSrc(map.image)} alt="" />
              <span className="place-card-copy">
                <span className="place-card-name">{map.name}</span>
                <span className="map-era">{map.eras.join(" · ")}</span>
                <span className="place-card-text">{map.text}</span>
              </span>
            </button>
          </article>
        ))}
        {wrapped && <div className="wrap-notch" aria-hidden="true" />}
      </div>
    </div>
  );
}

export function Maps() {
  return (
    <main id="conteudo" className="portal places-portal">
      <div className="portal-banner">
        <img className="is-atlas" src="/banner/BannerMapaAntigodaTerraMedia.png?v=1" alt="Mapa antigo da Terra-média, do Condado a Mordor e a Harad." />
      </div>
      <section className="bestiary-intro">
        <h2>Mapas</h2>
        <div className="ornamental-divider" aria-hidden="true">
          <span>✧</span>
        </div>
        <p className="bestiary-lead">
          Cada folha desta sala é uma região de Arda, com a era que o desenho representa e um relato do que essa terra viu.
        </p>
        <div className="bestiary-copy">
          <p>
            Há mapas do mundo inteiro e mapas de um reino só. Onde a folha traz a era no título, a ficha a repete. Onde não traz, a ficha diz a qual tempo aquele chão pertence. Os acontecimentos ficam em traço largo: o arquivo nomeia a guerra e não descreve o campo.
          </p>
        </div>
      </section>
      <MapBoard />
    </main>
  );
}
