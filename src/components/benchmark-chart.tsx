import type { BenchmarkRow } from "@/content/site";

// Bars share one linear scale on purpose: the snapshot rows should look as
// small next to the setup rows as they really are.
export function BenchmarkChart({ rows }: { rows: BenchmarkRow[] }) {
  const max = Math.max(...rows.map((r) => r.medianMs));

  return (
    <figure className="bench">
      <figcaption className="bench-caption">Median isolation time per test (lower is better)</figcaption>
      <ul className="bench-rows">
        {rows.map((row) => {
          const width = Math.max((row.medianMs / max) * 100, 1.2);
          return (
            <li key={row.strategy} className={row.highlight ? "is-fast" : undefined}>
              <div className="bench-label">
                <span>{row.strategy}</span>
                <span className="bench-speedup">{row.speedup}</span>
              </div>
              <div className="bench-track">
                <div className="bench-bar" style={{ width: `${width}%` }} />
                <span className="bench-value">{row.medianMs.toLocaleString("en-US")} ms</span>
              </div>
              <div className="bench-total">200 tests: {row.total}</div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
