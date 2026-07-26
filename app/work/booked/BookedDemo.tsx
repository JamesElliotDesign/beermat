"use client";

import { useMemo, useState } from "react";

type Day = "Thursday" | "Friday" | "Saturday";
type StaffName = "Mia" | "Dave";
type Staff = StaffName | "First available";
type Booking = { id: string; customer: string; time: string; service: string; staff: StaffName; price: number };
type Request = { id: string; customer: string; message: string; service: string; current: string; price: number; depositPaid: boolean };

const days: Day[] = ["Thursday", "Friday", "Saturday"];
const availability: Record<Day, string[]> = {
  Thursday: ["09:00", "10:00", "11:30", "14:00", "15:00", "16:30"],
  Friday: ["09:00", "10:30", "12:30", "15:00", "17:00"],
  Saturday: ["10:00", "11:30", "13:00", "15:30"],
};

const initialBookings: Record<Day, Booking[]> = {
  Thursday: [
    { id: "t1", customer: "Alex", time: "10:00", service: "Full detail", staff: "Mia", price: 120 },
    { id: "t2", customer: "Rob", time: "16:30", service: "Interior", staff: "Dave", price: 70 },
    { id: "t3", customer: "Nina", time: "14:00", service: "Exterior", staff: "Dave", price: 55 },
  ],
  Friday: [
    { id: "f1", customer: "Priya", time: "12:30", service: "Maintenance", staff: "Mia", price: 65 },
    { id: "f2", customer: "Jon", time: "17:00", service: "Exterior", staff: "Dave", price: 55 },
    { id: "f3", customer: "Ollie", time: "15:00", service: "Full detail", staff: "Dave", price: 120 },
  ],
  Saturday: [{ id: "s1", customer: "Lee", time: "13:00", service: "Full detail", staff: "Dave", price: 120 }],
};

const requests: Request[] = [
  { id: "sarah", customer: "Sarah Morgan", message: "Hey mate — any chance you've got something Thursday afternoon instead?", service: "Exterior + interior detail", current: "Wednesday · 11:30", price: 95, depositPaid: true },
  { id: "ben", customer: "Ben Carter", message: "Could I move Friday to Saturday? Morning would be ideal if you've got it.", service: "Maintenance detail", current: "Friday · 09:00", price: 65, depositPaid: false },
  { id: "maya", customer: "Maya Patel", message: "Running late this week — is there anything Friday afternoon instead?", service: "Exterior detail", current: "Thursday · 09:00", price: 55, depositPaid: true },
];

const defaultPick: Record<string, { day: Day; slot: string }> = {
  sarah: { day: "Thursday", slot: "15:00" },
  ben: { day: "Saturday", slot: "10:00" },
  maya: { day: "Friday", slot: "15:00" },
};

export function BookedDemo() {
  const [requestId, setRequestId] = useState("sarah");
  const [day, setDay] = useState<Day>("Thursday");
  const [slot, setSlot] = useState("15:00");
  const [staff, setStaff] = useState<Staff>("First available");
  const [deposit, setDeposit] = useState(true);
  const [bookings, setBookings] = useState(initialBookings);
  const [confirmed, setConfirmed] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showOnlyFree, setShowOnlyFree] = useState(true);
  const [history, setHistory] = useState(["Sarah's reschedule request arrived", "Deposit payment found on original booking"]);
  const [diaryView, setDiaryView] = useState<"day" | "week">("day");

  const request = requests.find((item) => item.id === requestId) ?? requests[0];
  const slotBookings = bookings[day].filter((booking) => booking.time === slot);
  const freeStaff = (["Mia", "Dave"] as StaffName[]).filter((person) => !slotBookings.some((booking) => booking.staff === person));
  const assignedStaff: StaffName | null = staff === "First available" ? (freeStaff[0] ?? null) : staff;
  const conflict = assignedStaff ? slotBookings.find((booking) => booking.staff === assignedStaff) : undefined;
  const fullConflict = freeStaff.length === 0;

  const displayedSlots = availability[day].filter((time) => {
    if (!showOnlyFree) return true;
    return bookings[day].filter((booking) => booking.time === time).length < 2;
  });

  const dayRevenue = useMemo(() => bookings[day].reduce((sum, booking) => sum + booking.price, 0), [bookings, day]);
  const teamLoad = useMemo(() => ({
    Mia: bookings[day].filter((booking) => booking.staff === "Mia").length,
    Dave: bookings[day].filter((booking) => booking.staff === "Dave").length,
  }), [bookings, day]);

  const message = assignedStaff
    ? `Hey ${request.customer.split(" ")[0]} — no problem. I've moved you to ${day} at ${slot} with ${assignedStaff}. ${deposit && request.depositPaid ? "Your existing deposit has been carried over." : request.depositPaid ? "Your existing deposit stays against the booking." : "No deposit change has been applied."}`
    : "No team member is free in this slot yet.";

  function resetConfirmation() {
    setConfirmed(false);
    setMessageSent(false);
  }

  function chooseDay(nextDay: Day) {
    setDay(nextDay);
    setSlot(availability[nextDay][0]);
    setStaff("First available");
    resetConfirmation();
  }

  function chooseRequest(nextId: string) {
    const next = requests.find((item) => item.id === nextId) ?? requests[0];
    const pick = defaultPick[next.id] ?? { day: "Thursday" as Day, slot: "09:00" };
    setRequestId(nextId);
    setDay(pick.day);
    setSlot(pick.slot);
    setDeposit(next.depositPaid);
    setStaff("First available");
    setHistory([`${next.customer}'s request opened`]);
    resetConfirmation();
  }

  function confirmMove() {
    if (!assignedStaff || conflict) return;
    setBookings((current) => {
      const cleaned: Record<Day, Booking[]> = {
        Thursday: current.Thursday.filter((booking) => booking.id !== request.id),
        Friday: current.Friday.filter((booking) => booking.id !== request.id),
        Saturday: current.Saturday.filter((booking) => booking.id !== request.id),
      };
      const moved: Booking = { id: request.id, customer: request.customer.split(" ")[0], time: slot, service: request.service, staff: assignedStaff, price: request.price };
      return { ...cleaned, [day]: [...cleaned[day], moved].sort((a, b) => a.time.localeCompare(b.time)) };
    });
    setConfirmed(true);
    setMessageSent(false);
    setHistory((current) => [`Diary moved to ${day} ${slot} · ${assignedStaff}`, "Customer confirmation prepared", "Team capacity recalculated", ...current]);
  }

  function sendMessage() {
    if (!confirmed) return;
    setMessageSent(true);
    setHistory((current) => [`Confirmation sent to ${request.customer}`, ...current]);
  }

  function undoMove() {
    setBookings((current) => ({
      Thursday: current.Thursday.filter((booking) => booking.id !== request.id),
      Friday: current.Friday.filter((booking) => booking.id !== request.id),
      Saturday: current.Saturday.filter((booking) => booking.id !== request.id),
    }));
    resetConfirmation();
    setHistory((current) => ["Last demo reschedule undone", ...current]);
  }

  function reset() {
    setRequestId("sarah");
    setDay("Thursday");
    setSlot("15:00");
    setStaff("First available");
    setDeposit(true);
    setBookings(initialBookings);
    setConfirmed(false);
    setMessageSent(false);
    setShowOnlyFree(true);
    setDiaryView("day");
    setHistory(["Sarah's reschedule request arrived", "Deposit payment found on original booking"]);
  }

  return (
    <div className="demo-panel tool-shell booked-tool-v5">
      <div className="demo-topline">
        <div className="demo-title-stack"><span>BOOKED. / WORKING PROTOTYPE</span><small>Fake business. Real interaction.</small></div>
        <div className="demo-toolbar">
          <span className="status-dot"><i /> live diary</span>
          <div className="demo-tabs"><button type="button" className={diaryView === "day" ? "active" : ""} onClick={() => setDiaryView("day")}>Day</button><button type="button" className={`booked-week-toggle ${diaryView === "week" ? "active" : ""}`} onClick={() => setDiaryView("week")}>Week</button></div>
          <button type="button" className="tiny-action" onClick={reset}>Reset demo</button>
        </div>
      </div>

      <div className="booking-v5">
        <aside className="request-panel request-panel-v5">
          <div className="request-inbox-head"><span>INBOX</span><b>3 waiting</b></div>
          <div className="request-tabs">{requests.map((item) => <button key={item.id} type="button" className={requestId === item.id ? "active" : ""} onClick={() => chooseRequest(item.id)}><strong>{item.customer.split(" ")[0]}</strong><small>{item.service}</small></button>)}</div>
          <div className="request-message-card">
            <div className="message-meta"><span>NEW REQUEST</span><small>2m ago</small></div>
            <blockquote>“{request.message}”</blockquote>
            <div className="customer-row"><strong>{request.customer}</strong><span>{request.service}</span></div>
          </div>
          <div className="current-booking"><span>CURRENT BOOKING</span><strong>{request.current}</strong><small>£{request.price} · {request.depositPaid ? "deposit already paid" : "no deposit yet"}</small></div>
          <div className="request-note">The customer has already explained the human bit. The tool handles the remembering, clashes and confirmation.</div>
        </aside>

        <section className="booking-workspace booking-workspace-v5">
          {diaryView === "week" ? (
            <div className="week-board-v4">
              {days.map((weekDay) => <article key={weekDay}><div className="week-day-head"><span>{weekDay.toUpperCase()}</span><strong>£{bookings[weekDay].reduce((sum, item) => sum + item.price, 0)}</strong></div>{availability[weekDay].map((time) => { const atTime = bookings[weekDay].filter((booking) => booking.time === time); return <button key={time} type="button" onClick={() => { setDay(weekDay); setSlot(time); setDiaryView("day"); setStaff("First available"); resetConfirmation(); }}><time>{time}</time><span>{atTime.length ? atTime.map((booking) => `${booking.customer} · ${booking.staff}`).join(" / ") : "Free"}</span><b>{2 - atTime.length}/2 capacity</b></button>; })}</article>)}
            </div>
          ) : (
            <>
              <div className="booking-toolbar"><div className="days segmented">{days.map((value) => <button key={value} type="button" className={day === value ? "active" : ""} onClick={() => chooseDay(value)}>{value}<small>{bookings[value].length} jobs</small></button>)}</div><label className="availability-toggle"><input type="checkbox" checked={showOnlyFree} onChange={(event) => setShowOnlyFree(event.target.checked)} /><span>Spare capacity only</span></label></div>
              <div className="day-summary-v4"><div><span>BOOKED VALUE</span><strong>£{dayRevenue}</strong></div><div><span>MIA</span><strong>{teamLoad.Mia} jobs</strong></div><div><span>DAVE</span><strong>{teamLoad.Dave} jobs</strong></div><div><span>SELECTED</span><strong>{day} {slot}</strong></div></div>

              <div className="booking-board-v5">
                <div className="diary-list"><div className="diary-head"><span>{day.toUpperCase()}</span><strong>Team diary · 2-person capacity</strong></div>{displayedSlots.map((time) => { const atTime = bookings[day].filter((entry) => entry.time === time); const selected = slot === time; return <button key={time} type="button" onClick={() => { setSlot(time); setStaff("First available"); resetConfirmation(); }} className={`${atTime.length >= 2 ? "occupied" : "free"} ${selected ? "selected" : ""}`}><time>{time}</time><strong>{atTime.length ? atTime.map((booking) => booking.customer).join(" + ") : "Available"}</strong><span>{atTime.length ? atTime.map((booking) => `${booking.staff}: ${booking.service}`).join(" · ") : "Mia + Dave free"}</span></button>; })}{!displayedSlots.length && <div className="empty-slots">No slots with spare capacity that day.</div>}</div>

                <aside className="move-card move-card-v5">
                  <span>PROPOSED MOVE</span>
                  <h4>{request.customer.split(" ")[0]} → {day} · {slot}</h4>
                  <label>Assign to<select value={staff} onChange={(event) => { setStaff(event.target.value as Staff); resetConfirmation(); }}><option>First available</option><option>Mia</option><option>Dave</option></select></label>
                  <div className="staff-suggestion"><span>ASSIGNMENT</span><strong>{assignedStaff ?? "Nobody free"}</strong><small>{staff === "First available" ? `${freeStaff.length} team member${freeStaff.length === 1 ? "" : "s"} free in this slot.` : "Manually assigned."}</small></div>
                  {conflict && <div className="conflict-banner"><strong>{assignedStaff} is already booked.</strong><span>{assignedStaff} can&apos;t be in two places at once. Even {assignedStaff} has limits.</span></div>}
                  {fullConflict && staff === "First available" && <div className="conflict-banner"><strong>That slot is full.</strong><span>Mia and Dave are both busy. Pick another one.</span></div>}
                  <label className="switch-row"><input type="checkbox" checked={deposit} onChange={(event) => { setDeposit(event.target.checked); resetConfirmation(); }} /><span>Carry existing deposit across</span></label>
                  <div className={`message-preview message-preview-v5 ${messageSent ? "sent" : ""}`}><span>{messageSent ? "CONFIRMATION SENT" : confirmed ? "MESSAGE READY" : "MESSAGE PREVIEW"}</span><p>{message}</p></div>
                  {!confirmed ? <button type="button" className="button button-primary wide" onClick={confirmMove} disabled={!assignedStaff || Boolean(conflict)}>Move booking →</button> : !messageSent ? <button type="button" className="button button-primary wide" onClick={sendMessage}>Send confirmation →</button> : <div className="success-banner"><strong>Sorted. Nothing exploded.</strong><span>Diary updated, capacity recalculated and the customer has the new time.</span></div>}
                  {confirmed && <button type="button" className="tiny-action wide" onClick={undoMove}>Undo demo move</button>}
                </aside>

                <aside className="booking-activity booking-activity-v5"><span>AUDIT TRAIL</span>{history.slice(0, 7).map((entry, index) => <p key={`${entry}-${index}`}><i />{entry}<small>{index === 0 ? "now" : `${index * 3 + 1}m`}</small></p>)}</aside>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
