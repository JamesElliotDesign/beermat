import Link from "next/link";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function WorkShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <div className="work-page shell">
        <Link href="/#work" className="back-link">← Back to the experiments</Link>
        {children}
      </div>
      <Footer />
    </main>
  );
}
