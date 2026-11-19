# AAISM Study Companion

A static study website for the **ISACA Advanced in AI Security Management (AAISM™)** exam, designed for a learner with ADHD.

It uses a small, muted colour palette and short content chunks. Every topic page follows the same five steps: **concept → why it matters → mnemonic → exam tip → quick check**.

## View it

**Locally, no install needed:** open `index.html` in any modern browser by double-clicking it. Everything runs from `file://`.

If you'd rather use a local server:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

**GitHub Pages:**

1. Go to repo **Settings → Pages**.
2. Under *Build and deployment*, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then click **Save**.
4. The site appears at `https://<user>.github.io/ProjectAAISM/` after a minute or so.

The `.nojekyll` file makes Pages serve the files exactly as they are.

## Features

| Feature | Where |
|---|---|
| Domain → subdomain → topic navigation, persistent table-of-contents sidebar with ✓ ticks | left sidebar |
| One page per exam topic: explanation, mnemonic(s), SVG diagram, exam tip, 3–5 practice questions | `#/topic/<id>` |
| Estimated read time for each section and each topic | pills next to headings |
| Collapsible sections (plus *Collapse all*) | every page |
| **Focus mode**: hides the sidebar and shows one concept card at a time (← → keys) | top bar → *Focus* |
| Master practice quiz: exam-weighted (31/31/38), 10–90 questions, instant feedback, "missed only" retry, optional pace timer | `#/quiz` |
| Mnemonic flashcards: flip, mark known, shuffle, filter by domain | `#/flashcards` |
| Searchable glossary, plus global search (press `/`) | `#/glossary` |
| Cram sheet per domain (printable) | `#/cram/d1`, `d2`, `d3` |
| Progress dashboard: completion and quiz accuracy per domain and subdomain, export/import/reset | `#/progress` |
| Study path and exam-day tips | `#/study-path`, `#/exam-tips` |
| Dark/light toggle (remembers your choice; follows the OS setting by default) | top bar |

Progress is stored in the browser's `localStorage`. Use **Export progress** on the dashboard to move it to another browser.

The site has no autoplaying animation and respects `prefers-reduced-motion`.

## Structure

```
index.html               entry point
assets/css/style.css     theme (light/dark), layout, components
assets/js/app.js         hash router and all views (no framework, no build)
assets/js/diagrams.js    turns diagram specs into inline SVG
assets/js/pages.js       exam facts, study path, exam-day tips
assets/js/data/d1-3.js   exam content, one file per domain
CONTENT_SCHEMA.md        data format for content files
tools/validate.js        content validator (node tools/validate.js)
```

## Editing content

Content lives in plain JavaScript data files (`assets/js/data/d1.js`, `d2.js`, `d3.js`), following `CONTENT_SCHEMA.md`. After editing, run:

```bash
node tools/validate.js
```

It checks IDs, required fields, question format, how balanced the answer positions are and diagram specs.

## Sources and disclaimer

- The domain structure and weights follow ISACA's published [AAISM Exam Content Outline](https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline): D1 31%, D2 31%, D3 38%, 90 questions.
- ISACA says the outline will change on **18 May 2027**.
- Topic content cites primary sources: NIST AI RMF / AI 600-1 / AI 100-2, ISO/IEC 42001 & 23894, EU AI Act, OWASP Top 10 for LLM Applications, MITRE ATLAS and others.

This is an independent study aid. ISACA has not endorsed it, and its questions are not official exam items. Always check details against ISACA's current candidate guide and review manual.
