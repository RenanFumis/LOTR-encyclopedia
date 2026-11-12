import { useEffect, useMemo, useRef, useState } from "react";
import { DexBoard } from "./components/DexBoard";
import { Header } from "./components/Header";
import { BestiaryPortal } from "./components/BestiaryPortal";
import { About } from "./components/About";
import { Places } from "./components/Places";
import { Home } from "./components/Home";
import { PartyBar } from "./components/PartyBar";
import { Room } from "./components/Room";
import { characters, getCharacter } from "./data/characters";
import { matchesQuery, sortCharacters } from "./lib/dex";
import { readRoute, routeHash, type PageId } from "./lib/routes";
import { playEntrySound } from "./lib/sound";
import { readParty, readSound, readView, writeParty, writeSound, writeView } from "./lib/storage";
import { CREATURE_RACES, PEOPLE_RACES, RACES, type Character, type DexFilters, type Race, type ViewMode } from "./types";

const partyEnabled = false;
const soundEnabled = false;

function scopeRaces(page: PageId): readonly Race[] | null {
  if (page === "racas") return PEOPLE_RACES;
  if (page === "criaturas") return CREATURE_RACES;
  return null;
}

function showsEntry(page: PageId) {
  return page === "catalogo" || page === "racas" || page === "criaturas";
}

function isPlain(page: PageId) {
  return page === "home" || page === "bestiario" || page === "catalogo" || page === "racas" || page === "criaturas" || page === "sobre" || page === "lugares";
}

const initialFilters: DexFilters = {
  query: "",
  race: "Todas",
  era: "Todas",
  rarity: "Todas",
  sort: "numero",
  partyOnly: false,
};

function initialRoute() {
  const route = readRoute(window.location.hash);
  const entryId = route.entryId && getCharacter(route.entryId) ? route.entryId : null;
  return { page: route.page, entryId, placeId: route.placeId };
}

export function App() {
  const [filters, setFilters] = useState<DexFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>(() => readView());
  const [page, setPage] = useState<PageId>(() => initialRoute().page);
  const [selectedId, setSelectedId] = useState<string | null>(() => initialRoute().entryId);
  const [placeId, setPlaceId] = useState<string | null>(() => initialRoute().placeId);
  const [party, setParty] = useState<string[]>(() => readParty().filter((id) => getCharacter(id)));
  const [sound, setSound] = useState(readSound);
  const [notice, setNotice] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const fromPop = useRef(false);
  const soundReady = useRef(false);

  const pool = useMemo(() => {
    const scope = scopeRaces(page);
    return scope ? characters.filter((character) => scope.includes(character.race)) : characters;
  }, [page]);

  const visible = useMemo(() => {
    const next = pool.filter((character) => {
      if (filters.partyOnly && !party.includes(character.id)) return false;
      if (filters.race !== "Todas" && character.race !== filters.race) return false;
      if (filters.era !== "Todas" && character.era !== filters.era) return false;
      if (filters.rarity !== "Todas" && character.rarity !== filters.rarity) return false;
      return matchesQuery(character, filters.query);
    });
    return sortCharacters(next, filters.sort);
  }, [filters, party, pool]);

  const selected = selectedId ? getCharacter(selectedId) ?? null : null;

  useEffect(() => {
    writeParty(party);
  }, [party]);

  useEffect(() => {
    writeView(view);
  }, [view]);

  useEffect(() => {
    writeSound(sound);
  }, [sound]);

  useEffect(() => {
    const scope = scopeRaces(page);
    if (!scope) return;
    if (filters.race !== "Todas" && !scope.includes(filters.race)) {
      setFilters((current) => ({ ...current, race: "Todas" }));
    }
  }, [page, filters.race]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    const onPop = () => {
      fromPop.current = true;
      const route = readRoute(window.location.hash);
      setPage(route.page);
      setPlaceId(route.placeId);
      setSelectedId(route.entryId && getCharacter(route.entryId) ? route.entryId : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (fromPop.current) {
      fromPop.current = false;
      return;
    }
    const hash = routeHash(page, showsEntry(page) ? selectedId : null, page === "lugares" ? placeId : null);
    if (window.location.hash === hash || (hash === "#/" && window.location.hash === "")) return;
    window.history.pushState(null, "", hash);
  }, [page, selectedId, placeId]);

  useEffect(() => {
    if (!soundReady.current) {
      soundReady.current = true;
      return;
    }
    if (sound && selected) playEntrySound(selected.number);
  }, [selected, selectedId, sound]);

  useEffect(() => {
    if (!selectedId) return;
    document.querySelector(".detail")?.scrollIntoView({ block: "start" });
  }, [selectedId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement;

      if (event.key === "/" && !typing && showsEntry(page)) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (event.key === "Escape") {
        if (target instanceof HTMLInputElement && filters.query) {
          setFilters((current) => ({ ...current, query: "" }));
          return;
        }
        setSelectedId(null);
        return;
      }

      if (typing || !selectedId) return;
      const index = visible.findIndex((item) => item.id === selectedId);
      if (event.key === "ArrowRight" && index >= 0 && visible[index + 1]) {
        event.preventDefault();
        setSelectedId(visible[index + 1].id);
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        setSelectedId(visible[index - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filters.query, page, selectedId, visible]);

  const openPage = (next: PageId) => {
    setSelectedId(null);
    setPlaceId(null);
    setPage(next);
    const scope = scopeRaces(next);
    if (scope) {
      setFilters((current) => (
        current.race !== "Todas" && !scope.includes(current.race)
          ? { ...current, race: "Todas" }
          : current
      ));
    }
    window.scrollTo(0, 0);
  };

  const openPlace = (id: string | null) => {
    setSelectedId(null);
    setPage("lugares");
    setPlaceId(id);
    window.scrollTo(0, 0);
  };

  const openEntry = (id: string) => {
    setPage("catalogo");
    setSelectedId(id);
  };

  const patch = (partial: Partial<DexFilters>) => setFilters((current) => ({ ...current, ...partial }));
  const toggleSelect = (id: string) => setSelectedId((current) => (current === id ? null : id));
  const dirty =
    filters.query !== "" ||
    filters.race !== "Todas" ||
    filters.era !== "Todas" ||
    filters.rarity !== "Todas" ||
    filters.partyOnly;

  const clear = () => setFilters((current) => ({ ...initialFilters, sort: current.sort }));

  const toggleParty = (id: string) => {
    setParty((current) => {
      if (current.includes(id)) {
        setNotice("Dispensado da comitiva.");
        return current.filter((item) => item !== id);
      }
      if (current.length >= 6) {
        setNotice("A comitiva só leva seis. Dispense alguém primeiro.");
        return current;
      }
      setNotice("Convocado para a comitiva.");
      return [...current, id];
    });
  };

  const onEmptySlot = () => {
    if (!selected) {
      setNotice("Abra uma ficha para preencher esta vaga.");
      return;
    }
    if (party.includes(selected.id)) {
      setNotice("Este registro já está na comitiva.");
      return;
    }
    toggleParty(selected.id);
  };

  const neighborSource = selected && visible.some((item) => item.id === selected.id) ? visible : sortCharacters([...pool], "numero");
  const neighborIndex = selected ? neighborSource.findIndex((item) => item.id === selected.id) : -1;
  const prev = neighborIndex > 0 ? neighborSource[neighborIndex - 1] : undefined;
  const next = neighborIndex >= 0 ? neighborSource[neighborIndex + 1] : undefined;
  const partyCharacters = party.map((id) => getCharacter(id)).filter((item): item is Character => Boolean(item));
  const collection = page === "racas"
    ? { title: "Raças da Terra-média", races: PEOPLE_RACES, banner: "/banner/exercito-antes-da-batalha.png?v=2", bannerAlt: "Hoste a cavalo reunida no campo, sob estandartes verdes.", bannerClass: "is-host" }
    : page === "criaturas"
      ? { title: "Criaturas da Terra-média", races: CREATURE_RACES, banner: "/banner/nazgul-cacador.png", bannerAlt: "Cavaleiro sombrio e uma besta alada sob um céu de nuvens.", bannerClass: "is-hunt" }
      : null;

  return (
    <>
      {!isPlain(page) && <div className="halo" aria-hidden="true" />}
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <div className={partyEnabled ? "page" : "page no-party"}>
        <div className={isPlain(page) ? "device is-plain" : "device"}>
          {!isPlain(page) && (
            <>
              <span className="screw tl" aria-hidden="true" />
              <span className="screw tr" aria-hidden="true" />
              <span className="screw bl" aria-hidden="true" />
              <span className="screw br" aria-hidden="true" />
            </>
          )}
          <Header
            page={page}
            onOpen={openPage}
            showSound={soundEnabled}
            sound={sound}
            onToggleSound={() => setSound((value) => !value)}
          />
          {page === "home" && <Home onOpen={openPage} onOpenEntry={openEntry} />}
          {page === "bestiario" && <BestiaryPortal onOpen={openPage} />}
          {page === "lugares" && <Places section={placeId} onOpen={openPlace} />}
          {page === "historia" && (
            <Room kicker="As eras" title="História de Arda">
              As eras de Arda, do começo do mundo até o fim da Terceira Era, terão uma linha própria. Por enquanto a sala só marca o lugar.
            </Room>
          )}
          {page === "mapas" && (
            <Room kicker="Cartografia" title="Mapas">
              Os mapas do arquivo ficam nesta sala. Ainda não há folha pendurada.
            </Room>
          )}
          {page === "sobre" && <About />}
          {page === "creditos" && (
            <Room kicker="O arquivo" title="Créditos">
              Os créditos do projeto entram nesta sala.
            </Room>
          )}
          {page === "termos" && (
            <Room kicker="O arquivo" title="Termos de Uso">
              Os termos de uso entram nesta sala.
            </Room>
          )}
          {page === "privacidade" && (
            <Room kicker="O arquivo" title="Políticas de privacidade">
              A política de privacidade entra nesta sala.
            </Room>
          )}
          {collection && (
            <main id="conteudo" className="portal">
              <div className="portal-banner" aria-hidden={collection.banner ? undefined : true}>
                {collection.banner && (
                  <img className={collection.bannerClass} src={collection.banner} alt={collection.bannerAlt} />
                )}
              </div>
              <section className="bestiary-intro">
                <h2>{collection.title}</h2>
                <div className="ornamental-divider" aria-hidden="true">
                  <span>✧</span>
                </div>
              </section>
              <div className="bestiary">
                <DexBoard
                  asMain={false}
                  filters={filters}
                  races={collection.races}
                  view={view}
                  visible={visible}
                  total={pool.length}
                  dirty={dirty}
                  searchRef={searchRef}
                  selected={selected}
                  selectedId={selectedId}
                  party={party}
                  partyEnabled={partyEnabled}
                  hasPrev={Boolean(prev)}
                  hasNext={Boolean(next)}
                  prevName={prev?.name}
                  nextName={next?.name}
                  onChange={patch}
                  onView={setView}
                  onClear={clear}
                  onSelect={toggleSelect}
                  onClose={() => setSelectedId(null)}
                  onPrev={() => prev && setSelectedId(prev.id)}
                  onNext={() => next && setSelectedId(next.id)}
                  onToggleParty={() => selected && toggleParty(selected.id)}
                  onOpen={setSelectedId}
                />
              </div>
            </main>
          )}
          {page === "catalogo" && (
            <div className="bestiary">
              <header className="bestiary-head">
                <h2>Bestiário</h2>
                <div className="ornamental-divider" aria-hidden="true">
                  <span>✧</span>
                </div>
              </header>
              <DexBoard
                asMain
                filters={filters}
                races={RACES}
                view={view}
                visible={visible}
                total={pool.length}
                dirty={dirty}
                searchRef={searchRef}
                selected={selected}
                selectedId={selectedId}
                party={party}
                partyEnabled={partyEnabled}
                hasPrev={Boolean(prev)}
                hasNext={Boolean(next)}
                prevName={prev?.name}
                nextName={next?.name}
                onChange={patch}
                onView={setView}
                onClear={clear}
                onSelect={toggleSelect}
                onClose={() => setSelectedId(null)}
                onPrev={() => prev && setSelectedId(prev.id)}
                onNext={() => next && setSelectedId(next.id)}
                onToggleParty={() => selected && toggleParty(selected.id)}
                onOpen={setSelectedId}
              />
            </div>
          )}
          <footer className="colophon">
            <button type="button" className="colophon-brand" onClick={() => openPage("home")}>
              <img className="brand-mark" src="/mark.png" alt="" />
              <span>
                <span className="colophon-kicker">A Enciclopédia da Terra-média</span>
                <span className="colophon-title">Lord of the Rings</span>
              </span>
            </button>
            <nav className="colophon-links" aria-label="Informações do projeto">
              <button type="button" className="colophon-link" aria-current={page === "sobre" ? "page" : undefined} onClick={() => openPage("sobre")}>Sobre</button>
              <button type="button" className="colophon-link" aria-current={page === "creditos" ? "page" : undefined} onClick={() => openPage("creditos")}>Créditos</button>
              <button type="button" className="colophon-link" aria-current={page === "termos" ? "page" : undefined} onClick={() => openPage("termos")}>Termos de Uso</button>
              <button type="button" className="colophon-link" aria-current={page === "privacidade" ? "page" : undefined} onClick={() => openPage("privacidade")}>Políticas de privacidade</button>
            </nav>
            <p className="colophon-note">
              Projeto de fã para fã.{" "}
              <br className="colophon-break" />
              Sem vínculos com a Tolkien Estate <br className="colophon-break" /> ou a Middle-earth Enterprises.
            </p>
            <p className="colophon-credit">Desenvolvido por Meir Fumis</p>
          </footer>
        </div>
      </div>
      {partyEnabled && (
        <PartyBar
          party={partyCharacters}
          selectedId={selectedId}
          onOpen={setSelectedId}
          onRemove={toggleParty}
          onEmptySlot={onEmptySlot}
        />
      )}
      {notice && (
        <div className="toast" role="status">{notice}</div>
      )}
    </>
  );
}
