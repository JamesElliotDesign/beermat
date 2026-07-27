# Beer Mat v0.5.3.1

The v0.5.3 site plus a tiny PostHog reliability patch after validating the live EU ingestion path.

The site design and custom Beer Mat events are unchanged. This patch fixes initial pageview capture and removes an unnecessary feature-flags request.

The visual site and prototypes are unchanged. v0.5.3 adds enough measurement to answer the questions that matter while Beer Mat is trying to land its first clients:

- how many people visit
- where they came from
- which prototype they opened
- which lead CTA they clicked
- whether they started the rough-idea form
- whether they submitted the form

## Stack

- Next.js 16.2.11
- React 19.2.7
- TypeScript
- PostHog JS 1.407.2

## Install locally

You need Node.js 20.9+.

```bash
npm install
```

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then add the values shown in your PostHog project settings:

```env
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Use the host for **your** PostHog region. If your project is in the US, use the US host PostHog gives you instead.

Start the site:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If the two PostHog environment variables are missing, the site still works normally; analytics simply does not initialise.

## Vercel setup

In the Beer Mat Vercel project:

1. Open **Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`.
3. Add `NEXT_PUBLIC_POSTHOG_HOST`.
4. Add them to Production (and Preview too if you want analytics in preview deployments).
5. Redeploy.

Both variables intentionally start with `NEXT_PUBLIC_` because the PostHog browser SDK needs them client-side.

## What is implemented

### PostHog initialisation

`instrumentation-client.ts` follows PostHog's current Next.js client integration pattern.

It uses the `2026-05-30` recommended defaults and explicitly keeps this first analytics setup lean:

- initial landing page captured explicitly as `$pageview`
- SPA navigation pageviews enabled via `history_change`
- feature-flag requests disabled (`advanced_disable_flags: true`) because Beer Mat does not use them
- page-leave events enabled
- autocapture disabled
- session recording disabled
- surveys disabled
- heatmaps/performance/error/dead-click capture disabled

That leaves Beer Mat with normal Web Analytics plus the explicit events below, rather than a flood of interaction data we do not need yet.

### Events

#### `$pageview`
The initial landing page is captured explicitly after `posthog.init()`. Subsequent client-side Next.js navigations are captured by PostHog via `history_change`.

Use this for visitors, pages, referrers and campaign/UTM traffic.

#### `prototype_opened`
Fires when somebody opens one of the three case-study/prototype pages.

Property:

```text
prototype = quickquote | kickoff | booked
```

#### `idea_cta_clicked`
Fires from the lead-generating CTAs.

Properties:

```text
cta_location = header | hero | founding-sprint
cta_label
```

#### `contact_started`
Fires once, the first time somebody types something into any field in the rough-idea form.

No field contents are sent to PostHog.

#### `contact_submitted`
Fires when the user submits the rough-idea form and Beer Mat opens their email client.

Properties only contain booleans saying whether each field had a value. **The idea text and email address are not sent to PostHog.**

Important: Beer Mat currently uses a `mailto:` hand-off, so this event proves the visitor pressed **Send the rough version**, not that they definitely sent the resulting email.

#### `contact_email_clicked`
Fires when the footer email address is clicked.

## v0.5.3.1 patch notes

Production diagnostics confirmed that PostHog initialises correctly and `POST https://eu.i.posthog.com/e/` returns `200 OK`, while the unused `/flags/` request returned `401`.

This patch therefore:

1. adds `advanced_disable_flags: true` so Beer Mat no longer makes the unused feature-flags request, and
2. calls `posthog.capture("$pageview")` immediately after initialisation so the first landing page is recorded.

`capture_pageview: "history_change"` remains enabled for subsequent client-side navigation.

After deploying, open a fresh browser session, visit `https://beermat.dev/?__posthog_debug=true`, navigate into a prototype, then refresh **Web analytics → Installation Health**. The `$pageview` check should turn green once PostHog processes the event.

## Suggested PostHog dashboard

Create one dashboard called **Beer Mat / First Client**.

Useful tiles:

1. Unique visitors / pageviews
2. Referrers
3. `$pageview` broken down by path
4. `prototype_opened` broken down by `prototype`
5. `idea_cta_clicked` broken down by `cta_location`
6. Funnel:

```text
prototype_opened
→ idea_cta_clicked
→ contact_started
→ contact_submitted
```

Also create a homepage funnel:

```text
$pageview where pathname = /
→ idea_cta_clicked
→ contact_started
→ contact_submitted
```

## Outreach tracking

Use UTMs in links you send manually so PostHog can separate different outreach experiments.

Examples:

```text
https://beermat.dev/work/quickquote?utm_source=facebook&utm_medium=outreach&utm_campaign=trades
```

```text
https://beermat.dev/work/kickoff?utm_source=linkedin&utm_medium=outreach&utm_campaign=agencies
```

```text
https://beermat.dev/work/booked?utm_source=facebook&utm_medium=outreach&utm_campaign=booking_businesses
```

Keep the names boring and consistent. The data is useful because you will know exactly which links you sent.

## Check the integration after deploy

Open the production site and trigger a few actions:

1. Visit the homepage.
2. Open QuickQuote.
3. Click **Bring me an idea**.
4. Type into the form.
5. Submit it.

Then check PostHog event data / Product Analytics for:

```text
$pageview
prototype_opened
idea_cta_clicked
contact_started
contact_submitted
```

For local debugging, PostHog supports its debug mode via the `__posthog_debug=true` URL parameter, e.g.:

```text
http://localhost:3000/?__posthog_debug=true
```

## Privacy note

This build intentionally does **not** send form contents or email addresses to PostHog and disables broad autocapture/session recording.

It currently uses PostHog's normal browser persistence. PostHog also supports a cookieless server-hash mode, but that mode requires a matching setting inside the PostHog project itself as well as SDK configuration. It has not been silently enabled here so the integration does not fail if the project-side mode is off.

Decide on your consent/privacy setup before treating analytics configuration as finished for every jurisdiction you serve.

## Files added for analytics

```text
instrumentation-client.ts
lib/analytics.ts
components/AnalyticsLink.tsx
components/PrototypeTracker.tsx
.env.example
```

Existing files modified:

```text
package.json
components/Header.tsx
components/Footer.tsx
components/IdeaForm.tsx
app/page.tsx
app/work/quickquote/page.tsx
app/work/kickoff/page.tsx
app/work/booked/page.tsx
```
