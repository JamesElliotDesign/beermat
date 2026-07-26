"use client";

import { useEffect } from "react";
import { trackPrototypeOpened } from "../lib/analytics";
import type { PrototypeName } from "../lib/analytics";

export function PrototypeTracker({ prototype }: { prototype: PrototypeName }) {
  useEffect(() => {
    trackPrototypeOpened(prototype);
  }, [prototype]);

  return null;
}
