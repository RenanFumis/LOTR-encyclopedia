export function Room({ kicker, title, children }: { kicker: string; title: string; children: string }) {
  return (
    <main id="conteudo" className="sheet">
      <p className="brand-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p>{children}</p>
    </main>
  );
}
