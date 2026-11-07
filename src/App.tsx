import { useEffect, useMemo, useRef, useState } from "react";
import { Detail } from "./components/Detail";
import { DexCard, DexRow } from "./components/Entries";
import { Header } from "./components/Header";
import { PartyBar } from "./components/PartyBar";
import { Toolbar } from "./components/Toolbar";
import { characters, getCharacter } from "./data/characters";
import { entryIdFromHash, matchesQuery, sortCharacters } from "./lib/dex";
import { playEntrySound } from "./lib/sound";
import { readParty, readSound, readView, writeParty, writeSound, writeView } from "./lib/storage";
import type { Character, DexFilters, ViewMode } from "./types";

const partyEnabled = false;

const initialFilters: DexFilters = {
  query: "",
  race: "Todas",
  era: "Todas",
  rarity: "Todas",
  sort: "numero",
  partyOnly: false,
};

function initialId(): string | null {
  const id = entryIdFromHash(window.location.hash);
  return id && getCharacter(id) ? id : null;
}

export function App() {
  const [filters, setFilters] = useState<DexFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>(() => readView());
  const [selectedId, setSelectedId] = useState<string | null>(initialId);
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
      const id = entryIdFromHash(window.location.hash);
      setSelectedId(id && getCharacter(id) ? id : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (fromPop.current) {
      fromPop.current = false;
      return;
    }
    const hash = selectedId ? `#/registro/${selectedId}` : "#/";
    if (window.location.hash === hash || (hash === "#/" && window.location.hash === "")) return;
    window.history.pushState(null, "", hash);
  }, [selectedId]);

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

      if (event.key === "/" && !typing) {
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
  }, [filters.query, selectedId, visible]);

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
      <div className="halo" aria-hidden="true" />
      <a className="skip" href="#registros">Ir para os registros</a>
      <div className={partyEnabled ? "page" : "page no-party"}>
        <div className="device">
          <span className="screw tl" aria-hidden="true" />
          <span className="screw tr" aria-hidden="true" />
          <span className="screw bl" aria-hidden="true" />
          <span className="screw br" aria-hidden="true" />
          <Header
            total={characters.length}
            partyCount={party.length}
            showParty={partyEnabled}
            sound={sound}
            onToggleSound={() => setSound((value) => !value)}
          />
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
            <main id="registros">
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
          <footer className="colophon">
            <p>Desenvolvido por Meir Fumis.</p>
            <p>Projeto de fã, com finalidade de praticar desenvolvimento web, sem nenhum vínculo com a Tolkien Estate ou a Middle-earth Enterprises.</p>
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
