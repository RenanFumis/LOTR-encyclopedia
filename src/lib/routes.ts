export const pages = ["home", "bestiario", "racas", "criaturas", "catalogo", "lugares", "historia", "mapas", "sobre", "creditos", "termos", "privacidade"] as const;

export type PageId = (typeof pages)[number];

export interface Route {
  page: PageId;
  entryId: string | null;
  placeId: string | null;
}

export function readRoute(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const entry = path.match(/^\/registro\/([a-z0-9-]+)$/);
  if (entry) return { page: "catalogo", entryId: entry[1], placeId: null };
  const raceEntry = path.match(/^\/racas\/([a-z0-9-]+)$/);
  if (raceEntry) return { page: "racas", entryId: raceEntry[1], placeId: null };
  if (path === "/racas") return { page: "racas", entryId: null, placeId: null };
  const creatureEntry = path.match(/^\/criaturas\/([a-z0-9-]+)$/);
  if (creatureEntry) return { page: "criaturas", entryId: creatureEntry[1], placeId: null };
  if (path === "/criaturas") return { page: "criaturas", entryId: null, placeId: null };
  if (path === "/bestiario") return { page: "bestiario", entryId: null, placeId: null };
  if (path === "/catalogo") return { page: "catalogo", entryId: null, placeId: null };
  const place = path.match(/^\/lugares(?:\/([a-z]+)(?:\/([a-z]+))?)?$/);
  if (place) {
    const placeId = place[1] ? (place[2] ? `${place[1]}/${place[2]}` : place[1]) : null;
    return { page: "lugares", entryId: null, placeId };
  }
  if (path === "/historia") return { page: "historia", entryId: null, placeId: null };
  if (path === "/mapas") return { page: "mapas", entryId: null, placeId: null };
  if (path === "/sobre") return { page: "sobre", entryId: null, placeId: null };
  if (path === "/creditos") return { page: "creditos", entryId: null, placeId: null };
  if (path === "/termos") return { page: "termos", entryId: null, placeId: null };
  if (path === "/privacidade") return { page: "privacidade", entryId: null, placeId: null };
  return { page: "home", entryId: null, placeId: null };
}

export function routeHash(page: PageId, entryId: string | null, placeId: string | null = null): string {
  if (page === "catalogo") return entryId ? `#/registro/${entryId}` : "#/catalogo";
  if (page === "racas") return entryId ? `#/racas/${entryId}` : "#/racas";
  if (page === "criaturas") return entryId ? `#/criaturas/${entryId}` : "#/criaturas";
  if (page === "bestiario") return "#/bestiario";
  if (page === "lugares") return placeId ? `#/lugares/${placeId}` : "#/lugares";
  if (page === "home") return "#/";
  return `#/${page}`;
}
