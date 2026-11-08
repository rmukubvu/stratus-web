import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stratus · Local AWS for CI and coding agents",
  description:
    "A single-binary AWS emulator with instant snapshots, isolated CI runs, deterministic chaos, an AWS FIS-compatible API, an MCP server and LLM-ready diagnostics.",
  openGraph: {
    title: "Stratus · Local AWS that snaps back in 11 ms",
    description:
      "Snapshot state, fork isolated CI runs, replay faults by seed, and let coding agents drive a local AWS over MCP.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6faf8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
