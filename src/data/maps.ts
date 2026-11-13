export type RegionMap = {
  id: string;
  name: string;
  image: string;
  eras: string[];
  epithet: string;
  text: string;
  books: string[];
  region: string[];
  events: string[];
};

export function mapImageSrc(file: string) {
  return `/mapas/${encodeURIComponent(file)}`;
}

export const regionMaps: RegionMap[] = [
  {
    id: "arda",
    name: "Arda",
    image: "Arda.png",
    eras: ["Anos das Árvores", "Primeira Era", "Segunda Era"],
    epithet: "O mundo numa folha",
    text: "O mundo inteiro numa folha só: Aman a oeste, Númenor no mar e a Terra-média no centro, cercados pelo Mar de Ekkaia.",
    books: ["O Silmarillion", "Contos Inacabados"],
    region: [
      "Arda é o mundo. Esta folha o desenha ainda redondo e alcançável: o Reino Abençoado fica a oeste do Belegaer, Númenor é uma ilha no meio do mar, e a Terra-média ocupa o centro, com Harad ao sul e Rhûn a leste.",
      "É um mapa de antes da grande mudança. Depois da queda de Númenor, Aman foi tirado dos círculos do mundo e a ilha deixou de existir. As eras seguintes já não cabem neste desenho.",
    ],
    events: [
      "Os Valar habitaram primeiro o meio do mundo e depois se recolheram a Aman. As Duas Árvores iluminaram Valinor, e a luz delas atravessou o mar nas Silmarils.",
      "Na Primeira Era, Beleriand, que esta folha não detalha, foi o palco da guerra contra Morgoth e acabou coberta pelo mar.",
      "Na Segunda Era a ilha de Númenor foi erguida para os Homens. No fim dessa era ela foi engolida, e o caminho reto para Aman deixou de ser um caminho de navio comum.",
    ],
  },
  {
    id: "aman",
    name: "Aman e Valinor",
    image: "MapadeAmaneValinor.png",
    eras: ["Anos das Árvores", "Primeira Era"],
    epithet: "O Reino Abençoado",
    text: "A terra dos Valar além das Pelóri, com as Duas Árvores, Taniquetil e as cidades dos Elfos que completaram a Grande Jornada. A folha traz no título a Primeira Era.",
    books: ["O Silmarillion"],
    region: [
      "Aman é a terra a oeste do mar. Valinor, guardada pelas montanhas Pelóri, reúne Valmar, as cidades élficas e os jardins dos Valar. Taniquetil é a morada de Manwë e Varda. Alqualondë é o porto dos Teleri, e Formenos foi o retiro de Fëanor no norte.",
      "O título da folha diz Primeira Era. A luz que a desenha é mais antiga: Telperion e Laurelin brilharam nos Anos das Árvores, antes do Sol. O Lórien deste mapa é o jardim de Irmo, não a floresta do Anduin.",
    ],
    events: [
      "Os Elfos que aceitaram o chamado de Oromë atravessaram o mar e fundaram Tirion e Alqualondë. Cuiviénen, de onde saíram, não fica nesta terra.",
      "Fëanor fez as Silmarils com a luz das Árvores. Depois da escuridão de Valinor, os Noldor partiram para a Terra-média. O porto de Alqualondë entrou nessa partida, e a ficha não descreve o assalto.",
      "Valinor permaneceu além do mar durante a Primeira Era. Só no fim da Segunda Era o caminho comum até ela foi fechado.",
    ],
  },
  {
    id: "beleriand",
    name: "Beleriand",
    image: "Beleriand.png",
    eras: ["Primeira Era"],
    epithet: "As terras que o mar cobriu",
    text: "O oeste das Montanhas Azuis na Primeira Era: reinos élficos, a fortaleza de Morgoth ao norte e, no fim, o mar no lugar de quase tudo.",
    books: ["O Silmarillion"],
    region: [
      "Beleriand ficava a oeste das Ered Luin. O Sirion descia pelo meio da terra. Doriath guardava o centro sob o poder de Melian. Nargothrond ficava nas cavernas do Narog, Gondolin num vale escondido, e os portos de Círdan olhavam o Belegaer.",
      "Ao norte, além de Ard-galen, Angband e Thangorodrim marcavam a terra de Morgoth. Hithlum, Dor-lómin, Dorthonion e Himring eram a fronteira. A folha é da Primeira Era do Sol, o tempo em que Homens e Elfos ainda tinham esses reinos.",
    ],
    events: [
      "Os Noldor que voltaram de Aman fundaram reinos e mantiveram por séculos uma guerra contra Angband. A ficha nomeia a guerra e não descreve os campos.",
      "Beren e Lúthien, Túrin, Tuor e Eärendil atravessam esses nomes. Onde a história de Túrin escurece, o arquivo guarda o lugar e não narra o fim das casas.",
      "No fim da Primeira Era a hoste do Oeste derrubou Morgoth. O mar avançou e cobriu quase todo Beleriand. Lindon, a oeste das Montanhas Azuis, é o que restou acima da água.",
    ],
  },
  {
    id: "terra-media",
    name: "Terra-média",
    image: "Terra_media.png",
    eras: ["Terceira Era"],
    epithet: "O oeste na Terceira Era",
    text: "Do Condado a Mordor, a folha da Terceira Era em que se passam O Hobbit e O Senhor dos Anéis.",
    books: ["O Hobbit", "A Sociedade do Anel", "As Duas Torres", "O Retorno do Rei"],
    region: [
      "Esta é a Terra-média que os livros mais conhecidos percorrem. Eriador fica a oeste das Montanhas Sombrias, Rhovanion a leste, Rohan e Gondor ao sul, Mordor atrás das Montanhas de Sombra. Lindon e os Portos Cinzentos ainda olham o mar.",
      "O título da folha diz Terceira Era. É o tempo em que a Sombra volta a Mordor, os reinos do norte já são ruína e o Um Anel segue escondido até sair do Condado.",
    ],
    events: [
      "Bilbo vai de Hobbiton a Erebor com Thorin, atravessa a floresta escurecida e volta com o Anel.",
      "Frodo sai do Condado, passa por Valfenda e por Moria, desce o Anduin e entra em Mordor. A Comitiva se parte no caminho. A guerra que fecha a era tem o nome de Guerra do Anel; a ficha não descreve os campos.",
      "Com a queda da Torre Escura acaba a Terceira Era. Aragorn reúne os reinos, e muitos Elfos partem dos Portos Cinzentos.",
    ],
  },
  {
    id: "eriador",
    name: "Eriador",
    image: "Eriador.png",
    eras: ["Terceira Era"],
    epithet: "Entre as duas serras",
    text: "A terra larga entre as Montanhas Azuis e as Montanhas Sombrias, desenhada na Terceira Era, quando Arnor já era sobretudo memória.",
    books: ["O Silmarillion", "A Sociedade do Anel", "Contos Inacabados"],
    region: [
      "Eriador vai do mar até as Montanhas Sombrias. O Condado e Bree ficam no meio. Valfenda se esconde no sopé leste. Os Portos Cinzentos e Forlindon guardam o oeste. Ao norte estão Fornost, as colinas de Evendim e, mais longe, Angmar.",
      "A folha diz Terceira Era. Arnor, o reino fundado por Elendil no fim da Segunda Era, já aparece partido e em grande parte desabitado. Minhiriath, Eregion e as terras de Tûr são nomes de uma terra mais vazia do que foi.",
    ],
    events: [
      "Elendil estabeleceu Annúminas à beira do Lago Vesperturvo. Séculos depois o reino se dividiu, e Angmar guerreou contra o que restava dele até Fornost cair.",
      "Os montarazes do norte continuaram a guardar as estradas sem reino. Aragorn cresceu em Valfenda e percorreu Eriador muito antes de ser rei.",
      "Frodo atravessa esta folha do Condado até Valfenda: a Floresta Velha, as Colinas dos Túmulos, Bree e o Pequeno Delving da estrada. A Comitiva só deixa Eriador ao passar das montanhas.",
    ],
  },
  {
    id: "condado",
    name: "O Condado",
    image: "Condado.png",
    eras: ["Terceira Era"],
    epithet: "A terra dos Hobbits",
    text: "Quatro magotes, Hobbiton no centro e a Floresta Velha na orla leste. A folha é da Terceira Era, quando os Hobbits já tinham esta terra por sua.",
    books: ["O Hobbit", "A Sociedade do Anel", "O Retorno do Rei"],
    region: [
      "O Condado foi dado aos Hobbits por Arthedain na Terceira Era. Divide-se em quatro magotes. Hobbiton, a Vila dos Hobbits e Tuqueburgo ficam no coração. A Terra dos Buques, além do Brandevin, é a margem leste, de onde se vê a Floresta Velha.",
      "A estrada sai para Bree e para o resto de Eriador. Por muito tempo o Condado soube pouco das guerras de fora. A folha marca essa paz: tocas, vilas e sebes, não muralhas.",
    ],
    events: [
      "Bilbo parte de Bolsão com Thorin e volta com o Anel. Décadas depois a festa de despedida abre O Senhor dos Anéis.",
      "Frodo deixa Hobbiton com Sam, Merry e Pippin. A perseguição até o Brandevin é o começo da jornada, ainda dentro desta folha.",
      "No fim da Guerra do Anel o Condado foi ocupado por homens a serviço de Saruman. Os Hobbits o retomaram. A ficha registra a ocupação e a libertação, e não descreve a luta.",
    ],
  },
  {
    id: "arnor",
    name: "Arnor",
    image: "Arnor_Arthedain_Cardolan_e_Rhudaur.png",
    eras: ["Terceira Era"],
    epithet: "O reino partido",
    text: "Arthedain, Cardolan e Rhudaur, os três herdeiros de Arnor, com Angmar ao norte. A folha mostra a Terceira Era em que essa divisão ainda tinha fronteiras.",
    books: ["O Senhor dos Anéis", "Contos Inacabados"],
    region: [
      "Arnor foi o reino do norte, irmão de Gondor. A folha o desenha já dividido: Arthedain a noroeste, com Fornost e Annúminas; Cardolan ao sul da Grande Estrada, com Tharbad no rio; Rhudaur a leste, encostado nas Montanhas Sombrias.",
      "O título diz Terceira Era, e é certo. A divisão aconteceu nessa era, séculos depois de Elendil. Angmar, com Carn Dûm, fica no alto do mapa como a ameaça que consumiu os três.",
    ],
    events: [
      "Depois da morte de Eärendur, os filhos repartiram Arnor. A palantír de Amon Sûl ainda vigiava a estrada entre eles.",
      "O Rei-bruxo de Angmar moveu guerra aos reinos do norte. Cardolan e Rhudaur caíram primeiro. Arthedain resistiu até a queda de Fornost. A ficha nomeia a ruína e não descreve os campos.",
      "Do reino sobraram os montarazes, as colinas de túmulos e os nomes nas estradas. Aragorn é o herdeiro dessa linha quando a Terceira Era acaba.",
    ],
  },
  {
    id: "montanhas-sombrias",
    name: "Montanhas Sombrias",
    image: "MontanhasSombrias.png",
    eras: ["Terceira Era"],
    epithet: "A serra que divide o oeste",
    text: "Hithaeglir, desenhada na Terceira Era, com Moria sob os picos, a floresta escurecida a oeste e Rhovanion a leste.",
    books: ["O Hobbit", "A Sociedade do Anel", "O Silmarillion"],
    region: [
      "As Montanhas Sombrias separam Eriador dos vales do Anduin. A folha olha a cadeia de norte a sul: Erebor e o Lago Comprido ficam além da ponta norte, Caras Galadhon e Amon Lanc no sul, Mordor mais longe. O Miado das Águas e o Portão da Montanha marcam a passagem por Moria.",
      "O título diz Terceira Era. A serra é mais velha, mas esta folha é a do tempo em que a floresta já se chama Floresta das Trevas e Dol Guldur está no sul dela.",
    ],
    events: [
      "Khazad-dûm prosperou sob a serra até um terror das profundezas esvaziar a cidade. O nome Moria ficou. Balin tentou voltar e morreu na Câmara de Mazarbul.",
      "Thorin atravessa as montanhas a caminho de Erebor. A Comitiva tenta o Passo do Chifre Vermelho, é detida pela neve e desce por Moria. Gandalf cai na ponte de Khazad-dûm. A ficha registra a queda e não descreve o combate.",
      "Os passos da serra continuam a ligar o oeste ao leste depois da guerra. A cadeia em si não muda de nome.",
    ],
  },
  {
    id: "rhovanion",
    name: "Rhovanion",
    image: "Rhovanion.png",
    eras: ["Terceira Era"],
    epithet: "As Terras Selvagens",
    text: "A leste do Anduin, na Terceira Era: a grande floresta, Erebor, o Lago Comprido e Dol Guldur no sul da mata.",
    books: ["O Hobbit", "A Sociedade do Anel", "Contos Inacabados"],
    region: [
      "Rhovanion é o nome largo das terras a leste do Grande Rio. A floresta ocupa o centro. No norte ficam Erebor, Valle e Esgaroth. A oeste, o Carrock e a terra de Beorn. No sul da mata, Dol Guldur. Lórien aparece na borda, já no vale do Anduin, e não se confunde com o jardim de Irmo.",
      "A folha diz Terceira Era. Antes a floresta se chamava Verde. A sombra que saiu de Dol Guldur é que a tornou Floresta das Trevas.",
    ],
    events: [
      "Sauron se escondeu em Dol Guldur por longos anos da Terceira Era. O Conselho Branco o expulsou, e ele voltou abertamente a Mordor.",
      "Smaug tomou Erebor e destruiu Valle. Thorin, Bilbo e a companhia retomaram a montanha. O dragão caiu sobre Esgaroth, e a cidade foi refeita. A batalha que se seguiu fica nomeada; a ficha não descreve o campo.",
      "A Comitiva desce o Anduin na orla oeste desta terra e entra em Lórien. Mais tarde a floresta é liberta da sombra do sul, e o Reino da Floresta recupera o nome antigo.",
    ],
  },
  {
    id: "rohan",
    name: "Rohan",
    image: "Rohan.png",
    eras: ["Terceira Era"],
    epithet: "A marca dos cavalos",
    text: "Os campos entre o Isen e o Anduin, com Edoras no alto, o Abismo de Helm a oeste e Fangorn na borda. O reino é da Terceira Era, mesmo quando a folha não imprime a data.",
    books: ["As Duas Torres", "O Retorno do Rei", "Contos Inacabados"],
    region: [
      "Rohan, a Marca, foi Calenardhon antes de Gondor entregar a terra a Eorl. Edoras e Meduseld ficam sobre um outeiro. O Entágua divide os vales. Isengard, no norte, já não é de Rohan quando Saruman a ocupa. Fangorn é a floresta antiga na fronteira, não um pasto do reino.",
      "O Abismo de Helm guarda o oeste. As Montanhas Brancas separam a Marca de Gondor. Esta folha não traz a era no título; o reino, porém, só existe na Terceira Era.",
    ],
    events: [
      "Eorl cavalgou do norte e recebeu a terra de Cirion. O juramento entre Rohan e Gondor vem desse dia.",
      "Helm defendiu o Abismo num inverno de invasão. O forte guardou o nome dele. Séculos depois, Théoden resiste ali a Saruman até Gandalf chegar com socorro. A ficha não descreve o assalto.",
      "Os Rohirrim cavalgaram para Minas Tirith na Guerra do Anel. Éowyn e Merry estavam entre eles. O rei caiu no campo, e Éomer ficou com a Marca.",
    ],
  },
  {
    id: "rohan-terceira",
    name: "Rohan na Terceira Era",
    image: "Rohan_na_Terceira_Era.png",
    eras: ["Terceira Era"],
    epithet: "A Marca com os nomes da guerra",
    text: "A mesma marca, agora com a era escrita na folha: Westfold, Eastfold, Aldburg, Dunharrow e o Vale de Helm.",
    books: ["As Duas Torres", "O Retorno do Rei"],
    region: [
      "Esta folha repete Rohan e acrescenta a divisão que a guerra usou. O Westfold olha Isengard e o Vale de Helm. O Eastfold desce para o Entágua, com Aldburg, a sede antiga da casa de Éomer, e Edoras no centro. Dunharrow fica nas montanhas, acima de Harrowdale.",
      "O título diz Terceira Era. É a Marca no último século dessa era, quando Saruman já tinha Isengard e Gondor pedia os cavaleiros.",
    ],
    events: [
      "Saruman fechou o Rodeirão e atacou os vaus do Isen. Théodred caiu ali. A guerra de Isengard empurrou o povo do Westfold para o Abismo de Helm.",
      "Depois da vitória no forte, a hoste subiu a Dunharrow. De lá partiu a cavalgada pelas sendas que Gondor evitava, até os Campos de Pelennor. A ficha nomeia a cavalgada e não descreve a batalha.",
      "Os Ents, saindo de Fangorn, quebraram o anel de Isengard enquanto a Marca lutava no sul. Orthanc ficou de pé. Saruman perdeu o vale.",
    ],
  },
  {
    id: "gondor",
    name: "Gondor",
    image: "Gondor.png",
    eras: ["Terceira Era"],
    epithet: "O reino do sul",
    text: "Minas Tirith, Osgiliath, Ithilien e os portos da Baía de Belfalas. A folha mostra o reino tardio, já de frente para Mordor.",
    books: ["O Retorno do Rei", "Contos Inacabados"],
    region: [
      "Gondor ocupa o sul, entre as Montanhas Brancas e o mar. Minas Tirith está em Anórien, sobre o Anduin. Osgiliath, a antiga capital, fica no rio. Ithilien é o jardim entre o rio e as Montanhas de Sombra. Pelargir e Dol Amroth guardam a costa.",
      "A folha não imprime a era. O desenho é o da Terceira Era tardia: Minas Tirith é a sede dos Regentes, Minas Ithil já não aparece como cidade livre, e Mordor está aceso na borda.",
    ],
    events: [
      "Isildur e Anárion fundaram o reino no fim da Segunda Era. Osgiliath foi a primeira capital. Minas Anor tornou-se Minas Tirith, e Minas Ithil, tomada pelos Nazgûl, tornou-se Minas Morgul.",
      "Na Guerra do Anel o inimigo atravessa o Anduin e cerca a cidade. Os Rohirrim e a frota trazida por Aragorn chegam aos Campos de Pelennor. A ficha não descreve o campo.",
      "Depois da queda da Torre, Aragorn entra em Minas Tirith como rei. A Quarta Era começa com Gondor e Arnor de novo sob uma coroa.",
    ],
  },
  {
    id: "gondor-eras",
    name: "Gondor nas duas eras",
    image: "Gondor_segunda_e_terceira_era.png",
    eras: ["Segunda Era", "Terceira Era"],
    epithet: "Do fundador aos Regentes",
    text: "A folha que declara as duas eras: Gondor desde a fundação, com Calenardhon ainda no mapa e Minas Ithil marcada como ruína.",
    books: ["O Silmarillion", "O Retorno do Rei", "Contos Inacabados"],
    region: [
      "O título diz Segunda e Terceira Era, e a folha mistura as duas. O reino nasce no fim da Segunda, quando os Fiéis de Númenor fundam Osgiliath, Minas Anor e Minas Ithil. Na Terceira, Calenardhon, desenhado ao norte das Montanhas Brancas, é entregue aos Rohirrim e passa a chamar-se Rohan.",
      "Anfalas, Belfalas, Lamedon e Lebennin são as províncias do sul. Drúadan guarda o povo que não se mistura às cidades. Ithilien continua o jardim de frente para Mordor. Minas Ithil aparece na folha como ruína: é o nome antigo da cidade que se tornou Minas Morgul.",
    ],
    events: [
      "A Última Aliança, no fim da Segunda Era, sai deste reino contra Sauron. Isildur corta o Anel e o perde no Anduin. A era seguinte abre com o trono sem rei.",
      "Os Regentes governam por séculos. O juramento de Cirion entrega Calenardhon a Eorl. Gondor fica menor e mais perto da sombra.",
      "Na Guerra do Anel as províncias ainda mandam ajuda a Minas Tirith. O rei que volta herda as duas eras desta folha: a fundação de Elendil e o reino que os Regentes conseguiram guardar.",
    ],
  },
  {
    id: "numenor",
    name: "Númenor",
    image: "NumenornaSegundaEra.png",
    eras: ["Segunda Era"],
    epithet: "A ilha do meio do mar",
    text: "A grande ilha da Segunda Era, com o Meneltarma no centro, Armenelos a leste e Andúnië voltada para o Reino Abençoado.",
    books: ["O Silmarillion", "Contos Inacabados"],
    region: [
      "Númenor foi erguida no Belegaer para os Homens que tinham lutado contra Morgoth. O Meneltarma, o Pilar do Céu, fica no meio. Armenelos é a cidade dos reis. Andúnië, no oeste, é o porto dos que ainda olhavam Tol Eressëa. Rómenna, a leste, olha a Terra-média.",
      "A folha diz Segunda Era, e a ilha inteira cabe nessa era. Forostar, Andustar, Orrostar, Hyarnustar e Hyarrostar são as cinco pontas em volta de Mittalmar. Não há Númenor na Terceira Era.",
    ],
    events: [
      "Elros, irmão de Elrond, foi o primeiro rei. Por muito tempo os númenórianos foram mestres do mar e amigos dos Elfos, e os Fiéis de Andúnië guardaram essa amizade.",
      "Com o tempo a sombra cresceu em Armenelos. Sauron, levado cativo, virou conselheiro do rei. A grande frota partiu para tomar o Oeste.",
      "A ilha foi engolida pelo mar. Elendil e os filhos chegaram à Terra-média com o que restou dos Fiéis e fundaram Arnor e Gondor. A ficha não descreve a submersão.",
    ],
  },
  {
    id: "harad",
    name: "Harad",
    image: "Harad.png",
    eras: ["Segunda Era", "Terceira Era"],
    epithet: "As terras do sul",
    text: "Ao sul de Gondor, do Harondor ao Harad longínquo, com Umbar na costa. A folha declara a Segunda e a Terceira Era.",
    books: ["O Retorno do Rei", "Contos Inacabados"],
    region: [
      "Harad é o sul, para além de Gondor. O Harad Próximo encosta em Harondor, a terra disputada junto ao rio. O Harad Longínquo segue deserto adentro. Umbar é o grande porto da costa, fundado pelos númenórianos e depois hostil a Gondor.",
      "A folha diz Segunda e Terceira Eras. Os livros nomeiam esses povos e esse porto, e pouco desenham cidades no interior. Onde o mapa inventa um nome que os contos não usam, a ficha não o transforma em história.",
    ],
    events: [
      "Na Segunda Era os reis de Númenor tomaram portos no sul, e Umbar ficou entre eles. Depois da queda da ilha, homens do partido do rei permaneceram na costa.",
      "Na Terceira Era as frotas de Umbar ameaçaram Gondor mais de uma vez. Na Guerra do Anel, Aragorn toma esses navios e os traz ao Anduin.",
      "Os Haradrim lutaram nos Campos de Pelennor ao lado de Mordor, e alguns vieram com os grandes animais de guerra. A ficha nomeia a chegada e não descreve o campo. Khand fica na borda leste, outro povo do sul com pouca página.",
    ],
  },
  {
    id: "rhun",
    name: "Rhûn e as Terras Orientais",
    image: "RhuneTerrasOrientais.png",
    eras: ["Primeira Era", "Segunda Era", "Terceira Era"],
    epithet: "O leste pouco contado",
    text: "O mar de Rhûn e as terras além dele. A própria folha diz que atravessa eras diferentes, porque o Oeste nunca mapeou esse chão com certeza.",
    books: ["O Silmarillion", "O Retorno do Rei", "Contos Inacabados"],
    region: [
      "Rhûn é o leste. O mar interior recebe o nome da região. Khand fica ao sul, entre esse mar e Mordor. Mais adiante a folha continua por serras e povos que os livros quase não nomeiam.",
      "O título diz eras diferentes, e é o caso. Homens do Leste aparecem já na Primeira Era, servem a Sauron na Segunda e voltam na Terceira. Não há uma crônica das cidades. Os Magos Azuis foram para esse lado e a história deles não foi escrita por inteiro. A ficha não a inventa.",
    ],
    events: [
      "Na Primeira Era, casas de Homens vindos do Leste entraram em Beleriand. Umas ficaram ao lado dos Elfos e outras ao lado de Morgoth. O arquivo guarda a vinda, não as traições em detalhe.",
      "Na Segunda e na Terceira Era, Sauron recrutou povos de Rhûn e de Khand. Na Guerra do Anel eles pressionaram Valle e Erebor ao mesmo tempo em que outros chegavam aos Campos de Pelennor. A ficha não descreve essas batalhas.",
      "Depois da queda da Torre, o rei de Gondor ainda teve paz a fazer no leste. O mapa, porém, continua mais largo do que o conto.",
    ],
  },
];
