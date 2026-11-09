import Link from "next/link";
import { links } from "@/content/site";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <Logo />
            <span>stratus</span>
          </Link>
          <p>Local AWS for CI pipelines and coding agents. Open source, Apache-2.0.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Docs</h4>
            <a href={links.controlApiDoc}>Control API</a>
            <a href={links.ciDoc}>CI</a>
            <a href={links.chaosDoc}>Chaos</a>
            <a href={links.fisDoc}>AWS FIS</a>
            <a href={links.agentsDoc}>Agents &amp; MCP</a>
          </div>
          <div>
            <h4>Project</h4>
            <a href={links.repo}>GitHub</a>
            <a href={links.benchmarkDoc}>Benchmark</a>
            <a href={links.agentDemo}>Agent demo</a>
            <Link href="/preflight">Preflight</Link>
            <a href={links.kanu}>Deploy with Kanu</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
