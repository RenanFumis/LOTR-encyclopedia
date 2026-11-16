"""Converte PNGs/JPGs pesados de public/ para WebP (mesmo caminho, extensão .webp).

Retratos já passam por update-portraits.py e são ignorados.
Ícones pequenos em flavicon/ também são ignorados.

Uso:
  python scripts/optimize-public-images.py
  python scripts/optimize-public-images.py --delete-originals
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

# Largura máxima por pasta (cards usam a mesma imagem da ficha).
MAX_WIDTH = {
    "lugares": 1400,
    "mapas": 2000,
    "criaturas-raca": 1200,
    "banner": 1920,
    "sobre": 1400,
    "_root": 1600,
}

QUALITY = 74
SKIP_DIRS = {"portraits", "flavicon"}


def max_width_for(path: Path) -> int:
    try:
        rel = path.relative_to(PUBLIC)
    except ValueError:
        return MAX_WIDTH["_root"]
    top = rel.parts[0] if len(rel.parts) > 1 else "_root"
    return MAX_WIDTH.get(top, MAX_WIDTH["_root"])


def should_skip(path: Path) -> bool:
    try:
        rel = path.relative_to(PUBLIC)
    except ValueError:
        return True
    if not rel.parts:
        return True
    if rel.parts[0] in SKIP_DIRS:
        return True
    return False


def convert_one(source: Path, delete_original: bool) -> str | None:
    if should_skip(source):
        return None

    destination = source.with_suffix(".webp")
    if destination.exists() and destination.stat().st_mtime >= source.stat().st_mtime:
        if delete_original and source.suffix.lower() in {".png", ".jpg", ".jpeg"}:
            source.unlink(missing_ok=True)
            return f"removido original: {source.relative_to(PUBLIC)}"
        return None

    image = Image.open(source)
    # Preserva alfa (ex.: mark/ring com fundo transparente + filtro CSS).
    # Fotos opacas seguem em RGB.
    has_alpha = image.mode in ("RGBA", "LA") or (
        image.mode == "P" and "transparency" in image.info
    )
    if has_alpha:
        image = image.convert("RGBA")
    else:
        image = image.convert("RGB")

    width = max_width_for(source)
    if image.width > width:
        ratio = width / image.width
        image = image.resize((width, max(1, int(image.height * ratio))), Image.Resampling.LANCZOS)

    destination.parent.mkdir(parents=True, exist_ok=True)
    # Lossless nos logos pequenos com alfa evita artefatos no invert/filter.
    if has_alpha and max(image.size) <= 800:
        image.save(destination, "WEBP", lossless=True, method=6)
    else:
        image.save(destination, "WEBP", quality=QUALITY, method=6)

    rel = source.relative_to(PUBLIC)
    before = source.stat().st_size
    after = destination.stat().st_size
    if delete_original:
        source.unlink(missing_ok=True)

    return f"{rel} → {destination.name} ({before // 1024} KB → {after // 1024} KB)"


def main() -> int:
    parser = argparse.ArgumentParser(description="Otimiza imagens de public/ para WebP.")
    parser.add_argument(
        "--delete-originals",
        action="store_true",
        help="Remove PNG/JPG após gerar o WebP (reduz o upload na HostGator).",
    )
    args = parser.parse_args()

    if not PUBLIC.exists():
        print(f"Pasta não encontrada: {PUBLIC}", file=sys.stderr)
        return 1

    sources = sorted(
        p
        for p in PUBLIC.rglob("*")
        if p.is_file() and p.suffix.lower() in {".png", ".jpg", ".jpeg"}
    )

    updated: list[str] = []
    for source in sources:
        result = convert_one(source, args.delete_originals)
        if result:
            updated.append(result)

    if updated:
        print(f"Atualizados ({len(updated)}):")
        for line in updated:
            print(f"  {line}")
    else:
        print("Nenhuma imagem nova. Os WebP já estavam atualizados.")

    total = sum(p.stat().st_size for p in PUBLIC.rglob("*") if p.is_file())
    print(f"Tamanho atual de public/: {total / (1024 * 1024):.1f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
