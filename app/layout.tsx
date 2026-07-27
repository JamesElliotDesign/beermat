import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beermat.dev"),
  title: { default: "Beer Mat — Prototype sprints for rough ideas.", template: "%s | Beer Mat" },
  description: "One-week prototype sprints for rough ideas, awkward workflows and things that deserve to leave your head.",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "Beer Mat",
    title: "Beer Mat — Got an idea? Let's make it happen.",
    description: "One-week prototype sprints. One problem. One working thing.",
    url: "/",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beer Mat — Prototype sprints for rough ideas.",
    description: "One-week prototype sprints. One problem. One working thing.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
