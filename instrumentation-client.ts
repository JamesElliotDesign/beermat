import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken && apiHost) {
  posthog.init(projectToken, {
    api_host: apiHost,
    defaults: "2026-05-30",

    // Beer Mat uses PostHog for lightweight web/product analytics only.
    // We don't use feature flags or remote-config-driven features, so avoid
    // the unnecessary /flags request (which was returning 401 on production).
    advanced_disable_flags: true,

    // `history_change` handles client-side Next.js navigation. We explicitly
    // capture the landing page once below so the initial visit is not missed.
    capture_pageview: "history_change",
    capture_pageleave: true,

    // Keep the analytics surface deliberately small.
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    capture_dead_clicks: false,
    capture_performance: false,
    capture_heatmaps: false,
    capture_exceptions: false,
  });

  // `history_change` only fires for History API navigation. Capture the
  // initial landing page explicitly so Web Analytics receives `$pageview`.
  posthog.capture("$pageview");
}
