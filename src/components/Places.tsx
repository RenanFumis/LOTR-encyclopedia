import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PlaceDetail } from "./PlaceDetail";
import { eraPictures, placeEras, placeImageSrc, resolvePlace, type PlaceCard, type PlaceGroup } from "../data/places";

const coverKey = "lorthdex-place-covers";

const eraBanners: Record<string, { image: string; alt: string; className: string }> = {
  aman: {
    image: "Aman_e_Valinor/Valinor.png",
    alt: "Árvores de luz dourada sobre a cidade branca de Valinor, à beira do mar.",
    className: "is-aman",
  },
  primeira: {
    image: "primeira_era/Falas.png",
    alt: "Navio de vela branca diante dos portos de Falas, entre penhascos e montanhas.",
    className: "is-falas",
  },
  segunda: {
    image: "segunda_era/Portos_Cinzentos_Mithlond.png",
    alt: "Portos Cinzentos de Mithlond, com cúpulas, arcadas e navios no golfo.",
    className: "is-mithlond",
  },
  terceira: {
    image: "terceira_era/Campos_do_Pelennor.png",
    alt: "Campos de Pelennor diante de Minas Tirith, com o estandarte verde no campo.",
    className: "is-pelennor",
  },
};

const groupBanners: Record<string, { image: string; alt: string; className: string; version?: number }> = {
  "terceira-lugares": {
    image: "terceira_era/Bree.png",
    alt: "Rua de Bree à noite, com casas de madeira, lanternas e a colina iluminada ao fundo.",
    className: "is-bree",
  },
  "terceira-especiais": {
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/CâmaradeMazarbulbanner.png",
    alt: "Câmara de Mazarbul, com um feixe de luz sobre a pedra e estantes nas arcadas.",
    className: "is-mazarbul",
    version: 1,
  },
};

function readCovers(): Record<string, string> {
  try {
    const value = JSON.parse(sessionStorage.getItem(coverKey) ?? "{}") as unknown;
    if (!value || typeof value !== "object") return {};
    return value as Record<string, string>;
  } catch {
    return {};
  }
}

function pickCover(id: string, pictures: PlaceCard[], previous: Record<string, string>) {
  const pool = pictures.filter((place) => place.image !== previous[id]);
  const source = pool.length > 0 ? pool : pictures;
  return source[Math.floor(Math.random() * source.length)].image;
}

function PlaceBack({ label, onClick, atEnd = false }: { label: string; onClick: () => void; atEnd?: boolean }) {
  return (
    <button type="button" className={atEnd ? "portal-cta place-back-end" : "portal-link place-back"} onClick={onClick}>
      {label}
    </button>
  );
}
function PlaceBoard({ places }: { places: PlaceCard[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const index = places.findIndex((place) => place.id === selectedId);
  const selected = index >= 0 ? places[index] : null;
  const wrapped = selected !== null && places.length > 0;

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
  }, [wrapped, selectedId, places]);

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
      if (event.key === "ArrowRight" && index < places.length - 1) {
        event.preventDefault();
        setSelectedId(places[index + 1].id);
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        setSelectedId(places[index - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, places, selected]);

  return (
    <div className="place-sheet">
      <div className={wrapped ? "place-grid is-wrapped" : "place-grid"} ref={gridRef}>
        {selected && (
          <PlaceDetail
            place={selected}
            hasPrev={index > 0}
            hasNext={index < places.length - 1}
            onPrev={() => setSelectedId(places[index - 1].id)}
            onNext={() => setSelectedId(places[index + 1].id)}
            onClose={() => setSelectedId(null)}
          />
        )}
        {places.map((place) => (
          <article className={place.id === selectedId ? "place-card is-selected" : "place-card"} key={place.id}>
            <button
              type="button"
              className="place-card-hit"
              aria-pressed={place.id === selectedId}
              onClick={() => setSelectedId((current) => (current === place.id ? null : place.id))}
            >
              <img src={placeImageSrc(place.image)} alt="" />
              <span className="place-card-copy">
                <span className="place-card-name">{place.name}</span>
                <span className="place-card-text">{place.text}</span>
              </span>
            </button>
          </article>
        ))}
        {wrapped && <div className="wrap-notch" aria-hidden="true" />}
      </div>
    </div>
  );
}

function GateCards({
  items,
  onOpen,
}: {
  items: { id: string; title: string; text: string; image: string }[];
  onOpen: (id: string) => void;
}) {
  return (
    <section className="portal-cards place-gates" aria-label="Salas de lugares">
      {items.map((item) => (
        <article className="portal-card bestiary-gate has-art" key={item.id}>
          <button type="button" className="bestiary-gate-hit" onClick={() => onOpen(item.id)}>
            <div className="portal-card-art">
              <img src={placeImageSrc(item.image)} alt="" />
            </div>
            <div className="portal-card-title">
              <span className="bestiary-gate-title">{item.title}</span>
            </div>
            <p>{item.text}</p>
          </button>
        </article>
      ))}
    </section>
  );
}

function rememberCovers(items: { id: string; image: string }[]) {
  try {
    const saved = readCovers();
    for (const item of items) saved[item.id] = item.image;
    sessionStorage.setItem(coverKey, JSON.stringify(saved));
  } catch {
    /* o sorteio segue mesmo sem memória da visita anterior */
  }
}

function PlaceIndex({ onOpen }: { onOpen: (id: string) => void }) {
  const [items] = useState(() => {
    const previous = readCovers();
    return placeEras.map((era) => ({
      id: era.id,
      title: era.title,
      text: era.lead,
      image: pickCover(era.id, eraPictures(era), previous),
    }));
  });

  useEffect(() => {
    rememberCovers(items);
  }, [items]);

  return <GateCards items={items} onOpen={onOpen} />;
}

function GroupGates({ groups, onOpen }: { groups: PlaceGroup[]; onOpen: (id: string) => void }) {
  const [items] = useState(() => {
    const previous = readCovers();
    return groups.map((group) => ({
      id: group.id.replace(/^[a-z]+-/, ""),
      title: group.title,
      text: group.text,
      image: pickCover(group.id, group.places, previous),
      rememberId: group.id,
    }));
  });

  useEffect(() => {
    rememberCovers(items.map((item) => ({ id: item.rememberId, image: item.image })));
  }, [items]);

  return (
    <GateCards
      items={items.map((item) => ({ id: item.id, title: item.title, text: item.text, image: item.image }))}
      onOpen={(slug) => onOpen(`terceira/${slug}`)}
    />
  );
}

export function Places({ section, onOpen }: { section: string | null; onOpen: (id: string | null) => void }) {
  const view = resolvePlace(section);
  const eraBanner = view.kind === "era" ? eraBanners[view.era.id] : undefined;
  const groupBanner = view.kind === "group" ? groupBanners[view.group.id] : undefined;

  return (
    <main id="conteudo" className="portal places-portal">
      {view.kind === "index" && (
        <>
          <div className="portal-banner">
            <img className="is-places" src="/banner/Banner_lugares.png" alt="Arco com a Árvore Branca, a cidade branca sobre o penhasco e a montanha de fogo ao longe." />
          </div>
          <section className="bestiary-intro">
            <h2>Lugares</h2>
            <div className="ornamental-divider" aria-hidden="true">
              <span>✧</span>
            </div>
            <p className="bestiary-lead">
              Das terras imperecíveis de Aman às cidades, florestas e montanhas da Terra-média, cada lugar desta sala guarda uma imagem e um relato breve.
            </p>
            <div className="bestiary-copy">
              <p>
                Os caminhos estão reunidos por eras. Aman e Valinor ficam além do mar. A Primeira Era percorre Beleriand. A Segunda Era acompanha Númenor e os reinos que nasceram depois da sua queda. A Terceira Era, a mais próxima das histórias conhecidas, se abre em dois mapas: os lugares da era e os recantos especiais e misteriosos.
              </p>
            </div>
          </section>
          <PlaceIndex onOpen={(id) => onOpen(id)} />
        </>
      )}

      {view.kind === "era" && (
        <>
          {eraBanner && (
            <div className="portal-banner">
              <img className={eraBanner.className} src={placeImageSrc(eraBanner.image)} alt={eraBanner.alt} />
            </div>
          )}
          <section className="bestiary-intro">
            <PlaceBack label="Voltar para Lugares" onClick={() => onOpen(null)} />
            <h2>{view.era.title}</h2>
            <div className="ornamental-divider" aria-hidden="true">
              <span>✧</span>
            </div>
            <div className="bestiary-copy">
              {view.era.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
          {view.era.places && <PlaceBoard places={view.era.places} />}
          {view.era.groups && <GroupGates groups={view.era.groups} onOpen={onOpen} />}
          <PlaceBack atEnd label="Voltar para Lugares" onClick={() => onOpen(null)} />
        </>
      )}

      {view.kind === "group" && (
        <>
          {groupBanner && (
            <div className="portal-banner">
              <img className={groupBanner.className} src={`${placeImageSrc(groupBanner.image)}${groupBanner.version ? `?v=${groupBanner.version}` : ""}`} alt={groupBanner.alt} />
            </div>
          )}
          <section className="bestiary-intro">
            <PlaceBack label={`Voltar para ${view.era.title}`} onClick={() => onOpen(view.era.id)} />
            <h2>{view.group.title}</h2>
            <div className="ornamental-divider" aria-hidden="true">
              <span>✧</span>
            </div>
            <p className="bestiary-lead">{view.group.text}</p>
          </section>
          <PlaceBoard places={view.group.places} />
          <PlaceBack atEnd label={`Voltar para ${view.era.title}`} onClick={() => onOpen(view.era.id)} />
        </>
      )}
    </main>
  );
}
