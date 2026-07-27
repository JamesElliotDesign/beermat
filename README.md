# Beer Mat v0.5.3.4

This release is a clean PostHog reset. The website/design/prototypes are unchanged from v0.5.3.3; only the analytics integration has been simplified.

## What changed

PostHog now follows the current official Next.js client-side integration:

1. `posthog-js` is installed as a dependency.
2. A root-level `instrumentation-client.ts` initializes the SDK.
3. No custom PostHog loader/snippet is used.
4. No manual `$pageview` capture is used.
5. No `capture_pageview` override is used.
6. No feature-flag, compression, session, autocapture, or other SDK behaviour is overridden.

The entire initialization is:

```ts
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: "2026-05-30",
});
```

The existing Beer Mat custom events remain:

- `prototype_opened`
- `idea_cta_clicked`
- `contact_started`
- `contact_submitted`
- `contact_email_clicked`

Form text and email addresses are not sent to PostHog.

## Vercel environment variables

Keep these configured for **Production** (and Preview if you want analytics there):

```env
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Use the exact host shown in your PostHog project settings.

Because these are `NEXT_PUBLIC_` values, redeploy after changing them.

## Local development

Requirements:

- Node.js 20.9+
- npm

Install and run:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production check

After deploying:

1. Open PostHog **Web analytics → Live**.
2. Open `https://beermat.dev/` in a fresh browser window.
3. Navigate to QuickQuote, Kickoff and Booked.
4. Confirm live traffic/events arrive.
5. Then check Installation Health.

For SDK debug logging you can also visit:

```text
https://beermat.dev/?__posthog_debug=true
```

## Build

```bash
npm run build
npm start
```

## Beer Mat

- https://beermat.dev
- hello@beermat.dev
