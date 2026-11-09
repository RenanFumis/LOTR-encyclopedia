import { useEffect, useMemo, useRef, useState } from "react";
import { Detail } from "./components/Detail";
import { DexCard, DexRow } from "./components/Entries";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { PartyBar } from "./components/PartyBar";
import { Room } from "./components/Room";
import { Toolbar } from "./components/Toolbar";
import { characters, getCharacter } from "./data/characters";
import { matchesQuery, sortCharacters } from "./lib/dex";
import { readRoute, routeHash, type PageId } from "./lib/routes";
import { playEntrySound } from "./lib/sound";
import { readParty, readSound, readView, writeParty, writeSound, writeView } from "./lib/storage";
import type { Character, DexFilters, ViewMode } from "./types";

const partyEnabled = false;
const soundEnabled = false;

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
  return { page: route.page, entryId };
}

export function App() {
  const [filters, setFilters] = useState<DexFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>(() => readView());
  const [page, setPage] = useState<PageId>(() => initialRoute().page);
  const [selectedId, setSelectedId] = useState<string | null>(() => initialRoute().entryId);
  const [party, setParty] = useState<string[]>(() => readParty().filter((id) => getCharacter(id)));
  const [sound, setSound] = useState(readSound);
  const [notice, setNotice] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const fromPop = useRef(false);
  const soundReady = useRef(false);

  const visible = useMemo(() => {
    const next = characters.filter((character) => {
      if (filters.partyOnly && !party.includes(character.id)) return false;
      if (filters.race !== "Todas" && character.race !== filters.race) return false;
      if (filters.era !== "Todas" && character.era !== filters.era) return false;
      if (filters.rarity !== "Todas" && character.rarity !== filters.rarity) return false;
      return matchesQuery(character, filters.query);
    });
    return sortCharacters(next, filters.sort);
  }, [filters, party]);

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
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    const onPop = () => {
      fromPop.current = true;
      const route = readRoute(window.location.hash);
      setPage(route.page);
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
    const hash = routeHash(page, page === "bestiario" ? selectedId : null);
    if (window.location.hash === hash || (hash === "#/" && window.location.hash === "")) return;
    window.history.pushState(null, "", hash);
  }, [page, selectedId]);

  useEffect(() => {
    if (!soundReady.current) {
      soundReady.current = true;
      return;
    }
    if (sound && selected) playEntrySound(selected.number);
  }, [selected, selectedId, sound]);

  useEffect(() => {
    if (!selectedId || !window.matchMedia("(min-width: 1040px)").matches) return;
    document.getElementById(`entry-${selectedId}`)?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 1039px)").matches;
    document.body.style.overflow = selected && narrow ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement;

      if (event.key === "/" && !typing && page === "bestiario") {
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
    setPage(next);
  };

  const openEntry = (id: string) => {
    setPage("bestiario");
    setSelectedId(id);
  };

  const patch = (partial: Partial<DexFilters>) => setFilters((current) => ({ ...current, ...partial }));
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

  const neighborSource = selected && visible.some((item) => item.id === selected.id) ? visible : sortCharacters([...characters], "numero");
  const neighborIndex = selected ? neighborSource.findIndex((item) => item.id === selected.id) : -1;
  const prev = neighborIndex > 0 ? neighborSource[neighborIndex - 1] : undefined;
  const next = neighborIndex >= 0 ? neighborSource[neighborIndex + 1] : undefined;
  const partyCharacters = party.map((id) => getCharacter(id)).filter((item): item is Character => Boolean(item));

  return (
    <>
      {page !== "home" && <div className="halo" aria-hidden="true" />}
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <div className={partyEnabled ? "page" : "page no-party"}>
        <div className={page === "home" ? "device is-plain" : "device"}>
          {page !== "home" && (
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
          {page === "lugares" && (
            <Room kicker="Geografia" title="Lugares">
              Regiões, cidades, portos e caminhos da Terra-média entram nesta sala. Ela ainda está vazia: os nomes e os caminhos vêm depois.
            </Room>
          )}
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
          {page === "sobre" && (
            <Room kicker="O arquivo" title="Sobre">
              O texto sobre esta enciclopédia entra nesta sala.
            </Room>
          )}
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
          {page === "bestiario" && (
          <>
          <Toolbar
            filters={filters}
            view={view}
            count={visible.length}
            total={characters.length}
            dirty={dirty}
            searchRef={searchRef}
            onChange={patch}
            onView={setView}
            onClear={clear}
            showParty={partyEnabled}
          />
          <div className={selected ? "workspace has-detail" : "workspace"}>
            <main id="conteudo">
              {visible.length === 0 ? (
                <div className="empty">
                  <p>
                    {filters.partyOnly && party.length === 0
                      ? "A comitiva ainda está vazia. Abra uma ficha e convoque um viajante."
                      : "Nenhum registro com esses filtros."}
                  </p>
                  {dirty && (
                    <button type="button" className="text-btn" onClick={clear}>Limpar filtros</button>
                  )}
                </div>
              ) : view === "grade" ? (
                <div className="grid">
                  {visible.map((character, index) => (
                    <DexCard
                      key={character.id}
                      character={character}
                      selected={character.id === selectedId}
                      inParty={partyEnabled && party.includes(character.id)}
                      index={index}
                      onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
                    />
                  ))}
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
                      onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
                    />
                  ))}
                </div>
              )}
            </main>
            {selected && (
              <Detail
                key={selected.id}
                character={selected}
                hasPrev={Boolean(prev)}
                hasNext={Boolean(next)}
                prevName={prev?.name}
                nextName={next?.name}
                inParty={party.includes(selected.id)}
                partyCount={party.length}
                showParty={partyEnabled}
                onClose={() => setSelectedId(null)}
                onPrev={() => prev && setSelectedId(prev.id)}
                onNext={() => next && setSelectedId(next.id)}
                onToggleParty={() => toggleParty(selected.id)}
                onOpen={setSelectedId}
              />
            )}
          </div>
          </>
          )}
          <footer className="colophon">
            <div className="colophon-brand">
              <img className="brand-mark" src="/mark.png" alt="" />
              <div>
                <p className="colophon-kicker">A Enciclopédia da Terra-média</p>
                <p className="colophon-title">Lord of the Rings</p>
              </div>
            </div>
            <nav className="colophon-links" aria-label="Informações do projeto">
              <button type="button" className="colophon-link" aria-current={page === "sobre" ? "page" : undefined} onClick={() => openPage("sobre")}>Sobre</button>
              <button type="button" className="colophon-link" aria-current={page === "creditos" ? "page" : undefined} onClick={() => openPage("creditos")}>Créditos</button>
              <button type="button" className="colophon-link" aria-current={page === "termos" ? "page" : undefined} onClick={() => openPage("termos")}>Termos de Uso</button>
              <button type="button" className="colophon-link" aria-current={page === "privacidade" ? "page" : undefined} onClick={() => openPage("privacidade")}>Políticas de privacidade</button>
            </nav>
            <p className="colophon-note">
              Projeto de fã para fã.
              <br />
              Sem vínculos com a Tolkien Estate <br /> ou a Middle-earth Enterprises.
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
