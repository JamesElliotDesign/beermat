"use client";

import { FormEvent, useState } from "react";

export function IdeaForm() {
  const [idea, setIdea] = useState("");
  const [annoying, setAnnoying] = useState("");
  const [email, setEmail] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Beer Mat idea — rough version");
    const body = encodeURIComponent(
      `THE IDEA\n${idea || "(still forming)"}\n\nWHAT CURRENTLY SUCKS\n${annoying || "(not sure yet)"}\n\nREPLY TO\n${email || "(add your email here)"}`
    );
    window.location.href = `mailto:hello@beermat.dev?subject=${subject}&body=${body}`;
  }

  return (
    <form className="idea-form" onSubmit={submit}>
      <label>
        <span>THE ROUGH IDEA</span>
        <textarea value={idea} onChange={(event) => setIdea(event.target.value)} rows={3} placeholder="It would be cool if…" />
      </label>
      <label>
        <span>THE ANNOYING BIT</span>
        <textarea value={annoying} onChange={(event) => setAnnoying(event.target.value)} rows={3} placeholder="Right now we have to…" />
      </label>
      <div className="idea-form-bottom">
        <label>
          <span>WHERE CAN I REPLY?</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@somewhere.com" />
        </label>
        <button className="button idea-submit" type="submit">Send the rough version →</button>
      </div>
      <small>This opens your email client. No CRM has been summoned.</small>
    </form>
  );
}
