import { Nav } from "./Nav";
import type { PageId } from "../lib/routes";

interface HeaderProps {
  page: PageId;
  onOpen: (page: PageId) => void;
  showSound: boolean;
  sound: boolean;
  onToggleSound: () => void;
}

export function Header({ page, onOpen, showSound, sound, onToggleSound }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="brand">
        <button type="button" className="brand-home" onClick={() => onOpen("home")}>
          <img className="brand-mark" src="/mark.png" alt="" />
          <span>
            <span className="brand-kicker">A Enciclopédia da Terra-média</span>
            <span className="brand-name">Lord of the Rings</span>
          </span>
        </button>
      </h1>
      <Nav page={page} onOpen={onOpen} />
      {showSound && (
        <div className="header-actions">
          <button className="text-btn" type="button" aria-pressed={sound} onClick={onToggleSound}>
            {sound ? "Som ligado" : "Som mudo"}
          </button>
        </div>
      )}
    </header>
  );
}
