import { heroTerminal } from "@/content/site";

export function HeroTerminal() {
  return (
    <div className="hero-terminal" aria-label="Example stratus ci run">
      <div className="code-panel-bar">
        <span className="dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="code-caption">ci · ubuntu-latest</span>
        <span className="live-pill">
          <i aria-hidden /> clean
        </span>
      </div>
      <pre className="code-body">
        {heroTerminal.map((line, i) => (
          <span key={i} className={`term-line term-${line.kind}`} style={{ animationDelay: `${0.25 + i * 0.22}s` }}>
            {line.kind === "cmd" ? <span className="term-prompt">$ </span> : null}
            {line.text}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
