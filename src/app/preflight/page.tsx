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
    <main className="site-shell preflight-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">P</span>
          <span className="brand-copy">
            <strong>Preflight</strong>
            <span>with Stratus</span>
          </span>
        </a>

        <nav className="topnav" aria-label="Primary">
          <a href="/">Stratus</a>
          <a href="#examples">Examples</a>
          <a href="#loop">Loop</a>
          <a href="https://github.com/rmukubvu/preflight" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <section className="docs-hero" id="top">
        <div className="docs-hero-copy">
          <p className="eyebrow">Preflight</p>
          <h1>External proof for local AWS delivery loops.</h1>
          <p className="hero-text">
            Preflight lints, scores, diagnoses, and load-checks your stack
            against a local emulator before you decide it is ready for AWS.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/rmukubvu/preflight" target="_blank" rel="noreferrer">
              Explore Preflight
            </a>
            <a className="button button-secondary" href="#examples">
              See Examples
            </a>
          </div>
        </div>

        <aside className="docs-hero-panel">
          <div className="proof-mini-card">
            <span className="eyebrow">Validated Loop</span>
            <ul>
              {proofLoop.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="docs-section" id="examples">
        <div className="section-heading">
          <p className="eyebrow">Examples</p>
          <h2>What each Preflight surface is for.</h2>
          <p className="section-copy">
            These are the four operator-facing surfaces that make Preflight
            useful in practice: static lint, readiness scores, concrete
            diagnoses, and generated load checks.
          </p>
        </div>

        <div className="docs-grid">
          {sections.map((section) => (
            <article className="docs-card" key={section.title}>
              <p className="eyebrow">{section.eyebrow}</p>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
              <div className="docs-command">
                <span>Command</span>
                <code>{section.command}</code>
              </div>
              <pre className="docs-output">
                <code>{section.output}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>

      <section className="docs-section" id="loop">
        <div className="section-heading">
          <p className="eyebrow">Why it matters</p>
          <h2>Preflight is the part that turns a local stack into a trustworthy one.</h2>
          <p className="section-copy">
            Stratus gives you local AWS-shaped execution. Preflight tells you
            whether the stack has the conditions required to be secure,
            observable, reliable, and scalable, then proves the path under
            behavioral and load pressure.
          </p>
        </div>

        <div className="positioning-grid">
          <article className="positioning-card">
            <p className="eyebrow">Before deploy</p>
            <h3>Find the missing conditions early.</h3>
            <ul>
              <li>Missing alarms, DLQs, encryption, and auth posture.</li>
              <li>Implicit concurrency, throttling, and autoscaling decisions.</li>
              <li>Weak observability and durability defaults that would only show up later.</li>
            </ul>
          </article>

          <article className="positioning-card">
            <p className="eyebrow">After deploy</p>
            <h3>Verify the path, then pressure it.</h3>
            <ul>
              <li>Structural, wiring, IAM, and behavioural assertions against the live stack.</li>
              <li>Generated HTTP load scenarios from the same behavioural path.</li>
              <li>Machine-readable output for CI, PR comments, and future UI surfaces.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
