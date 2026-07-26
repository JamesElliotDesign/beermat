import Link from "next/link";

type Props = {
  number: string;
  title: string;
  strap: string;
  note: string;
  href: string;
  tag: string;
};

export function CaseCard({ number, title, strap, note, href, tag }: Props) {
  return (
    <Link href={href} className="case-card">
      <div className="case-topline">
        <span className="case-number">REAL PROBLEM {number}</span>
        <span className="case-tag">{tag}</span>
      </div>
      <div className="case-body">
        <p className="eyebrow">{title}</p>
        <h3>{strap}</h3>
        <p className="case-note">{note}</p>
      </div>
      <span className="case-link">Play with it <span aria-hidden="true">↗</span></span>
    </Link>
  );
}
