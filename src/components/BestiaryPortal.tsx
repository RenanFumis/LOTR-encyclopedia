import type { CSSProperties } from "react";
import type { PageId } from "../lib/routes";

function CardMark({ src }: { src: string }) {
  return <span className="portal-card-mark" style={{ "--mark": `url(${src})` } as CSSProperties} aria-hidden="true" />;
}

export function BestiaryPortal({ onOpen }: { onOpen: (page: PageId) => void }) {
  return (
    <main id="conteudo" className="portal bestiary-portal">
      <div className="portal-banner">
        <img src="/banner/banner-bestiario.png" alt="Clarão entre as raízes de uma floresta antiga." />
      </div>

      <section className="bestiary-intro">
        <h2>O Bestiário de Arda</h2>
        <div className="ornamental-divider" aria-hidden="true">
          <span>✧</span>
        </div>
        <p className="bestiary-lead">
          A Terra-média é um mundo de extraordinária diversidade, habitado por povos antigos, criaturas misteriosas e seres de diferentes origens e naturezas. Das florestas ancestrais às profundezas das montanhas, cada um possui seu lugar na vasta história de Arda.
        </p>
        <div className="bestiary-copy">
          <p>
            Inspirado pelas mitologias antigas, pelas tradições medievais e por seu profundo amor pelas línguas e pela natureza, J.R.R. Tolkien criou um universo onde povos, culturas e criaturas possuem histórias próprias, entrelaçadas ao longo das Eras do Mundo.
          </p>
          <p>
            Dos imortais Elfos e habilidosos Anões aos pequenos Hobbits e aos diversos povos dos Homens, Arda também abriga poderosos Dragões, misteriosos Ents, grandes Águias, temíveis Balrogs e inúmeros outros seres, cujas origens e destinos nem sempre são conhecidos.
          </p>
          <p>
            Este Bestiário reúne essa extraordinária diversidade, explorando suas origens, características e histórias. Mais do que um catálogo de seres, é um convite para descobrir a riqueza de um mundo que continua a fascinar gerações de leitores.
          </p>
          <p className="bestiary-close">
            Explore os povos que moldaram a Terra-média e as criaturas que deram vida às histórias de Arda.
          </p>
        </div>
      </section>

      <section className="portal-cards bestiary-gates" aria-label="Salas do bestiário">
        <article className="portal-card bestiary-gate has-art">
          <button type="button" className="bestiary-gate-hit" onClick={() => onOpen("racas")}>
            <div className="portal-card-art">
              <img className="is-watcher" src="/VigiaNaAgua.png" alt="" />
            </div>
            <div className="portal-card-title">
              <CardMark src="/flavicon/pata.png?v=2" />
              <span className="bestiary-gate-title">Criaturas de Arda</span>
            </div>
            <p>Dos imortais Elfos aos pequenos Hobbits, dos poderosos Dragões às criaturas mais misteriosas, descubra a diversidade de povos e seres que habitam Arda e enriquecem sua história ao longo das Eras.</p>
          </button>
        </article>

        <article className="portal-card bestiary-gate has-art">
          <button type="button" className="bestiary-gate-hit" onClick={() => onOpen("personagens")}>
            <div className="portal-card-art">
              <img src="/Azaghal.png" alt="" />
            </div>
            <div className="portal-card-title">
              <CardMark src="/flavicon/business-people.png?v=2" />
              <span className="bestiary-gate-title">Personagens do Mundo de Arda</span>
            </div>
            <p>De grandes reis e lendários heróis a temíveis dragões e seres ancestrais, descubra os personagens que moldaram o destino de Arda ao longo das Eras.</p>
          </button>
        </article>
      </section>

      <section className="quote-divider">
        <span>Ainda há seres em Arda que nenhum sábio classificou.</span>
      </section>
    </main>
  );
}
