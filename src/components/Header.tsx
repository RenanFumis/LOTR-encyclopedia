interface HeaderProps {
  total: number;
  partyCount: number;
  showParty: boolean;
  sound: boolean;
  onToggleSound: () => void;
}

export function Header({ total, partyCount, showParty, sound, onToggleSound }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <img className="brand-mark" src="/mark.png" alt="" />
        <div>
          <p className="brand-kicker">
            A Enciclopédia da Terra-média
          </p>
          <h1>Lord of the Rings</h1>
          <p className="status">
            {String(total).padStart(3, "0")} REGISTROS
            {showParty ? ` · COMITIVA ${partyCount}/6` : ""}
          </p>
        </div>
      </div>
      <div className="header-actions">
        <button className="text-btn" type="button" aria-pressed={sound} onClick={onToggleSound}>
          {sound ? "Som ligado" : "Som mudo"}
        </button>
      </div>
    </header>
  );
}
