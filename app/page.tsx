import { CaseCard } from "../components/CaseCard";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { IdeaForm } from "../components/IdeaForm";
import { HeroMat } from "../components/HeroMat";
import { IdeaCtaLink } from "../components/AnalyticsLink";

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="hero shell">
        <div className="hero-copy">
          <div className="hero-stamp">ONE IDEA. ONE SPRINT. ONE THING YOU CAN ACTUALLY CLICK.</div>
          <h1>
            Got an idea?
            <span>Let&apos;s make the f*cking thing.</span>
          </h1>
          <p className="hero-lede">
            Beer Mat turns rough ideas, awkward workflows and “there has to be a better way”
            conversations into a working first version you can actually put in front of someone.
          </p>
          <div className="hero-proof" aria-label="Beer Mat sprint summary">
            <span><b>1 week</b> prototype sprint</span>
            <span><b>fixed scope</b> before we start</span>
            <span><b>working thing</b> at the end</span>
          </div>
          <div className="hero-actions">
            <IdeaCtaLink className="button button-primary" href="#start" analyticsLocation="hero" analyticsLabel="Tell me the rough version">Tell me the rough version</IdeaCtaLink>
            <a className="text-link" href="#work">Poke the prototypes ↓</a>
          </div>
        </div>

        <HeroMat />
      </section>

      <section className="anti-agency shell">
        <div className="anti-top">
          <div className="anti-title-block">
            <p className="eyebrow">THE BIT I ACTUALLY LIKE</p>
            <h2>The bit between “what if…” and “holy sh*t, it works.”</h2>
          </div>
          <div className="anti-side-note">
            <span>THE WHOLE PITCH, REALLY</span>
            <p>
              Most early ideas do not need a software company. They need somebody willing to get into the mess,
              work out what matters and make enough of it real that guessing can stop.
            </p>
          </div>
        </div>

        <div className="idea-cut">
          <div className="idea-cut-before">
            <span>THE FIRST VERSION IN YOUR HEAD</span>
            <div className="feature-cloud">
              <b>dashboard</b><b>accounts</b><b>payments</b><b>AI</b><b>notifications</b><b>analytics</b><b>mobile app?</b><b>admin area</b>
            </div>
          </div>
          <div className="cut-mark" aria-hidden="true">✂</div>
          <div className="idea-cut-after">
            <span>THE BIT WE ACTUALLY NEED</span>
            <strong>Make the annoying thing easier.</strong>
            <small>Everything else has to earn its way back in.</small>
          </div>
        </div>

        <div className="anti-middle v4-conversation">
          <div className="conversation-card">
            <div className="chat-row chat-you">
              <span>YOU</span>
              <p>I need an app with a dashboard, AI, accounts, payments and probably—</p>
            </div>
            <div className="chat-row chat-me">
              <span>ME</span>
              <p>Hang on. What&apos;s the annoying bit you&apos;re actually trying to fix?</p>
            </div>
            <div className="chat-row chat-you">
              <span>YOU</span>
              <p>…honestly? This one thing.</p>
            </div>
            <div className="chat-row chat-me last">
              <span>ME</span>
              <p>Lovely. Let&apos;s build that first.</p>
            </div>
          </div>

          <aside className="anti-mat-note">
            <div className="mini-ring" />
            <span>RULE OF THUMB</span>
            <strong>If version one cannot fit on a beer mat, we probably haven&apos;t cut enough yet.</strong>
          </aside>
        </div>

        <div className="principle-grid">
          <article><span>01</span><h3>No theatre.</h3><p>You talk to the person thinking through the problem and building the thing.</p></article>
          <article><span>02</span><h3>No feature landfill.</h3><p>If version one survives without it, it can wait until reality asks for it.</p></article>
          <article><span>03</span><h3>Something real.</h3><p>A prototype you can click, show, test and learn from. Not a strategy PDF pretending to be progress.</p></article>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-heading work-heading">
          <p className="eyebrow">STUFF I&apos;VE TRIED</p>
          <h2>Real problems. Made-up clients. Working prototypes.</h2>
          <p>
            These aren&apos;t fake case studies. I found recurring problems people genuinely complain about,
            scribbled the useful bit down, then built the version I&apos;d want to test first.
          </p>
        </div>

        <div className="case-tabletop">
          <span className="table-note note-a">real complaints →</span>
          <span className="table-note note-b">made-up names, obviously</span>
          <div className="table-ring ring-a" />
          <div className="table-ring ring-b" />
          <div className="case-scatter">
            <CaseCard
              number="01"
              title="QUICKQUOTE"
              tag="TRADES / LEAD QUALIFICATION"
              strap="Steve builds bathrooms. Steve hates building quotes."
              note="Turn a vague website enquiry into a proper job brief, indicative range and something Steve can act on."
              href="/work/quickquote"
            />
            <CaseCard
              number="02"
              title="KICKOFF"
              tag="AGENCIES / ONBOARDING"
              strap="Your client sent the logo. Somewhere. Probably."
              note="Collect files and access, expose blockers, nudge clients and know when a project is genuinely ready."
              href="/work/kickoff"
            />
            <CaseCard
              number="03"
              title="BOOKED."
              tag="SMALL TEAMS / SCHEDULING"
              strap="WhatsApp is not a booking system. Neither is Dave."
              note="Turn a customer message into a reschedule with availability, staff, deposit, conflicts and confirmation."
              href="/work/booked"
            />
          </div>
        </div>
      </section>

      <section className="process shell" id="process">
        <div className="process-intro">
          <div className="section-heading narrow">
            <p className="eyebrow">THE SPRINT</p>
            <h2>Talk. Cut. Build. Try.</h2>
            <p>Four moves. Enough structure to keep us moving. Not enough process to squeeze the life out of the idea.</p>
          </div>
          <div className="process-scribble">back-of-the-mat planning →</div>
        </div>

        <div className="process-path v4-process">
          <article className="process-step step-talk">
            <span className="process-number">01</span>
            <div><h3>Talk</h3><p>Dump the whole thing on me. The half-plan, the stupid bit, the “I don&apos;t know if this is possible” bit.</p></div>
            <small>voice notes encouraged</small>
          </article>
          <div className="process-arrow">→</div>
          <article className="process-step step-cut">
            <span className="process-number">02</span>
            <div><h3>Cut</h3><p>Find the smallest useful thing hidden inside it and politely murder everything version one does not need.</p></div>
            <small>yes, maybe your favourite feature too</small>
          </article>
          <div className="process-arrow">→</div>
          <article className="process-step step-build">
            <span className="process-number">03</span>
            <div><h3>Build</h3><p>Make the important bits real: interface, flows, logic, data and enough backend to prove the idea actually works.</p></div>
            <small>actual software, not Figma theatre</small>
          </article>
          <div className="process-arrow">→</div>
          <article className="process-step step-try">
            <span className="process-number">04</span>
            <div><h3>Try</h3><p>Give it to reality. Watch what breaks, keep what works and decide whether the idea deserves another sprint.</p></div>
            <small>reality gets the final vote</small>
          </article>
        </div>
        <div className="process-bottom-note"><span>THE OUTPUT</span><strong>Something useful enough to answer the next question.</strong></div>
        <div className="sprint-price-strip">
          <div><span>FOUNDING SPRINTS</span><strong>From £650</strong></div>
          <p>One problem. One week. One working thing. While Beer Mat is new, the early projects get the early price.</p>
          <IdeaCtaLink href="#start" analyticsLocation="founding-sprint" analyticsLabel="Bring me something messy">Bring me something messy →</IdeaCtaLink>
        </div>
      </section>

      <section className="about shell">
        <div className="about-lead">
          <p className="eyebrow">WHO&apos;S “WE”?</p>
          <h2>Mostly me,<br/>actually.</h2>
          <div className="about-stamp">SMALL ON PURPOSE</div>
        </div>

        <div className="about-board v4-about">
          <div className="about-main-copy">
            <p>
              You bring the rough idea. I ask annoying questions, get far too interested in it,
              cut away the bits that do not matter yet and build the useful part.
            </p>
            <p>
              Beer Mat stays small deliberately. No sales-guy → account-manager → designer → developer telephone game.
              The bloke talking through the problem is the bloke building it.
            </p>
          </div>
          <div className="about-notes v4-notes">
            <article><span>I LIKE</span><strong>Messy ideas.<br/>Strange problems.<br/>“Could we…?”</strong></article>
            <article><span>I DON&apos;T LIKE</span><strong>Meetings about meetings.<br/>Feature lists.<br/>AI because AI.</strong></article>
            <article className="about-you-get"><span>YOU&apos;LL DEAL WITH</span><strong>Me.</strong><small>That is sort of the point.</small></article>
          </div>
          <div className="about-footer-strip">
            <span>NO HOSTAGE SITUATION</span>
            <strong>You own what gets built.</strong>
            <em>idea person + builder, same bloke.</em>
          </div>
        </div>
      </section>

      <section className="start shell" id="start">
        <div className="start-card v4-start">
          <div className="start-doodle" aria-hidden="true">?</div>
          <div className="start-ring" aria-hidden="true" />
          <div className="start-copy">
            <p className="eyebrow">YOUR TURN</p>
            <h2>What&apos;s been living in your head for six months?</h2>
            <p>
              Do not write me a brief. Tell me the rough version, what currently sucks and what you wish happened instead.
            </p>
          </div>
          <IdeaForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
