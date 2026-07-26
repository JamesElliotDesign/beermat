"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { trackContactEmailClicked, trackIdeaCtaClicked } from "../lib/analytics";
import type { IdeaCtaLocation } from "../lib/analytics";

type InternalProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  children: ReactNode;
  analyticsLocation: IdeaCtaLocation;
  analyticsLabel: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function IdeaCtaLink({
  analyticsLocation,
  analyticsLabel,
  onClick,
  children,
  ...props
}: InternalProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackIdeaCtaClicked(analyticsLocation, analyticsLabel);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

type AnchorProps = ComponentProps<"a"> & {
  children: ReactNode;
};

export function FooterEmailLink({ children, onClick, ...props }: AnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackContactEmailClicked("footer");
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
