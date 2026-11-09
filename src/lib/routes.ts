export const pages = ["home", "bestiario", "lugares", "historia", "mapas", "sobre", "creditos", "termos", "privacidade"] as const;

export type PageId = (typeof pages)[number];

export interface Route {
  page: PageId;
  entryId: string | null;
}

export function readRoute(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const entry = path.match(/^\/registro\/([a-z0-9-]+)$/);
  if (entry) return { page: "bestiario", entryId: entry[1] };
  if (path === "/bestiario") return { page: "bestiario", entryId: null };
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
  if (page === "bestiario") return entryId ? `#/registro/${entryId}` : "#/bestiario";
  if (page === "home") return "#/";
  return `#/${page}`;
}
