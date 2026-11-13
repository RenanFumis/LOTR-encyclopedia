# Lorthdex

Enciclopédia de fã da Terra-média, no formato de um catálogo consultável. O pacote se chama `lorthdex`. Na interface, o título visível é **Lord of the Rings** / **A Enciclopédia da Terra-média**.

Projeto independente, sem vínculo com a Tolkien Estate ou a Middle-earth Enterprises. Os textos das fichas e das páginas são originais, escritos para este arquivo. Artigos longos de povos e criaturas colados pelo autor do projeto entram como estão.

## Stack

| Peça | Versão no projeto |
| --- | --- |
| [Vite](https://vite.dev/) | 6 |
| [React](https://react.dev/) | 19 |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 |
| Node | módulos ES (`"type": "module"`) |

Não há roteador, biblioteca de estado nem framework de CSS. O estado da interface vive em `src/App.tsx`. O visual inteiro está em `src/styles.css`.

TypeScript roda em modo estrito, com `noUnusedLocals` e `noUnusedParameters`. O alvo é `ES2022` e o JSX é `react-jsx`. `tsc` só checa tipos (`noEmit`); o bundle é do Vite.

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc --noEmit && vite build
npm run preview   # serve o resultado de dist/
npm run portraits # regenera os retratos WebP
```

O servidor de desenvolvimento está fixo na porta `5173` em `vite.config.ts`. Se essa porta já estiver ocupada, o Vite sobe em outra e o navegador deixa de ver as alterações feitas na instância antiga.

`npm run portraits` exige Python e [Pillow](https://python-pillow.org/).

## Como a aplicação sobe

`index.html` monta `#root` e carrega `src/main.tsx`. Esse arquivo renderiza `<App />` em `StrictMode` e importa `src/styles.css`.

`index.html` também pede, pelo Google Fonts, **Lora** (texto), **Inter** (controles) e **Cinzel** (reserva dos títulos). A fonte de título de fato é a **Ringbearer**, registrada em CSS a partir de `src/lib/ringbearer/RINGM___.TTF`. Títulos usam `font-weight: normal` e `font-synthesis: none`, porque essa fonte não tem negrito.

Idioma da página: `pt-BR`.

## Rotas

Não existe React Router. O endereço é o hash, lido e escrito por `src/lib/routes.ts`. `App` escuta `popstate` e mantém o hash alinhado ao estado. Trocar de página zera a ficha aberta, zera o lugar aberto e volta o scroll ao topo. O terceiro argumento de `routeHash` só entra no endereço quando a página é Lugares.

| Hash | Página |
| --- | --- |
| `#/` | Home |
| `#/bestiario` | Portal do bestiário |
| `#/racas` | Criaturas da Terra-média (cartas de povos e espécies) |
| `#/criaturas` | Redireciona para `#/racas` |
| `#/personagens` | Personagens do Mundo de Arda (catálogo Dex) |
| `#/personagens/:id` | Ficha aberta dentro de Personagens |
| `#/racas/:id` | Legado → abre a ficha em Personagens |
| `#/criaturas/:id` | Legado → abre a ficha em Personagens |
| `#/catalogo` | Catálogo completo |
| `#/registro/:id` | Ficha aberta dentro do catálogo completo |
| `#/lugares` | Índice de Lugares |
| `#/lugares/aman` | Aman e Valinor |
| `#/lugares/primeira` | Primeira Era |
| `#/lugares/segunda` | Segunda Era |
| `#/lugares/terceira` | Terceira Era, com dois portões |
| `#/lugares/terceira/lugares` | Lugares na Terceira Era |
| `#/lugares/terceira/especiais` | Lugares Especiais e Misteriosos |
| `#/historia` | Sala ainda vazia |
| `#/mapas` | Mapas de Arda |
| `#/sobre` | Sobre o projeto |
| `#/creditos` | Sala ainda vazia |
| `#/termos` | Sala ainda vazia |
| `#/privacidade` | Sala ainda vazia |

`:id` de personagem aceita minúsculas, dígitos e hífens (`[a-z0-9-]+`). Um id que não existe no catálogo é ignorado e a página abre sem ficha. Os trechos de `#/lugares/...` aceitam só letras (`[a-z]+`). Um id de lugar desconhecido abre o índice.

A carta selecionada em Criaturas (`#/racas`) e o mapa selecionado em Mapas **não** entram no hash: a escolha fica só no estado local do componente.

O menu superior lista Home, Bestiário, Lugares, História de Arda e Mapas. Criaturas e Personagens não entram nesse menu: o item Bestiário permanece marcado enquanto a página é `racas` ou `personagens`. Abaixo de 900px o menu vira um botão, e os pontos dourados entre os itens somem.

O logotipo do cabeçalho e o do rodapé chamam a Home. Os links Sobre, Créditos, Termos de Uso e Políticas de privacidade ficam no rodapé.

## Páginas

Home, Bestiário, Criaturas (`racas`), Personagens, Catálogo, Sobre, Lugares e Mapas usam o invólucro liso (`.device.is-plain`): sem couro, parafusos nem halo. As subpáginas de Lugares continuam lisas, porque a página segue sendo `lugares`. História, Créditos, Termos e Privacidade ainda usam o componente `Room`, com o invólucro antigo.

Banners, em `public/banner/`. O Vite só publica o que está em `public/`. Arquivos novos em `pictures/` precisam ser copiados para lá. Se o arquivo for trocado no mesmo URL, acrescente `?v=` no `src` para furar o cache.

| Página | Arquivo | Enquadramento |
| --- | --- | --- |
| Home | `minas_tirith_banner.png` | herói, `object-position: 72% center` |
| Bestiário | `banner-bestiario.png` | `center 62%` |
| Personagens | `exercito-antes-da-batalha.png?v=2` | classe `is-host`, `center 30%` |
| Criaturas | `nazgul-cacador.png` | classe `is-hunt`, `center center` |
| Sobre | `BannerPortadeDurin.png` | classe `is-gate`, `center center` |
| Lugares | `Banner_lugares.png` | classe `is-places`, `center 32%` |
| Mapas | `BannerMapaAntigodaTerraMedia.png?v=1` | classe `is-atlas` |

No Sobre, o retrato `/sobre/tolkien.jpg` flutua no texto de Tolkien. A cena de Frodo (`/sobre/frodo-escrevendo.png`) fica sob o título “Muito além das páginas”. A Comitiva (`/banner/ComitivadoAnel.png?v=1`) fica sob o título “Que a jornada continue...”. A linha de agradecimento é dourada, itálica, centralizada e sublinhada.

Os banners das salas de Lugares vêm de `public/lugares/`, não de `public/banner/`. A classe define o `object-position`.

| Sala | Arquivo | Enquadramento |
| --- | --- | --- |
| Aman e Valinor | `Aman_e_Valinor/Valinor.png` | `is-aman`, `center 78%` |
| Primeira Era | `primeira_era/Falas.png` | `is-falas`, `center 88%` |
| Segunda Era | `segunda_era/Portos_Cinzentos_Mithlond.png` | `is-mithlond`, `center 52%` |
| Terceira Era | `terceira_era/Campos_do_Pelennor.png` | `is-pelennor`, `center 42%` |
| Lugares na Terceira Era | `terceira_era/Bree.png` | `is-bree`, `center 48%` |
| Lugares Especiais e Misteriosos | `terceira_era/Lugares especiais_e_misteriosos-terceira_era/CâmaradeMazarbulbanner.png?v=1` | `is-mazarbul`, `center center` |

O banner do portal tem 460px de altura e 240px até 800px. Ele sangra na largura da janela (`100vw`).

A Home aponta “Explore o mundo de Arda” para Mapas, “Explorar Personagens” para Personagens, “Explorar o Criaturas” para Criaturas (`racas`), “Explorar os Lugares” para Lugares e “Saiba mais sobre o projeto” para Sobre. O texto do botão de criaturas está como foi escrito na interface.

## Bestiário

`BestiaryPortal` é o portão. À esquerda, **Criaturas de Arda** abre `#/racas`. À direita, **Personagens do Mundo de Arda** abre `#/personagens`. A frase de fechamento do texto fica antes dos dois cards; o `quote-divider` vem depois.

## Criaturas (`#/racas`)

`KindredPortal` lista 16 cartas de povo ou espécie em `src/data/kindred.ts`. Cada carta mostra só a imagem e o nome curto. A carta aberta some da grade e a ficha longa envolve a esquerda e o espaço abaixo, no mesmo padrão dos lugares e dos mapas.

Imagens em `pictures/criaturas-raca/`, servidas de `public/criaturas-raca/` via `kindredImageSrc`.

Cartas atuais: Ainur, Elfos, Meio-elfos, Homens, Hobbits, Ents, Huorns, Grandes Águias, Mearas, Dragões, Grandes Aranhas, Orcs, Trolls, Lobisomens, Bestas aladas e Seres misteriosos. Anões e Beornianos ainda não têm carta (faltam imagens).

A ficha pode trazer `title` longo, `blocks` (parágrafos, subtítulos e listas), `figuresLead`, `figureGroups`, `figures` e `sources` (livros agrupados e observações canônicas). Texto rico aceita `**negrito**` e `*itálico*`, inclusive negrito com itálico aninhado.

Nomes com `entryId` abrem a ficha do personagem: Hobbits vão para `#/catalogo`; os demais, para `#/personagens`. Nomes sem `entryId` permanecem texto. Não se inventa vínculo entre figuras homônimas (por exemplo, o tenente Gothmog de Minas Morgul não aponta para o Balrog `gothmog`).

## Personagens (`#/personagens`)

`DexBoard` com o título **Personagens do Mundo de Arda** e o recorte `PORTAL_RACES` (todas as raças do catálogo, menos Hobbit). Hobbits ficam só no catálogo completo (`#/catalogo`). Abrir um Hobbit a partir de um link em Criaturas chama `openCharacter`, que troca a página para `catalogo`.

## Catálogo

Os 175 registros estão em `src/data/characters.ts`, numerados de `0` a `174` sem furos. O tipo é `Character` em `src/types.ts`.

Campos de cada ficha: `id`, `number`, `name`, `epithet`, `genus`, `race`, `region`, `allegiance`, `era`, `rarity`, `stature`, `presence`, `summary`, `lore`, `voice`, `sigil`, `stats`, `abilities`, `strengths`, `weaknesses`, `related`. Opcionais: `services`, `anomalous`, `forms`.

Atributos, cada um de 1 a 100: força, agilidade, sabedoria, coragem, poder e vontade. O índice exibido é a soma, sobre 600. Habilidades têm tipo `ativa`, `passiva` ou `suprema`. `related` guarda ids de outras fichas, nunca o próprio id. `forms` é uma variação da mesma ficha (Gandalf cinzento e branco, por exemplo); a primeira forma repete os atributos principais.

`assertDex` roda só em desenvolvimento (`import.meta.env.DEV`). Ela recusa id repetido ou fora do padrão, número repetido, buraco na sequência `0 .. length - 1`, atributo fora de 1–100 e vínculo inexistente ou circular.

### Recortes por raça

`PORTAL_RACES` alimenta `#/personagens`. O catálogo completo usa `RACES`, que inclui Hobbit. `PEOPLE_RACES` e `CREATURE_RACES` ainda existem em `types.ts` e entram na composição de `PORTAL_RACES`.

| Raça | Onde aparece | Quantidade |
| --- | --- | --- |
| Humano | Personagens | 60 |
| Anão | Personagens | 22 |
| Maia | Personagens | 16 |
| Meio-elfo | Personagens | 13 |
| Elfo | Personagens | 11 |
| Ent | Personagens | 6 |
| Beorniano | Personagens | 2 |
| Hobbit | só no catálogo completo | 21 |
| Dragão | Personagens | 7 |
| Enigma | Personagens | 4 |
| Águia | Personagens | 4 |
| Mearas | Personagens | 4 |
| Nazgûl | Personagens | 3 |
| Aranha | Personagens | 2 |

Eras: Terceira, Segunda, Primeira e Fora do tempo. Raridades: comum, incomum, raro, lendário, mítico.

Um vínculo aberto a partir de uma ficha troca o id na página atual. Dá para abrir, em Personagens, uma ficha cujo card não está na grade daquela página. O hash fica `#/personagens/:id`.

### Busca, filtros e ordem

`matchesQuery` em `src/lib/dex.ts` procura em nome, epíteto, gênero, região, aliança, raça, era, raridade, nome e texto das habilidades, resistências, fraquezas e `services`. O texto de `lore`, `summary` e `voice` não entra na busca.

`normalize` tira acentos com NFD e passa a minúsculas. Hífen e apóstrofo permanecem.

A ordem pode ser número, nome (`localeCompare` em `pt`) ou índice decrescente. A tecla `/` foca a busca em Personagens e no catálogo, desde que o foco não esteja num campo. `Esc` fecha a ficha, ou limpa a busca se o campo estiver focado e houver texto. Setas esquerda e direita percorrem a lista visível com uma ficha aberta.

## Ficha aberta

A ficha é `Detail`, um `aside.detail`. Há um único scroll, o da página. A ficha não tem barra própria.

Na grade, a partir de 1040px, `DexBoard` coloca a ficha como primeiro filho da grade (`.grid.is-wrapped`). Ela ocupa da coluna 2 até a última, por tantas linhas quanto a altura dela pedir. Os cards preenchem a coluna da esquerda e seguem em fileiras completas por baixo. Um `ResizeObserver` mede os cards e grava `grid-template-rows` e `--rows`. Se o card seguinte só passaria um pouco da borda de baixo, ele entra na coluna; se a sobra fosse grande, um espaçador (`.wrap-notch`) segura essa célula para a fileira de baixo começar rente à ficha.

Na lista, a partir de 1040px, o espaço continua em duas colunas: a lista à esquerda e a ficha à direita.

Abaixo de 1040px a ficha ocupa a largura toda e fica acima dos cards.

Abrir uma ficha rola `.detail` para o início da janela. A barra da ficha (`.detail-nav`) gruda no topo enquanto ela está visível.

A ficha de um lugar, de uma criatura (kindred) ou de um mapa segue o mesmo encaixe. `PlaceBoard`, `KindredBoard` e `MapBoard` medem `.place-card` dentro de `.place-grid.is-wrapped`. O vão dessa grade é 16px e a coluna mínima é 230px. Abaixo de 1040px a ficha também fica em largura total, acima dos cards. `Esc` fecha; as setas percorrem só os itens daquela sala.

## Lugares

`src/components/Places.tsx` desenha o índice e as salas. Os cards estão em `src/data/places.ts`. Cada um tem `id`, `name`, `image` e `text`. A ficha longa fica em `src/data/place-lore-west.ts` e `src/data/place-lore-east.ts`, reunidas por `resolvePlaceRecord` em `src/data/place-lore.ts`. Uma imagem repetida do mesmo lugar aponta, por alias, para a ficha já escrita e mostra a imagem em que se clicou.

São 100 cards: Aman e Valinor 11, Primeira Era 19, Segunda Era 15, Terceira Era 31 e Lugares Especiais e Misteriosos 24. A Terceira Era não lista os cards na própria página. Ela abre dois portões, “Lugares na Terceira Era” e “Lugares Especiais e Misteriosos”.

O índice mostra quatro portões. A imagem de cada um é sorteada da própria sala e muda quando se volta a `#/lugares`. O portão da Terceira Era sorteia entre as duas salas. Os dois portões de dentro sorteiam só a própria lista. A escolha fica em `sessionStorage`, na chave `lorthdex-place-covers`, e evita repetir a imagem anterior quando há mais de uma. `placeImageSrc` codifica cada trecho do caminho.

Cada sala, menos o índice, termina com um botão de voltar. As eras voltam para Lugares. As duas salas da Terceira Era voltam para a Terceira Era. Há também um atalho no topo.

A ficha do lugar traz epíteto, eras, o texto curto do card, nomes ao longo das Eras, livros, quem passou por ali e o relato. As imagens ficam em `pictures/Lugares/` e são copiadas para `public/lugares/`. O card mostra a imagem inteira, sem corte.

## Mapas

`src/components/Maps.tsx` lista as folhas em `src/data/maps.ts`. Cada mapa tem `id`, `name`, `image`, `eras`, `epithet`, `text`, `books`, `region` e `events`. As imagens ficam em `pictures/mapas-lotr/` e são copiadas para `public/mapas/`, servidas por `mapImageSrc`.

São 16 mapas: Arda, Aman e Valinor, Beleriand, Terra-média, Eriador, Condado, Arnor, Montanhas Sombrias, Rhovanion, Rohan, Rohan na Terceira Era, Gondor, Gondor nas Eras, Númenor, Harad e Rhûn. A seleção também é local (sem hash). A ficha envolve a grade como nos lugares.

## Retratos

A arte de origem fica em `pictures/`, organizada por pasta (`humanos-atualizados`, `anoes-atualizados`, `Hobbit-atualizados`, `elfos-atualizados`, `meio-elfos-atualizado`, `Maia-atualizado`, `Ent-atualizado`, `Beorniano-atualizado`, `Dragao-atualizado`, `Aranhas-atualizado`, `Aguias-atualizado`, `Mearas-atualizado`, `Nazgul-atualizado`, `Enigma-atualizado`).

`scripts/update-portraits.py` lê o mapa dessas pastas, reduz cada imagem a no máximo 400×400 e grava `public/portraits/{id}.webp` (WebP, qualidade 68). Só recria o arquivo quando o original é mais novo. O mapa consultado pela interface é `src/data/portraits.ts`. Um id sem entrada usa o desenho do selo (`Sigil` / `Medallion`) no lugar da foto.

`gollum` aponta para `/portraits/gollum.webp?v=2`. Os demais não levam query, salvo quando um arquivo no mesmo URL for substituído.

Banners, marcas e ilustrações de página também nascem em `pictures/` e são copiados à mão para `public/`. O script de retratos não mexe neles.

## Cores por raça

`src/theme.ts` define, para cada raça, o brilho, o fundo e a tinta usados nos cards e nas fichas (`--race`, `--race-ink`, `--race-deep`). Os seis atributos têm cor fixa, independente da raça.

## O que está desligado

Dois interruptores em `App.tsx` estão em `false`:

- `partyEnabled` esconde a comitiva e a barra fixa de baixo. O código de comitiva continua em `PartyBar` e no armazenamento. A comitiva guarda no máximo 6 ids.
- `soundEnabled` esconde o controle de som. `playEntrySound` gera dois tons curtos com a Web Audio API. Nada é baixado.

O `localStorage` usa três chaves, mesmo com a interface desligada:

| Chave | Conteúdo |
| --- | --- |
| `lorthdex-view` | `grade` ou `lista` |
| `lorthdex-party` | JSON com até 6 ids |
| `lorthdex-sound` | `on` ou `off` |

## Pontos de quebra do layout

| Largura | O que muda |
| --- | --- |
| ≥ 1040px | Ficha ao lado da lista, ou envolvida pelos cards na grade |
| ≤ 1039px | Ficha em largura total, acima dos resultados |
| ≤ 900px | Menu vira botão; os pontos entre os itens somem |
| ≤ 800px | Banner do portal cai para 240px; paddings laterais diminuem |
| ≤ 520px | Grade do catálogo fica em duas colunas fixas |

A grade solta usa `repeat(auto-fill, minmax(190px, 1fr))`, com vão de 12px.

## Mapa dos arquivos

```
index.html              página, fontes e favicon
vite.config.ts          plugin React e porta 5173
src/main.tsx            entrada
src/App.tsx             estado, páginas e rodapé
src/styles.css          todo o visual
src/types.ts            tipos, raças, eras e raridades
src/theme.ts            cores de raça e de atributo
src/data/characters.ts  as 175 fichas e a checagem assertDex
src/data/portraits.ts   id → URL do WebP
src/data/kindred.ts     cartas e artigos de Criaturas
src/data/maps.ts        folhas de Mapas
src/data/places.ts      cards e salas de Lugares
src/data/place-lore.ts  ficha do lugar e aliases
src/data/place-lore-west.ts
src/data/place-lore-east.ts
src/lib/routes.ts       hash
src/lib/dex.ts          busca, ordem, índice e número formatado
src/lib/storage.ts      localStorage
src/lib/sound.ts        tom de abertura
src/components/         Home, About, BestiaryPortal, KindredPortal,
                        Maps, DexBoard, Detail, Entries, Header, Nav,
                        Toolbar, Room, Medallion, Sigil, PartyBar,
                        Places, PlaceDetail
scripts/update-portraits.py
pictures/               arte de origem, fora do bundle
pictures/Lugares/       imagens das salas de lugares
pictures/criaturas-raca/ imagens das cartas de Criaturas
pictures/mapas-lotr/    imagens das folhas de Mapas
public/                 o que o Vite entrega em /
public/lugares/         cópia servida das imagens de lugares
public/criaturas-raca/  cópia servida das cartas de Criaturas
public/mapas/           cópia servida dos mapas
```

## Acrescentar uma ficha

1. Inclua o objeto no array `characters`, com `number` igual ao tamanho atual da lista. Não reutilize id nem número.
2. Aponte `related` só para ids que já existem.
3. Coloque o PNG na pasta correspondente de `pictures/` e registre o par arquivo → id em `scripts/update-portraits.py`.
4. Rode `npm run portraits`.
5. Acrescente a URL em `src/data/portraits.ts`.
6. Suba `npm run dev` e confira o console: `assertDex` quebra a renderização se o catálogo estiver inconsistente.

## Acrescentar um lugar

1. Inclua o card na lista da sala em `src/data/places.ts`. O `image` é o caminho dentro de `pictures/Lugares/`, com barras.
2. Copie o PNG para o mesmo caminho em `public/lugares/`.
3. Escreva a ficha em `place-lore-west.ts` ou `place-lore-east.ts`, com a mesma `id`. Se a imagem for outra vista de um lugar que já tem ficha, registre o alias em `place-lore.ts` em vez de duplicar o texto.
4. Um id desconhecido em `#/lugares/...` não abre sala nova: `resolvePlace` volta ao índice.

## Acrescentar uma carta de Criaturas

1. Inclua o objeto em `src/data/kindred.ts`, com `id`, `name`, `image`, `alt`, `about` e `figures`.
2. Copie o PNG para `pictures/criaturas-raca/` e para `public/criaturas-raca/`.
3. Use `entryId` só quando o personagem existir no catálogo. Hobbits abrem o catálogo completo.
4. Artigos longos entram em `blocks`, `figureGroups` e `sources` sem reescrever o texto colado.

## Acrescentar um mapa

1. Inclua o objeto em `src/data/maps.ts`.
2. Copie o PNG para `pictures/mapas-lotr/` e para `public/mapas/` com o mesmo nome de arquivo.
3. Mantenha `events` em traço largo: nomeie a guerra, sem narrar o campo.
