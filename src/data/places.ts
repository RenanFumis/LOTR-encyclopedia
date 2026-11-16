import { toWebpSrc } from "../lib/media";

export function placeImageSrc(path: string) {
  return toWebpSrc(`/lugares/${path.split("/").map(encodeURIComponent).join("/")}`);
}

export type PlaceCard = {
  id: string;
  name: string;
  image: string;
  text: string;
};

export type PlaceGroup = {
  id: string;
  title: string;
  text: string;
  places: PlaceCard[];
};

export type PlaceEra = {
  id: string;
  title: string;
  lead: string;
  paragraphs: string[];
  places?: PlaceCard[];
  groups?: PlaceGroup[];
};

export function eraPictures(era: PlaceEra): PlaceCard[] {
  return era.places ?? era.groups?.flatMap((group) => group.places) ?? [];
}

export type PlaceView =
  | { kind: "index" }
  | { kind: "era"; era: PlaceEra }
  | { kind: "group"; era: PlaceEra; group: PlaceGroup };

export function resolvePlace(placeId: string | null): PlaceView {
  if (!placeId) return { kind: "index" };
  const [eraId, groupSlug] = placeId.split("/");
  if (!eraId || placeId.split("/").length > 2) return { kind: "index" };
  const era = placeEras.find((item) => item.id === eraId);
  if (!era) return { kind: "index" };
  if (!groupSlug) return { kind: "era", era };
  const group = era.groups?.find((item) => item.id === `${era.id}-${groupSlug}`);
  if (!group) return { kind: "index" };
  return { kind: "group", era, group };
}

const aman: PlaceCard[] = [
  {
    id: "cuivienen",
    name: "Cuiviénen",
    image: "Aman_e_Valinor/Cuivienen.png",
    text: "Águas do Despertar, no extremo Oriente da Terra-média, onde os Quendi abriram os olhos sob as estrelas. Não fica em Aman, mas foi dali que começou a Grande Jornada até Valinor.",
  },
  {
    id: "tol-eressea",
    name: "Tol Eressëa",
    image: "Aman_e_Valinor/Ilha_de_Tol_Eressea.png",
    text: "A Ilha Solitária, primeiro balsa da Grande Jornada e depois lar dos Teleri na Baía de Eldamar. De Avallónë se olhava para Aman e, na Terceira Era, o Caminho Reto ainda a alcançava.",
  },
  {
    id: "valinor",
    name: "Valinor",
    image: "Aman_e_Valinor/Valinor.png",
    text: "Terra dos Valar em Aman, iluminada primeiro pelas Duas Árvores. Não é o continente inteiro: Eldamar e outras regiões têm identidade própria.",
  },
  {
    id: "taniquetil",
    name: "Taniquetil",
    image: "Aman_e_Valinor/Taniquetil.png",
    text: "A mais alta montanha de Arda, nas Pelóri. Em Ilmarin, no cume, habitam Manwë e Varda; aos pés da neve, a memória dos Vanyar.",
  },
  {
    id: "valmar",
    name: "Valmar",
    image: "Aman_e_Valinor/Valmar.png",
    text: "Cidade dos Valar, de cúpulas e sinos dourados. Diante de seus portões erguia-se Ezellohar, onde floresceram as Duas Árvores.",
  },
  {
    id: "ezellohar",
    name: "Ezellohar",
    image: "Aman_e_Valinor/Ezellohar.png",
    text: "Colina verde diante de Valmar, onde Yavanna e Nienna fizeram nascer Telperion e Laurelin. Dali veio a luz antiga — e o Escurecimento.",
  },
  {
    id: "tirion",
    name: "Tirion sobre Túna",
    image: "Aman_e_Valinor/Tirionsobre_Tuna.png",
    text: "Cidade branca na colina de Túna, em Calacirya. Mindon Eldaliéva e Galathilion marcam o alto; dali partiu o Exílio dos Noldor.",
  },
  {
    id: "alqualonde",
    name: "Alqualondë",
    image: "Aman_e_Valinor/Alqualonde.png",
    text: "Porto dos Cisnes na costa de Eldamar. Navios brancos, pérolas e o lugar do Primeiro Fratricídio entre os Elfos.",
  },
  {
    id: "formenos",
    name: "Formenos",
    image: "Aman_e_Valinor/Formenos.png",
    text: "Fortaleza do Norte em Valinor, erguida por Fëanor. Ali Finwë foi morto e as Silmarils foram roubadas por Melkor.",
  },
  {
    id: "lorellin",
    name: "Lago de Lórellin",
    image: "Aman_e_Valinor/Lagode_Lorellin.png",
    text: "Lago dos Sonhos nos jardins de Lórien, em Valinor. Em sua ilha Estë repousa; Irmo guarda as visões e o descanso.",
  },
  {
    id: "mandos",
    name: "Salões de Mandos",
    image: "Aman_e_Valinor/Halls_of_Mandos.png",
    text: "Salões da Espera no extremo oeste de Valinor. Námo julga e Vairë tece a memória; ali os espíritos élficos aguardam.",
  },
];

const primeira: PlaceCard[] = [
  {
    id: "beleriand",
    name: "Beleriand",
    image: "primeira_era/Beleriand.png",
    text: "Terras perdidas a oeste das Ered Luin. Reinos élficos, guerras contra Morgoth e, após a Guerra da Ira, o mar cobriu quase tudo.",
  },
  {
    id: "hithlum",
    name: "Hithlum",
    image: "primeira_era/Hithlum.png",
    text: "Terra das Névoas no noroeste de Beleriand. Domínio de Fingolfin e Fingon; Dor-lómin acolheu a Casa de Hador.",
  },
  {
    id: "ered-wethrin",
    name: "Ered Wethrin",
    image: "primeira_era/Ered_Wethrin.png",
    text: "Montanhas de Sombra ao sul e a leste de Hithlum. Dali nascem o Sirion e o Narog; sumiram com Beleriand.",
  },
  {
    id: "dor-lomin",
    name: "Dor-lómin",
    image: "primeira_era/Dor_lomin.png",
    text: "Terra da Casa de Hador, ao sul de Hithlum. Domínio de Hador, Galdor e Húrin; ali nasceu Túrin Turambar.",
  },
  {
    id: "dorthonion",
    name: "Dorthonion",
    image: "primeira_era/Dorthonion.png",
    text: "Terra dos Pinheiros no norte de Beleriand. Domínio de Angrod e Aegnor; após a Bragollach virou Taur-nu-Fuin.",
  },
  {
    id: "himring",
    name: "Himring",
    image: "primeira_era/Himring.png",
    text: "Colina Sempre Fria, fortaleza de Maedhros. Resistiu à Bragollach e, após a Guerra da Ira, tornou-se a ilha de Himling.",
  },
  {
    id: "thangorodrim",
    name: "Thangorodrim",
    image: "primeira_era/Thangorodrim.png",
    text: "Três picos de Morgoth sobre Angband. Ali Maedhros foi preso; Ancalagon os destruiu na Guerra da Ira.",
  },
  {
    id: "angband",
    name: "Angband",
    image: "primeira_era/Angband.png",
    text: "Inferno de Ferro sob as Ered Engrin. Centro do poder de Morgoth; Sauron a comandou antes do retorno do Senhor do Escuro.",
  },
  {
    id: "tol-sirion",
    name: "Tol Sirion",
    image: "primeira_era/Tol_Sirion.png",
    text: "Ilha da Torre de Vigia no Sirion. Finrod ergueu Minas Tirith; Sauron a tomou e a ilha passou a chamar-se Tol-in-Gaurhoth.",
  },
  {
    id: "doriath",
    name: "Doriath",
    image: "primeira_era/Doriath.png",
    text: "Reino dos Sindar sob Thingol e Melian. Cinturão encantado; florestas de Neldoreth, Region e Nivrim; capital em Menegroth.",
  },
  {
    id: "menegroth",
    name: "Menegroth",
    image: "primeira_era/Menegroth.png",
    text: "Mil Cavernas de Doriath. Capital subterrânea de Thingol e Melian junto ao Esgalduin; arte élfica e anã.",
  },
  {
    id: "nan-dungortheb",
    name: "Nan Dungortheb",
    image: "primeira_era/Nan_Dungortheb.png",
    text: "Vale da Morte Horrenda entre Doriath e as Ered Gorgoroth. Descendentes de Ungoliant; Beren o atravessou rumo a Doriath.",
  },
  {
    id: "nargothrond",
    name: "Nargothrond",
    image: "primeira_era/Nargothrond.png",
    text: "Fortaleza oculta do Narog. Reino de Finrod e Orodreth; caiu sob Glaurung após a mudança de estratégia sob Túrin.",
  },
  {
    id: "tumladen",
    name: "Vale de Tumladen",
    image: "primeira_era/Vale_de_Tumladen.png",
    text: "Vale oculto nas Echoriath, com Gondolin sobre Amon Gwareth. Distinto do Tumladen de Gondor.",
  },
  {
    id: "gondolin",
    name: "Gondolin",
    image: "primeira_era/Gondolin.png",
    text: "Rocha Oculta sobre Amon Gwareth. Reino de Turgon nas Echoriath; caiu após a traição de Maeglin.",
  },
  {
    id: "brethil",
    name: "Brethil",
    image: "primeira_era/Brethil.png",
    text: "Floresta dos Haladin entre o Teiglin e o Sirion. Refúgio do povo de Haleth; cenário final da história de Túrin.",
  },
  {
    id: "amon-rudh",
    name: "Amon Rûdh",
    image: "primeira_era/Amon_Rudh.png",
    text: "Monte Calvo ao sul de Brethil. Cavernas de Mîm; refúgio de Túrin e Beleg em Dor-Cúarthol.",
  },
  {
    id: "falas",
    name: "Falas",
    image: "primeira_era/Falas.png",
    text: "Costas de Círdan e dos Falathrim. Portos de Brithombar e Eglarest; tradição naval que chegou a Mithlond.",
  },
  {
    id: "cirith-ninniach",
    name: "Cirith Ninniach",
    image: "primeira_era/Cirith_Ninniach.png",
    text: "Fenda do Arco-Íris nas Ered Lómin. Portão dos Noldor; por ela Tuor deixou Hithlum rumo ao Grande Mar.",
  },
];

const segunda: PlaceCard[] = [
  {
    id: "numenor",
    name: "Númenor",
    image: "segunda_era/numenor.png",
    text: "Ilha dos Reis no Grande Mar. Reino dos Dúnedain de Elros a Ar-Pharazôn; submersa na Akallabêth.",
  },
  {
    id: "armenelos",
    name: "Armenelos",
    image: "segunda_era/Armenelos.png",
    text: "Cidade Dourada dos Reis em Arandor. Capital de Númenor junto ao Meneltarma; caiu na Akallabêth.",
  },
  {
    id: "meneltarma",
    name: "Meneltarma",
    image: "segunda_era/Meneltarma.png",
    text: "Pilar do Céu em Mittalmar. Santuário de Eru sem templo; cerimônias reais e depois silêncio sob Ar-Pharazôn.",
  },
  {
    id: "andunie",
    name: "Andúnië",
    image: "segunda_era/Andunie.png",
    text: "Porto do Poente em Andustar. Sede dos Senhores de Andúnië e dos Fiéis; linhagem de Elendil.",
  },
  {
    id: "romenna",
    name: "Rómenna",
    image: "segunda_era/Romenna.png",
    text: "Porto do Nascente em Arandor. Navegação à Terra-média; ali os Fiéis prepararam os nove navios.",
  },
  {
    id: "lindon",
    name: "Lindon",
    image: "segunda_era/Lindon.png",
    text: "Último vestígio de Beleriand a oeste das Ered Luin. Reino de Gil-galad; Portos Cinzentos de Círdan.",
  },
  {
    id: "mithlond",
    name: "Portos Cinzentos",
    image: "segunda_era/Portos_Cinzentos_Mithlond.png",
    text: "Mithlond no Golfo de Lhûn. Último caminho élfico para o Oeste, sob Círdan.",
  },
  {
    id: "eregion",
    name: "Eregion",
    image: "segunda_era/Eregion.png",
    text: "Hollin, terra do azevinho. Reino dos Noldor e dos Gwaith-i-Mírdain; ali nasceram os Anéis de Poder.",
  },
  {
    id: "ost-in-edhil",
    name: "Ost-in-Edhil",
    image: "segunda_era/Ost_in_Edhil.png",
    text: "Fortaleza dos Elfos em Eregion. Centro dos Gwaith-i-Mírdain; caiu em 1697 da Segunda Era.",
  },
  {
    id: "osgiliath",
    name: "Osgiliath",
    image: "segunda_era/Osgiliath.png",
    text: "Cidadela das Estrelas, primeira capital de Gondor sobre o Anduin. Cúpula das Estrelas e principal palantír do reino.",
  },
  {
    id: "minas-anor",
    name: "Minas Anor",
    image: "segunda_era/Minas_Anor.png",
    text: "Torre do Sol de Anárion aos pés do Mindolluin. Capital desde 1640; depois Minas Tirith.",
  },
  {
    id: "minas-ithil",
    name: "Minas Ithil",
    image: "segunda_era/Minas_Ithil.png",
    text: "Torre da Lua de Isildur em Ithilien. Conquistada pelos Nazgûl, tornou-se Minas Morgul.",
  },
  {
    id: "barad-dur-segunda",
    name: "Barad-dûr",
    image: "segunda_era/Barad_dur.png",
    text: "Torre Escura de Sauron em Gorgoroth. Alicerce ligado ao Um Anel; caiu de vez em 3019.",
  },
  {
    id: "umbar",
    name: "Umbar",
    image: "segunda_era/Umbar.png",
    text: "Grande porto de Harad. Fortaleza númenóreana, depois base dos Corsários contra Gondor.",
  },
];

const terceira: PlaceCard[] = [
  {
    id: "condado",
    name: "O Condado",
    image: "terceira_era/O_Condado_The_Shire.png",
    text: "Terra dos Hobbits em Eriador. Quartas, Bolsão e ponto de partida de Bilbo e Frodo.",
  },
  {
    id: "floresta-velha",
    name: "Floresta Velha",
    image: "terceira_era/Floresta_Velha.png",
    text: "Mata ancestral a leste da Terra dos Buques. Árvores de vontade própria; lar do Velho Salgueiro.",
  },
  {
    id: "casa-bombadil",
    name: "Casa de Tom Bombadil",
    image: "terceira_era/Casa-de-Tom-Bombadil.png",
    text: "Casa sob a colina, entre Floresta Velha e Túmulos. Refúgio de Tom e Fruta d'Ouro.",
  },
  {
    id: "colinas-tumulos",
    name: "Colinas dos Túmulos",
    image: "terceira_era/Tumulos_dos_Tumulos_Barrow_downs.png",
    text: "Tyrn Gorthad: sepulcros antigos e Espectros Tumulares. Ali os Hobbits receberam lâminas de Cardolan.",
  },
  {
    id: "bree",
    name: "Bree",
    image: "terceira_era/Bree.png",
    text: "Vila no cruzamento das estradas de Eriador. Homens e Hobbits; Pônei Saltitante e encontro com Passolargo.",
  },
  {
    id: "valfenda",
    name: "Valfenda",
    image: "terceira_era/Valfenda_Rivendell.png",
    text: "Imladris, a Última Casa Acolhedora. Refúgio de Elrond; Conselho e partida da Sociedade.",
  },
  {
    id: "arvores-valinor",
    name: "As Duas Árvores de Valinor",
    image: "terceira_era/Arvores_de_Valinor.png",
    text: "Telperion e Laurelin, luz dos Dias Antigos. Origem das Silmarils, do Sol, da Lua e das Árvores Brancas.",
  },
  {
    id: "vales-anduin",
    name: "Vales do Anduin",
    image: "terceira_era/Vales_do_Anduin.png",
    text: "As Terras do Grande Rio. Homens do Norte, Hobbits antigos, Éothéod e Beornianos; Campo Íris e a perda do Um Anel.",
  },
  {
    id: "argonath",
    name: "Portões de Argonath",
    image: "terceira_era/Portoes_de_Argonath.png",
    text: "Os Pilares dos Reis — Isildur e Anárion no Anduin, erguidos sob Rómendacil II na entrada de Nen Hithoel.",
  },
  {
    id: "amon-hen",
    name: "Amon Hen",
    image: "terceira_era/Amon-Hen.png",
    text: "A Colina da Visão — Sitial de Gondor em Nen Hithoel; Frodo, Boromir e a dissolução da Sociedade.",
  },
  {
    id: "lothlorien",
    name: "Lothlórien",
    image: "terceira_era/Lothlorien.png",
    text: "A Floresta Dourada — Galadriel, Celeborn e Nenya; Caras Galadhon, o Espelho e o fim da Terceira Era.",
  },
  {
    id: "floresta-trevas",
    name: "Floresta das Trevas",
    image: "terceira_era/Floresta_das_Trevas_Mirkwood.png",
    text: "A Antiga Grande Floresta Verde — Mirkwood, Dol Guldur e Eryn Lasgalen após a Guerra do Anel.",
  },
  {
    id: "dol-guldur",
    name: "Dol Guldur",
    image: "terceira_era/Dol_Guldur.png",
    text: "A Colina da Feitiçaria — Amon Lanc sob Sauron; Necromante, Conselho Branco e queda em 3019.",
  },
  {
    id: "erebor",
    name: "Erebor",
    image: "terceira_era/Erebor.png",
    text: "A Montanha Solitária — Reino sob a Montanha; Smaug, Thorin, Dáin e a Guerra do Anel no Norte.",
  },
  {
    id: "dale",
    name: "Valle",
    image: "terceira_era/Dale_Valle.png",
    text: "A Cidade dos Sinos — Dale aos pés de Erebor; Girion, Bard, Brand e a Guerra do Anel no Norte.",
  },
  {
    id: "lago-comprido",
    name: "Lago Comprido",
    image: "terceira_era/Lago_Comprido-Long_Lake.png",
    text: "As Águas ao Sul da Montanha Solitária — Long Lake, Esgaroth e a morte de Smaug.",
  },
  {
    id: "esgaroth-cidade",
    name: "Cidade do Lago",
    image: "terceira_era/Cidade_do_Lago-Esgaroth.png",
    text: "Esgaroth — A Cidade do Lago: comércio, Bard, Smaug e a reconstrução após 2941.",
  },
  {
    id: "gundabad",
    name: "Monte Gundabad",
    image: "terceira_era/Monte_Gundabad.png",
    text: "O Lugar do Despertar de Durin — ancestral dos Barbas-longas e, depois, reduto dos Orcs do Norte.",
  },
  {
    id: "khazad-dum",
    name: "Khazad-dûm",
    image: "terceira_era/Khazad_dum_Moria2.png",
    text: "As Mansões de Durin — mithril, Portas de Durin, Balin e a Ruína de Durin.",
  },
  {
    id: "edoras",
    name: "Edoras",
    image: "terceira_era/Edoras.png",
    text: "A Cidade do Salão Dourado — Meduseld, Théoden e a Casa de Eorl.",
  },
  {
    id: "abismo-helm",
    name: "Abismo de Helm",
    image: "terceira_era/Abismo-de-Helm-Helms-Deep.png",
    text: "A Fortaleza do Desfiladeiro — Hornburg, Helm e a Batalha do Abismo.",
  },
  {
    id: "isengard-era",
    name: "Isengard",
    image: "terceira_era/Isengard_Angrenost.png",
    text: "O Círculo de Orthanc — Angrenost, Saruman e a Marcha dos Ents.",
  },
  {
    id: "minas-tirith",
    name: "Minas Tirith",
    image: "terceira_era/Minas_Tirith.png",
    text: "A Cidade Branca de Gondor — Minas Anor, o Cerco e o retorno do Rei.",
  },
  {
    id: "pelennor",
    name: "Campos do Pelennor",
    image: "terceira_era/Campos_do_Pelennor.png",
    text: "As Planícies diante da Cidade Branca — Rammas Echor, Théoden e a Batalha de 3019.",
  },
  {
    id: "cirith-ungol-era",
    name: "Cirith Ungol",
    image: "terceira_era/Cirith_Ungol.png",
    text: "A Passagem da Aranha — Torech Ungol, Laracna e a Torre de Cirith Ungol.",
  },
  {
    id: "morannon-era",
    name: "Morannon",
    image: "terceira_era/Portao_Negro_Morannon.png",
    text: "O Portão Negro de Mordor — Cirith Gorgor, as Torres dos Dentes e a Batalha de 3019.",
  },
  {
    id: "orodruin-era",
    name: "Montanha da Perdição",
    image: "terceira_era/Monteda_Perdicao_Orodruin.png",
    text: "O Fogo onde o Um Anel foi Forjado — Orodruin, Sammath Naur e as Fendas da Perdição.",
  },
  {
    id: "mordor",
    name: "Mordor",
    image: "terceira_era/Mordor.png",
    text: "A Terra Negra — Gorgoroth, Núrn, Barad-dûr e a queda de Sauron.",
  },
];

const especiais: PlaceCard[] = [
  {
    id: "eriador",
    name: "Eriador",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Eriador.png",
    text: "Amplas terras entre as Montanhas Azuis e as Montanhas Sombrias. O Condado, Bree e as ruínas de Arnor ficam nesse chão.",
  },
  {
    id: "rhovanion",
    name: "Rhovanion",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Rhovanion.png",
    text: "As Terras Selvagens a leste do Anduin: floresta, lago, Valle e a Montanha Solitária. Muito do que se conta em O Hobbit acontece ali.",
  },
  {
    id: "montanhas-sombrias",
    name: "Montanhas Sombrias",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Montanhas Sombrias.png",
    text: "Hithaeglir, a cadeia que separa Eriador dos vales do Anduin. Moria, o Portão Vermelho e muitos passos cruzam os seus picos.",
  },
  {
    id: "amon-sul",
    name: "Amon Sûl",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Amon Sûl.png",
    text: "A Colina do Vento, onde se erguia a torre de vigia de Arnor. Uma palantír guardava dali as fronteiras do norte.",
  },
  {
    id: "annuminas",
    name: "Annúminas",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Annúminas.png",
    text: "Antiga capital de Arnor, à beira do Lago Vesperturvo. No fim da Terceira Era era sobretudo ruína e memória.",
  },
  {
    id: "fornost",
    name: "Fornost",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Fornost.png",
    text: "Norburgo, última capital de Arthedain. Depois da queda ficou conhecida como os Fossos dos Mortos.",
  },
  {
    id: "caradhras",
    name: "Caradhras",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Caradhras.png",
    text: "O Chifre Vermelho, o mais cruel dos três picos acima de Moria. Neve e vento fechavam a passagem no inverno.",
  },
  {
    id: "moria-especial",
    name: "Moria",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Moria.png",
    text: "Nome que as mansões de Khazad-dûm receberam quando a escuridão ocupou as minas. Os viajantes ainda falavam das portas e do lago diante delas.",
  },
  {
    id: "mazarbul",
    name: "Câmara de Mazarbul",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/CâmaradeMazarbul.png",
    text: "Sala dos Registros em Khazad-dûm, onde Balin fez a sua sede. Ali ficou o livro da colônia e o relato do seu fim.",
  },
  {
    id: "cavernas-cintilantes",
    name: "Cavernas Cintilantes",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/CavernasCintilantes.png",
    text: "Aglarond, cavernas atrás do Abismo de Helm, de pedra que brilha como gema. Gimli falou delas com assombro.",
  },
  {
    id: "carrock",
    name: "Carrock",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Carrock.png",
    text: "Grande rochedo no Anduin, ao norte dos Vales. Beorn o usava como marco, e os viajantes o reconheciam de longe.",
  },
  {
    id: "esgaroth-especial",
    name: "Esgaroth",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Esgaroth.png",
    text: "Outro nome da Cidade do Lago, mercado sobre as águas ao sul de Erebor. Os seus barcos ligavam Homens, Elfos e Anões.",
  },
  {
    id: "fangorn",
    name: "Fangorn",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Fangorn.png",
    text: "Floresta antiga dos Ents, no sul das Montanhas Sombrias. As árvores ali são velhas e não esquecem quem passa.",
  },
  {
    id: "caras-galadhon",
    name: "Caras Galadhon",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/CarasGaladhon.png",
    text: "Cidade das árvores no coração de Lothlórien, onde Galadriel e Celeborn tinham o seu salão. À noite as luzes subiam pelos mallorn.",
  },
  {
    id: "isengard-especial",
    name: "Isengard",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Isengard.png",
    text: "O anel de pedra no Nan Curunír, em volta da torre negra. Na Terceira Era o vale ganhou forjas e deixou de ser um jardim.",
  },
  {
    id: "orthanc",
    name: "Orthanc",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Orthanc.png",
    text: "Torre negra de quatro gumes no centro de Isengard, obra antiga que nem os Ents rachavam. No alto, Saruman guardava uma palantír.",
  },
  {
    id: "ithilien",
    name: "Ithilien",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Ithilien.png",
    text: "Jardim de Gondor entre o Anduin e as Montanhas de Sombra. Mesmo sob a ameaça vizinha, manteve bosques, fontes e caminhos ocultos.",
  },
  {
    id: "dol-amroth",
    name: "Dol Amroth",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Dol Amroth.png",
    text: "Principado à beira do mar, em Belfalas, de cisnes e cavaleiros. Os príncipes diziam ter sangue élfico nas suas linhas.",
  },
  {
    id: "pelargir",
    name: "Pelargir",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Pelargir.png",
    text: "Grande porto de Gondor no Anduin, fundado pelos Númenórianos Fiéis. Navios e estaleiros ligavam o reino ao mar do Sul.",
  },
  {
    id: "minas-morgul",
    name: "Minas Morgul",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Minas Morgul.png",
    text: "A antiga Minas Ithil, tomada pelos Nazgûl. A sua luz ficou pálida, e a cidade passou a vigiar o caminho para Mordor.",
  },
  {
    id: "torech-ungol",
    name: "Torech Ungol",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/TorechUngol.png",
    text: "Antro de Laracna, túneis sob Cirith Ungol. Uma passagem escura entre a torre de guarda e a terra de Mordor.",
  },
  {
    id: "morannon-especial",
    name: "Morannon",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Morannon.png",
    text: "O Portão Negro visto de frente, entrada norte de Mordor. Torres e muralhas fechavam a planície de Dagorlad.",
  },
  {
    id: "orodruin-especial",
    name: "Orodruin",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Orodruin.png",
    text: "A Montanha de Fogo no coração de Mordor. O seu despertar anunciava que o poder do Anel voltava a se mover.",
  },
  {
    id: "barad-dur-especial",
    name: "Barad-dûr",
    image: "terceira_era/Lugares especiais_e_misteriosos-terceira_era/Barad-dûr.png",
    text: "Lugbúrz sobre Gorgoroth. Mesma Torre Escura reconstruída; fundação ligada ao Um Anel.",
  },
];

export const placeEras: PlaceEra[] = [
  {
    id: "aman",
    title: "Aman e Valinor",
    lead: "Além do Grande Mar, a terra dos Valar e o Reino Abençoado que os Elfos buscaram.",
    paragraphs: [
      "Além do Grande Mar repousa Aman, a terra dos Valar. Em seu coração está Valinor, o Reino Abençoado, onde cidades élficas, montanhas sagradas e moradas ancestrais preservam a memória dos Dias Antigos.",
    ],
    places: aman,
  },
  {
    id: "primeira",
    title: "Primeira Era",
    lead: "Beleriand, os reinos élficos e as fortalezas da guerra contra Morgoth.",
    paragraphs: [
      "A Primeira Era do Sol teve o seu palco em Beleriand. Reinos élficos, fortalezas de Morgoth e refúgios dos Homens marcaram essa terra, depois coberta pelo mar.",
    ],
    places: primeira,
  },
  {
    id: "segunda",
    title: "Segunda Era",
    lead: "Númenor, a forja dos Anéis e os reinos fundados na Terra-média.",
    paragraphs: [
      "A Segunda Era viu o esplendor e a queda de Númenor, a forja dos Anéis em Eregion e a fundação dos grandes reinos dos Homens na Terra-média.",
    ],
    places: segunda,
  },
  {
    id: "terceira",
    title: "Terceira Era",
    lead: "A era de O Hobbit e de O Senhor dos Anéis, quando a Sombra volta a crescer.",
    paragraphs: [
      "A Terceira Era é o tempo em que a Sombra volta a crescer e os Povos Livres ainda guardam o que restou dos reinos antigos. Hobbits, Homens, Elfos e Anões atravessam o Condado, Valfenda, Rohan, Gondor e as terras do Leste, enquanto o Um Anel segue em segredo até a Montanha da Perdição.",
      "É a era de O Hobbit e de O Senhor dos Anéis: florestas que escurecem, cidades que resistem e caminhos que ligam o oeste ao leste. Nesta sala ela se divide em dois mapas.",
    ],
    groups: [
      {
        id: "terceira-lugares",
        title: "Lugares na Terceira Era",
        text: "Cidades, reinos, florestas e caminhos que deram forma à Terra-média nessa era.",
        places: terceira,
      },
      {
        id: "terceira-especiais",
        title: "Lugares Especiais e Misteriosos",
        text: "Recantos, ruínas e fortalezas que guardam um nome próprio dentro da mesma era.",
        places: especiais,
      },
    ],
  },
];
