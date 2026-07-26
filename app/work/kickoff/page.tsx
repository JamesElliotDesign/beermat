import type { Metadata } from "next";
import { WorkShell } from "../../../components/WorkShell";
import { KickoffDemo } from "./KickoffDemo";

export const metadata: Metadata = {
  title: "Kickoff — working prototype",
  description: "A working client-onboarding prototype that turns missing files, access and reminders into a clear path to kickoff.",
  alternates: { canonical: "/work/kickoff" },
  openGraph: { title: "Kickoff — Your client sent the logo. Somewhere. Probably.", description: "A Beer Mat working prototype for client onboarding.", url: "/work/kickoff", images: ["/og-kickoff.png"] },
};

export default function KickoffPage() {
  return (
    <WorkShell>
      <section className="case-hero"><p className="eyebrow">02 / KICKOFF</p><h1>Your client sent the logo.<br/><span>Somewhere. Probably.</span></h1><p>A small project should not begin with four days of detective work across email, WhatsApp, Drive and “I&apos;ll send that later”.</p></section>
      <section className="story-flow">
        <article className="story-problem"><span>THE COMPLAINT</span><h2>Chasing basic project bits quietly eats the week.</h2><p>The work is ready to begin, except the logo is in an old thread, nobody knows who owns the domain and the access invite never happened.</p></article>
        <article className="story-mat"><span>THE BEER MAT</span><div className="scribble-list"><b>one checklist</b><b>files + access in context</b><b>show the blocker</b><b>nudge without chasing</b></div></article>
        <article className="story-nope"><span>WHAT I NEARLY BUILT</span><p><del>Full project management suite</del></p><p><del>Time tracking</del></p><p><del>Team chat</del></p><p><del>Another bloody CRM</del></p></article>
        <article className="story-point"><span>WHAT ACTUALLY MATTERS</span><h2>Know what is missing and make the next move obvious.</h2><p>Once everything is there, the product should stop onboarding and let the actual project start.</p></article>
      </section>
      <KickoffDemo />
      <section className="case-end"><p className="eyebrow">THE POINT</p><h2>Chasing is work. Make the system do it.</h2><p>The prototype now has a complete ending: resolve the blockers, hit 100%, choose a kickoff slot and book it. A real sprint would map the team&apos;s exact checklist, secure-access handoffs, calendar and reminder rules.</p></section>
    </WorkShell>
  );
}
