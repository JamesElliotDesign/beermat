import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="site-header shell">
      <Logo />
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#process">The sprint</Link>
        <Link href="/#start" className="nav-cta">Bring me an idea ↗</Link>
      </nav>
    </header>
  );
}
