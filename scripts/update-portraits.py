"""Regenera public/portraits a partir das pastas em pictures/.

Só recria o WebP quando o arquivo original está mais novo que a cópia do site.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "public" / "portraits"

FOLDERS = {
    "humanos-atualizados": {
    "Earnur.png": "earnur",
    "Cirion.png": "cirion",
    "EorlOJovem.png": "eorl",
    "Brego.png": "brego",
    "HelmMao-de-Martelo.png": "helm",
    "Theoden.png": "theoden",
    "Theodred.png": "theodred",
    "Eomer.png": "eomer",
    "Hama.png": "hama",
    "GrimaLinguadeCobra.png": "grima",
    "Erkenbrand.png": "erkenbrand",
    "Deor.png": "deor",
    "BardooArqueiro.png": "bard",
    "Beorn.png": "beorn",
    "Beregond.png": "beregond",
    "Ghan-buri-Ghan.png": "ghan-buri-ghan",
    "ReiBruxodeAngmar.png": "witch-king",
    "Khamul.png": "khamul",
    "UlfangONegro.png": "ulfang",
    "HadorLorindol.png": "hador",
    "BeorOVelho.png": "beor",
    "marach.png": "marach",
    "GaldorDeDor-lomin.png": "galdor",
    "Baragund.png": "baragund",
    "Arvedui.png": "arvedui",
    "ArathornII.png": "arathorn",
    "Halbarad.png": "halbarad",
    "Brand.png": "brand",
    "Girion.png": "girion",
    "Thengel.png": "thengel",
    "Frealaf.png": "frealaf",
    "Herumor.png": "herumor",
    "Fuinur.png": "fuinur",
    "IdrilCelebrindal.png": "idril",
    "NienorNiniel.png": "nienor",
    "Haleth.png": "haleth",
    "MorwenEledhwen.png": "morwen",
    "Tar-Ancalime.png": "ancalime",
    "Tar-Miriel.png": "miriel",
    "Andreth.png": "andreth",
    "Erendis.png": "erendis",
    "Tar-Vanimelde.png": "vanimelde",
    "Eowyn.png": "eowyn",
    "Ioreth.png": "ioreth",
    "FinduilasDeDolAmroth.png": "finduilas",
    "Lothiriel.png": "lothiriel",
    "HurinThalion.png": "hurin",
    "TurinTurambar.png": "turin",
    "BerenErchamion.png": "beren",
    "Tuor.png": "tuor",
    "Barahir.png": "barahir",
    "Huor.png": "huor",
    "Aldarion.png": "aldarion",
    "Tar-Telperien.png": "telperien",
    "Ar-Adunakhor.png": "adunakhor",
    "Ar-Pharazon.png": "pharazon",
    "Amandil.png": "amandil",
    "Elendil.png": "elendil",
    "Isildur.png": "isildur",
    "Anarion.png": "anarion",
    "AragornIIElessar.png": "aragorn",
    "Boromir.png": "boromir",
    "Faramir.png": "faramir",
    "DenethorII.png": "denethor",
    },
    "anoes-atualizados": {
        "Azaghal.png": "azaghal",
        "Balin.png": "balin",
        "Bifur.png": "bifur",
        "Bofur.jpg": "bofur",
        "Bombur.png": "bombur",
        "Dori.png": "dori",
        "Durin.png": "durin",
        "Dwalin.png": "dwalin",
        "DáinPé-de-Ferro.png": "dain",
        "Fili.png": "fili",
        "Gimli.png": "gimli",
        "Gloin.png": "gloin",
        "Kili.png": "kili",
        "Mim.png": "mim",
        "Narvi.png": "narvi",
        "Nori.png": "nori",
        "Oin.png": "oin",
        "Ori.png": "ori",
        "Telchar.png": "telchar",
        "ThorinEscudo-de-Carvalho.png": "thorin",
        "ThrainIIAzanulbizar.png": "thrain",
        "Thror.png": "thror",
    },
    "Hobbit-atualizados": {
        "BandobrasTuk.png": "bandobras",
        "BilboBolseiro.png": "bilbo",
        "DiamonddeLongCleeve.jpg": "diamond",
        "DrogoBolseiro.png": "drogo",
        "ElanorGardner.jpg": "elanor",
        "FarmerMaggot.png": "maggot",
        "FredegarBolge.png": "fredegar",
        "Frodo.png": "frodo",
        "GerontiusTuk.png": "gerontius",
        "GorbadocBrandebuque.png": "gorbadoc",
        "LobeliaSackville-Baggins.png": "lobelia",
        "LothoSackville-Baggins.jpg": "lotho",
        "MerryBrandebuque.png": "merry",
        "PaladinTukII.jpg": "paladin",
        "PeregrinTook.png": "pippin",
        "Pr__mula_Brandigamo_687fbb891a779.png": "primula",
        "SamwiseGamgee.png": "sam",
        "Gollum.png": "gollum",
        "Smeagol.png": "smeagol",
        "TedSandyman.png": "ted-sandyman",
        "WillWhitfoot.png": "will-whitfoot",
    },
    "Aguias-atualizado": {
        "Gwaihir.png": "gwaihir",
        "Landroval.png": "landroval",
        "Meneldor.png": "meneldor",
        "Thorondor.png": "thorondor",
    },
    "Aranhas-atualizado": {
        "Laracna.png": "shelob",
        "Ungoliant.png": "ungoliant",
    },
    "Beorniano-atualizado": {
        "GrimbeornOVelho.png": "grimbeorn",
    },
    "Dragao-atualizado": {
        "Ancalagon.png": "ancalagon",
        "Glaurung.png": "glaurung",
        "Gostir.png": "gostir",
        "GreatCold-drake.png": "great-cold-drake",
        "Lhamthanc.png": "lhamthanc",
        "Scatha.png": "scatha",
        "Smaug.png": "smaug",
    },
    "Enigma-atualizado": {
        "CoisasSemNome.png": "nameless-things",
        "FrutadOuro.png": "goldberry",
        "TomBombadil.png": "tom-bombadil",
        "VigiaNaAgua.png": "watcher",
    },
    "Maia-atualizado": {
        "Alatar.png": "alatar",
        "Arien.png": "arien",
        "Eonwe.png": "eonwe",
        "FlageloDeDurin.png": "balrog",
        "Gandalf.png": "gandalf",
        "Gothmog.png": "gothmog",
        "Ilmare.png": "ilmare",
        "Melian.png": "melian",
        "Osse.png": "osse",
        "Pallando.png": "pallando",
        "Radagast.png": "radagast",
        "Salmar.png": "salmar",
        "Saruman.png": "saruman",
        "Sauron.png": "sauron",
        "Tilion.png": "tilion",
        "Uinen.png": "uinen",
    },
    "Mearas-atualizado": {
        "Arod.png": "arod",
        "Felarof.png": "felarof",
        "Hasufel.png": "hasufel",
        "Shadowfax.png": "shadowfax",
    },
    "meio-elfos-atualizado": {
        "Arwen.png": "arwen",
        "Dior_Eluch.png": "dior",
        "EarendiltheMariner.png": "earendil",
        "Elena_Kukanova_-_Elwing.png": "elwing",
        "Elladan.png": "elladan",
        "Elrohir.png": "elrohir",
        "Elrond.png": "elrond",
        "ElrosTar-Minyatur.png": "elros",
        "Elured.png": "elured",
        "Elurin.png": "elurin",
        "Galador.png": "galador",
        "Gilmith.png": "gilmith",
        "LuthienTinuviel.png": "luthien",
    },
    "Nazgul-atualizado": {
        "Nazguls.png": "nazgul-iii-ix",
    },
    "elfos-atualizados": {
        "Celeborn.png": "celeborn",
        "Celebrimbor.png": "celebrimbor",
        "Feanor.png": "feanor",
        "FinrodFelagund.png": "finrod",
        "Galadriel.png": "galadriel",
        "Gil-Galad.png": "gil-galad",
        "Glorfindel.png": "glorfindel",
        "Legolas.png": "legolas",
        "Thingol.png": "thingol",
        "TurgondeGondolin.png": "turgon",
    },
    "Ent-atualizado": {
        "Barbarvore.png": "treebeard",
        "Beechbone.png": "beechbone",
        "Leaflock.png": "finglas",
        "Quickbeam.png": "bregalad",
        "Skinbark.png": "fladrif",
        "Wandlimb.png": "fimbrethil",
    },
}


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    updated: list[str] = []
    missing: list[str] = []

    for folder, files in FOLDERS.items():
        source_dir = ROOT / "pictures" / folder
        for filename, character_id in files.items():
            convert(source_dir / filename, character_id, updated, missing)

    if updated:
        print("Atualizados: " + ", ".join(updated))
    else:
        print("Nenhuma imagem nova. Os arquivos já estão iguais às cópias do site.")
    if missing:
        print("Não achei: " + ", ".join(missing))


def convert(source: Path, character_id: str, updated: list[str], missing: list[str]) -> None:
    if not source.exists():
        missing.append(source.name)
        return
    destination = TARGET / f"{character_id}.webp"
    if destination.exists() and destination.stat().st_mtime >= source.stat().st_mtime:
        return
    image = Image.open(source).convert("RGB")
    image.thumbnail((400, 400), Image.Resampling.LANCZOS)
    image.save(destination, "WEBP", quality=68, method=6)
    updated.append(character_id)


if __name__ == "__main__":
    main()
