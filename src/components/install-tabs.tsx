"use client";

import { useId, useState } from "react";
import { installOptions } from "@/content/install";
import { highlightLine } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

/** Per-OS install commands with tabs, compact enough for the hero. */
export function InstallTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const option = installOptions[active];
  const prompt = option.language === "powershell" ? "PS>" : "$";

  return (
    <div className="install-tabs">
      <div className="install-tablist" role="tablist" aria-label="Install Stratus">
        {installOptions.map((o, i) => (
          <button
            key={o.os}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            className={i === active ? "is-active" : undefined}
            onClick={() => setActive(i)}
          >
            {o.os}
          </button>
        ))}
      </div>
      <div className="install-block" id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`}>
        <pre tabIndex={0}>
          {option.code.split("\n").map((line, i) => (
            <span className="install-line" key={i}>
              <span className="install-prompt" aria-hidden>
                {prompt}
              </span>
              <code>
                {highlightLine(line, option.language).map((token, t) =>
                  token.kind === "plain" ? token.text : (
                    <span key={t} className={`tok-${token.kind}`}>
                      {token.text}
                    </span>
                  ),
                )}
              </code>
            </span>
          ))}
        </pre>
        <CopyButton text={option.code} />
      </div>
      <p className="install-note">{option.note}</p>
    </div>
  );
}
