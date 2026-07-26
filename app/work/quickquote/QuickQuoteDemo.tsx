"use client";

import { useMemo, useRef, useState } from "react";

type Job = "Bathroom renovation" | "Kitchen refresh" | "General refurb";
type View = "customer" | "builder" | "quote";
type QuoteLine = { id: string; label: string; amount: number };

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const serviceBase: Record<Job, number> = { "Bathroom renovation": 3200, "Kitchen refresh": 2800, "General refurb": 1900 };
const leadStages = ["New enquiry", "Qualified", "Site visit", "Quote sent", "Won"];

function startingQuoteLines(): QuoteLine[] {
  return [
    { id: "labour", label: "Labour", amount: 2800 },
    { id: "materials", label: "Materials", amount: 3700 },
    { id: "waste", label: "Waste / removal", amount: 450 },
    { id: "contingency", label: "Contingency", amount: 600 },
  ];
}

export function QuickQuoteDemo() {
  const [view, setView] = useState<View>("customer");
  const [step, setStep] = useState(1);
  const [job, setJob] = useState<Job>("Bathroom renovation");
  const [postcode, setPostcode] = useState("TR1 3AB");
  const [property, setProperty] = useState("Terraced house");
  const [size, setSize] = useState(6);
  const [strip, setStrip] = useState(true);
  const [plumbing, setPlumbing] = useState(true);
  const [electrics, setElectrics] = useState(false);
  const [finish, setFinish] = useState("Mid-range");
  const [timeline, setTimeline] = useState("Within 1–3 months");
  const [budget, setBudget] = useState("£7k–£10k");
  const [notes, setNotes] = useState("Keep the existing window. Happy to change the layout if it saves money.");
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState("Jamie");
  const [email, setEmail] = useState("jamie@example.com");
  const [phone, setPhone] = useState("07700 900123");
  const [leadStatus, setLeadStatus] = useState("New enquiry");
  const [copied, setCopied] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState("Draft");
  const [quoteLines, setQuoteLines] = useState<QuoteLine[]>(startingQuoteLines);
  const [discount, setDiscount] = useState(0);
  const [validity, setValidity] = useState("14 days");
  const [quoteNote, setQuoteNote] = useState("Includes labour, standard materials and waste removal. Final specification confirmed after site visit.");
  const [sendNotice, setSendNotice] = useState(false);
  const customId = useRef(1);

  const estimate = useMemo(() => {
    const base = serviceBase[job];
    const areaRate = job === "General refurb" ? 190 : 310;
    const area = size * areaRate;
    const extras = (strip ? 850 : 0) + (plumbing ? 1200 : 0) + (electrics ? 650 : 0);
    const finishFactor = finish === "Budget-smart" ? 0.86 : finish === "High-end" ? 1.28 : 1;
    const low = Math.round(((base + area + extras) * finishFactor) / 100) * 100;
    const high = Math.round((low * 1.24) / 100) * 100;
    return { base, area, extras, finishFactor, low, high };
  }, [job, size, strip, plumbing, electrics, finish]);

  const score = useMemo(() => {
    let points = 1;
    if (postcode.trim().length > 4) points += 1;
    if (timeline !== "Just researching") points += 1;
    if (budget !== "Not sure yet") points += 1;
    if (notes.trim().length > 24) points += 1;
    if (photos.length > 0) points += 1;
    if (phone.trim().length > 8) points += 1;
    return { points, label: points >= 6 ? "Strong lead" : points >= 4 ? "Worth a call" : "Needs detail" };
  }, [postcode, timeline, budget, notes, photos, phone]);

  const flags = useMemo(() => {
    const values: string[] = [];
    if (timeline === "As soon as possible") values.push("Urgent start");
    if (plumbing) values.push("Plumbing moved");
    if (electrics) values.push("Electrical scope");
    if (finish === "High-end") values.push("High-end finish");
    if (!photos.length) values.push("Needs photos");
    return values;
  }, [timeline, plumbing, electrics, finish, photos]);

  const quoteSubtotal = quoteLines.reduce((sum, line) => sum + Math.max(0, line.amount), 0);
  const quoteTotal = Math.max(0, quoteSubtotal - discount);
  const completion = Math.round((step / 4) * 100);
  const reference = "QQ-0427";

  function next() { setStep((current) => Math.min(4, current + 1)); }
  function back() { setStep((current) => Math.max(1, current - 1)); }

  function openBuilder() {
    setLeadStatus(score.points >= 4 ? "Qualified" : "New enquiry");
    setView("builder");
  }

  function seedQuoteFromEstimate() {
    const midpoint = Math.round(((estimate.low + estimate.high) / 2) / 50) * 50;
    setQuoteLines([
      { id: "labour", label: "Labour", amount: Math.round(midpoint * 0.38 / 50) * 50 },
      { id: "materials", label: "Materials", amount: Math.round(midpoint * 0.46 / 50) * 50 },
      { id: "waste", label: "Waste / removal", amount: Math.round(midpoint * 0.06 / 50) * 50 },
      { id: "contingency", label: "Contingency", amount: Math.round(midpoint * 0.1 / 50) * 50 },
    ]);
    setDiscount(0);
    setQuoteStatus("Draft");
    setSendNotice(false);
    setLeadStatus((current) => current === "New enquiry" ? "Qualified" : current);
    setView("quote");
  }

  function updateQuoteLine(id: string, patch: Partial<QuoteLine>) {
    setQuoteLines((current) => current.map((line) => line.id === id ? { ...line, ...patch } : line));
    setQuoteStatus("Draft");
    setSendNotice(false);
  }

  function addQuoteLine() {
    const id = `custom-${customId.current++}`;
    setQuoteLines((current) => [...current, { id, label: "Extra item", amount: 0 }]);
    setQuoteStatus("Draft");
    setSendNotice(false);
  }

  function removeQuoteLine(id: string) {
    setQuoteLines((current) => current.filter((line) => line.id !== id));
    setQuoteStatus("Draft");
    setSendNotice(false);
  }

  function sendQuote() {
    setQuoteStatus("Sent");
    setLeadStatus("Quote sent");
    setSendNotice(true);
  }

  function reset() {
    setView("customer"); setStep(1); setJob("Bathroom renovation"); setPostcode("TR1 3AB"); setProperty("Terraced house");
    setSize(6); setStrip(true); setPlumbing(true); setElectrics(false); setFinish("Mid-range"); setTimeline("Within 1–3 months");
    setBudget("£7k–£10k"); setNotes("Keep the existing window. Happy to change the layout if it saves money."); setPhotos([]);
    setName("Jamie"); setEmail("jamie@example.com"); setPhone("07700 900123"); setLeadStatus("New enquiry"); setCopied(false);
    setQuoteStatus("Draft"); setQuoteLines(startingQuoteLines()); setDiscount(0); setValidity("14 days"); setQuoteNote("Includes labour, standard materials and waste removal. Final specification confirmed after site visit."); setSendNotice(false); customId.current = 1;
  }

  async function copyBrief() {
    const text = `${reference} — ${name}\n${job}, ${size}m², ${postcode}\nEstimate: ${money.format(estimate.low)}–${money.format(estimate.high)}\nTimeline: ${timeline}\nBudget: ${budget}\nScope: ${[strip && "strip-out", plumbing && "move plumbing", electrics && "electrics"].filter(Boolean).join(", ") || "light work"}\nNotes: ${notes}`;
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  }

  return (
    <div className="demo-panel tool-shell quickquote-tool-v5" id="prototype">
      <div className="demo-topline">
        <div className="demo-title-stack"><span>QUICKQUOTE / WORKING PROTOTYPE</span><small>Fake builder. Real interaction.</small></div>
        <div className="demo-toolbar"><div className="demo-tabs"><button type="button" className={view === "customer" ? "active" : ""} onClick={() => setView("customer")}>Customer form</button><button type="button" className={view === "builder" ? "active" : ""} onClick={() => setView("builder")}>Builder inbox</button><button type="button" className={view === "quote" ? "active" : ""} onClick={() => setView("quote")}>Quote builder</button></div><button type="button" className="tiny-action" onClick={reset}>Reset demo</button></div>
      </div>

      {view === "customer" && <>
        <div className="tool-progress" aria-label={`Step ${step} of 4`}><span style={{ width: `${completion}%` }} /></div>
        <details className="mobile-estimate">
          <summary>
            <span><small>LIVE ESTIMATE · {score.label.toUpperCase()}</small><strong>{money.format(estimate.low)}–{money.format(estimate.high)}</strong></span>
            <b>Details ↓</b>
          </summary>
          <div className="mobile-estimate-body">
            <p>Indicative only — enough to set expectations before Steve spends an evening building a quote.</p>
            <div className="mobile-estimate-breakdown">
              <div><span>Base job</span><strong>{money.format(estimate.base)}</strong></div>
              <div><span>Size / labour</span><strong>{money.format(estimate.area)}</strong></div>
              <div><span>Scope extras</span><strong>{money.format(estimate.extras)}</strong></div>
              <div><span>Finish</span><strong>× {estimate.finishFactor.toFixed(2)}</strong></div>
            </div>
            <div className="mobile-estimate-facts"><span>{job}</span><span>{property}</span><span>{timeline}</span></div>
          </div>
        </details>
        <div className="quote-layout quote-v3">
          <section className="tool-main">
            <div className="step-rail" aria-label="Quote steps">{["Job", "Scope", "Fit", "Contact"].map((label, index) => { const number = index + 1; return <button key={label} type="button" className={number === step ? "active" : number < step ? "done" : ""} onClick={() => setStep(number)}><span>{number < step ? "✓" : number}</span>{label}</button>; })}</div>
            <div className="tool-step-head"><span>STEP {step} / 4</span><h3>{step === 1 ? "What are we actually quoting?" : step === 2 ? "What makes the job expensive?" : step === 3 ? "Is this a real lead or a daydream?" : "Where should Steve send the next step?"}</h3></div>

            {step === 1 && <div className="form-stack"><div className="choice-grid three">{(["Bathroom renovation", "Kitchen refresh", "General refurb"] as Job[]).map((value) => <button key={value} type="button" className={job === value ? "choice-card active" : "choice-card"} onClick={() => setJob(value)}><strong>{value}</strong><span>{value === "Bathroom renovation" ? "Full or partial bathroom work" : value === "Kitchen refresh" ? "Units, surfaces, services" : "A mixed bag of jobs"}</span></button>)}</div><div className="field-grid two"><label>Postcode<input value={postcode} onChange={(event) => setPostcode(event.target.value)} /></label><label>Property<select value={property} onChange={(event) => setProperty(event.target.value)}><option>Terraced house</option><option>Detached house</option><option>Flat</option><option>Commercial unit</option></select></label></div></div>}

            {step === 2 && <div className="form-stack"><label className="range-field"><span><strong>Approximate room size</strong><b>{size}m²</b></span><input type="range" min="3" max="24" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><div className="toggle-grid"><label className={strip ? "toggle-card on" : "toggle-card"}><input type="checkbox" checked={strip} onChange={(event) => setStrip(event.target.checked)} /><span>Full strip-out</span><small>Rip it back before rebuilding</small></label><label className={plumbing ? "toggle-card on" : "toggle-card"}><input type="checkbox" checked={plumbing} onChange={(event) => setPlumbing(event.target.checked)} /><span>Move plumbing</span><small>Not just swap like-for-like</small></label><label className={electrics ? "toggle-card on" : "toggle-card"}><input type="checkbox" checked={electrics} onChange={(event) => setElectrics(event.target.checked)} /><span>Electrical work</span><small>Lighting, sockets or new feeds</small></label></div><label>Finish level<select value={finish} onChange={(event) => setFinish(event.target.value)}><option>Budget-smart</option><option>Mid-range</option><option>High-end</option></select></label></div>}

            {step === 3 && <div className="form-stack"><div className="field-grid two"><label>When do you want to start?<select value={timeline} onChange={(event) => setTimeline(event.target.value)}><option>Just researching</option><option>Within 1–3 months</option><option>Within 4–8 weeks</option><option>As soon as possible</option></select></label><label>Rough budget<select value={budget} onChange={(event) => setBudget(event.target.value)}><option>Not sure yet</option><option>Under £5k</option><option>£5k–£7k</option><option>£7k–£10k</option><option>£10k+</option></select></label></div><label>Anything Steve should know?<textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} /></label><label className="upload-box"><input type="file" multiple accept="image/*" onChange={(event) => setPhotos(Array.from(event.target.files ?? []).map((file: File) => file.name))} /><strong>{photos.length ? `${photos.length} photo${photos.length === 1 ? "" : "s"} attached ✓` : "Drop in a few photos"}</strong><span>{photos.length ? photos.slice(0, 2).join(" · ") : "Prototype only — files stay in your browser."}</span></label></div>}

            {step === 4 && <div className="form-stack"><div className="field-grid two"><label>Name<input value={name} onChange={(event) => setName(event.target.value)} /></label><label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} /></label></div><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><div className="review-card"><span>WHAT STEVE GETS</span><strong>{job} · {size}m² · {postcode || "no postcode"}</strong><p>{timeline} · budget {budget.toLowerCase()} · {photos.length ? `${photos.length} photos` : "no photos yet"}</p><p>{notes || "No extra notes."}</p></div></div>}

            <div className="tool-actions"><button className="button ghost-button" type="button" onClick={back} disabled={step === 1}>← Back</button>{step < 4 ? <button className="button button-primary" type="button" onClick={next}>Next bit →</button> : <button className="button button-primary" type="button" onClick={openBuilder}>Send proper quote request →</button>}</div>
          </section>

          <aside className="quote-summary"><div className="summary-label"><span>LIVE ESTIMATE</span><b>{score.label}</b></div><strong className="big-money">{money.format(estimate.low)}–{money.format(estimate.high)}</strong><p>Indicative only — the useful bit is setting expectations before Steve spends an evening writing a quote.</p><div className="estimate-breakdown"><div><span>Base job</span><strong>{money.format(estimate.base)}</strong></div><div><span>Size / labour</span><strong>{money.format(estimate.area)}</strong></div><div><span>Scope extras</span><strong>{money.format(estimate.extras)}</strong></div><div><span>Finish factor</span><strong>× {estimate.finishFactor.toFixed(2)}</strong></div></div><dl className="summary-list"><div><dt>Job</dt><dd>{job}</dd></div><div><dt>Property</dt><dd>{property}</dd></div><div><dt>Scope</dt><dd>{[strip && "strip-out", plumbing && "plumbing", electrics && "electrics"].filter(Boolean).join(" · ") || "light work"}</dd></div><div><dt>Timeline</dt><dd>{timeline}</dd></div><div><dt>Photos</dt><dd>{photos.length || "none yet"}</dd></div></dl><div className="tool-note">Change the answers. The range, breakdown and lead signal update as you go.</div></aside>
        </div>
      </>}

      {view === "builder" && <div className="builder-inbox"><aside className="lead-list-panel"><div className="inbox-head"><span>INBOX</span><strong>3 enquiries</strong></div><button className="lead-row selected" type="button"><i className="lead-dot hot"/><span><strong>{name || "Jamie"}</strong><small>{job} · {postcode}</small></span><b>{score.label}</b></button><button className="lead-row" type="button"><i className="lead-dot"/><span><strong>Claire</strong><small>Kitchen refresh · PL26</small></span><b>Needs detail</b></button><button className="lead-row" type="button"><i className="lead-dot warm"/><span><strong>Tom</strong><small>General refurb · TR8</small></span><b>Worth a call</b></button><p className="inbox-note">The fake neighbours are here so this feels like a tiny working inbox, not a lonely UI card.</p></aside><section className="lead-detail">
        <div className="lead-detail-head"><div><p className="client-label">{reference} · {score.label.toUpperCase()}</p><h3>{name || "Jamie"} wants a {job.toLowerCase()}.</h3></div><select value={leadStatus} onChange={(event) => setLeadStatus(event.target.value)} aria-label="Lead status">{leadStages.map((stage) => <option key={stage}>{stage}</option>)}<option>Not a fit</option></select></div>
        <div className="lead-status-trail" aria-label="Lead progress">{leadStages.map((stage, index) => { const activeIndex = leadStages.indexOf(leadStatus); const done = activeIndex >= index; return <button key={stage} type="button" className={done ? "done" : ""} onClick={() => setLeadStatus(stage)}><i />{stage}</button>; })}</div>
        <div className="lead-metrics"><article><span>INDICATIVE RANGE</span><strong>{money.format(estimate.low)}–{money.format(estimate.high)}</strong></article><article><span>LEAD SCORE</span><strong>{score.points}/7</strong></article><article><span>START</span><strong>{timeline}</strong></article></div>
        <div className="lead-columns"><div className="lead-brief"><span>JOB BRIEF</span><dl><div><dt>Property</dt><dd>{property} · {postcode}</dd></div><div><dt>Room</dt><dd>{size}m² · {finish}</dd></div><div><dt>Budget</dt><dd>{budget}</dd></div><div><dt>Scope</dt><dd>{[strip && "Full strip-out", plumbing && "Move plumbing", electrics && "Electrical work"].filter(Boolean).join(" · ") || "Light work"}</dd></div><div><dt>Contact</dt><dd>{phone}<br/>{email}</dd></div></dl>{photos.length > 0 && <div className="lead-photo-strip"><span>ATTACHMENTS</span><div>{photos.slice(0, 4).map((photo, index) => <figure key={`${photo}-${index}`}><i>{index + 1}</i><figcaption>{photo}</figcaption></figure>)}</div></div>}<div className="lead-notes"><span>CLIENT NOTES</span><p>{notes || "Nothing added."}</p></div></div><aside className="lead-actions-card"><span>STEVE&apos;S NEXT MOVE</span><h4>{score.points >= 6 ? "Worth a site visit." : "Get a bit more detail first."}</h4><div className="flag-list">{flags.length ? flags.map((flag) => <span key={flag}>{flag}</span>) : <span>No obvious flags</span>}</div><button type="button" className="button button-primary wide" onClick={seedQuoteFromEstimate}>Build the quote →</button><button type="button" className="button ghost-button wide" onClick={() => setLeadStatus("Site visit")}>{leadStatus === "Site visit" ? "Site visit booked ✓" : "Book site visit"}</button><button type="button" className="tiny-action wide" onClick={copyBrief}>{copied ? "Brief copied ✓" : "Copy job brief"}</button></aside></div>
      </section></div>}

      {view === "quote" && <div className="quote-builder-v5"><section className="quote-editor"><div className="quote-editor-head"><div><p className="client-label">QUOTE {reference}</p><h3>Turn the lead into something sendable.</h3></div><span className={`quote-status ${quoteStatus === "Sent" ? "sent" : ""}`}>{quoteStatus}</span></div>
        <div className="quote-line-editor-v5">{quoteLines.map((line) => <div className="quote-line-row" key={line.id}><input aria-label="Line item name" value={line.label} onChange={(event) => updateQuoteLine(line.id, { label: event.target.value })} /><div className="money-input"><span>£</span><input aria-label={`${line.label} amount`} type="number" min="0" value={line.amount} onChange={(event) => updateQuoteLine(line.id, { amount: Number(event.target.value) })} /></div><button type="button" aria-label={`Remove ${line.label}`} onClick={() => removeQuoteLine(line.id)}>×</button></div>)}</div>
        <button type="button" className="tiny-action add-line" onClick={addQuoteLine}>+ Add line item</button>
        <div className="quote-options-grid"><label><span>Discount</span><div className="money-input"><span>£</span><input type="number" min="0" value={discount} onChange={(event) => { setDiscount(Number(event.target.value)); setQuoteStatus("Draft"); setSendNotice(false); }} /></div></label><label><span>Quote valid for</span><select value={validity} onChange={(event) => setValidity(event.target.value)}><option>7 days</option><option>14 days</option><option>30 days</option></select></label></div>
        <label className="quote-note-editor"><span>CUSTOMER NOTE</span><textarea rows={4} value={quoteNote} onChange={(event) => setQuoteNote(event.target.value)} /></label>
        {sendNotice && <div className="quote-send-notice"><strong>Quote sent to {name}. Nothing exploded. Lovely.</strong><span>The lead moved to Quote sent and this document now carries a sent state.</span></div>}
        <div className="quote-editor-actions"><button type="button" className="button ghost-button" onClick={() => setView("builder")}>← Back to lead</button><button type="button" className="button button-primary" onClick={sendQuote}>{quoteStatus === "Sent" ? "Send again →" : "Send quote →"}</button></div>
      </section><aside className="quote-document"><div className="quote-doc-brand"><strong>STEVE&apos;S BATHROOMS</strong><span>QUOTE · {reference}</span></div><div className="quote-doc-for"><small>PREPARED FOR</small><strong>{name}</strong><span>{email}<br/>{postcode}</span></div><h4>{job}</h4><p>{size}m² · {finish} · {timeline}</p><div className="quote-doc-lines">{quoteLines.map((line) => <div key={line.id}><span>{line.label || "Untitled item"}</span><b>{money.format(line.amount)}</b></div>)}{discount > 0 && <div className="discount"><span>Discount</span><b>−{money.format(discount)}</b></div>}</div><div className="quote-doc-total"><span>TOTAL</span><strong>{money.format(quoteTotal)}</strong></div><div className="quote-doc-note"><span>VALID FOR {validity.toUpperCase()}</span><p>{quoteNote}</p></div>{quoteStatus === "Sent" && <div className="quote-sent-stamp">SENT ✓</div>}</aside></div>}
    </div>
  );
}
