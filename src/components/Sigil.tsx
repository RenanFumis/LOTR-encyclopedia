import type { ReactNode } from "react";
import type { SigilId } from "../types";

const SHAPES: Record<SigilId, ReactNode> = {
  ring: (
    <>
      <circle cx="24" cy="26" r="9" />
      <path d="M24 13 l2.2 4.2 l-2.2 1.2 l-2.2 -1.2 z" fill="currentColor" stroke="none" />
    </>
  ),
  leaf: (
    <>
      <path d="M24 40 C24 40 12 28 15 16 C18 9 24 8 24 8 C24 8 30 9 33 16 C36 28 24 40 24 40 Z" />
      <path d="M24 38 V16" />
    </>
  ),
  horn: (
    <>
      <path d="M14 36 C16 20 28 14 38 12" />
      <path d="M14 36 c8 -2 10 -10 7 -16" />
      <path d="M12 34 h6" />
    </>
  ),
  mug: (
    <>
      <path d="M15 16 h14 v12 a7 7 0 0 1 -14 0 z" />
      <path d="M29 20 h4 a4 4 0 0 1 0 8 h-4" />
    </>
  ),
  book: (
    <>
      <path d="M11 14 h11 v22 H11 z" />
      <path d="M26 14 h11 v22 H26 z" />
      <path d="M24 14 v22" />
    </>
  ),
  staff: (
    <>
      <path d="M24 42 V16" />
      <path d="M24 12 l5 4 l-2 6 h-6 l-2 -6 z" />
    </>
  ),
  sword: (
    <>
      <path d="M24 6 v26" />
      <path d="M17 32 h14" />
      <path d="M24 32 v8" />
      <path d="M21 10 l3 -5 l3 5" />
    </>
  ),
  bow: (
    <>
      <path d="M18 8 C8 24 8 24 18 40" />
      <path d="M18 8 v32" />
      <path d="M18 24 h16" />
      <path d="M30 20 l4 4 l-4 4" />
    </>
  ),
  axe: (
    <>
      <path d="M22 42 V16" />
      <path d="M22 18 c8 -8 16 0 12 8 c-2 6 -12 6 -12 0" />
    </>
  ),
  shield: (
    <>
      <path d="M24 8 L38 14 V26 C38 36 24 42 24 42 C24 42 10 36 10 26 V14 Z" />
      <path d="M24 16 V34" />
      <path d="M18 24 h12" />
    </>
  ),
  hand: (
    <>
      <path d="M18 30 v-8" />
      <path d="M22 28 V14" />
      <path d="M26 28 V14" />
      <path d="M30 30 v-8" />
      <path d="M16 30 c0 8 4 12 8 12 h6 c4 0 6 -4 6 -8 v-4" />
    </>
  ),
  tree: (
    <>
      <path d="M24 42 V26" />
      <path d="M24 28 C14 28 12 16 24 12 C36 16 34 28 24 28 Z" />
      <path d="M20 36 h8" />
    </>
  ),
  star: <path d="M24 7 L27.5 18 H39 L29.5 25 L33 36 L24 29.5 L15 36 L18.5 25 L9 18 H20.5 Z" />,
  evenstar: <path d="M24 8 L28 20 L40 24 L28 28 L24 40 L20 28 L8 24 L20 20 Z" />,
  circlet: (
    <>
      <ellipse cx="24" cy="26" rx="12" ry="5" />
      <path d="M12 26 v4 M36 26 v4" />
      <path d="M24 18 v5 M18 20 l2 4 M30 20 l-2 4" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="6" />
      <path d="M24 8 v5 M24 35 v5 M8 24 h5 M35 24 h5" />
      <path d="M12 12 l3.5 3.5 M32.5 32.5 L36 36 M36 12 l-3.5 3.5 M12 36 l3.5 -3.5" />
    </>
  ),
  tower: (
    <>
      <path d="M18 40 V18 L24 10 L30 18 V40" />
      <path d="M14 40 h20" />
      <path d="M21 26 h6 M21 32 h6" />
    </>
  ),
  bird: (
    <>
      <path d="M6 30 C14 16 20 16 24 24 C28 16 34 16 42 30" />
      <path d="M24 24 v10" />
      <path d="M20 34 h8" />
    </>
  ),
  eye: (
    <>
      <path d="M6 24 C12 14 36 14 42 24 C36 34 12 34 6 24 Z" />
      <circle cx="24" cy="24" r="4" />
    </>
  ),
  wraith: (
    <>
      <path d="M14 22 a10 10 0 0 1 20 0 v14 l-5 -4 l-5 4 l-5 -4 l-5 4 z" />
      <circle cx="20" cy="22" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="28" cy="22" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  flame: (
    <path
      d="M24 42 c8 0 12 -6 10 -14 c-2 2 -5 2 -7 -2 c-1 6 -6 6 -8 1 c-4 6 -8 5 -8 1 c-5 8 3 14 13 14 z"
      fill="currentColor"
      stroke="none"
    />
  ),
  spider: (
    <>
      <ellipse cx="24" cy="28" rx="6" ry="5" />
      <circle cx="24" cy="18" r="3.2" />
      <path d="M19 22 L8 14 M18 26 H6 M19 30 L8 38" />
      <path d="M29 22 L40 14 M30 26 H42 M29 30 L40 38" />
    </>
  ),
  whisper: (
    <>
      <path d="M10 18 h16 v12 H18 l-8 6 z" />
      <path d="M32 18 c6 4 6 12 0 16" />
      <path d="M36 14 c8 6 8 18 0 24" />
    </>
  ),
  crown: (
    <>
      <path d="M10 34 h28" />
      <path d="M12 34 L15 16 L20 26 L24 12 L28 26 L33 16 L36 34" />
    </>
  ),
  helm: (
    <>
      <path d="M10 28 v-6 a14 14 0 0 1 28 0 v6" />
      <path d="M10 28 h28 v6 H10 z" />
      <path d="M24 16 v18" />
    </>
  ),
  spear: (
    <>
      <path d="M24 44 V18" />
      <path d="M24 8 l6 10 h-12 z" fill="currentColor" />
    </>
  ),
  branch: (
    <>
      <path d="M12 38 C22 28 26 20 36 10" />
      <path d="M22 30 c8 -2 10 -8 10 -8" />
      <path d="M28 22 c8 0 10 -6 10 -6" />
      <circle cx="36" cy="10" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  throne: (
    <>
      <path d="M14 40 h20" />
      <path d="M16 40 V18 h16 v22" />
      <path d="M16 24 h16" />
      <path d="M18 18 V12 h12 v6" />
    </>
  ),
  ent: (
    <>
      <circle cx="24" cy="14" r="4" />
      <path d="M24 18 v10" />
      <path d="M24 24 L12 38 M24 24 L36 38" />
      <path d="M18 22 L10 14 M30 22 L38 14" />
      <path d="M21 13 h1.5 M26 13 h1.5" />
    </>
  ),
  mountain: <path d="M4 38 L18 16 L24 26 L32 10 L44 38 Z" />,
  arrow: (
    <>
      <path d="M10 38 L34 14" />
      <path d="M22 12 h14 v14" />
    </>
  ),
  dragon: (
    <>
      <path d="M8 32 C16 18 22 18 26 24 C30 14 40 14 42 22 C36 24 36 30 40 32 C32 34 26 30 22 34 C16 38 10 36 8 32 Z" />
      <path d="M38 20 l4 -6" />
    </>
  ),
  paw: (
    <>
      <circle cx="15" cy="16" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="12" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="33" cy="16" r="3.2" fill="currentColor" stroke="none" />
      <ellipse cx="24" cy="29" rx="9" ry="7" fill="currentColor" stroke="none" />
    </>
  ),
  eagle: (
    <>
      <path d="M24 30 C8 26 6 16 8 12 c8 3 12 8 16 12 c4 -4 8 -9 16 -12 c2 4 0 14 -16 18 z" />
      <path d="M24 28 v8" />
    </>
  ),
  horseshoe: (
    <>
      <path d="M16 18 v12 c0 8 16 8 16 0 V18" />
      <path d="M16 16 v-4 M32 16 v-4" />
    </>
  ),
  banner: (
    <>
      <path d="M16 6 v36" />
      <path d="M16 10 h18 l-5 7 l5 7 H16" />
    </>
  ),
  blade: (
    <>
      <path d="M20 42 h8" />
      <path d="M24 42 V28" />
      <path d="M17 28 h14" />
      <path d="M22 28 L28 8" />
      <path d="M28 8 l4 7" />
    </>
  ),
  gem: (
    <>
      <path d="M16 18 h16 l6 8 l-14 14 L10 26 z" />
      <path d="M16 18 l8 8 l8 -8" />
      <path d="M10 26 h28" />
      <path d="M24 26 v14" />
    </>
  ),
  moon: <path d="M30 10 a14 14 0 1 0 0 28 a11 11 0 1 1 0 -28 z" fill="currentColor" stroke="none" />,
  ship: (
    <>
      <path d="M6 30 h36 l-5 8 H12 z" />
      <path d="M24 30 V12" />
      <path d="M24 14 h14 L24 26" />
    </>
  ),
  flower: (
    <>
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      <circle cx="24" cy="13" r="4.2" />
      <circle cx="24" cy="35" r="4.2" />
      <circle cx="13" cy="24" r="4.2" />
      <circle cx="35" cy="24" r="4.2" />
    </>
  ),
};

export function Sigil({ id }: { id: SigilId }) {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {SHAPES[id]}
      </g>
    </svg>
  );
}
