# Beer Mat — v0.5.2

**Rough ideas → working things.**

This is the launch-candidate Beer Mat prototype pass: a Next.js marketing site plus three deliberately believable working prototypes.

## Stack

- Next.js 16.2.11
- React 19.2.7
- TypeScript
- Plain CSS — no component framework, animation library or CMS

## Run it locally

### 1. Install Node.js

Use Node.js 20.9 or newer. Node 22 LTS is a good choice.

Check:

```bash
node --version
npm --version
```

### 2. Unzip and open the project

```bash
cd beermat-v0.5.2
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Working prototypes:

```text
http://localhost:3000/work/quickquote
http://localhost:3000/work/kickoff
http://localhost:3000/work/booked
```

## v0.5 changes

### Homepage

- The hero beer mat now **forms on load**: mat arrival, texture, stitch, beer ring, notes, 1 WEEK stamp, scribbled arrow and final result.
- Motion respects `prefers-reduced-motion`.
- Added a light commercial signal: **Founding sprints from £650**.
- Tightened responsive type, focus states and copy wrapping.
- `beermat.dev` and `hello@beermat.dev` are now treated as the real brand/domain throughout.
- Added branded 404 page, sitemap, robots metadata and Open Graph artwork.

### QuickQuote

The demo now runs through:

```text
customer enquiry → lead qualification → builder inbox → editable quote → sent state
```

New bits include:

- lead progress stages
- attachment representation
- editable quote line items
- add/remove line items
- discount + validity
- customer note
- quote-send confirmation
- reset demo

### Kickoff

The onboarding demo now has a proper ending:

```text
missing items → 100% ready → choose kickoff slot → book kickoff
```

It also fixes the literal `Everything&apos;s here.` display bug from v0.4.

### Booked.

The layout was reworked so the customer message has room to breathe instead of becoming a giant narrow column.

The main workflow is now:

```text
incoming message → pick availability → assign staff → move diary → send confirmation
```

It still includes conflict detection, team capacity, deposit handling, week view, audit history and reset.

## Important: hello@beermat.dev

The site uses `hello@beermat.dev`, but the mailbox does **not** need to exist for local development.

The homepage form currently creates a pre-filled `mailto:` draft. Until you create that mailbox, a real visitor could compose a message but delivery to that address would fail.

A later production pass should replace or supplement this with real form delivery.

## Hydration warning / Grammarly

If Next.js shows a hydration warning containing attributes similar to:

```text
data-new-gr-c-s-check-loaded
data-gr-ext-installed
```

those are inserted into the page by Grammarly before React hydrates. Test the page in a private/incognito window with extensions disabled to confirm it disappears.

The project intentionally does **not** use `suppressHydrationWarning` to hide that extension-generated mismatch.

## Production build

```bash
npm run build
npm start
```

For deployment, Vercel is the path of least resistance for this stack. Point `beermat.dev` at the deployment and HTTPS will be handled by the host.

## Main files

```text
app/page.tsx                       homepage structure/copy
app/globals.css                    almost all visual design + motion
components/HeroMat.tsx             animated hero beer mat
components/IdeaForm.tsx            rough-idea mailto form
components/Logo.tsx                Beer Mat logo
app/work/quickquote/               QuickQuote case study + demo
app/work/kickoff/                  Kickoff case study + demo
app/work/booked/                   Booked. case study + demo
public/og-*.png                    social/link preview artwork
```

## Current caveat

The source has been syntax/transpile checked, but the build environment used to package this version could not reach npm long enough to download the project dependencies, so the final `next build` was not run here. Your local `npm install && npm run dev` is the first full runtime compile of v0.5.


## v0.5.1 patch

- Booked/Dave case-study punchline now uses the same headline scale as the other prototype headers.
- Footer sign-off is now: “One week. One useful thing. Then reality gets a vote.”


## v0.5.2 mobile QA patch

This pass is intentionally boring in the best way: no redesign, just making the existing site behave like it belongs on a phone.

- increased mobile gutters and legibility for small/meta copy
- increased touch targets and set form controls to a phone-friendly size
- QuickQuote customer form is now single-column on mobile, with a compact expandable live-estimate drawer instead of a permanent half-screen summary
- QuickQuote lead/quote views get more breathing room on narrow screens
- Kickoff studio clients become a horizontal swipeable client selector on mobile
- Booked. hides the desktop Week toggle on phone-sized layouts so the default workflow stays one day at a time
- Booked. retains a horizontal scroll-snap safety net if a Week state survives a desktop → mobile resize
- strengthened the mobile footer hierarchy and made the final Beer Mat line properly readable
- tightened case-study typography and tool spacing at 430px and below

Desktop behaviour and the v0.5.1 headline/footer patch remain unchanged.
