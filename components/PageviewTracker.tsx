"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Beer Mat owns pageview capture explicitly.
 *
 * PostHog defaults dated 2025-05-24 and later switch automatic pageview
 * capture to `history_change`, which does not emit the initial page load.
 * This tracker fires once after hydration and again whenever Next changes
 * pathname, so direct landings and SPA navigation use the same path.
 */
export function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.posthog) return;

    window.posthog.capture("$pageview", {
      $current_url: window.location.href,
      $pathname: pathname,
      beer_mat_pageview_source: "next-pathname",
    });
  }, [pathname]);

  return null;
}
