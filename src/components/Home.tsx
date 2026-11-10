import type { CSSProperties } from "react";
import type { PageId } from "../lib/routes";

function CardMark({ src }: { src: string }) {
  return <span className="portal-card-mark" style={{ "--mark": `url(${src})` } as CSSProperties} aria-hidden="true" />;
}

export function Home({
  onOpen,
  onOpenEntry,
}: {
  onOpen: (page: PageId) => void;
  onOpenEntry: (id: string) => void;
}) {
  return (
    <main id="conteudo" className="portal">
      <section className="portal-hero">
        <img
          className="portal-hero-banner"
          src="/banner/minas_tirith_banner.png"
          alt="Cidade branca erguida na encosta de uma montanha."
        />
        <div className="portal-hero-copy">
          <h2>
            Bem-vindo à
            <span>Enciclopédia de Terra-média</span>
          </h2>
          <div className="hero-divider" aria-hidden="true">
            <span>✧</span>
          </div>
          <p>
            Uma jornada pelo mundo de Tolkien, reunindo histórias, povos, lugares e maravilhas de todas as Eras.
          </p>
          <button type="button" className="portal-cta" onClick={() => onOpen("catalogo")}>
            Explorar a Enciclopédia
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      </section>

      <div className="ornamental-divider" aria-hidden="true">
        <span>✧</span>
      </div>

      <section className="portal-cards" aria-label="Salas">
        <article className="portal-card">
          <div className="portal-card-art">
            <img src="/portraits/gandalf.webp" alt="" />
          </div>
          <div className="portal-card-body">
            <div className="portal-card-title">
              <CardMark src="/flavicon/business-people.png?v=2" />
              <h3>Personagens</h3>
            </div>
            <p>Conheça os grandes e os pequenos protagonistas da Terra-média.</p>
            <button type="button" className="portal-link" onClick={() => onOpen("racas")}>
              Explorar Personagens
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </article>

        <article className="portal-card">
          <div className="portal-card-art">
            <img src="/portraits/ancalagon.webp" alt="" />
          </div>
          <div className="portal-card-body">
            <div className="portal-card-title">
              <CardMark src="/flavicon/pata.png?v=2" />
              <h3>Criaturas</h3>
            </div>
            <p>Descubra criaturas, povos e raças que habitam Arda.</p>
            <button type="button" className="portal-link" onClick={() => onOpen("criaturas")}>
              Explorar o Criaturas
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </article>

        <article className="portal-card">
          <div className="portal-card-art">
            <img src="/Isengard-Angrenost.png" alt="" />
          </div>
          <div className="portal-card-body">
            <div className="portal-card-title">
              <CardMark src="/flavicon/localizador-de-lugar.png?v=3" />
              <h3>Lugares</h3>
            </div>
            <p>Explore as terras e regiões que moldam a história de Arda.</p>
            <button type="button" className="portal-link" onClick={() => onOpen("lugares")}>
              Explorar os Lugares
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </article>
      </section>

      <section className="portal-lower">
        <div className="portal-about">
          <h2>Sobre esta Enciclopédia</h2>
          <div className="ornamental-divider" aria-hidden="true">
            <span>✧</span>
          </div>
          <div className="portal-about-row">
            <img src="/emblema-hobbit.png?v=2" alt="Emblema dos hobbits." />
            <div className="portal-about-copy">
              <p>
              Um projeto dedicado a preservar e compartilhar o rico universo criado por J.R.R. Tolkien, unindo conhecimento, curiosidade e admiração por sua obra.
              </p>
              <button type="button" className="portal-cta portal-about-cta" onClick={() => onOpen("sobre")}>
                Saiba mais sobre o projeto
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          </div>
        </div>

        <span className="portal-rule" role="presentation"></span>

        <div className="portal-highlight">
          <h2>Destaques</h2>
          <div className="portal-highlight-row">
            <img src="/lotr.png?v=2" alt="" />
            <div>
              <h3>As duas Árvors de Valinor</h3>
              <p>Símbolo de beleza e esperança, as Duas Árvores marcaram o início e o fim da Idade dos Elfos.</p>
              <button type="button" className="portal-link" onClick={() => onOpenEntry("bilbo")}>
                Ler mais
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          </div>
        </div>

        <span className="portal-rule" role="presentation"></span>

        <figure className="portal-parchment">
          <img src="/pergaminho.png?v=3" alt="Pergaminho com uma citação de J.R.R. Tolkien." />
        </figure>
      </section>
      <section className="quote-divider">
        <span>
          Mesmo a menor das criaturas pode mudar o curso da história.
        </span>
      </section>
    </main>
  );
}
