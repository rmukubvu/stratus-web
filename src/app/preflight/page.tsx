import type { Metadata } from "next";
import { CodePanel } from "@/components/code-panel";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { GitHubIcon, SiteHeader } from "@/components/site-header";
import { links } from "@/content/site";

export const metadata: Metadata = {
  title: "Preflight · External proof for local AWS stacks",
  description: "Preflight lints, scores, diagnoses and load-checks your stack against Stratus before you deploy to AWS.",
};

const sections = [
  {
    eyebrow: "Lint",
    title: "Catch missing readiness conditions before deployment.",
    body: "Preflight lint runs against CDK synth output or Terraform HCL and flags the conditions that usually decide whether a stack is safe to scale, operate, and trust.",
    command: "./dist/preflight lint --stack-name SmokeFixtureStack --no-ai",
    output: `preflight lint

✓ cdk detected
✓ synthesized templates /tmp/preflight-synth-123456

 100 security       0 finding(s)
  76 reliability    2 finding(s)
  88 observability  1 finding(s)
  64 scalability    3 finding(s)`,
  },
  {
    eyebrow: "Readiness Score",
    title: "Turn findings into a category-level signal.",
    body: "Every lint run emits category scores for security, reliability, observability, and scalability, plus score-level explanations that show what is dragging each category down.",
    command: "./dist/preflight lint --stack-name SmokeFixtureStack --output json --no-ai",
    output: `{
  "summary": {
    "scores": [
      { "category": "security", "score": 100, "errors": 0, "warnings": 0 },
      { "category": "reliability", "score": 76, "errors": 0, "warnings": 2 },
      { "category": "observability", "score": 88, "errors": 0, "warnings": 1 },
      { "category": "scalability", "score": 64, "errors": 0, "warnings": 3 }
    ]
  }
}`,
  },
  {
    eyebrow: "Diagnosis",
    title: "Explain why a score is low and what to change.",
    body: "Preflight diagnoses each finding deterministically by default, with optional AI overlay. The point is not just to say something is wrong, but to connect the likely failure mode to the exact infrastructure setting that should change.",
    command: "./dist/preflight lint --stack-name SmokeFixtureStack --no-ai",
    output: `Diagnoses
◆ lambda-concurrency-explicit via rulebook
  This leaves scaling behavior implicit, which usually shows up as throttling, backlog growth, or unstable latency.
  fix: Set ReservedConcurrentExecutions explicitly or document why unbounded account concurrency is acceptable.

◆ api-throttling via rulebook
  This leaves scaling behavior implicit, which usually shows up as throttling, backlog growth, or unstable latency.
  fix: Set throttling burst and rate limits explicitly so traffic spikes fail predictably instead of exhausting downstream capacity.`,
  },
  {
    eyebrow: "Load",
    title: "Generate a load path from behavioural assertions.",
    body: "Preflight load turns the existing behavioural HTTP checks into a generated load scenario. It can use a native concurrent runner or k6, depending on what is available in the environment.",
    command: "./dist/preflight load --stack-name SmokeFixtureStack --runner k6 --vus 8 --iterations 40",
    output: `preflight load

✓ cdk detected

✓ total=40 failures=0 avg=32ms p95=71ms

✓ apigw-http:POST api-123/jobs
  metrics: total=40 failures=0 avg=32ms p95=71ms`,
  },
];

const proofLoop = [
  "Lint first to catch missing readiness posture before deploy.",
  "Deploy into Stratus or another emulator through the same stack definition.",
  "Run structural, wiring, IAM, and behavioural assertions against the live local stack.",
  "Replay the behavioural HTTP path under load before trusting the change.",
];

export default function PreflightPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero page-hero" id="top">
          <div className="hero-bg" aria-hidden />
          <div className="container hero-grid">
            <div>
              <p className="kicker">Preflight</p>
              <h1>
                External proof for <span className="grad-text">local AWS</span> delivery loops.
              </h1>
              <p className="hero-lede">
                Preflight lints, scores, diagnoses and load-checks your stack against a local emulator
                before you decide it is ready for AWS.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={links.preflightRepo} target="_blank" rel="noreferrer">
                  <GitHubIcon /> Explore Preflight
                </a>
                <a className="btn btn-ghost" href="#examples">
                  See examples
                </a>
              </div>
            </div>
            <div className="loop-card">
              <p className="kicker">The validated loop</p>
              <ol>
                {proofLoop.map((item, i) => (
                  <li key={item}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section container" id="examples">
          <SectionHeading kicker="Examples" title="What each Preflight surface is for.">
            Static lint, readiness scores, concrete diagnoses and generated load checks: the four
            operator-facing surfaces that make Preflight useful in practice.
          </SectionHeading>
          <div className="docs-grid split-top">
            {sections.map((section) => (
              <article className="docs-card" key={section.title}>
                <p className="kicker">{section.eyebrow}</p>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
                <CodePanel
                  caption="terminal"
                  samples={[{ label: "terminal", language: "sh", code: `$ ${section.command}\n\n${section.output}`, copyText: section.command }]}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="section container" id="loop">
          <SectionHeading kicker="Why it matters" title="The part that turns a local stack into a trustworthy one.">
            Stratus gives you local AWS-shaped execution. Preflight tells you whether the stack is secure,
            observable, reliable and scalable, then proves the path under behavioural and load pressure.
          </SectionHeading>
          <div className="compare-grid split-top">
            <article className="compare-card">
              <p className="kicker">Before deploy</p>
              <h3>Find the missing conditions early.</h3>
              <ul>
                <li>Missing alarms, DLQs, encryption and auth posture.</li>
                <li>Implicit concurrency, throttling and autoscaling decisions.</li>
                <li>Weak observability and durability defaults that would only show up later.</li>
              </ul>
            </article>
            <article className="compare-card">
              <p className="kicker">After deploy</p>
              <h3>Verify the path, then pressure it.</h3>
              <ul>
                <li>Structural, wiring, IAM and behavioural assertions against the live stack.</li>
                <li>Generated HTTP load scenarios from the same behavioural path.</li>
                <li>Machine-readable output for CI, PR comments and future UI surfaces.</li>
              </ul>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
