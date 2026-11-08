import Link from "next/link";
import { BenchmarkChart } from "@/components/benchmark-chart";
import { CodePanel } from "@/components/code-panel";
import { CopyButton } from "@/components/copy-button";
import { HeroTerminal } from "@/components/hero-terminal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { GitHubIcon, SiteHeader } from "@/components/site-header";
import {
  benchmark,
  chaosActions,
  chaosSample,
  ciSample,
  ciSteps,
  controlEndpoints,
  controlSample,
  demoSteps,
  diagnosis,
  eventPaths,
  installCommand,
  links,
  mcpInstall,
  mcpTools,
  pillars,
  quickstart,
  sdkSample,
  stats,
  worksWith,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StatsBand />
        <Pillars />
        <ControlSection />
        <CiSection />
        <BenchmarkSection />
        <ChaosSection />
        <AgentsSection />
        <DemoSection />
        <PreflightBand />
        <QuickStart />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden />
      <div className="container hero-grid">
        <div className="hero-copy">
          <a className="announce" href="#features">
            <span className="announce-tag">New</span>
            Snapshots, seeded chaos and an MCP server
            <span aria-hidden>→</span>
          </a>
          <h1>
            Local AWS that
            <br />
            <span className="grad-text">snaps back</span>
            <br />
            in 11&nbsp;ms.
          </h1>
          <p className="hero-lede">
            Stratus is a single-binary AWS emulator built for CI pipelines and coding agents. Snapshot
            state, fork isolated test runs, replay faults by seed, and get failures explained in plain
            language.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#quickstart">
              Get started
            </a>
            <a className="btn btn-ghost" href={links.repo} target="_blank" rel="noreferrer">
              <GitHubIcon /> Star on GitHub
            </a>
          </div>
          <div className="install">
            <span className="install-prompt">$</span>
            <code>{installCommand}</code>
            <CopyButton text={installCommand} />
          </div>
        </div>
        <HeroTerminal />
      </div>

      <div className="container works-with" aria-label="Works with">
        <span>Works with</span>
        <ul>
          {worksWith.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="container stats" aria-label="Highlights">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <strong>{s.value}</strong>
          <span className="stat-label">{s.label}</span>
          <span className="stat-detail">{s.detail}</span>
        </div>
      ))}
    </section>
  );
}

function Pillars() {
  return (
    <section className="section container" id="features">
      <SectionHeading kicker="What's new" title="Four reasons your tests stop being slow and flaky." align="center">
        All of it is covered by tests and re-proven in CI on every push.
      </SectionHeading>
      <div className="pillars">
        {pillars.map((p, i) => (
          <a className={`pillar pillar-${i + 1}`} href={`#${p.id}`} key={p.id}>
            <span className="pillar-kicker">{p.kicker}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <span className="pillar-more">Learn more →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ControlSection() {
  return (
    <section className="section container split" id="control">
      <div>
        <SectionHeading kicker="Control API" title="A clean slate whenever you want one.">
          One JSON API on the normal Stratus port manages the emulator itself. Snapshots are
          transactionally consistent and hard-link blobs, so they cost little disk even with big S3
          objects or Lambda bundles.
        </SectionHeading>
        <ul className="endpoint-list">
          {controlEndpoints.map((e) => (
            <li key={e.path}>
              <span className={`method method-${e.method.toLowerCase()}`}>{e.method}</span>
              <code>{e.path}</code>
              <span className="endpoint-note">{e.note}</span>
            </li>
          ))}
        </ul>
        <a className="text-link" href={links.controlApiDoc}>
          Control API reference →
        </a>
      </div>
      <CodePanel samples={controlSample} caption="Control API" />
    </section>
  );
}

function CiSection() {
  return (
    <section className="section section-tint" id="ci">
      <div className="container">
        <SectionHeading kicker="Clean, fast CI" title="Every CI run gets its own private AWS.">
          <code>stratus ci</code> wraps your test command. Jobs run in parallel without sharing state,
          and nothing outlives the run: no orphaned containers, ports or data directories.
        </SectionHeading>
        <ol className="steps">
          {ciSteps.map((s, i) => (
            <li key={s.title}>
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="split split-top">
          <div className="callouts">
            <div className="callout">
              <h3>Linux, macOS and Windows</h3>
              <p>
                The GitHub Action installs Stratus on all three runners. Everything works without
                Docker except Lambda execution, which needs Linux containers.
              </p>
            </div>
            <div className="callout">
              <h3>Self-cleaning, even after a crash</h3>
              <p>
                Every Lambda container is labelled with the instance, process and host that owns it.
                On startup Stratus reaps anything a dead process left behind.
              </p>
            </div>
            <a className="text-link" href={links.ciDoc}>
              Running Stratus in CI →
            </a>
          </div>
          <CodePanel samples={ciSample} caption="CI" />
        </div>
      </div>
    </section>
  );
}

function BenchmarkSection() {
  return (
    <section className="section container split" id="benchmark">
      <div>
        <SectionHeading kicker="Benchmark" title="From 196 seconds to 2.2.">
          Most integration suites spend their time getting back to a known state, not testing.
          Restoring a snapshot replaces about 2,000 setup calls per test, which makes isolation{" "}
          <strong>~89x faster</strong>. Each strategy must restore the exact fixture, so a leaky one
          fails instead of looking fast.
        </SectionHeading>
        <p className="fine-print">
          4 vCPU Linux container. Fixture: 4 buckets × 100 objects, 3 tables × 500 items, 3 queues × 50
          messages. CI reruns the benchmark on every push.
        </p>
        <a className="text-link" href={links.benchmarkDoc}>
          Methodology and raw numbers →
        </a>
      </div>
      <BenchmarkChart rows={benchmark} />
    </section>
  );
}

function ChaosSection() {
  return (
    <section className="section section-dark" id="chaos">
      <div className="container split">
        <div>
          <SectionHeading kicker="Deterministic chaos" title="Chaos you can replay, not shrug off.">
            Whether the nth matching request is faulted depends only on the seed, the rule and n. Same
            seed, same faults, so a chaos failure is a bug you can reproduce. No service mesh, sidecar
            or code changes, because every call already goes through Stratus.
          </SectionHeading>
          <div className="chip-group">
            <span className="chip-title">Actions</span>
            <ul className="chips">
              {chaosActions.map((a) => (
                <li key={a}>
                  <code>{a}</code>
                </li>
              ))}
            </ul>
          </div>
          <div className="chip-group">
            <span className="chip-title">Internal event paths, which no fault injector in AWS can reach</span>
            <ul className="chips chips-accent">
              {eventPaths.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <p className="dark-note">
            Already write <strong>AWS Fault Injection Service</strong> templates? Stratus speaks the FIS
            API, so they run unchanged from the AWS CLI or any SDK. <a href={links.fisDoc}>FIS support →</a>
          </p>
        </div>
        <CodePanel samples={chaosSample} caption="Chaos" />
      </div>
    </section>
  );
}

function AgentsSection() {
  return (
    <section className="section container" id="agents">
      <SectionHeading kicker="Agent-native" title="A local AWS your coding agent can drive safely." align="center">
        Claude Code, Cursor, Codex or any MCP client can check Stratus is up, save and roll back state,
        inject faults, and ask why a call failed, without parsing stack traces.
      </SectionHeading>

      <div className="agents-grid">
        <div className="agent-card">
          <span className="pillar-kicker">MCP server</span>
          <h3>One line to connect.</h3>
          <div className="install install-dark">
            <span className="install-prompt">$</span>
            <code>{mcpInstall}</code>
            <CopyButton text={mcpInstall} />
          </div>
          <p>
            <code>--start</code> gives the agent its own throwaway Stratus, removed on exit. Failing tools
            return a stable error code and a hint, so the agent can correct itself.
          </p>
          <ul className="tool-list">
            {mcpTools.map((t) => (
              <li key={t}>
                <code>{t}</code>
              </li>
            ))}
          </ul>
        </div>

        <div className="agent-card">
          <span className="pillar-kicker">LLM diagnostics</span>
          <h3>Failures, explained for agents.</h3>
          <div className="diagnosis" role="group" aria-label="Example stratus diagnose output">
            <div className="diagnosis-head">
              <code>stratus diagnose --since 5m</code>
            </div>
            <p className="diagnosis-summary">{diagnosis.summary}</p>
            <dl>
              <div>
                <dt>category</dt>
                <dd>
                  <span className="tag">{diagnosis.category}</span>
                </dd>
              </div>
              <div>
                <dt>likely_cause</dt>
                <dd>{diagnosis.cause}</dd>
              </div>
              <div>
                <dt>next_step</dt>
                <dd>{diagnosis.next}</dd>
              </div>
              <div>
                <dt>your_bug</dt>
                <dd>
                  <span className="tag tag-warn">{String(diagnosis.yourBug)}</span>
                </dd>
              </div>
            </dl>
          </div>
          <p>Chaos faults are attributed to the rule that injected them, so an agent never “fixes” working code.</p>
        </div>
      </div>

      <div className="split split-top sdk-row">
        <div>
          <SectionHeading kicker="SDKs" title="TypeScript and Python, zero dependencies.">
            Typed errors and helpers that always clean up: snapshot scopes roll state back after a block
            and chaos scopes always stop the experiment. Python ships pytest fixtures too.
          </SectionHeading>
          <p className="soon">
            <span className="soon-dot" aria-hidden />
            <span>
              Coming soon to npm and PyPI as <code>stratus-emulator</code>. Use them from the repo today:{" "}
              <a href={links.sdkTs}>TypeScript</a> · <a href={links.sdkPy}>Python</a>
            </span>
          </p>
        </div>
        <CodePanel samples={sdkSample} caption="SDKs" />
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="section section-tint" id="demo">
      <div className="container">
        <SectionHeading kicker="Demo" title="Watch an agent find a bug, fix it, and prove it under chaos." align="center">
          A real <code>stratus mcp</code> session, replayed step by step. CI runs it on every push and
          fails if any step stops behaving as described.
        </SectionHeading>
        <ol className="timeline">
          {demoSteps.map((s, i) => (
            <li key={s.title}>
              <span className="timeline-dot">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="center">
          <a className="btn btn-dark" href={links.agentDemo}>
            Run the demo yourself
          </a>
        </div>
      </div>
    </section>
  );
}

function PreflightBand() {
  return (
    <section className="section container">
      <div className="preflight-band">
        <div>
          <p className="kicker">Pair it with Preflight</p>
          <h2>Emulate locally. Verify externally.</h2>
          <p>
            Preflight lints, scores, diagnoses and load-checks your stack against Stratus from the
            outside, so you know it works before you deploy. Then ship to AWS with{" "}
            <a href={links.kanu}>Kanu</a>.
          </p>
        </div>
        <Link className="btn btn-primary" href="/preflight">
          Explore Preflight
        </Link>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className="section container split" id="quickstart">
      <div>
        <SectionHeading kicker="Quick start" title="Running in under a minute.">
          Point the AWS CLI, any SDK, CDK or Terraform at <code>localhost:4566</code>. One binary, one
          data directory, and Docker only if you run Lambda functions.
        </SectionHeading>
        <div className="hero-actions">
          <a className="btn btn-primary" href={links.repo} target="_blank" rel="noreferrer">
            <GitHubIcon /> View on GitHub
          </a>
          <a className="btn btn-ghost" href={links.docs}>
            Read the docs
          </a>
        </div>
      </div>
      <CodePanel samples={quickstart} />
    </section>
  );
}
