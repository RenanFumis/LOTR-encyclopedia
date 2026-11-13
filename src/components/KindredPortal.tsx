import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { kindredImageSrc, kindreds, type Kindred, type KindredBlock, type KindredFigure } from "../data/kindred";

function parseRich(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let index = 0;
  let key = 0;
  while (index < text.length) {
    if (text.startsWith("**", index)) {
      const end = text.indexOf("**", index + 2);
      if (end === -1) {
        nodes.push(text.slice(index));
        break;
      }
      nodes.push(<strong key={`${keyPrefix}-${key++}`}>{parseRich(text.slice(index + 2, end), `${keyPrefix}-b`)}</strong>);
      index = end + 2;
      continue;
    }
    if (text[index] === "*") {
      const end = text.indexOf("*", index + 1);
      if (end === -1) {
        nodes.push(text.slice(index));
        break;
      }
      nodes.push(<em key={`${keyPrefix}-${key++}`}>{text.slice(index + 1, end)}</em>);
      index = end + 1;
      continue;
    }
    const next = text.indexOf("*", index);
    if (next === -1) {
      nodes.push(text.slice(index));
      break;
    }
    nodes.push(text.slice(index, next));
    index = next;
  }
  return nodes;
}

function RichText({ text }: { text: string }) {
  return parseRich(text, "r");
}

function BlockList({ blocks, summaryFirst }: { blocks: KindredBlock[]; summaryFirst: boolean }) {
  let paragraphIndex = 0;
  return blocks.map((block, index) => {
    if (block.kind === "h") return <h3 className="section-title" key={`h-${index}`}>{block.text}</h3>;
    if (block.kind === "ul") {
      return (
        <ul className="kindred-sources" key={`ul-${index}`}>
          {block.items.map((item) => (
            <li key={item}><RichText text={item} /></li>
          ))}
        </ul>
      );
    }
    const lead = summaryFirst && paragraphIndex === 0;
    paragraphIndex += 1;
    return (
      <p className={lead ? "summary" : "lore"} key={`p-${index}`}>
        <RichText text={block.text} />
      </p>
    );
  });
}

function KindredBody({ kindred }: { kindred: Kindred }) {
  const blocks: KindredBlock[] = kindred.blocks ?? (kindred.paragraphs ?? [kindred.about]).map((text) => ({ kind: "p", text }));
  return <BlockList blocks={blocks} summaryFirst />;
}

function FigureName({ figure, onOpen }: { figure: KindredFigure; onOpen: (id: string) => void }) {
  const entryId = figure.entryId;
  if (!entryId) return <span className="kindred-name">{figure.name}</span>;
  return (
    <button type="button" className="kindred-link" onClick={() => onOpen(entryId)}>
      {figure.name}
    </button>
  );
}

function KindredDetail({
  kindred,
  hasPrev,
  hasNext,
  onOpen,
  onClose,
  onPrev,
  onNext,
}: {
  kindred: Kindred;
  hasPrev: boolean;
  hasNext: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [kindred.id]);

  return (
    <aside className="detail place-detail" aria-label={`Ficha de ${kindred.name}`}>
      <div className="detail-nav">
        <button type="button" className="text-btn" onClick={onPrev} disabled={!hasPrev} aria-label="Carta anterior">
          ←
        </button>
        <button type="button" className="text-btn" onClick={onNext} disabled={!hasNext} aria-label="Próxima carta">
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
        <img src={kindredImageSrc(kindred.image)} alt={kindred.alt} />
      </div>

      <h2 ref={titleRef} tabIndex={-1} className={kindred.title ? "kindred-title" : undefined}>{kindred.title ?? kindred.name}</h2>
      <KindredBody kindred={kindred} />

      <h3 className="section-title">Personagens principais</h3>
      {kindred.figuresLead && <BlockList blocks={kindred.figuresLead} summaryFirst={false} />}
      {kindred.figureGroups ? (
        kindred.figureGroups.map((group, index) => (
          <div key={group.title ?? `figures-${index}`}>
            {group.title && <h3 className="section-title">{group.title}</h3>}
            <ul className="kindred-figures">
              {group.figures.map((figure) => (
                <li key={figure.name}>
                  <FigureName figure={figure} onOpen={onOpen} />
                  <span><RichText text={figure.note} /></span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="kindred-figures">
          {kindred.figures.map((figure) => (
            <li key={figure.name}>
              <FigureName figure={figure} onOpen={onOpen} />
              <span><RichText text={figure.note} /></span>
            </li>
          ))}
        </ul>
      )}
      {kindred.sources && (
        <>
          <h3 className="section-title">{kindred.sources.heading ?? "Fontes canônicas"}</h3>
          {kindred.sources.intro && <p className="lore">{kindred.sources.intro}</p>}
          {kindred.sources.items && (
            <ul className="kindred-sources">
              {kindred.sources.items.map((item) => (
                <li key={item}><RichText text={item} /></li>
              ))}
            </ul>
          )}
          {kindred.sources.groups?.map((group) => (
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
          {kindred.sources.observations && (
            <>
              <h3 className="section-title">{kindred.sources.observations.heading}</h3>
              {kindred.sources.observations.intro && <p className="lore">{kindred.sources.observations.intro}</p>}
              <ul className="kindred-sources">
                {kindred.sources.observations.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {kindred.sources.note && <p className="kindred-note">{kindred.sources.note}</p>}
        </>
      )}
    </aside>
  );
}

function KindredBoard({ onOpen }: { onOpen: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const index = kindreds.findIndex((kindred) => kindred.id === selectedId);
  const selected = index >= 0 ? kindreds[index] : null;
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
      if (event.key === "ArrowRight" && index < kindreds.length - 1) {
        event.preventDefault();
        setSelectedId(kindreds[index + 1].id);
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        setSelectedId(kindreds[index - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, selected]);

  return (
    <div className="place-sheet">
      <div className={wrapped ? "place-grid is-wrapped" : "place-grid"} ref={gridRef}>
        {selected && (
          <KindredDetail
            kindred={selected}
            hasPrev={index > 0}
            hasNext={index < kindreds.length - 1}
            onOpen={onOpen}
            onPrev={() => setSelectedId(kindreds[index - 1].id)}
            onNext={() => setSelectedId(kindreds[index + 1].id)}
            onClose={() => setSelectedId(null)}
          />
        )}
        {kindreds.filter((kindred) => kindred.id !== selectedId).map((kindred) => (
          <article className="place-card" key={kindred.id}>
            <button
              type="button"
              className="place-card-hit"
              aria-pressed={false}
              onClick={() => setSelectedId(kindred.id)}
            >
              <img src={kindredImageSrc(kindred.image)} alt="" />
              <span className="place-card-copy">
                <span className="place-card-name">{kindred.name}</span>
              </span>
            </button>
          </article>
        ))}
        {wrapped && <div className="wrap-notch" aria-hidden="true" />}
      </div>
    </div>
  );
}

export function KindredPortal({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <main id="conteudo" className="portal places-portal">
      <div className="portal-banner">
        <img className="is-hunt" src="/banner/nazgul-cacador.png" alt="Cavaleiro sombrio e uma besta alada sob um céu de nuvens." />
      </div>
      <section className="bestiary-intro">
        <h2>Criaturas da Terra-média</h2>
        <div className="ornamental-divider" aria-hidden="true">
          <span>✧</span>
        </div>
        <p className="bestiary-lead">
          Das antigas raças aos seres mais misteriosos de Arda, descubra suas origens, características e histórias. Cada carta revela um pouco da riqueza e dos mistérios do universo de Tolkien.
        </p>
      </section>
      <KindredBoard onOpen={onOpen} />
    </main>
  );
}
