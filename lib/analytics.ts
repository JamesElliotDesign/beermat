"use client";

import posthog from "posthog-js";

export type PrototypeName = "quickquote" | "kickoff" | "booked";
export type IdeaCtaLocation = "header" | "hero" | "founding-sprint";

function hasPostHogConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
  );
}

function currentPath() {
  if (typeof window === "undefined") return undefined;
  return `${window.location.pathname}${window.location.search}`;
}

export function captureBeerMatEvent(
  event: string,
  properties: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === "undefined" || !hasPostHogConfig()) return;

  posthog.capture(event, {
    ...properties,
    beer_mat_path: currentPath(),
  });
}

export function trackPrototypeOpened(prototype: PrototypeName) {
  captureBeerMatEvent("prototype_opened", { prototype });
}

export function trackIdeaCtaClicked(
  location: IdeaCtaLocation,
  label: string
) {
  captureBeerMatEvent("idea_cta_clicked", {
    cta_location: location,
    cta_label: label,
  });
}

export function trackContactStarted() {
  captureBeerMatEvent("contact_started", {
    form: "rough_idea",
  });
}

export function trackContactSubmitted(fields: {
  ideaProvided: boolean;
  annoyingBitProvided: boolean;
  emailProvided: boolean;
}) {
  captureBeerMatEvent("contact_submitted", {
    form: "rough_idea",
    delivery_method: "mailto",
    idea_provided: fields.ideaProvided,
    annoying_bit_provided: fields.annoyingBitProvided,
    email_provided: fields.emailProvided,
  });
}

export function trackContactEmailClicked(location: "footer") {
  captureBeerMatEvent("contact_email_clicked", {
    cta_location: location,
  });
}
