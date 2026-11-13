# Lord of the Rings — A Enciclopédia da Terra-média

Enciclopédia digital, navegável e interconectada sobre o legendarium de J.R.R. Tolkien. O pacote npm se chama `lorthdex`; na interface, o título visível é **Lord of the Rings** / **A Enciclopédia da Terra-média**.

O projeto reúne personagens, povos, criaturas, lugares e mapas. O objetivo é permitir que leitores explorem não apenas fichas individuais, mas também as relações entre personagens, linhagens, povos, regiões e acontecimentos.

Projeto independente, de fã para fã, sem vínculo com a Tolkien Estate ou a Middle-earth Enterprises. Os textos das fichas e das páginas são originais, escritos para este arquivo. Artigos longos de povos e criaturas colados pelo autor entram como estão.

> **Princípio editorial:** precisão antes de completude. Não inventar nomes, genealogias, classificações ou explicações quando Tolkien não as forneceu. Diferenciar claramente o que é confirmado, o que vem de textos alternativos ou inacabados e o que pertence às adaptações.

---

## 1. Objetivos

- Reunir informações sobre Arda e a Terra-média em uma estrutura pesquisável.
- Conectar personagens a povos, famílias, lugares e objetos quando houver fundamento textual.
- Apresentar a história organizada por Eras (e, no futuro, em cronologia dedicada).
- Diferenciar fatos confirmados, interpretações, versões alternativas e adaptações.
- Oferecer busca, filtros, mapas e salas temáticas.
- Permitir que a base cresça sem perder consistência editorial.

### O que já existe na aplicação

| Área | Estado |
| --- | --- |
| Home, Sobre | Ativos |
| Bestiário → Criaturas e Personagens | Ativos |
| Catálogo completo (175 fichas) | Ativo |
| Lugares (100 cards em salas por Era) | Ativo |
| Mapas (16 folhas) | Ativo |
| História de Arda | Sala reservada, ainda vazia |
| Artefatos, idiomas, genealogias visuais | Planejados |
| Créditos, Termos, Privacidade | Salas reservadas, ainda vazias |

---

## 2. Princípios editoriais e fontes

O legendarium foi desenvolvido ao longo de décadas e contém revisões, versões e textos publicados postumamente. Cada registro deve indicar suas fontes e, quando necessário, o grau de certeza da informação.

### 2.1 Categorias de fontes

1. **Obras publicadas em vida:** *O Hobbit*, *O Senhor dos Anéis* e outros textos publicados pelo próprio Tolkien.
2. **Obras publicadas postumamente:** como *O Silmarillion*, *Contos Inacabados* e *A História da Terra-média*.
3. **Textos alternativos ou inacabados:** versões, notas e concepções que não representam necessariamente a versão final do legendarium.
4. **Adaptações:** filmes, séries, jogos e outras interpretações, que não devem ser confundidas com o cânone literário.

### 2.2 Regras de precisão

- Não criar nomes para personagens ou integrantes de grupos que Tolkien deixou anônimos.
- Não apresentar hipóteses ou interpretações como fatos.
- Não misturar informações de adaptações com informações dos livros sem identificar sua origem.
- Quando houver versões conflitantes, registrar as versões e suas respectivas fontes.
- Não presumir que seres semelhantes pertençam à mesma espécie.
- Usar os conceitos **natureza**, **espécie**, **povo**, **grupo**, **linhagem**, **ordem** e **origem** conforme o caso. Evitar usar “raça” como classificação universal quando a natureza for desconhecida.
- Quando a natureza de um ser for desconhecida, registrar isso explicitamente em vez de forçar uma classificação.
- Em fichas de lugares e mapas, nomear guerras e acontecimentos em traço largo, sem narrar o campo.
- Cenas sensíveis (mortes, violência, destino de crianças) permanecem em nível alto; não descrever métodos.

### 2.3 Etiquetas editoriais

- **Confirmado:** declarado diretamente em uma fonte identificada.
- **Versão alternativa:** presente em uma versão ou concepção diferente.
- **Texto inacabado:** encontrado em material não concluído.
- **Interpretação:** conclusão editorial fundamentada, mas não declarada diretamente por Tolkien.
- **Adaptação:** informação exclusiva de filme, série, jogo ou outra adaptação.
- **Desconhecido:** informação não esclarecida nas fontes consultadas.

As etiquetas devem ser aplicadas à informação específica, não necessariamente à ficha inteira. Nas cartas de Criaturas, as **Observações de precisão canônica** e as **Fontes bibliográficas** cumprem esse papel na interface atual.

### 2.4 Exemplos de decisões editoriais

- **Glómund / Lhamthanc** são nomes antigos de Glaurung, não dragões separados.
- **Tom Bombadil** deve ter sua natureza registrada como desconhecida, sem classificá-lo definitivamente como Maia ou Vala.
- **Ungoliant** tem origem e natureza misteriosas; não deve ser classificada como Maia sem evidência textual.
- **Khamûl** é um Nazgûl nomeado. Não inventar nomes para os demais Nazgûl (no catálogo, **Nazgûl III–IX** é convenção editorial).
- **Arod** e **Hasufel** são cavalos importantes, mas não devem ser classificados como Mearas sem confirmação.
- **Beornianos** são um povo de Homens associado a Beorn (troca-peles), não a mesma natureza dos lobisomens de Morgoth.
- **Huorns** devem ser diferenciados dos Ents.
- O tenente Gothmog de Minas Morgul não aponta para o Balrog `gothmog`.
- **Chrysophylax Dives**, de *Farmer Giles of Ham*, não pertence ao universo de Arda/Terra-média.

### 2.5 Escopo e limites

A enciclopédia deixa claro que “Terra-média” é usada de maneira ampla no projeto, mas que o universo de Tolkien abrange Arda e regiões além da própria Terra-média.

Separar claramente:

- O legendarium de Arda.
- Outros textos ficcionais de Tolkien que não pertencem a Arda.
- Adaptações cinematográficas e televisivas.
- Jogos e outras obras derivadas.

---

## 3. Tecnologias aplicadas

### 3.1 Visão geral da stack

| Camada | Tecnologia | Versão no projeto | Papel |
| --- | --- | --- | --- |
| Runtime da UI | [React](https://react.dev/) + `react-dom` | 19 | Componentes, estado local, eventos |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) | 5.7 | Tipos estritos em `src/` |
| Build / dev server | [Vite](https://vite.dev/) | 6 | HMR, bundle ES, servir `public/` |
| Plugin React | `@vitejs/plugin-react` | 4.3 | JSX/TSX e Fast Refresh |
| Módulos | Node ESM (`"type": "module"`) | — | Imports nativos |
| Estilos | CSS puro (`src/styles.css`) | — | Layout, tema, responsivo |
| Tipografia web | Google Fonts (Cinzel, Inter, Lora) | — | Controles e texto |
| Tipografia de marca | Ringbearer (`RINGM___.TTF`) | — | Títulos da enciclopédia |
| Roteamento | Hash próprio (`src/lib/routes.ts`) | — | Sem React Router |
| Estado global | `useState` / `useEffect` em `App.tsx` | — | Sem Redux, Zustand etc. |
| Persistência leve | `localStorage` / `sessionStorage` | — | Vista, comitiva, som, capas |
| Áudio (opcional) | Web Audio API | — | Tons curtos ao abrir ficha |
| Retratos | Python 3 + [Pillow](https://python-pillow.org/) | — | PNG → WebP 400×400 |
| Empacotamento | npm | — | Dependências e scripts |

**O que deliberadamente não entra na stack atual:** React Router, biblioteca de estado, framework CSS (Tailwind, Bootstrap), ORM, backend, CMS, banco de dados. O conteúdo vive em módulos TypeScript em `src/data/`.

### 3.2 TypeScript

Configuração em `tsconfig.json`:

- `target` / `lib`: **ES2022** + DOM
- `module`: **ESNext**, resolução **bundler**
- `jsx`: **react-jsx** (sem importar React só para JSX)
- `strict`: ligado
- `noUnusedLocals` / `noUnusedParameters`: ligados
- `noEmit`: `tsc` só checa tipos; o Vite gera o bundle
- `include`: apenas `src`

Tipos de domínio em `src/types.ts` (`Character`, `Race`, `Era`, `Rarity`, filtros). Rotas tipadas em `src/lib/routes.ts` (`PageId`, `Route`). Dados de lugares, mapas e criaturas têm interfaces próprias nos respectivos arquivos de dados.

### 3.3 Vite e React

- `vite.config.ts`: plugin React e servidor fixo na porta **5173**.
- Se a 5173 estiver ocupada, o Vite sobe em outra porta — o navegador na instância antiga deixa de ver as alterações.
- Entrada: `index.html` → `#root` → `src/main.tsx` → `<App />` em `StrictMode`.
- `import.meta.env.DEV` liga a checagem `assertDex` do catálogo só em desenvolvimento.
- Tudo em `public/` é servido na raiz (`/banner/...`, `/portraits/...`, `/lugares/...`, `/mapas/...`, `/criaturas-raca/...`).
- Arte de origem em `pictures/` **não** entra no bundle; precisa ser copiada para `public/` (exceto o fluxo automatizado de retratos).

### 3.4 Interface e CSS

- Um único stylesheet: `src/styles.css`.
- Variáveis de cor por raça em `src/theme.ts` (`--race`, `--race-ink`, `--race-deep`).
- Layout responsivo com pontos de quebra documentados abaixo.
- Invólucro liso (`.device.is-plain`) nas salas principais; `Room` (couro/parafusos/halo) nas salas ainda vazias.
- `ResizeObserver` mede cards e monta o encaixe da ficha na grade (`.grid.is-wrapped` / `.place-grid.is-wrapped`).
- Texto rico nas cartas de Criaturas: parser leve de `**negrito**` e `*itálico*` em `KindredPortal`.

### 3.5 Roteamento e navegação

Não há React Router. O endereço é o **hash** da URL:

1. `readRoute(hash)` interpreta a página, o id de personagem e o id de lugar.
2. `routeHash(page, entryId, placeId)` monta o hash.
3. `App` escuta `popstate` e sincroniza o estado.
4. Trocar de página zera ficha/lugar abertos e volta o scroll ao topo.

Seleção de carta em Criaturas e de folha em Mapas fica em **estado local** do componente — não entra no hash.

### 3.6 Dados e “backend” atual

| Fonte | Arquivo | Conteúdo |
| --- | --- | --- |
| Personagens | `src/data/characters.ts` | 175 fichas + `assertDex` |
| Retratos | `src/data/portraits.ts` | id → URL WebP |
| Criaturas / povos | `src/data/kindred.ts` | 16 cartas + artigos |
| Lugares (cards) | `src/data/places.ts` | salas e capas |
| Lugares (ficha) | `place-lore*.ts` | relato longo + aliases |
| Mapas | `src/data/maps.ts` | 16 folhas |

Modelo atual: arrays e objetos tipados no cliente. O documento conceitual de tabelas (`entities`, `entity_relationships`, `sources` etc.) permanece como **visão futura** se o projeto migrar para CMS ou banco; hoje as relações são `related` (personagens) e `entryId` (figuras nas cartas de Criaturas).

### 3.7 Armazenamento no navegador

| Chave | API | Conteúdo |
| --- | --- | --- |
| `lorthdex-view` | `localStorage` | `grade` ou `lista` |
| `lorthdex-party` | `localStorage` | até 6 ids da comitiva |
| `lorthdex-sound` | `localStorage` | `on` / `off` |
| `lorthdex-place-covers` | `sessionStorage` | capas sorteadas dos portões de Lugares |

### 3.8 Pipeline de imagens

```bash
npm run portraits   # python scripts/update-portraits.py
```

Exige Python e Pillow. Lê pastas em `pictures/`, reduz a no máximo 400×400 e grava `public/portraits/{id}.webp` (qualidade 68), só quando o original é mais novo. Banners, lugares, mapas e cartas de criaturas são copiados à mão para `public/`. Query `?v=` fura cache quando o arquivo muda no mesmo URL (`gollum.webp?v=2`, por exemplo).

### 3.9 Scripts npm

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc --noEmit && vite build
npm run preview   # serve dist/
npm run portraits # regenera retratos WebP
```

### 3.10 Acessibilidade e idioma

- Página em `pt-BR`.
- Link “Ir para o conteúdo”, `aria-current` no menu, rótulos em botões de carta.
- Navegação por teclado nas fichas (`Esc`, setas; `/` foca a busca em Personagens e Catálogo).
- Contraste e hierarquia pensados para leitura longa (Lora no corpo, Inter nos controles).

---

## 4. Identidade visual

A interface deve lembrar uma biblioteca antiga ou um manuscrito histórico, sem prejudicar a legibilidade.

**Paleta:** pergaminho e papel envelhecido, verde-musgo, dourado envelhecido, marrom-escuro, neutros para texto e divisórias.

**Tipografia:**

| Fonte | Uso |
| --- | --- |
| **Ringbearer** | Títulos de marca (peso normal; sem síntese de negrito) |
| **Cinzel** | Reserva de títulos / destaque |
| **Lora** | Textos longos e leitura editorial |
| **Inter** | Navegação, filtros, botões |

Princípios: legibilidade e hierarquia; ornamentos com moderação; diferenciar citações, fontes e notas; não depender só de cor para status; padrões consistentes entre salas.

---

## 5. Navegação principal

Menu superior atual:

1. Início (`#/`)
2. Bestiário (`#/bestiario`) — permanece marcado também em Criaturas e Personagens
3. Lugares (`#/lugares`)
4. História de Arda (`#/historia`) — sala ainda vazia
5. Mapas (`#/mapas`)

Rodapé: Sobre, Créditos, Termos de Uso, Políticas de privacidade.

Visão editorial mais ampla (ainda não toda implementada como itens de menu): Personagens, Povos e Criaturas, Lugares, História, Artefatos e Relíquias, Idiomas e Escritas, Mapas. Na prática, Personagens e Criaturas entram pelo Bestiário; Artefatos e Idiomas são fases futuras.

### 5.1 Início

Hero com Minas Tirith, CTA para Mapas, cards para Personagens, Criaturas e Lugares, bloco Sobre e destaques.

### 5.2 Bestiário

Portão com texto introdutório. À esquerda, **Criaturas de Arda** → `#/racas`. À direita, **Personagens do Mundo de Arda** → `#/personagens`.

### 5.3 Personagens

Catálogo Dex com busca, filtros (era, povo/raça, raridade), ordem e fichas com atributos, habilidades, vínculos `related` e formas alternativas.

### 5.4 Povos e Criaturas

Cartas editoriais em `#/racas` (`KindredPortal`). Povos e criaturas compartilham a mesma sala; a distinção fica no texto e nas observações canônicas de cada carta.

### 5.5 Lugares

Organizados por Aman e Valinor, Primeira Era, Segunda Era e Terceira Era (esta última com portões para lugares gerais e especiais/misteriosos).

### 5.6 Mapas

Folhas regionais com era, epíteto, relato, livros, região e acontecimentos. Sem camadas interativas por enquanto.

### 5.7 História / Artefatos / Idiomas

Planejados. História já tem rota; Artefatos (Anéis, Silmarils, Palantíri, armas etc.) e Idiomas (Quenya, Sindarin, Khuzdul, Tengwar, Cirth etc.) ainda não têm salas.

---

## 6. Rotas (hash)

| Hash | Página |
| --- | --- |
| `#/` | Home |
| `#/bestiario` | Portal do bestiário |
| `#/racas` | Criaturas da Terra-média |
| `#/criaturas` | Redireciona para `#/racas` |
| `#/personagens` | Personagens do Mundo de Arda |
| `#/personagens/:id` | Ficha aberta em Personagens |
| `#/racas/:id` | Legado → ficha em Personagens |
| `#/criaturas/:id` | Legado → ficha em Personagens |
| `#/catalogo` | Catálogo completo |
| `#/registro/:id` | Ficha no catálogo completo |
| `#/lugares` | Índice de Lugares |
| `#/lugares/aman` | Aman e Valinor |
| `#/lugares/primeira` | Primeira Era |
| `#/lugares/segunda` | Segunda Era |
| `#/lugares/terceira` | Terceira Era (dois portões) |
| `#/lugares/terceira/lugares` | Lugares na Terceira Era |
| `#/lugares/terceira/especiais` | Lugares Especiais e Misteriosos |
| `#/historia` | Sala ainda vazia |
| `#/mapas` | Mapas de Arda |
| `#/sobre` | Sobre o projeto |
| `#/creditos` | Sala ainda vazia |
| `#/termos` | Sala ainda vazia |
| `#/privacidade` | Sala ainda vazia |

`:id` de personagem: `[a-z0-9-]+`. Trechos de lugares: `[a-z]+`. Id inexistente abre a página sem ficha ou volta ao índice de lugares.

---

## 7. Páginas e banners

Home, Bestiário, Criaturas, Personagens, Catálogo, Sobre, Lugares e Mapas usam `.device.is-plain`. História, Créditos, Termos e Privacidade ainda usam `Room`.

| Página | Banner | Enquadramento |
| --- | --- | --- |
| Home | `minas_tirith_banner.png` | herói, `72% center` |
| Bestiário | `banner-bestiario.png` | `center 62%` |
| Personagens | `exercito-antes-da-batalha.png?v=2` | `is-host`, `center 30%` |
| Criaturas | `nazgul-cacador.png` | `is-hunt` |
| Sobre | `BannerPortadeDurin.png` | `is-gate` |
| Lugares | `Banner_lugares.png` | `is-places`, `center 32%` |
| Mapas | `BannerMapaAntigodaTerraMedia.png?v=1` | `is-atlas` |

Banners das salas de Lugares vêm de `public/lugares/`:

| Sala | Arquivo | Classe |
| --- | --- | --- |
| Aman e Valinor | `Aman_e_Valinor/Valinor.png` | `is-aman` |
| Primeira Era | `primeira_era/Falas.png` | `is-falas` |
| Segunda Era | `segunda_era/Portos_Cinzentos_Mithlond.png` | `is-mithlond` |
| Terceira Era | `terceira_era/Campos_do_Pelennor.png` | `is-pelennor` |
| Lugares na Terceira Era | `terceira_era/Bree.png` | `is-bree` |
| Especiais e Misteriosos | `.../CâmaradeMazarbulbanner.png?v=1` | `is-mazarbul` |

Banner do portal: 460px (240px até 800px), largura `100vw`.

---

## 8. Criaturas (`#/racas`)

`KindredPortal` + `src/data/kindred.ts`. 16 cartas: Ainur, Elfos, Meio-elfos, Homens, Hobbits, Ents, Huorns, Grandes Águias, Mearas, Dragões, Grandes Aranhas, Orcs, Trolls, Lobisomens, Bestas aladas, Seres misteriosos. Anões e Beornianos ainda sem carta (faltam imagens).

Na grade: só imagem + nome curto. A carta aberta some da grade; a ficha envolve esquerda e fileiras de baixo.

Campos: `title`, `blocks` (`p` \| `h` \| `ul`), `figuresLead`, `figureGroups`, `figures`, `sources` (livros + observações). Imagens em `public/criaturas-raca/` via `kindredImageSrc`.

`entryId` abre personagem (Hobbit → `#/catalogo`; demais → `#/personagens`). Sem `entryId`, o nome fica texto.

---

## 9. Personagens e catálogo

### 9.1 Modelo de ficha de personagem (implementado)

Campos em `Character`: `id`, `number`, `name`, `epithet`, `genus`, `race`, `region`, `allegiance`, `era`, `rarity`, `stature`, `presence`, `summary`, `lore`, `voice`, `sigil`, `stats`, `abilities`, `strengths`, `weaknesses`, `related`. Opcionais: `services`, `anomalous`, `forms`.

Atributos 1–100: força, agilidade, sabedoria, coragem, poder, vontade (índice = soma / 600). Habilidades: `ativa`, `passiva`, `suprema`.

Visão editorial ampliada (família formal, objetos, destino detalhado, etiquetas por campo) pode ser acrescentada sem abandonar esses campos.

### 9.2 Recortes

`PORTAL_RACES` → `#/personagens` (sem Hobbit). `RACES` → `#/catalogo` (com Hobbit).

| Raça | Onde | Qtd. |
| --- | --- | --- |
| Humano | Personagens | 60 |
| Anão | Personagens | 22 |
| Maia | Personagens | 16 |
| Meio-elfo | Personagens | 13 |
| Elfo | Personagens | 11 |
| Ent | Personagens | 6 |
| Beorniano | Personagens | 2 |
| Hobbit | só catálogo | 21 |
| Dragão | Personagens | 7 |
| Enigma | Personagens | 4 |
| Águia | Personagens | 4 |
| Mearas | Personagens | 4 |
| Nazgûl | Personagens | 3 |
| Aranha | Personagens | 2 |

Eras: Terceira, Segunda, Primeira, Fora do tempo. Raridades: comum, incomum, raro, lendário, mítico.

`assertDex` (só em DEV) recusa id/número inválidos, buracos na sequência, atributos fora de faixa e vínculos quebrados ou circulares.

### 9.3 Busca e atalhos

`matchesQuery` (`src/lib/dex.ts`) busca em nome, epíteto, gênero, região, aliança, raça, era, raridade, habilidades, resistências, fraquezas e `services`. **Não** busca em `lore`, `summary` nem `voice`.

`normalize`: NFD sem diacríticos, minúsculas; hífen e apóstrofo permanecem.

Teclas: `/` foca busca; `Esc` fecha ficha ou limpa busca; setas percorrem a lista visível.

### 9.4 Relacionamentos

Hoje: array `related` entre personagens e `entryId` nas figuras de Criaturas. Visão futura: tipos explícitos (`parent_of`, `member_of`, `participated_in`, `carried_by` etc.) com fonte e grau de certeza — sem transformar proximidade narrativa em parentesco.

---

## 10. Lugares

100 cards: Aman 11, Primeira Era 19, Segunda Era 15, Terceira Era 31, Especiais 24. Dados em `places.ts` + lore em `place-lore-west.ts` / `place-lore-east.ts` + aliases em `place-lore.ts`.

Índice com quatro portões; capas sorteadas em `sessionStorage`. Ficha: epíteto, eras, texto do card, nomes ao longo das Eras, livros, quem passou, relato.

---

## 11. Mapas

16 folhas em `maps.ts`: Arda, Aman e Valinor, Beleriand, Terra-média, Eriador, Condado, Arnor, Montanhas Sombrias, Rhovanion, Rohan, Rohan na Terceira Era, Gondor, Gondor nas Eras, Númenor, Harad, Rhûn.

Campos: `eras`, `epithet`, `text`, `books`, `region`, `events`. Imagens em `public/mapas/`. Evolução futura: camadas por Era, marcadores ligados a lugares/eventos.

---

## 12. Ficha aberta e layout

`Detail` / fichas de lugar, kindred e mapa: um scroll (o da página). A partir de 1040px, a ficha envolve a grade; abaixo disso, largura total acima dos cards. Lista Dex: duas colunas (≥ 1040px).

| Largura | O que muda |
| --- | --- |
| ≥ 1040px | Ficha ao lado / envolvida |
| ≤ 1039px | Ficha em largura total |
| ≤ 900px | Menu vira botão |
| ≤ 800px | Banner 240px |
| ≤ 520px | Grade do catálogo em 2 colunas |

Grade solta: `repeat(auto-fill, minmax(190px, 1fr))`, vão 12px. Grade de lugares/mapas/criaturas: vão 16px, coluna mín. 230px.

---

## 13. Retratos e tema

Pastas de origem em `pictures/` (`humanos-atualizados`, `anoes-atualizados`, `Hobbit-atualizados`, etc.). Sem retrato → selo (`Sigil` / `Medallion`). Cores por raça em `src/theme.ts`.

---

## 14. O que está desligado

Em `App.tsx`:

- `partyEnabled = false` — comitiva e barra inferior ocultas (código e `localStorage` permanecem; máx. 6 ids).
- `soundEnabled = false` — controle de som oculto (`playEntrySound` via Web Audio API).

---

## 15. Mapa dos arquivos

```
index.html              página, fontes e favicon
vite.config.ts          plugin React e porta 5173
tsconfig.json           TypeScript estrito, noEmit
package.json            dependências e scripts
src/main.tsx            entrada
src/App.tsx             estado, páginas e rodapé
src/styles.css          todo o visual
src/types.ts            tipos, raças, eras e raridades
src/theme.ts            cores de raça e de atributo
src/data/characters.ts  175 fichas + assertDex
src/data/portraits.ts   id → URL do WebP
src/data/kindred.ts     cartas e artigos de Criaturas
src/data/maps.ts        folhas de Mapas
src/data/places.ts      cards e salas de Lugares
src/data/place-lore.ts  ficha do lugar e aliases
src/data/place-lore-west.ts
src/data/place-lore-east.ts
src/lib/routes.ts       hash
src/lib/dex.ts          busca, ordem, índice
src/lib/storage.ts      localStorage
src/lib/sound.ts        tom de abertura
src/components/         Home, About, BestiaryPortal, KindredPortal,
                        Maps, DexBoard, Detail, Entries, Header, Nav,
                        Toolbar, Room, Medallion, Sigil, PartyBar,
                        Places, PlaceDetail
scripts/update-portraits.py
pictures/               arte de origem (fora do bundle)
pictures/Lugares/
pictures/criaturas-raca/
pictures/mapas-lotr/
public/                 servido em /
public/lugares/
public/criaturas-raca/
public/mapas/
public/portraits/
```

---

## 16. Como acrescentar conteúdo

### Personagem

1. Objeto em `characters` com `number` = tamanho atual da lista.
2. `related` só para ids existentes.
3. PNG na pasta de `pictures/` + mapa em `scripts/update-portraits.py`.
4. `npm run portraits` e entrada em `portraits.ts`.
5. Conferir o console em DEV (`assertDex`).

### Lugar

1. Card em `places.ts`.
2. Copiar PNG para `public/lugares/` no mesmo caminho.
3. Lore em `place-lore-west.ts` ou `place-lore-east.ts`, ou alias em `place-lore.ts`.

### Carta de Criaturas

1. Objeto em `kindred.ts`.
2. PNG em `pictures/criaturas-raca/` e `public/criaturas-raca/`.
3. `entryId` só com personagem existente; artigos longos em `blocks` / `sources` sem reescrever o texto colado.

### Mapa

1. Objeto em `maps.ts`.
2. PNG em `pictures/mapas-lotr/` e `public/mapas/`.
3. `events` em traço largo.

### Regras antes de publicar

1. Confirmar nome e grafia na fonte.
2. Identificar obra, capítulo ou seção.
3. Separar fatos de interpretações.
4. Verificar se o registro já existe com outro nome.
5. Não criar fichas individuais para membros anônimos de um grupo.
6. Não tratar nomes alternativos como personagens diferentes.
7. Indicar versão alternativa ou adaptação.
8. Revisar relações, cronologia e localização.
9. Ligar registros relacionados quando houver fundamento.
10. Registrar dúvidas e lacunas em vez de preencher com suposições.

---

## 17. Roadmap

### Feito (fundação + conteúdo conectado inicial)

- Identidade visual e layout principal
- Menu, Home, Sobre
- Catálogo de personagens com busca e filtros
- Bestiário, cartas de Criaturas, Personagens
- Lugares por Era
- Mapas regionais
- Fontes e observações canônicas nas cartas de povos/criaturas
- Relacionamentos básicos (`related`, `entryId`)

### Próximo

- Preencher História de Arda (cronologia por Eras)
- Cartas faltantes (Anões, Beornianos) quando houver arte
- Expandir vínculos e linhagens com tipos explícitos
- Artefatos e relíquias
- Idiomas e escritas
- Créditos, Termos e Privacidade

### Depois

- Mapas com camadas / marcadores
- Genealogias e árvores visuais
- Linha do tempo interativa
- Favoritos e coleções (comitiva já existe no código, desligada)
- Comparador de registros
- Busca avançada por conexões
- CMS ou banco, se o volume exigir painel editorial

**Meta:** enciclopédia funcional com busca, categorias, fichas, relacionamentos e fontes confiáveis. Mapas avançados, genealogias gráficas e recursos comunitários entram em versões posteriores.

---

## 18. Modelo de dados sugerido (futuro)

Visão conceitual, caso o projeto saia dos módulos TypeScript:

| Tabela | Responsabilidade |
| --- | --- |
| `entities` | Núcleo de personagens, lugares, criaturas, artefatos |
| `categories` / `entity_categories` | Taxonomia |
| `entity_names` | Nomes alternativos e epítetos |
| `entity_relationships` | Relações tipadas + certeza + fonte |
| `peoples` / `locations` / `artifacts` / `languages` | Dados específicos |
| `eras` / `events` / `event_participants` | Cronologia |
| `sources` / `entity_sources` | Bibliografia |
| `images` | Créditos e licenças |

Hoje isso está materializado de forma enxuta em `characters`, `kindred`, `places`, `place-lore*` e `maps`.
