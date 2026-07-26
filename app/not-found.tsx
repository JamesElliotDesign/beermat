import Link from "next/link";
import { Logo } from "../components/Logo";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <Logo />
      <div className="not-found-mat" aria-hidden="true"><span>404</span><div /></div>
      <p className="eyebrow">BIT LOST?</p>
      <h1>Whatever you were looking for isn&apos;t here.</h1>
      <p>Either I moved it, or you&apos;ve made up a URL. Both feel plausible.</p>
      <Link className="button button-primary" href="/">Back to the pub →</Link>
    </main>
  );
}
