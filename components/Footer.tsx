import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer shell v4-footer">
      <div className="footer-brand">
        <Logo />
        <p>Rough ideas → working things.</p>
      </div>
      <div className="footer-middle">
        <span>BEER MAT / 2026</span>
        <strong>Prototype sprints for ideas that deserve to leave your head.</strong>
        <small>Built without a 48-page discovery deck.</small>
      </div>
      <div className="footer-right">
        <a href="mailto:hello@beermat.dev">hello@beermat.dev</a>
        <a href="https://beermat.dev">beermat.dev ↗</a>
        <span>One week. One useful thing. Then reality gets a vote.</span>
      </div>
    </footer>
  );
}
