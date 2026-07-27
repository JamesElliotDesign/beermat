# Beer Mat v0.5.3.2

This is v0.5.3.1 with the PostHog integration reset to the **recommended JavaScript web HTML snippet** from PostHog's current installation guide.

No Beer Mat design, prototype or conversion-flow changes are included in this patch.

## Why this patch exists

The previous package-based integration was successfully initialising and `POST /e/` returned `200 OK`, but PostHog's Installation Health still did not recognise `$pageview`.

Rather than keep overriding SDK behaviour, v0.5.3.2 follows PostHog's recommended JavaScript web installation directly:

- the official HTML loader snippet is emitted in the document `<head>`
- it calls `posthog.init(projectToken, { api_host, defaults: "2026-05-30" })`
- there is **no custom `$pageview` code**
- there is **no custom pageview/history configuration**
- there is **no feature-flag override**
- `posthog-js` is no longer bundled as an npm runtime dependency
- Beer Mat's five custom events continue to use `window.posthog.capture(...)`

In other words: PostHog now owns its normal web-analytics behaviour exactly as its JavaScript web guide expects.

## Stack

- Next.js 16.2.11
- React 19.2.7
- TypeScript
- PostHog JavaScript web snippet (loaded from PostHog at runtime)

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

Use the host for **your** PostHog region.

Start the site:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If either PostHog environment variable is missing, Beer Mat renders without the PostHog snippet and otherwise works normally.

## Vercel

Keep these environment variables in the Beer Mat project:

```text
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
NEXT_PUBLIC_POSTHOG_HOST
```

They should be available to **Production**. Redeploy after changing them.

## PostHog implementation

### `components/PostHogSnippet.tsx`

This contains the upstream loader shown by PostHog under:

**JavaScript web → Installation → Option 1: Add the JavaScript snippet to your HTML (Recommended)**

The only dynamic values are Beer Mat's project token and regional API host from the Vercel environment.

`app/layout.tsx` renders the snippet in `<head>`, before the interactive Beer Mat client components run.

### `lib/analytics.ts`

Beer Mat's explicit events call the global object created by the snippet:

```ts
window.posthog.capture("prototype_opened", {
  prototype: "quickquote",
});
```

The snippet creates a small queue immediately, so calls made while PostHog's real script is still loading are queued rather than lost.

## What should now be automatic

PostHog's normal JavaScript web installation should own normal web analytics, including `$pageview`, according to the defaults selected by `defaults: "2026-05-30"`.

Beer Mat does not manually capture or override `$pageview` in this build.

## Beer Mat custom events

These remain unchanged:

### `prototype_opened`

```text
prototype = quickquote | kickoff | booked
```

### `idea_cta_clicked`

```text
cta_location = header | hero | founding-sprint
cta_label
```

### `contact_started`

Fires once when somebody begins typing into the rough-idea form.

### `contact_submitted`

Fires when the visitor presses **Send the rough version** and Beer Mat opens their mail client.

Only booleans about which fields were populated are sent. The idea text and email address are **not** sent to PostHog.

### `contact_email_clicked`

Fires when the footer email address is clicked.

## Verify v0.5.3.2 after deploy

Open a fresh browser session and visit:

```text
https://beermat.dev/?__posthog_debug=true
```

Then:

1. load the homepage
2. open QuickQuote
3. click **Bring me an idea**
4. type into the form
5. submit the form if convenient

In DevTools → Network, PostHog's HTML loader should fetch its runtime script from your regional `*-assets.i.posthog.com` host and send analytics to your regional ingestion host.

Then check PostHog for:

```text
$pageview
prototype_opened
idea_cta_clicked
contact_started
contact_submitted
```

Do not add another manual `$pageview` workaround on top of this build before first checking the behaviour of the recommended snippet itself.

## Suggested First Client dashboard

Once events are flowing, create **Beer Mat / First Client** with:

1. unique visitors / pageviews
2. referrers
3. `$pageview` by path
4. `prototype_opened` by `prototype`
5. `idea_cta_clicked` by `cta_location`
6. funnel:

```text
prototype_opened
→ idea_cta_clicked
→ contact_started
→ contact_submitted
```

## Outreach UTMs

```text
https://beermat.dev/work/quickquote?utm_source=facebook&utm_medium=outreach&utm_campaign=trades
```

```text
https://beermat.dev/work/kickoff?utm_source=linkedin&utm_medium=outreach&utm_campaign=agencies
```

```text
https://beermat.dev/work/booked?utm_source=facebook&utm_medium=outreach&utm_campaign=booking_businesses
```

## Analytics files in this build

```text
components/PostHogSnippet.tsx
lib/analytics.ts
components/AnalyticsLink.tsx
components/PrototypeTracker.tsx
types/posthog.d.ts
.env.example
```

`instrumentation-client.ts` has been removed and `posthog-js` has been removed from `package.json`.
