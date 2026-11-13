import type { ReactNode } from "react";

export type RichBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "ul"; items: string[] };

function parseRich(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let index = 0;
  let key = 0;
  while (index < text.length) {
    if (text.startsWith("**", index)) {
      const end = text.indexOf("**", index + 2);
      if (end === -1) {
        nodes.push(text.slice(index));
        break;
      }
      nodes.push(<strong key={`${keyPrefix}-${key++}`}>{parseRich(text.slice(index + 2, end), `${keyPrefix}-b`)}</strong>);
      index = end + 2;
      continue;
    }
    if (text[index] === "*") {
      const end = text.indexOf("*", index + 1);
      if (end === -1) {
        nodes.push(text.slice(index));
        break;
      }
      nodes.push(<em key={`${keyPrefix}-${key++}`}>{text.slice(index + 1, end)}</em>);
      index = end + 1;
      continue;
    }
    const next = text.indexOf("*", index);
    if (next === -1) {
      nodes.push(text.slice(index));
      break;
    }
    nodes.push(text.slice(index, next));
    index = next;
  }
  return nodes;
}

export function RichText({ text }: { text: string }) {
  return parseRich(text, "r");
}

export function BlockList({ blocks, summaryFirst = false }: { blocks: RichBlock[]; summaryFirst?: boolean }) {
  let paragraphIndex = 0;
  return blocks.map((block, index) => {
    if (block.kind === "h") return <h3 className="section-title" key={`h-${index}`}>{block.text}</h3>;
    if (block.kind === "ul") {
      return (
        <ul className="kindred-sources" key={`ul-${index}`}>
          {block.items.map((item) => (
            <li key={item}><RichText text={item} /></li>
          ))}
        </ul>
      );
    }
    const lead = summaryFirst && paragraphIndex === 0;
    paragraphIndex += 1;
    return (
      <p className={lead ? "summary" : "lore"} key={`p-${index}`}>
        <RichText text={block.text} />
      </p>
    );
  });
}
