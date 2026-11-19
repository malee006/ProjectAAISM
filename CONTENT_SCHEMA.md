# Content schema (assets/js/data/d1.js, d2.js, d3.js)

Each domain file is plain JavaScript (no modules, no build) so the site works from `file://`.
Content is HTML strings. Allowed inline tags: `<b> <i> <em> <strong> <code> <br> <ul> <ol> <li> <p> <abbr title>`.
Keep every chunk SHORT (learner has ADHD): body ≤ ~70 words, bullets ≤ ~15 words each.

```js
window.AAISM = window.AAISM || { domains: [] };
AAISM.domains.push({
  id: "d1",                      // d1 | d2 | d3
  num: 1,
  title: "AI Governance and Program Management",
  weight: 31,                    // % of exam
  summary: "One sentence on what this domain tests.",
  subdomains: [
    {
      id: "d1a",
      code: "1A",
      title: "Stakeholder Considerations, Industry Frameworks, and Regulatory Requirements",
      tasks: [1, 3],             // ISACA supporting-task numbers (1-22) this subdomain maps to
      topics: [
        {
          id: "d1a-nist-ai-rmf",        // globally unique, kebab-case, prefixed with subdomain id
          title: "NIST AI Risk Management Framework (AI RMF 1.0)",
          concept: [                   // 2-5 chunks, each rendered as its own small card
            { h: "What it is", body: "<p>Voluntary US framework (NIST AI 100-1, Jan 2023)…</p>" },
            { h: "The four functions", body: "<ul><li><b>Govern</b> – culture, policies, accountability (cross-cutting)</li>…</ul>" }
          ],
          why: "<p>Why an AI security manager cares / how it shows up on the job.</p>",
          mnemonics: [                 // 1-3; EVERY testable concept on the page needs one
            {
              device: "Good Maps Measure Mountains",      // the hook itself (short)
              type: "acronym",                            // acronym | story | visual | chunk
              recall: "NIST AI RMF core functions (in order)",  // flashcard front prompt
              text: "<b>G</b>overn → <b>M</b>ap → <b>M</b>easure → <b>M</b>anage. Govern is the mountain base under everything."
            }
          ],
          diagram: {                   // optional but use wherever a structure/flow exists
            type: "cycle",             // flow | cycle | layers | pyramid | matrix | hub
            title: "AI RMF Core",
            steps: [ { label: "Map", sub: "context" }, { label: "Measure", sub: "assess" }, { label: "Manage", sub: "treat" } ],
            center: "Govern"           // cycle/hub only
          },
          examTip: "<p>ISACA-style angle: what the BEST/FIRST/MOST answer usually is, common distractors.</p>",
          keyPoints: [                 // 3-6 one-liners for the domain cram sheet
            "AI RMF = voluntary; 4 functions: Govern, Map, Measure, Manage"
          ],
          quiz: [                      // 3-5 ISACA-style scenario MCQs, exactly 4 options, vary answer position
            {
              q: "An organization is starting its AI risk program. Which AI RMF function should be established FIRST?",
              options: ["Measure", "Govern", "Manage", "Map"],
              answer: 1,               // 0-based index into options
              explain: "Govern is cross-cutting and sets the policies, roles and risk culture the other functions depend on."
            }
          ],
          glossary: [                  // 2-6 terms introduced on this page
            { term: "AI RMF", def: "NIST AI Risk Management Framework 1.0 (NIST AI 100-1)…" }
          ],
          sources: [ { label: "NIST AI 100-1", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" } ]
        }
      ]
    }
  ]
});
```

## Diagram specs (rendered as SVG by `assets/js/app.js`; labels ≤ 16 chars, sub ≤ 22 chars)

| type | fields | use for |
|---|---|---|
| `flow` | `steps:[{label,sub}]` (2-7), optional `loop:true` (arrow back to start) | sequences, pipelines, IR phases |
| `cycle` | `steps:[{label,sub}]` (3-8), optional `center:"text"` | iterative life cycles |
| `layers` | `items:[{label,sub}]` (2-6), top → bottom | stacks, governance layers, defense in depth |
| `pyramid` | `items:[{label,sub}]` (2-5), top (narrow) → bottom (wide) | tiered risk (EU AI Act), hierarchies |
| `matrix` | `rows:[..]`, `cols:[..]`, `cells:[[..],[..]]` (strings, ≤ 4x4) | comparisons, 2x2 grids, risk heat maps |
| `hub` | `center:"text"`, `steps:[{label,sub}]` (3-8) | one concept with related parts |

Validate with `node tools/validate.js` (checks ids, counts, answers, lengths).
