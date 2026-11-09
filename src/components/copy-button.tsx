"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the text is still selectable.
    }
  }

  return (
    <button type="button" className="copy-button" onClick={copy} aria-label={`${label} to clipboard`}>
      {copied ? "Copied" : label}
    </button>
  );
}
