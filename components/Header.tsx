import Link from "next/link";
import { IdeaCtaLink } from "./AnalyticsLink";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="site-header shell">
      <Logo />
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#process">The sprint</Link>
        <IdeaCtaLink href="/#start" className="nav-cta" analyticsLocation="header" analyticsLabel="Bring me an idea">Bring me an idea ↗</IdeaCtaLink>
      </nav>
    </header>
  );
}
