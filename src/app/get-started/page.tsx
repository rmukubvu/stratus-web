import type { Metadata } from "next";
import Link from "next/link";
import { CodePanel } from "@/components/code-panel";
import { SiteFooter } from "@/components/site-footer";
import { GitHubIcon, SiteHeader } from "@/components/site-header";
import { guideSteps } from "@/content/guide";
import { releasesPage, stratusVersion } from "@/content/install";
import { links } from "@/content/site";

export const metadata: Metadata = {
  title: "Getting started · Stratus",
  description: "Install Stratus on macOS, Linux or Windows and go from zero to your first isolated test run, in CI and with a coding agent.",
};

const nextSteps = [
  { label: "Use the TypeScript and Python SDKs", href: "/#sdks" },
  { label: "Replay faults with seeded chaos", href: links.chaosDoc },
  { label: "Seed once, fork many CI jobs", href: links.ciDoc },
  { label: "Browse all the docs", href: links.docs },
];

export default function GetStartedPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero page-hero" id="top">
          <div className="hero-bg" aria-hidden />
          <div className="container">
            <p className="kicker">Getting started</p>
            <h1>
              From install to your first test in <span className="grad-text">eight steps</span>.
            </h1>
            <p className="hero-lede">
              Works the same on macOS, Linux and Windows. Each step is one or two commands; stop after
              step 4 if you only want a local AWS to try things against.
            </p>
            <ol className="guide-toc" aria-label="Steps">
              {guideSteps.map((step, i) => (
                <li key={step.id}>
                  <a href={`#${step.id}`}>
                    <span>{i + 1}</span>
                    {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section container guide">
          <ol className="guide-steps">
            {guideSteps.map((step, i) => (
              <li className="guide-step" id={step.id} key={step.id}>
                <div className="guide-step-text">
                  <span className="guide-num">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  {step.id === "install" ? (
                    <p className="fine-print">
                      Current release: <a href={releasesPage}>v{stratusVersion}</a>, with downloads for
                      every OS and architecture.
                    </p>
                  ) : null}
                </div>
                <CodePanel samples={step.samples} caption={step.samples[0].label} />
              </li>
            ))}
          </ol>

          <div className="preflight-band guide-next">
            <div>
              <p className="kicker">Next steps</p>
              <h2>You have a private AWS for every test run.</h2>
              <ul className="guide-next-links">
                {nextSteps.map((n) => (
                  <li key={n.label}>
                    <Link href={n.href}>{n.label} →</Link>
                  </li>
                ))}
              </ul>
            </div>
            <a className="btn btn-primary" href={links.repo} target="_blank" rel="noreferrer">
              <GitHubIcon /> Star on GitHub
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
