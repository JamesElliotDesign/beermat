"use client";

import { useMemo, useState } from "react";

type Item = { id: number; label: string; help: string; done: boolean; file?: string; type: "details" | "upload" | "access" | "copy" };
type StudioClient = { id: string; name: string; project: string; readiness: number; blocker: string; start: string; tone: string };

const initialItems: Item[] = [
  { id: 1, label: "Company details", help: "Trading name, address, VAT details and main contact.", done: true, type: "details" },
  { id: 2, label: "Logo files", help: "SVG/AI preferred. PNG is fine if that is all you have.", done: false, type: "upload" },
  { id: 3, label: "Domain access", help: "Invite studio@northstar.test to your DNS provider. Do not email passwords.", done: false, type: "access" },
  { id: 4, label: "Website copy", help: "Final-ish copy is enough. We can refine it later.", done: true, file: "website-copy-v3.docx", type: "copy" },
  { id: 5, label: "Analytics access", help: "Add us to GA4/Search Console if they exist.", done: false, type: "access" },
];

const studioClients: StudioClient[] = [
  { id: "pete", name: "Pete's Plumbing", project: "Website rebuild", readiness: 40, blocker: "Logo files", start: "12 Aug", tone: "orange" },
  { id: "bex", name: "Bex Coffee", project: "Launch site", readiness: 100, blocker: "Ready to start", start: "06 Aug", tone: "green" },
  { id: "north", name: "Northshore", project: "Brand + web", readiness: 60, blocker: "Domain access", start: "19 Aug", tone: "blue" },
  { id: "lucy", name: "Lucy Yoga", project: "Membership site", readiness: 20, blocker: "Just invited", start: "02 Sep", tone: "acid" },
];

const kickoffSlots = ["Tuesday · 10:30", "Tuesday · 14:00", "Wednesday · 11:00", "Thursday · 15:30"];

export function KickoffDemo() {
  const [view, setView] = useState<"client" | "studio">("client");
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(2);
  const [activity, setActivity] = useState(["Pete completed Company details", "Website copy received", "Kickoff link opened by Pete"]);
  const [note, setNote] = useState("Can you use the older van icon from the logo pack if it still works?");
  const [studioNote, setStudioNote] = useState("Need to check whether their domain is still with GoDaddy before kickoff.");
  const [copied, setCopied] = useState(false);
  const [kickoffBooked, setKickoffBooked] = useState(false);
  const [kickoffSlot, setKickoffSlot] = useState("Wednesday · 11:00");
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [reminderMode, setReminderMode] = useState("Every 2 days");
  const [studioClient, setStudioClient] = useState("pete");
  const [showEmail, setShowEmail] = useState(false);

  const completed = items.filter((item) => item.done).length;
  const percentage = Math.round((completed / items.length) * 100);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const blockers = items.filter((item) => !item.done);
  const blocker = blockers[0];
  const selectedStudioClient = studioClients.find((client) => client.id === studioClient) ?? studioClients[0];
  const selectedReadiness = selectedStudioClient.id === "pete" ? percentage : selectedStudioClient.readiness;
  const selectedBlocker = selectedStudioClient.id === "pete" ? (blocker?.label ?? "Ready to start") : selectedStudioClient.blocker;
  const status = useMemo(() => percentage === 100 ? "READY TO START" : percentage >= 60 ? "NEARLY THERE" : "BLOCKED", [percentage]);

  function addActivity(message: string) { setActivity((current) => [message, ...current].slice(0, 12)); }
  function markDone(id: number) { const item = items.find((entry) => entry.id === id); setItems((current) => current.map((entry) => entry.id === id ? { ...entry, done: true } : entry)); if (item && !item.done) addActivity(`Pete completed ${item.label}`); }
  function reopen(id: number) { const item = items.find((entry) => entry.id === id); setItems((current) => current.map((entry) => entry.id === id ? { ...entry, done: false } : entry)); if (item) addActivity(`${item.label} re-opened by studio`); setKickoffBooked(false); setSchedulerOpen(false); }
  function attachFile(id: number, fileName: string) { const item = items.find((entry) => entry.id === id); setItems((current) => current.map((entry) => entry.id === id ? { ...entry, file: fileName, done: true } : entry)); addActivity(`${fileName} uploaded for ${item?.label ?? "task"}`); }
  function grantAccess(id: number) { const item = items.find((entry) => entry.id === id); setItems((current) => current.map((entry) => entry.id === id ? { ...entry, done: true, file: "Access granted securely" } : entry)); addActivity(`Secure access granted for ${item?.label ?? "account"}`); }
  function nudge() { const waiting = blockers.map((item) => item.label).join(", "); addActivity(`Reminder sent for: ${waiting || "nothing — project is ready"}`); setShowEmail(true); }

  function bookKickoff() {
    if (percentage !== 100) return;
    setKickoffBooked(true);
    setSchedulerOpen(false);
    addActivity(`Kickoff booked for ${kickoffSlot}`);
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText("https://beermat.dev/work/kickoff#prototype"); setCopied(true); window.setTimeout(() => setCopied(false), 1600); addActivity("Client kickoff link copied"); } catch { setCopied(false); }
  }

  function reset() {
    setView("client"); setItems(initialItems); setSelectedId(2); setActivity(["Pete completed Company details", "Website copy received", "Kickoff link opened by Pete"]);
    setNote("Can you use the older van icon from the logo pack if it still works?"); setStudioNote("Need to check whether their domain is still with GoDaddy before kickoff.");
    setCopied(false); setKickoffBooked(false); setKickoffSlot("Wednesday · 11:00"); setSchedulerOpen(false); setReminderMode("Every 2 days"); setStudioClient("pete"); setShowEmail(false);
  }

  return (
    <div className="demo-panel tool-shell kickoff-tool-v5" id="prototype">
      <div className="demo-topline"><div className="demo-title-stack"><span>KICKOFF / WORKING PROTOTYPE</span><small>Fake client. Real workflow.</small></div><div className="demo-toolbar"><div className="demo-tabs"><button type="button" className={view === "client" ? "active" : ""} onClick={() => setView("client")}>Client portal</button><button type="button" className={view === "studio" ? "active" : ""} onClick={() => setView("studio")}>Studio dashboard</button></div><button type="button" className="tiny-action" onClick={reset}>Reset demo</button></div></div>

      {view === "client" ? (
        <div className="kickoff-v3">
          <aside className="kickoff-summary">
            <p className="client-label">PETE&apos;S PLUMBING</p><h3>{percentage}% ready</h3><div className="progress"><span style={{ width: `${percentage}%` }} /></div>
            <div className="status-line"><span className={`status-chip ${status === "BLOCKED" ? "bad" : status === "READY TO START" ? "good" : ""}`}>{status}</span><small>{5 - completed} thing{5 - completed === 1 ? "" : "s"} left</small></div>
            <p className="muted">No giant portal. Just the stuff we need before anyone starts burning billable hours.</p>
            <div className="kickoff-mini-stats"><div><span>PROJECT</span><strong>Website rebuild</strong></div><div><span>TARGET START</span><strong>12 Aug</strong></div></div>
            <div className="mini-next"><span>NEXT BLOCKER</span><strong>{blocker?.label ?? "Nothing. We can start."}</strong></div>
          </aside>

          <section className="kickoff-workspace">
            <div className="task-list">{items.map((item) => <button key={item.id} type="button" className={`${item.done ? "done" : ""} ${selectedId === item.id ? "selected" : ""}`} onClick={() => setSelectedId(item.id)}><span>{item.done ? "✓" : "○"}</span><strong>{item.label}</strong><em>{item.file ? item.file : item.done ? "sorted" : "needed"}</em></button>)}</div>
            <div className="task-detail">
              <span>SELECTED TASK</span><h4>{selected.label}</h4><p>{selected.help}</p>{selected.file && <div className="file-pill">↳ {selected.file}</div>}
              {!selected.done && selected.type === "upload" && <label className="upload-box compact"><input type="file" accept=".svg,.ai,.eps,.png,.jpg,.jpeg,.pdf" onChange={(event) => { const file = event.target.files?.[0]; if (file) attachFile(selected.id, file.name); }} /><strong>Choose a logo file</strong><span>Selection stays local in this demo.</span></label>}
              {!selected.done && selected.type === "access" && <div className="secure-access-card"><span>NO PASSWORDS IN EMAIL</span><p>A real build could open provider-specific invite instructions or an OAuth connection.</p><button type="button" className="button button-primary" onClick={() => grantAccess(selected.id)}>Simulate secure access →</button></div>}
              {!selected.done && selected.type !== "upload" && selected.type !== "access" && <button type="button" className="button button-primary" onClick={() => markDone(selected.id)}>Mark this sorted ✓</button>}
              {selected.done && <div className="success-banner"><strong>Sorted.</strong><span>This item is no longer blocking kickoff.</span></div>}
              <label className="task-note-field">Note for the studio<textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} /></label><button type="button" className="tiny-action" onClick={() => addActivity(`Pete left a note on ${selected.label}`)}>Save note</button>
            </div>
            <aside className="client-sidebar"><div className="client-sidebar-card"><span>NEED HELP?</span><strong>Something doesn&apos;t make sense?</strong><p>Leave a note on the task instead of starting a fresh email thread.</p></div><div className="activity-mini"><span>RECENT ACTIVITY</span>{activity.slice(0, 4).map((entry, index) => <p key={`${entry}-${index}`}><i />{entry}</p>)}</div></aside>
          </section>
          {percentage === 100 && <div className="ready-takeover"><span>PROJECT READY</span><strong>Nothing left to chase.</strong><p>Pete has done his bit. The studio can choose a kickoff time and actually start.</p><button type="button" className="button button-primary" onClick={() => setView("studio")}>Choose kickoff time →</button></div>}
        </div>
      ) : (
        <div className="studio-dashboard-v4">
          <aside className="studio-client-list">
            <div className="inbox-head"><span>CLIENTS</span><strong>4 active</strong></div>
            {studioClients.map((client) => { const readiness = client.id === "pete" ? percentage : client.readiness; return <button key={client.id} type="button" className={studioClient === client.id ? "active" : ""} onClick={() => { setStudioClient(client.id); setShowEmail(false); }}><i className={`client-tone ${client.tone}`} /><span><strong>{client.name}</strong><small>{client.project}</small></span><b>{readiness}%</b></button>; })}
          </aside>

          <section className="studio-board-v4">
            <div className="studio-head"><div><p className="client-label">{selectedStudioClient.name.toUpperCase()} · {selectedStudioClient.project.toUpperCase()}</p><h3>{selectedReadiness === 100 ? "Ready to start." : `Waiting on: ${selectedBlocker}.`}</h3></div><div className="studio-head-actions"><button type="button" className="button ghost-button" onClick={copyLink}>{copied ? "Link copied ✓" : "Copy client link"}</button><button type="button" className="button button-primary" disabled={selectedStudioClient.id !== "pete" || blockers.length === 0} onClick={nudge}>Nudge client →</button></div></div>
            <div className="studio-status-strip"><article><span>READINESS</span><strong>{selectedReadiness}%</strong></article><article><span>BLOCKER</span><strong>{selectedBlocker}</strong></article><article><span>TARGET START</span><strong>{selectedStudioClient.start}</strong></article><article><span>REMINDERS</span><select value={reminderMode} onChange={(event) => setReminderMode(event.target.value)}><option>Off</option><option>Daily</option><option>Every 2 days</option><option>Weekly</option></select></article></div>

            {selectedStudioClient.id === "pete" ? <>
              <div className="admin-table">{items.map((item) => <div key={item.id}><span className={item.done ? "dot good" : "dot"} /><strong>{item.label}</strong><span>{item.file ?? (item.done ? "Complete" : "Waiting on client")}</span><button type="button" onClick={() => item.done ? reopen(item.id) : markDone(item.id)}>{item.done ? "Re-open" : "Mark received"}</button></div>)}</div>
              <div className="studio-bottom-grid"><label className="studio-note-field"><span>PRIVATE STUDIO NOTE</span><textarea rows={4} value={studioNote} onChange={(event) => setStudioNote(event.target.value)} /></label><div className="kickoff-action-card"><span>KICKOFF</span><strong>{percentage === 100 ? "Everything's here." : "Still blocked."}</strong><p>{percentage === 100 ? "Pick a time, book the call and get moving." : `We still need ${blockers.map((item) => item.label).join(", ")}.`}</p>{kickoffBooked ? <div className="kickoff-booked"><span>BOOKED</span><strong>{kickoffSlot}</strong><small>Invite queued for Pete + studio.</small></div> : percentage === 100 ? <><button type="button" className="button button-primary wide" onClick={() => setSchedulerOpen((current) => !current)}>{schedulerOpen ? "Close times ↑" : "Choose kickoff time →"}</button>{schedulerOpen && <div className="kickoff-scheduler"><span>AVAILABLE TIMES</span>{kickoffSlots.map((time) => <button key={time} type="button" className={kickoffSlot === time ? "active" : ""} onClick={() => setKickoffSlot(time)}>{time}</button>)}<button type="button" className="button button-primary wide" onClick={bookKickoff}>Book {kickoffSlot} →</button></div>}</> : <button type="button" className="button button-primary wide" disabled>Book kickoff call →</button>}</div></div>
            </> : <div className="other-client-preview"><span>CLIENT SNAPSHOT</span><strong>{selectedStudioClient.name} is {selectedReadiness}% ready.</strong><p>This seeded project makes the dashboard feel like an actual studio tool. Open Pete&apos;s Plumbing to interact with the full workflow.</p><button type="button" className="button button-primary" onClick={() => setStudioClient("pete")}>Open interactive client →</button></div>}

            {showEmail && <div className="email-preview-v4"><div><span>AUTOMATED NUDGE PREVIEW</span><button type="button" onClick={() => setShowEmail(false)} aria-label="Close reminder preview">×</button></div><strong>Quick one — we&apos;re still waiting on {blockers.map((item) => item.label).join(" + ")}.</strong><p>Once those are in, the project is ready for kickoff. You can sort everything from the same link — no need to dig through old emails.</p><small>Next reminder: {reminderMode}</small></div>}
          </section>

          <aside className="activity-card"><span>ACTIVITY</span><div className="activity-list">{activity.slice(0, 8).map((entry, index) => <p key={`${entry}-${index}`}><i />{entry}<small>{index === 0 ? "just now" : `${index * 12 + 4}m ago`}</small></p>)}</div></aside>
        </div>
      )}
    </div>
  );
}
