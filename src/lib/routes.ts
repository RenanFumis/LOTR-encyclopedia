export const pages = ["home", "bestiario", "racas", "criaturas", "catalogo", "lugares", "historia", "mapas", "sobre", "creditos", "termos", "privacidade"] as const;

export type PageId = (typeof pages)[number];

export interface Route {
  page: PageId;
  entryId: string | null;
}

export function readRoute(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const entry = path.match(/^\/registro\/([a-z0-9-]+)$/);
  if (entry) return { page: "catalogo", entryId: entry[1] };
  const raceEntry = path.match(/^\/racas\/([a-z0-9-]+)$/);
  if (raceEntry) return { page: "racas", entryId: raceEntry[1] };
  if (path === "/racas") return { page: "racas", entryId: null };
  const creatureEntry = path.match(/^\/criaturas\/([a-z0-9-]+)$/);
  if (creatureEntry) return { page: "criaturas", entryId: creatureEntry[1] };
  if (path === "/criaturas") return { page: "criaturas", entryId: null };
  if (path === "/bestiario") return { page: "bestiario", entryId: null };
  if (path === "/catalogo") return { page: "catalogo", entryId: null };
  if (path === "/lugares") return { page: "lugares", entryId: null };
  if (path === "/historia") return { page: "historia", entryId: null };
  if (path === "/mapas") return { page: "mapas", entryId: null };
  if (path === "/sobre") return { page: "sobre", entryId: null };
  if (path === "/creditos") return { page: "creditos", entryId: null };
  if (path === "/termos") return { page: "termos", entryId: null };
  if (path === "/privacidade") return { page: "privacidade", entryId: null };
  return { page: "home", entryId: null };
}

export function routeHash(page: PageId, entryId: string | null): string {
  if (page === "catalogo") return entryId ? `#/registro/${entryId}` : "#/catalogo";
  if (page === "racas") return entryId ? `#/racas/${entryId}` : "#/racas";
  if (page === "criaturas") return entryId ? `#/criaturas/${entryId}` : "#/criaturas";
  if (page === "bestiario") return "#/bestiario";
  if (page === "home") return "#/";
  return `#/${page}`;
}
