import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="Beer Mat home">
      <span className="brand-mat" aria-hidden="true">
        <span className="brand-ring" />
        <span className="brand-scribble">bm</span>
      </span>
      <span className="brand-copy">
        <strong>BEER MAT</strong>
        <small>rough idea → working thing</small>
      </span>
    </Link>
  );
}
