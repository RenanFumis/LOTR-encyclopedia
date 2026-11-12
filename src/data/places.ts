export function placeImageSrc(path: string) {
  return `/lugares/${path.split("/").map(encodeURIComponent).join("/")}`;
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
    text: "Água do Despertar, no extremo leste da Terra-média, onde os Elfos abriram os olhos pela primeira vez. Não fica em Aman, mas foi dali que começou a Grande Jornada até Valinor.",
  },
  {
    id: "tol-eressea",
    name: "Tol Eressëa",
    image: "Aman_e_Valinor/Ilha_de_Tol_Eressea.png",
    text: "A Ilha Solitária, no Grande Mar, entre a Terra-média e Aman. Muitos Elfos fizeram dela a última escala antes de chegar ao Reino Abençoado.",
  },
  {
    id: "valinor",
    name: "Valinor",
    image: "Aman_e_Valinor/Valinor.png",
    text: "O Reino Abençoado dos Valar, a oeste do mar. Suas terras guardam a luz que os Elfos atravessaram o oceano para ver.",
  },
  {
    id: "taniquetil",
    name: "Taniquetil",
    image: "Aman_e_Valinor/Taniquetil.png",
    text: "A mais alta montanha de Arda, morada de Manwë e Varda. Do seu cume se contempla Valinor e o rumor distante do mundo.",
  },
  {
    id: "valmar",
    name: "Valmar",
    image: "Aman_e_Valinor/Valmar.png",
    text: "Cidade dos Valar, de cúpulas douradas no coração de Valinor. Ali os Poderes se reuniam nas festas da luz.",
  },
  {
    id: "ezellohar",
    name: "Ezellohar",
    image: "Aman_e_Valinor/Ezellohar.png",
    text: "Colina verde diante de Valmar, onde cresceram as Duas Árvores. A sua relva é lembrada como o coração da luz antiga.",
  },
  {
    id: "tirion",
    name: "Tirion sobre Túna",
    image: "Aman_e_Valinor/Tirionsobre_Tuna.png",
    text: "Cidade élfica no monte Túna, de muros brancos e da grande torre. Dali os Noldor olhavam a planície de Valinor.",
  },
  {
    id: "alqualonde",
    name: "Alqualondë",
    image: "Aman_e_Valinor/Alqualonde.png",
    text: "Porto dos Teleri na costa de Aman, famoso pelos navios brancos e pelas pérolas. O mar entra nos seus cais de pedra.",
  },
  {
    id: "formenos",
    name: "Formenos",
    image: "Aman_e_Valinor/Formenos.png",
    text: "Fortaleza dos Noldor no norte de Valinor, para onde Fëanor se retirou com as Silmarils, longe das festas de Valmar.",
  },
  {
    id: "lorellin",
    name: "Lago de Lórellin",
    image: "Aman_e_Valinor/Lagode_Lorellin.png",
    text: "Lago quieto nos jardins de Lórien, em Valinor. Nas suas margens Irmo e Estë guardam o descanso e os sonhos.",
  },
  {
    id: "mandos",
    name: "Salões de Mandos",
    image: "Aman_e_Valinor/Halls_of_Mandos.png",
    text: "Moradas de Námo no oeste de Valinor, onde os que partiram esperam em silêncio. São salões de memória longa, não de tormento.",
  },
];

const primeira: PlaceCard[] = [
  {
    id: "beleriand",
    name: "Beleriand",
    image: "primeira_era/Beleriand.png",
    text: "Vastas terras a oeste das Montanhas Azuis, palco da guerra contra Morgoth. No fim da Primeira Era o mar cobriu quase todo esse chão.",
  },
  {
    id: "hithlum",
    name: "Hithlum",
    image: "primeira_era/Hithlum.png",
    text: "Terra de névoas atrás das Montanhas de Sombra, domínio de Fingolfin. Das suas muralhas se vigiava o norte.",
  },
  {
    id: "ered-wethrin",
    name: "Ered Wethrin",
    image: "primeira_era/Ered_Wethrin.png",
    text: "As Montanhas de Sombra, muralha entre Hithlum e o resto de Beleriand. Poucos passos cruzavam os seus picos.",
  },
  {
    id: "dor-lomin",
    name: "Dor-lómin",
    image: "primeira_era/Dor_lomin.png",
    text: "Terra ao sul de Hithlum, depois entregue à Casa de Hador. Campos frios de um povo de Homens leal aos Elfos.",
  },
  {
    id: "dorthonion",
    name: "Dorthonion",
    image: "primeira_era/Dorthonion.png",
    text: "Altiplano de pinheiros no norte de Beleriand. Depois da ruína passou a ser chamado Taur-nu-Fuin, a floresta sob a noite.",
  },
  {
    id: "himring",
    name: "Himring",
    image: "primeira_era/Himring.png",
    text: "Colina da fortaleza de Maedhros, a mais firme da fronteira norte. O monte ficou acima das águas quando Beleriand afundou.",
  },
  {
    id: "thangorodrim",
    name: "Thangorodrim",
    image: "primeira_era/Thangorodrim.png",
    text: "Três picos de escória erguidos sobre Angband. A fumaça dessas torres cobria o norte de Beleriand.",
  },
  {
    id: "angband",
    name: "Angband",
    image: "primeira_era/Angband.png",
    text: "Fortaleza de Morgoth sob as montanhas de ferro. Dela saíam os exércitos que assolaram as terras livres.",
  },
  {
    id: "tol-sirion",
    name: "Tol Sirion",
    image: "primeira_era/Tol_Sirion.png",
    text: "Ilha no Sirion onde Finrod ergueu a torre da guarda. Mais tarde caiu sob Sauron e passou a ser chamada Tol-in-Gaurhoth.",
  },
  {
    id: "doriath",
    name: "Doriath",
    image: "primeira_era/Doriath.png",
    text: "Reino protegido pelo cinto de Melian, entre as florestas de Neldoreth e Region. Poucos atravessavam aquela fronteira sem licença.",
  },
  {
    id: "menegroth",
    name: "Menegroth",
    image: "primeira_era/Menegroth.png",
    text: "As Mil Cavernas, palácio de Thingol e Melian sob a floresta. Salões entalhados, pontes e lâmpadas de prata.",
  },
  {
    id: "nan-dungortheb",
    name: "Nan Dungortheb",
    image: "primeira_era/Nan_Dungortheb.png",
    text: "Vale sombrio entre Doriath e as Ered Gorgoroth, evitado pelos viajantes. As aranhas fizeram dele um caminho temido.",
  },
  {
    id: "nargothrond",
    name: "Nargothrond",
    image: "primeira_era/Nargothrond.png",
    text: "Fortaleza de Finrod nas cavernas do rio Narog. Portas ocultas guardavam um reino de ourives e guerreiros.",
  },
  {
    id: "tumladen",
    name: "Vale de Tumladen",
    image: "primeira_era/Vale_de_Tumladen.png",
    text: "Vale cercado de montanhas que escondia Gondolin. Só caminhos secretos ligavam a cidade ao resto de Beleriand.",
  },
  {
    id: "gondolin",
    name: "Gondolin",
    image: "primeira_era/Gondolin.png",
    text: "Cidade oculta de Turgon, de mármore branco e fontes. Permaneceu secreta até a traição abrir as suas portas.",
  },
  {
    id: "brethil",
    name: "Brethil",
    image: "primeira_era/Brethil.png",
    text: "Floresta dos Haladin, o povo de Haleth, entre o Teiglin e o Sirion. Árvores densas guardavam as suas clareiras.",
  },
  {
    id: "amon-rudh",
    name: "Amon Rûdh",
    image: "primeira_era/Amon_Rudh.png",
    text: "O Monte Calvo, ao sul de Brethil, morada dos Pequenos Anões. O cume era vermelho e sem árvores.",
  },
  {
    id: "falas",
    name: "Falas",
    image: "primeira_era/Falas.png",
    text: "Costas ocidentais de Beleriand, com os portos de Círdan em Brithombar e Eglarest. Dali os navios olhavam o Grande Mar.",
  },
  {
    id: "cirith-ninniach",
    name: "Cirith Ninniach",
    image: "primeira_era/Cirith_Ninniach.png",
    text: "A Fenda do Arco-Íris, passagem nas montanhas por onde a água do mar entrava. Por ela Tuor chegou às costas ocultas.",
  },
];

const segunda: PlaceCard[] = [
  {
    id: "numenor",
    name: "Númenor",
    image: "segunda_era/numenor.png",
    text: "Grande ilha dada aos Homens que lutaram contra Morgoth. Cresceu em saber e poder até a sombra e o mar a levarem.",
  },
  {
    id: "armenelos",
    name: "Armenelos",
    image: "segunda_era/Armenelos.png",
    text: "Cidade dos Reis, capital de Númenor, com a rua que subia até o Meneltarma. O trono ficava à sombra da montanha sagrada.",
  },
  {
    id: "meneltarma",
    name: "Meneltarma",
    image: "segunda_era/Meneltarma.png",
    text: "O Pilar do Céu, monte sagrado no meio da ilha. No cimo não havia templo: só o silêncio e a vista do mar.",
  },
  {
    id: "andunie",
    name: "Andúnië",
    image: "segunda_era/Andunie.png",
    text: "Porto nobre no oeste de Númenor, de onde os Fiéis olhavam para Tol Eressëa. Dali veio a linhagem que depois reinou em Gondor e Arnor.",
  },
  {
    id: "romenna",
    name: "Rómenna",
    image: "segunda_era/Romenna.png",
    text: "Porto do leste da ilha, voltado para a Terra-média. Muitos navios partiram dos seus cais rumo às costas do Leste.",
  },
  {
    id: "lindon",
    name: "Lindon",
    image: "segunda_era/Lindon.png",
    text: "Terras élficas a oeste das Montanhas Azuis, o que restou de Beleriand acima do mar. Gil-galad reinou ali na Segunda Era.",
  },
  {
    id: "mithlond",
    name: "Portos Cinzentos",
    image: "segunda_era/Portos_Cinzentos_Mithlond.png",
    text: "Mithlond, os portos de Círdan no Golfo de Lhûn. Navios élficos partiam dali para o Oeste.",
  },
  {
    id: "eregion",
    name: "Eregion",
    image: "segunda_era/Eregion.png",
    text: "Hollin, terra dos Noldor junto às Montanhas Sombrias, conhecida pelo azevinho. Ali foram forjados os Anéis do Poder.",
  },
  {
    id: "ost-in-edhil",
    name: "Ost-in-Edhil",
    image: "segunda_era/Ost_in_Edhil.png",
    text: "Cidade principal de Eregion e casa das guildas de ourives. Caiu na guerra entre Sauron e os Elfos.",
  },
  {
    id: "osgiliath",
    name: "Osgiliath",
    image: "segunda_era/Osgiliath.png",
    text: "Antiga capital de Gondor, sobre o Anduin, com uma grande ponte entre as duas margens. A cúpula das estrelas guardava uma das palantíri.",
  },
  {
    id: "osgiliath-2",
    name: "Osgiliath",
    image: "segunda_era/Osgiliath2.png",
    text: "Outra vista da cidade do rio, quando as torres ainda se espelhavam na água e a ponte ligava Minas Anor a Minas Ithil.",
  },
  {
    id: "minas-anor",
    name: "Minas Anor",
    image: "segunda_era/Minas_Anor.png",
    text: "A Torre do Sol, fundada no fim da Segunda Era aos pés do Mindolluin. Séculos depois passou a chamar-se Minas Tirith.",
  },
  {
    id: "minas-ithil",
    name: "Minas Ithil",
    image: "segunda_era/Minas_Ithil.png",
    text: "A Torre da Lua, gêmea de Minas Anor, voltada para Mordor. Na Terceira Era caiu e tornou-se Minas Morgul.",
  },
  {
    id: "barad-dur-segunda",
    name: "Barad-dûr",
    image: "segunda_era/Barad_dur.png",
    text: "A Torre Escura de Sauron, erguida em Mordor com o poder do Um Anel. Dominava a planície de Gorgoroth.",
  },
  {
    id: "umbar",
    name: "Umbar",
    image: "segunda_era/Umbar.png",
    text: "Porto do sul tomado pelos Númenórianos e, mais tarde, abrigo dos seus descendentes rebeldes. As suas frotas ameaçaram as costas de Gondor.",
  },
];

const terceira: PlaceCard[] = [
  {
    id: "condado",
    name: "O Condado",
    image: "terceira_era/O_Condado_The_Shire.png",
    text: "Terra verde dos Hobbits, de tocas, sebes e festas. Por muito tempo ficou à margem das grandes guerras.",
  },
  {
    id: "floresta-velha",
    name: "Floresta Velha",
    image: "terceira_era/Floresta_Velha.png",
    text: "Mata a leste do Condado, de árvores que não gostavam de forasteiros. Os caminhos dentro dela pareciam mudar de lugar.",
  },
  {
    id: "casa-bombadil",
    name: "Casa de Tom Bombadil",
    image: "terceira_era/Casa-de-Tom-Bombadil.png",
    text: "Morada de Tom e Fruta d'Ouro na orla da Floresta Velha. Uma casa de canto, luz e hospitalidade.",
  },
  {
    id: "colinas-tumulos",
    name: "Colinas dos Túmulos",
    image: "terceira_era/Tumulos_dos_Tumulos_Barrow_downs.png",
    text: "Colinas a leste da Floresta Velha, com os túmulos de reis antigos. Uma névoa fria costumava prender quem se perdia ali.",
  },
  {
    id: "bree",
    name: "Bree",
    image: "terceira_era/Bree.png",
    text: "Vila antiga no cruzamento das estradas, onde Hobbits e Homens dividiam a estalagem. O Pônei Saltitante era o seu ponto de encontro.",
  },
  {
    id: "valfenda",
    name: "Valfenda",
    image: "terceira_era/Valfenda_Rivendell.png",
    text: "Imladris, a casa de Elrond num vale oculto das Montanhas Sombrias. Conselho, cura e canção se reuniam ali.",
  },
  {
    id: "arvores-valinor",
    name: "As Duas Árvores de Valinor",
    image: "terceira_era/Arvores_de_Valinor.png",
    text: "Telperion e Laurelin iluminaram Valinor antes do Sol e da Lua. A sua luz atravessou as Eras nas Silmarils e na memória dos Elfos.",
  },
  {
    id: "vales-anduin",
    name: "Vales do Anduin",
    image: "terceira_era/Vales_do_Anduin.png",
    text: "Terras verdes ao longo do Grande Rio, entre as Montanhas Sombrias e a floresta. Povos, balsas e caminhos seguiam a água para o sul.",
  },
  {
    id: "argonath",
    name: "Portões de Argonath",
    image: "terceira_era/Portoes_de_Argonath.png",
    text: "Os Pilares dos Reis, figuras enormes de Isildur e Anárion esculpidas no Anduin. Marcavam a antiga fronteira norte de Gondor.",
  },
  {
    id: "amon-hen",
    name: "Amon Hen",
    image: "terceira_era/Amon-Hen.png",
    text: "A Colina da Visão, na margem do Anduin, junto às grandes cadeiras de pedra. Do seu cume o olhar alcançava muito longe.",
  },
  {
    id: "lothlorien",
    name: "Lothlórien",
    image: "terceira_era/Lothlorien.png",
    text: "Floresta dourada de mallorn, reino de Galadriel e Celeborn. Sob aquelas árvores o tempo parecia passar de outro modo.",
  },
  {
    id: "lothlorien-distante",
    name: "Lothlórien ao longe",
    image: "terceira_era/Lothlorien_distante.png",
    text: "A mesma floresta vista de longe: um clarão pálido entre as árvores do vale do Anduin.",
  },
  {
    id: "floresta-trevas",
    name: "Floresta das Trevas",
    image: "terceira_era/Floresta_das_Trevas_Mirkwood.png",
    text: "A grande floresta do norte, antes chamada Verde. Na Terceira Era uma sombra vinda do sul cobriu as suas trilhas.",
  },
  {
    id: "dol-guldur",
    name: "Dol Guldur",
    image: "terceira_era/Dol_Guldur.png",
    text: "Fortaleza no sul da Floresta das Trevas, onde a Sombra se escondeu por séculos. Dali a mata foi escurecendo.",
  },
  {
    id: "erebor",
    name: "Erebor",
    image: "terceira_era/Erebor.png",
    text: "A Montanha Solitária, reino dos Anões sob a pedra e o tesouro antigo. O Rio Rápido nascia das suas encostas.",
  },
  {
    id: "dale",
    name: "Valle",
    image: "terceira_era/Dale_Valle.png",
    text: "Dale, cidade dos Homens ao pé de Erebor, conhecida pelos sinos e pelo comércio. Renasceu depois da retomada da Montanha.",
  },
  {
    id: "lago-comprido",
    name: "Lago Comprido",
    image: "terceira_era/Lago_Comprido-Long_Lake.png",
    text: "O Long Lake, ao sul de Erebor, onde a Cidade do Lago se erguia sobre a água. O rio da Floresta e o Celduin se encontravam ali.",
  },
  {
    id: "esgaroth-cidade",
    name: "Cidade do Lago",
    image: "terceira_era/Cidade_do_Lago-Esgaroth.png",
    text: "Esgaroth, cidade de Homens construída sobre o Lago Comprido. O comércio com os Anões de Erebor passava pelos seus cais.",
  },
  {
    id: "gundabad",
    name: "Monte Gundabad",
    image: "terceira_era/Monte_Gundabad.png",
    text: "Pico no norte das Montanhas Sombrias, antigo lugar sagrado dos Anões e depois fortaleza dos orcs.",
  },
  {
    id: "khazad-dum",
    name: "Khazad-dûm",
    image: "terceira_era/Khazad_dum_Moria.png",
    text: "Moria, a grande mansão anã sob as Montanhas Sombrias. Pontes, salões e minas de mithril desciam a profundidades sem conta.",
  },
  {
    id: "khazad-dum-2",
    name: "Khazad-dûm",
    image: "terceira_era/Khazad_dum_Moria2.png",
    text: "Outra vista das mansões de Durin, das portas ocidentais às escadas que levavam às minas escuras.",
  },
  {
    id: "edoras",
    name: "Edoras",
    image: "terceira_era/Edoras.png",
    text: "Capital de Rohan, sobre o monte do Palácio Dourado de Meduseld. Os estandartes do cavalo branco voavam no vento.",
  },
  {
    id: "abismo-helm",
    name: "Abismo de Helm",
    image: "terceira_era/Abismo-de-Helm-Helms-Deep.png",
    text: "Forte de Rohan no desfiladeiro de Helm, atrás do Muro do Abismo. A cidadela do Rochedo da Trombeta guardava o oeste do reino.",
  },
  {
    id: "isengard-era",
    name: "Isengard",
    image: "terceira_era/Isengard_Angrenost.png",
    text: "Angrenost, o círculo de pedra no vale de Nan Curunír, com Orthanc no centro. Saruman fez dele a sua sede.",
  },
  {
    id: "minas-tirith",
    name: "Minas Tirith",
    image: "terceira_era/Minas_Tirith.png",
    text: "A cidade branca de Gondor, em sete níveis sobre o Mindolluin. Na Terceira Era foi a sede dos Regentes e, no fim, do Rei que voltou.",
  },
  {
    id: "pelennor",
    name: "Campos de Pelennor",
    image: "terceira_era/Campos_do_Pelennor.png",
    text: "A planície diante de Minas Tirith, entre a cidade e o rio. Foi o campo da grande batalha no fim da Terceira Era.",
  },
  {
    id: "pelennor-2",
    name: "Campos de Pelennor",
    image: "terceira_era/Campos_do_Pelennor2.png",
    text: "Outra vista da mesma planície, das ramificações do Anduin até os muros brancos da cidade.",
  },
  {
    id: "cirith-ungol-era",
    name: "Cirith Ungol",
    image: "terceira_era/Cirith_Ungol.png",
    text: "Passagem nas Montanhas de Sombra, acima de Minas Morgul. Uma torre de guarda vigiava o caminho para Mordor.",
  },
  {
    id: "morannon-era",
    name: "Portão Negro",
    image: "terceira_era/Portao_Negro_Morannon.png",
    text: "Morannon, a grande entrada do norte de Mordor, entre duas torres. Dentes de pedra fechavam a passagem.",
  },
  {
    id: "orodruin-era",
    name: "Montanha da Perdição",
    image: "terceira_era/Monteda_Perdicao_Orodruin.png",
    text: "Orodruin, o vulcão de Mordor onde o Um Anel foi forjado. Só nas suas fendas o Anel podia ser desfeito.",
  },
  {
    id: "mordor",
    name: "Mordor",
    image: "terceira_era/Mordor.png",
    text: "Terra negra atrás das Montanhas de Sombra e das Montanhas de Cinza. Planícies de cinza, fogo e a Torre Escura.",
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
    text: "A Torre Escura sobre Gorgoroth, fortaleza de Sauron. A sua fundação dependia do Um Anel.",
  },
];

export const placeEras: PlaceEra[] = [
  {
    id: "aman",
    title: "Aman e Valinor",
    lead: "Além do Grande Mar, a terra dos Valar e o Reino Abençoado que os Elfos buscaram.",
    paragraphs: [
      "Aman é a terra dos Valar, além do Grande Mar. Valinor, o Reino Abençoado, reúne as cidades, os montes e os salões que os Elfos buscaram depois da Grande Jornada.",
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
