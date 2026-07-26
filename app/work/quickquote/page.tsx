import type { Metadata } from "next";
import { WorkShell } from "../../../components/WorkShell";
import { QuickQuoteDemo } from "./QuickQuoteDemo";
import { PrototypeTracker } from "../../../components/PrototypeTracker";

export const metadata: Metadata = {
  title: "QuickQuote — working prototype",
  description: "A working trades quoting prototype that turns vague enquiries into qualified leads and editable quotes.",
  alternates: { canonical: "/work/quickquote" },
  openGraph: { title: "QuickQuote — Steve builds bathrooms. Steve hates building quotes.", description: "A Beer Mat working prototype for trades lead qualification and quoting.", url: "/work/quickquote", images: ["/og-quickquote.png"] },
};

export default function QuickQuotePage() {
  return (
    <WorkShell>
      <PrototypeTracker prototype="quickquote" />
      <section className="case-hero"><p className="eyebrow">01 / QUICKQUOTE</p><h1>Steve builds bathrooms.<br/><span>Steve hates building quotes.</span></h1><p>How do you turn “how much for a bathroom mate?” into enough structured information to know whether the job deserves Steve&apos;s evening?</p></section>
      <section className="story-flow"><article className="story-problem"><span>THE COMPLAINT</span><h2>Small jobs can take half an evening to quote badly.</h2><p>The enquiry arrives missing the useful bits, so the trade spends time extracting scope, expectations and budget before pricing even begins.</p></article><article className="story-mat"><span>THE BEER MAT</span><div className="scribble-list"><b>ask Steve&apos;s questions first</b><b>show an honest range</b><b>photos + timeline + budget</b><b>package the lead</b></div></article><article className="story-nope"><span>WHAT I NEARLY BUILT</span><p><del>Full CRM</del></p><p><del>Invoicing</del></p><p><del>Customer accounts</del></p><p><del>AI tradesperson synergy engine™</del></p></article><article className="story-point"><span>WHAT ACTUALLY MATTERS</span><h2>Know whether the job is worth chasing before the admin starts.</h2><p>That is enough for version one. Everything else can earn its way in later.</p></article></section>
      <QuickQuoteDemo />
      <section className="case-end"><p className="eyebrow">THE POINT</p><h2>Get Steve out of admin mode and back into builder mode.</h2><p>The prototype now goes from customer enquiry → qualified lead → editable line-item quote → send state. A real sprint would replace the example logic with the trade&apos;s actual pricing, services, qualifying questions and output.</p></section>
    </WorkShell>
  );
}
