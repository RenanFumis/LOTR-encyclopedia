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
      <div className="brand">
        <img className="brand-mark" src="/mark.png" alt="" />
        <div>
          <p className="brand-kicker">
            A Enciclopédia da Terra-média
          </p>
          <h1>Lord of the Rings</h1>
        </div>
      </div>
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
