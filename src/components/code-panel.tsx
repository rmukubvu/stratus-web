"use client";

import { useId, useState } from "react";
import type { CodeSample } from "@/content/site";
import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

type Props = { samples: CodeSample[]; caption?: string };

export function CodePanel({ samples, caption }: Props) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const sample = samples[active];

  return (
    <div className="code-panel">
      <div className="code-panel-bar">
        <span className="dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        {samples.length > 1 ? (
          <div className="code-tabs" role="tablist" aria-label={caption ?? "Code samples"}>
            {samples.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                className={i === active ? "is-active" : undefined}
                onClick={() => setActive(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="code-caption">{caption ?? sample.label}</span>
        )}
        <CopyButton text={sample.copyText ?? sample.code} />
      </div>
      <pre
        className="code-body"
        id={`${baseId}-panel`}
        role={samples.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={samples.length > 1 ? `${baseId}-tab-${active}` : undefined}
        tabIndex={0}
      >
        <code>
          {highlight(sample.code, sample.language).map((line, n) => (
            <span className="code-line" key={n}>
              {line.map((token, t) =>
                token.kind === "plain" ? token.text : (
                  <span key={t} className={`tok-${token.kind}`}>
                    {token.text}
                  </span>
                ),
              )}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
