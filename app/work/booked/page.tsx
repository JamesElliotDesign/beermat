import type { Metadata } from "next";
import { WorkShell } from "../../../components/WorkShell";
import { BookedDemo } from "./BookedDemo";

export const metadata: Metadata = {
  title: "Booked. — working prototype",
  description: "A working prototype for turning customer reschedule messages into real availability, team assignments and confirmations.",
  alternates: { canonical: "/work/booked" },
  openGraph: { title: "Booked. — Neither WhatsApp nor Dave is a booking system.", description: "A Beer Mat working prototype for small-team scheduling.", url: "/work/booked", images: ["/og-booked.png"] },
};

export default function BookedPage() {
  return (
    <WorkShell>
      <section className="case-hero booked-case-hero">
        <p className="eyebrow">03 / BOOKED.</p>
        <h1><span className="booked-main">WhatsApp is not a booking system.</span><span className="booked-punch">Neither is Dave.</span></h1>
        <p>Small teams already receive perfectly understandable requests in messages. The friction starts when somebody has to turn those messages into availability, staff assignments, deposits and confirmations.</p>
      </section>
      <section className="story-flow">
        <article className="story-problem"><span>THE COMPLAINT</span><h2>“Can I move Thursday?” should not open four browser tabs.</h2><p>The message is clear. The hard bit is checking capacity, moving the diary, handling staff and making sure the customer actually knows.</p></article>
        <article className="story-mat"><span>THE BEER MAT</span><div className="scribble-list"><b>message → action</b><b>show real availability</b><b>stop double-booking Dave</b><b>confirm the customer</b></div></article>
        <article className="story-nope"><span>WHAT I NEARLY BUILT</span><p><del>Enterprise CRM</del></p><p><del>Marketing automation</del></p><p><del>Customer loyalty metaverse</del></p><p><del>“Digital transformation”</del></p></article>
        <article className="story-point"><span>WHAT ACTUALLY MATTERS</span><h2>Remove the remembering.</h2><p>The system should know the diary, catch the conflict and leave the human to deal with the human.</p></article>
      </section>
      <BookedDemo />
      <section className="case-end"><p className="eyebrow">THE POINT</p><h2>Make the admin feel as simple as the customer&apos;s message.</h2><p>The prototype now follows the whole little story: request → availability → assignment → diary update → customer confirmation. A real sprint would plug in the business&apos;s services, staff rules, payment system and actual messages.</p></section>
    </WorkShell>
  );
}
