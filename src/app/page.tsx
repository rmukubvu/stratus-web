const serviceFamilies = [
  "STS",
  "S3",
  "Lambda",
  "DynamoDB",
  "SQS",
  "IAM",
  "CloudFormation",
  "API Gateway",
  "EventBridge",
  "Step Functions",
  "Kinesis",
  "Secrets Manager",
];

const proofPoints = [
  {
    label: "26",
    value: "service families live",
    detail: "Focused breadth with real contract pressure instead of fake parity.",
  },
  {
    label: "CLI / SDK / CDK",
    value: "real client compatibility",
    detail: "AWS CLI, Java SDK smoke, CDK deploys, and emulator-targeted validation.",
  },
  {
    label: "1 binary",
    value: "operationally simple",
    detail: "Core control plane boots locally with one data dir and optional Docker for Lambda.",
  },
];

const storyCards = [
  {
    eyebrow: "Stratus",
    title: "A local AWS control plane built for fast loops, not vague demos.",
    body: "Request classification is explicit, service semantics stay isolated, metadata lives in bbolt, large payloads live on disk, and failures are shaped to be understandable.",
  },
  {
    eyebrow: "Preflight",
    title: "An external validator that keeps the emulator honest.",
    body: "Preflight treats Stratus as a consumer would. It deploys, probes, and verifies structural, wiring, IAM, and behavioural paths without reaching into implementation internals, and it can attach optional AI-assisted diagnosis when assertions fail.",
  },
];

const valueCards = [
  {
    eyebrow: "Stratus solves execution",
    title: "Local execution and compatibility for real AWS-shaped workflows.",
    points: [
      "Run AWS-shaped infrastructure locally",
      "Use real tooling like AWS CLI, SDKs, and CDK",
      "Get fast feedback without deploying to AWS",
      "Reproduce failures in a deterministic environment",
    ],
  },
  {
    eyebrow: "Preflight solves trust",
    title: "External verification before you decide the stack is ready.",
    points: [
      "Prove the stack actually works, not just that resources were created",
      "Validate structure, wiring, IAM, and behavior from the outside",
      "Add optional AI-assisted diagnosis when something fails",
      "Catch compatibility regressions before cloud deployment",
    ],
  },
];

const workflow = [
  {
    step: "01",
    title: "Boot Stratus locally",
    body: "Run one process, point standard AWS tooling at it, and get an operator-friendly terminal view instead of silent middleware soup.",
  },
  {
    step: "02",
    title: "Deploy a real path",
    body: "Use AWS CLI, SDKs, or CDK against the emulator. The happy path is intentional: API Gateway to Lambda to SQS to Lambda to DynamoDB.",
  },
  {
    step: "03",
    title: "Let Preflight verify behavior",
    body: "Preflight catches the difference between metadata-looking-correct and the actual path working end to end.",
  },
];

const terminalLines = [
  "INFO  200 sts.GetCallerIdentity POST / 3ms 0d1f48c8",
  "INFO  200 s3.CreateBucket PUT /demo-artifacts 5ms 3f2b1011",
  "INFO  200 lambda.CreateFunction POST /2015-03-31/functions 11ms 61a6d22d",
  "INFO  200 apigatewayv2.CreateApi POST /v2/apis 7ms 8303d5f7",
  "INFO  stratus-inline-httpapi port=9001 4e5a3d1c",
  "INFO  200 sqs.SendMessage POST / 4ms 7a913f23",
  "INFO  200 dynamodb.PutItem POST / 6ms c0e7b91a",
];

const examples = [
  {
    title: "Java SDK smoke",
    body: "A real AWS SDK for Java v2 fixture proves STS, DynamoDB, SQS, and S3 over a network boundary instead of through mocks.",
    meta: "Maven fixture",
  },
  {
    title: "CDK deploy path",
    body: "The inline HTTP API stack deploys through CloudFormation and resolves into a live execute-api path in the emulator.",
    meta: "Bootstrapless CDK",
  },
  {
    title: "Preflight gate",
    body: "Use the external validator to assert structural, wiring, IAM, and behavioural guarantees, then layer in optional AI-assisted diagnosis to speed up failure analysis.",
    meta: "Black-box validation + diagnosis",
  },
];

const compatibilityItems = [
  "AWS CLI",
  "AWS SDKs",
  "AWS CDK",
  "Terraform",
  "Preflight",
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">S</span>
          <span className="brand-copy">
            <strong>Stratus</strong>
            <span>with Preflight</span>
          </span>
        </a>

        <nav className="topnav" aria-label="Primary">
          <a href="#platform">Platform</a>
          <a href="#workflows">Workflows</a>
          <a href="#proof">Proof</a>
          <a href="#repos">Repos</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Local AWS, sharpened for real engineering loops</p>
          <h1>
            Build locally.
            <br />
            Deploy realistically.
            <br />
            Verify externally.
          </h1>
          <p className="hero-text">
            Stratus emulates your AWS stack locally. Preflight verifies that it
            actually works before you deploy.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/rmukubvu/stratus" target="_blank" rel="noreferrer">
              Explore Stratus
            </a>
            <a className="button button-secondary" href="https://github.com/rmukubvu/preflight" target="_blank" rel="noreferrer">
              Explore Preflight
            </a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-glow" />
          <div className="terminal-card">
            <div className="terminal-top">
              <span>operator view</span>
              <span>localhost:4566</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-metrics">
                <div>
                  <strong>2xx</strong>
                  <span>182</span>
                </div>
                <div>
                  <strong>4xx</strong>
                  <span>3</span>
                </div>
                <div>
                  <strong>5xx</strong>
                  <span>0</span>
                </div>
              </div>
              <pre>
                {terminalLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </pre>
            </div>
          </div>
        </aside>
      </section>

      <section className="positioning-section">
        <div className="section-heading">
          <p className="eyebrow">What this is</p>
          <h2>Stratus and Preflight give developers a credible local AWS delivery loop.</h2>
          <p className="section-copy">
            One product gives you fast local execution and compatibility. The
            other gives you external proof that the path really works.
          </p>
        </div>

        <div className="positioning-grid">
          {valueCards.map((card) => (
            <article className="positioning-card" key={card.title}>
              <p className="eyebrow">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-strip" aria-label="Highlights">
        {proofPoints.map((item) => (
          <article className="proof-chip" key={item.label}>
            <p className="proof-label">{item.label}</p>
            <h2>{item.value}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="story-grid" id="platform">
        {storyCards.map((card) => (
          <article className="story-card" key={card.title}>
            <p className="eyebrow">{card.eyebrow}</p>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="architecture-band">
        <div className="band-copy">
          <p className="eyebrow">Compatibility before cleverness</p>
          <h2>A narrower surface with harder guarantees.</h2>
          <p>
            The architecture is intentionally plain: a `net/http` front door,
            explicit request classification, isolated service semantics,
            bbolt-backed metadata, filesystem blobs, and Docker only where
            Lambda execution actually needs it.
          </p>
        </div>
        <div className="service-cloud" aria-label="Service families">
          {serviceFamilies.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>

      <section className="workflow-section" id="workflows">
        <div className="section-heading">
          <p className="eyebrow">How the loop works</p>
          <h2>Emulate, deploy, verify, repeat.</h2>
        </div>

        <div className="workflow-grid">
          {workflow.map((item) => (
            <article className="workflow-card" key={item.step}>
              <span className="workflow-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="examples-section" id="proof">
        <div className="section-heading">
          <p className="eyebrow">Proof paths</p>
          <h2>Real tooling, not emulator theater.</h2>
        </div>

        <div className="examples-grid">
          {examples.map((example) => (
            <article className="example-card" key={example.title}>
              <span>{example.meta}</span>
              <h3>{example.title}</h3>
              <p>{example.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="compatibility-strip" aria-label="Compatibility">
        <p>Built for AWS-compatible local workflows</p>
        <div>
          {compatibilityItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="cta-panel" id="repos">
        <div>
          <p className="eyebrow">Open source stack</p>
          <h2>Emulate locally. Verify externally.</h2>
          <p>
            Stratus gives you the local AWS control plane. Preflight gives you
            the external pressure that keeps the claim credible.
          </p>
          <p>
            After validating locally, you can deploy to AWS with{" "}
            <a href="https://www.getkanu.com/" target="_blank" rel="noreferrer">
              Kanu
            </a>
            .
          </p>
        </div>
        <div className="cta-actions">
          <a className="button button-primary" href="https://github.com/rmukubvu/stratus" target="_blank" rel="noreferrer">
            View Stratus Repo
          </a>
          <a className="button button-secondary" href="https://github.com/rmukubvu/preflight" target="_blank" rel="noreferrer">
            View Preflight Repo
          </a>
        </div>
      </section>
    </main>
  );
}
