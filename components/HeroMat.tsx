export function HeroMat() {
  return (
    <aside className="beer-mat hero-mat hero-mat-forming" aria-label="A beer mat sketch showing the one-week prototype sprint">
      <div className="mat-paper-grain" aria-hidden="true" />
      <div className="mat-stitch" aria-hidden="true" />
      <div className="beer-mat-ring" aria-hidden="true" />
      <p className="beer-mat-note n1">rough idea</p>
      <p className="beer-mat-note n2">cut the fluff</p>
      <p className="beer-mat-note n3">build the useful bit</p>
      <div className="mat-center">
        <small>THE SPRINT</small>
        <strong>1 WEEK</strong>
        <span>one working thing</span>
      </div>
      <svg viewBox="0 0 220 110" className="mat-arrow" aria-hidden="true">
        <path className="arrow-line" d="M18 72 C70 103 142 99 196 52" />
        <path className="arrow-head" d="M181 52 L199 51 L194 68" />
      </svg>
      <span className="mat-result">holy sh*t, it works →</span>
    </aside>
  );
}
