import { Fragment, useEffect, useId, useRef, useState } from "react";
import type { PageId } from "../lib/routes";

const links: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "bestiario", label: "Bestiário" },
  { id: "lugares", label: "Lugares" },
  { id: "historia", label: "História de Arda" },
  { id: "mapas", label: "Mapas" },
];

export function Nav({ page, onOpen }: { page: PageId; onOpen: (page: PageId) => void }) {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 901px)");
    const close = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", close);
    return () => wide.removeEventListener("change", close);
  }, []);

  return (
    <div className={`nav-bar${open ? " is-open" : ""}`} ref={barRef}>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        <span className="nav-toggle-icon" aria-hidden="true" />
      </button>
      <nav id={menuId} className="site-nav" aria-label="Salas do arquivo">
        {links.map((link, index) => (
          <Fragment key={link.id}>
            {index > 0 && <span className="nav-dot" aria-hidden="true">·</span>}
            <button
              type="button"
              className="nav-link"
              aria-current={page === link.id || (link.id === "bestiario" && (page === "racas" || page === "criaturas")) ? "page" : undefined}
              onClick={() => {
                setOpen(false);
                onOpen(link.id);
              }}
            >
              {link.label}
            </button>
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
