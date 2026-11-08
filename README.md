# stratus-web

Marketing site for [Stratus](https://github.com/rmukubvu/stratus), deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests (node:test)
npm run lint
npm run build
```

## Layout

- `src/content/site.ts` holds all copy, numbers and code samples. Keep claims in
  step with the Stratus docs (`docs/*.md` in the main repo) when features change.
- `src/components/` holds the shared pieces: header, footer, code panels with
  tabs and copy buttons, the benchmark chart and the hero terminal.
- `src/lib/highlight.ts` is a tiny comment/string highlighter for code samples,
  tested in `highlight.test.ts`.
- `src/app/page.tsx` is the home page; `src/app/preflight/page.tsx` the Preflight page.
