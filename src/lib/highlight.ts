// A deliberately tiny highlighter for the site's code samples: comments and
// string literals are enough to make shell, YAML, JSON, TS and Python samples
// readable without shipping a syntax-highlighting library to the browser.

export type TokenKind = "plain" | "comment" | "string";
export type Token = { kind: TokenKind; text: string };

const commentMarkers: Record<string, string> = {
  sh: "#",
  yaml: "#",
  python: "#",
  ts: "//",
};

export function highlightLine(line: string, language: string): Token[] {
  const marker = commentMarkers[language];
  const tokens: Token[] = [];
  let plain = "";
  let i = 0;

  const flushPlain = () => {
    if (plain) tokens.push({ kind: "plain", text: plain });
    plain = "";
  };

  while (i < line.length) {
    const ch = line[i];

    if (marker && line.startsWith(marker, i) && isCommentStart(line, i, marker)) {
      flushPlain();
      tokens.push({ kind: "comment", text: line.slice(i) });
      return tokens;
    }

    if (ch === '"' || ch === "'") {
      const end = line.indexOf(ch, i + 1);
      if (end !== -1) {
        flushPlain();
        tokens.push({ kind: "string", text: line.slice(i, end + 1) });
        i = end + 1;
        continue;
      }
    }

    plain += ch;
    i++;
  }

  flushPlain();
  return tokens;
}

// "#" only starts a shell comment at the start of a word, so `${{ x }}`,
// URLs with fragments and `#!` inside words are left alone.
function isCommentStart(line: string, index: number, marker: string): boolean {
  if (index === 0) return true;
  const before = line[index - 1];
  if (marker === "//") return before !== ":";
  return before === " " || before === "\t";
}

export function highlight(code: string, language: string): Token[][] {
  return code.split("\n").map((line) => highlightLine(line, language));
}
