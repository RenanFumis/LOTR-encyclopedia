import { toWebpSrc } from "../lib/media";

export function Architecture() {
  return (
    <main id="conteudo" className="portal">
      <section className="bestiary-intro">
        <h2>Arquitetura do Projeto</h2>
        <p className="about-kicker">Site de estudo — stack, dados, build e publicação</p>
        <div className="ornamental-divider" aria-hidden="true">
          <span>✧</span>
        </div>
      </section>

      <article className="about-essay legal-doc architecture-doc">
        <section>
          <h2>1. Natureza do projeto</h2>
          <p>
            A <strong>Enciclopédia da Terra-Média</strong> (pacote npm <code>lorthdex</code>) é um{" "}
            <strong>projeto de estudo e laboratório front-end</strong>, criado por um fã das obras de J.R.R. Tolkien.
            O conteúdo editorial é cultural e informativo; a base técnica serve para praticar React, TypeScript,
            organização de dados tipados, roteamento, performance de mídia e publicação estática.
          </p>
          <p>
            Não há backend, CMS, banco de dados nem autenticação. Todo o conteúdo vive em módulos TypeScript no
            cliente e é empacotado como site estático para hospedagem compartilhada (ex.: HostGator).
          </p>
          <p>
            O projeto <strong>não possui afiliação</strong> com o Tolkien Estate, a Tolkien Trust, editoras ou a
            Middle-earth Enterprises. É uma iniciativa independente, de fã para fã.
          </p>
        </section>

        <section>
          <h2>2. Objetivos técnicos de estudo</h2>
          <ul>
            <li>Montar uma SPA React com TypeScript estrito, sem frameworks de estado ou roteamento externos.</li>
            <li>Modelar um domínio rico (personagens, povos, lugares, mapas) em dados tipados versionados no repositório.</li>
            <li>Implementar navegação por hash compatível com hospedagem estática.</li>
            <li>Projetar interface editorial responsiva com CSS próprio (sem Tailwind/Bootstrap).</li>
            <li>Otimizar imagens (WebP, lazy-load) para publicação na web.</li>
            <li>Documentar decisões de arquitetura e limites conscientes da stack.</li>
          </ul>
        </section>

        <section>
          <h2>3. Diagrama geral da arquitetura</h2>
          <p>Visão em camadas do que o visitante acessa e de como o código se organiza:</p>
          <figure className="arch-figure">
            <img
              src={toWebpSrc("/diagramas/Infografico-da-Arquitetura-da-Terra-media.png")}
              alt="Infográfico da arquitetura da Enciclopédia da Terra-média, com camadas do navegador ao build e publicação."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>

        <section>
          <h2>4. Fluxo de navegação (hash routing)</h2>
          <p>
            Não usamos React Router. O endereço é o <strong>hash</strong> da URL (<code>#/lugares</code>,{" "}
            <code>#/personagens/aragorn</code>). Isso permite publicar em qualquer hospedagem estática sem
            reescrita de URL no servidor.
          </p>
          <figure className="arch-figure">
            <img
              src={toWebpSrc("/diagramas/Fluxo-de-Navegacao-Hash-Routing.png")}
              alt="Diagrama do fluxo de navegação por hash routing, da URL ao estado em App.tsx."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>

        <section>
          <h2>5. Stack tecnológica</h2>
          <div className="arch-table-wrap">
            <table className="arch-table">
              <thead>
                <tr>
                  <th>Camada</th>
                  <th>Tecnologia</th>
                  <th>Papel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UI</td>
                  <td>React 19 + react-dom</td>
                  <td>Componentes, estado local, eventos</td>
                </tr>
                <tr>
                  <td>Linguagem</td>
                  <td>TypeScript 5.7 (strict)</td>
                  <td>Tipos de domínio e checagem com <code>tsc --noEmit</code></td>
                </tr>
                <tr>
                  <td>Build / Dev</td>
                  <td>Vite 6 + @vitejs/plugin-react</td>
                  <td>HMR, bundle ES, servir <code>public/</code></td>
                </tr>
                <tr>
                  <td>Estilos</td>
                  <td>CSS puro (<code>styles.css</code>)</td>
                  <td>Layout, tema, responsivo</td>
                </tr>
                <tr>
                  <td>Tipografia</td>
                  <td>Ringbearer, Cinzel, Lora, Inter</td>
                  <td>Marca e leitura editorial</td>
                </tr>
                <tr>
                  <td>Roteamento</td>
                  <td><code>src/lib/routes.ts</code></td>
                  <td>Hash próprio, sem React Router</td>
                </tr>
                <tr>
                  <td>Estado</td>
                  <td>useState / useEffect em App</td>
                  <td>Sem Redux, Zustand ou Context global</td>
                </tr>
                <tr>
                  <td>Persistência</td>
                  <td>localStorage / sessionStorage</td>
                  <td>Vista, comitiva, som, capas de lugares</td>
                </tr>
                <tr>
                  <td>Mídia</td>
                  <td>Python 3 + Pillow</td>
                  <td>Retratos e otimização WebP</td>
                </tr>
                <tr>
                  <td>Publicação</td>
                  <td>Site estático (<code>dist/</code>)</td>
                  <td>HostGator / qualquer hospedagem de arquivos</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Deliberadamente fora da stack atual:</strong> React Router, biblioteca de estado global,
            Tailwind/Bootstrap, ORM, API REST, CMS e banco de dados.
          </p>
        </section>

        <section>
          <h2>6. Modelo de dados (tudo no cliente)</h2>
          <p>
            O “backend” atual são módulos tipados em <code>src/data/</code>. Relações entre registros usam ids
            estáveis (<code>related</code>, <code>entryId</code>), validados em desenvolvimento quando aplicável.
          </p>
          <ul>
            <li>
              <code>characters.ts</code> — fichas do catálogo Dex (atributos, habilidades, vínculos, eras).
            </li>
            <li>
              <code>portraits.ts</code> — mapa id → URL WebP do retrato.
            </li>
            <li>
              <code>kindred.ts</code> — cartas editoriais de povos e criaturas (<code>blocks</code>, figuras, fontes).
            </li>
            <li>
              <code>places.ts</code> — cards e salas de lugares por Era.
            </li>
            <li>
              <code>place-lore-west.ts</code> / <code>place-lore-east.ts</code> — artigos longos de lugares
              (título, meta, blocos, figuras, fontes).
            </li>
            <li>
              <code>place-lore.ts</code> — resolução de ficha e aliases.
            </li>
            <li>
              <code>maps.ts</code> — folhas regionais do atlas.
            </li>
          </ul>
          <figure className="arch-figure">
            <img
              src={toWebpSrc("/diagramas/Modelo-de-Dados-em-Pergaminho-Fantastico.png")}
              alt="Diagrama do modelo de dados no cliente: personagens, criaturas, lugares e mapas."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>

        <section>
          <h2>7. Organização das salas da interface</h2>
          <ul>
            <li>
              <strong>Início</strong> — hero, atalhos para Personagens, Criaturas e Lugares.
            </li>
            <li>
              <strong>Bestiário</strong> — portal para Criaturas (<code>#/racas</code>) e Personagens.
            </li>
            <li>
              <strong>Personagens / Catálogo</strong> — busca, filtros, grade/lista e ficha detalhada.
            </li>
            <li>
              <strong>Lugares</strong> — portões por Era (Aman, Primeira, Segunda, Terceira e especiais).
            </li>
            <li>
              <strong>Mapas</strong> — folhas regionais com relato e eras.
            </li>
            <li>
              <strong>Sobre / Privacidade / Arquitetura</strong> — páginas editoriais e técnicas do projeto.
            </li>
            <li>
              <strong>História / Termos</strong> — salas reservadas para expansão.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. Pipeline de imagens</h2>
          <p>
            Retratos e artes grandes são o maior volume do site. O fluxo de estudo inclui otimização antes da
            publicação:
          </p>
          <figure className="arch-figure">
            <img
              src={toWebpSrc("/diagramas/Infografico-Pipeline-de-Imagens.png")}
              alt="Infográfico do pipeline de imagens: originais, retratos, otimização WebP e uso na interface."
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p>
            Após a otimização, <code>public/</code> fica em torno de dezenas de megabytes em vez de centenas —
            essencial para upload e carregamento na HostGator.
          </p>
        </section>

        <section>
          <h2>9. Build, preview e publicação</h2>
          <ul>
            <li>
              <code>npm run dev</code> — servidor local Vite (porta 5173).
            </li>
            <li>
              <code>npm run build</code> — <code>tsc --noEmit</code> + <code>vite build</code> → pasta{" "}
              <code>dist/</code>.
            </li>
            <li>
              <code>npm run preview</code> — serve o <code>dist/</code> localmente.
            </li>
            <li>
              Publicação: enviar o <strong>conteúdo</strong> de <code>dist/</code> para{" "}
              <code>public_html</code> (ou pasta do domínio).
            </li>
          </ul>
          <p>
            Como a navegação usa hash, em geral <strong>não é necessário</strong> <code>.htaccess</code> para
            rotas da SPA.
          </p>
        </section>

        <section>
          <h2>10. Mapa de pastas relevantes</h2>
          <figure className="arch-figure">
            <img
              src={toWebpSrc("/diagramas/Mapa-de-Pastas-Relevantes.png")}
              alt="Mapa das pastas relevantes do projeto: src, scripts, pictures, public e dist."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>

        <section>
          <h2>11. Decisões de design técnico</h2>
          <ul>
            <li>
              <strong>Conteúdo como código</strong> — facilita revisão, Git e estudo de tipagem; troca-se
              flexibilidade de CMS por controle editorial no repositório.
            </li>
            <li>
              <strong>Hash routing</strong> — publicação simples em hospedagem compartilhada.
            </li>
            <li>
              <strong>Um stylesheet</strong> — menos abstração, mais controle visual da identidade de
              “arquivo/manuscrito”.
            </li>
            <li>
              <strong>Sem backend</strong> — o escopo de estudo permanece no front-end e na modelagem de dados
              locais.
            </li>
            <li>
              <strong>WebP + lazy-load</strong> — performance real em produção, não só em localhost.
            </li>
          </ul>
        </section>

        <section>
          <h2>12. Limites conscientes e próximos passos</h2>
          <p>Como projeto de estudo, alguns limites são intencionais:</p>
          <ul>
            <li>Sem painel editorial; alterações passam por código e build.</li>
            <li>Sem busca full-text no lore longo de lugares (a busca Dex cobre campos de personagem).</li>
            <li>História de Arda, Termos de Uso e algumas cartas ainda são salas/expansões futuras.</li>
            <li>Comitiva e som existem no código, mas podem estar desligados na interface.</li>
          </ul>
          <p>
            Possíveis evoluções de estudo: code-splitting do bundle, CMS/banco se o volume exigir painel,
            mapas com camadas, genealogias tipadas e linha do tempo interativa — sempre preservando a
            distinção entre cânone, versões alternativas e adaptações.
          </p>
        </section>

        <section>
          <h2>13. Crédito técnico</h2>
          <p>
            Desenvolvimento e arquitetura deste site de estudo: <strong>Meir Fumis</strong>.
          </p>
          <p>
            Stack aberta (React, TypeScript, Vite e ferramentas citadas) sob suas respectivas licenças. Conteúdo
            inspirado no legendário de J.R.R. Tolkien, utilizado com finalidade educativa e cultural.
          </p>
        </section>
      </article>
    </main>
  );
}
