import type { Character } from "../types";
import { portraits } from "../data/portraits";
import { raceTheme } from "../theme";
import { Sigil } from "./Sigil";

export function Medallion({
  character,
  size = 148,
  variant,
}: {
  character: Character;
  size?: number;
  variant: "card" | "detail" | "party" | "related";
}) {
  const theme = raceTheme[character.race];
  const portrait = portraits[character.id];
  const paintId = `${variant}-${character.id}-${size}`;
  const spin = (character.number * 17) % 360;

  return (
    <span className="medal" style={{ width: size, height: size }}>
      {portrait && (
        <img
          className="medal-photo"
          src={portrait}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      )}
      <svg className="medal-ring" width={size} height={size} viewBox="0 0 160 160" aria-hidden="true">
        {!portrait && (
          <defs>
            <radialGradient id={paintId} cx="38%" cy="32%" r="72%">
              <stop offset="0%" stopColor={theme.glow} />
              <stop offset="58%" stopColor={theme.deep} />
              <stop offset="100%" stopColor="#090807" />
            </radialGradient>
          </defs>
        )}
        <circle cx="80" cy="80" r="70" fill="none" stroke="#1a140e" strokeWidth="8" />
        <circle cx="80" cy="80" r="74" fill="none" stroke="#e6d0a3" strokeWidth="3" />
        <circle cx="80" cy="80" r="66" fill={portrait ? "none" : `url(#${paintId})`} stroke={theme.ink} strokeWidth="1.4" />
        <g transform={`rotate(${spin} 80 80)`} opacity={portrait ? 0.55 : 0.75}>
          {Array.from({ length: 24 }, (_, index) => {
            const angle = (index / 24) * Math.PI * 2;
            const inner = index % 3 === 0 ? 56 : 61;
            return (
              <line
                key={index}
                x1={80 + Math.cos(angle) * inner}
                y1={80 + Math.sin(angle) * inner}
                x2={80 + Math.cos(angle) * 66}
                y2={80 + Math.sin(angle) * 66}
                stroke={theme.ink}
                strokeWidth={index % 3 === 0 ? 1.7 : 0.8}
              />
            );
          })}
        </g>
        {!portrait && (
          <>
            <circle cx="80" cy="80" r="38" fill="#0c0b09" opacity="0.38" />
            <g transform="translate(56 56)" color={theme.ink}>
              <Sigil id={character.sigil} />
            </g>
            <ellipse cx="62" cy="50" rx="20" ry="9" fill="#fff8ea" opacity="0.16" />
          </>
        )}
        {character.anomalous && (
          <circle className="anomaly-ring" cx="80" cy="80" r="70" fill="none" stroke="#e39ad4" strokeWidth="1.4" strokeDasharray="3 6" />
        )}
      </svg>
    </span>
  );
}
