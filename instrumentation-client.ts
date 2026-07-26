import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken && apiHost) {
  posthog.init(projectToken, {
    api_host: apiHost,
    defaults: "2026-05-30",

    // Beer Mat only needs a small, deliberate analytics surface for now.
    // Pageviews/pageleaves power Web Analytics; the meaningful product
    // interactions are captured explicitly in lib/analytics.ts.
    capture_pageview: "history_change",
    capture_pageleave: true,
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    capture_dead_clicks: false,
    capture_performance: false,
    capture_heatmaps: false,
    capture_exceptions: false,
  });
}
