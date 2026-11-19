#!/usr/bin/env node
// Validates assets/js/data/*.js against CONTENT_SCHEMA.md. Usage: node tools/validate.js [d1 d2 d3]
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.join(__dirname, "..", "assets", "js", "data");
const only = process.argv.slice(2);
const ctx = { window: {} }; ctx.window.AAISM = { domains: [] }; ctx.AAISM = ctx.window.AAISM;
vm.createContext(ctx);
for (const f of fs.readdirSync(dir).filter(f => /^d\d\.js$/.test(f)).sort()) {
  if (only.length && !only.includes(f.replace(".js", ""))) continue;
  try { vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f }); }
  catch (e) { console.error(`SYNTAX ${f}: ${e.message}`); process.exitCode = 1; }
}
const errs = [], warns = [], ids = new Set(), terms = new Map();
const words = s => String(s || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const DT = { flow: "steps", cycle: "steps", layers: "items", pyramid: "items", matrix: "cells", hub: "steps" };
let nTopics = 0, nQ = 0, nM = 0, nG = 0;
for (const d of ctx.AAISM.domains) {
  if (!d.id || !d.title || !d.weight || !Array.isArray(d.subdomains)) errs.push(`domain ${d.id}: missing id/title/weight/subdomains`);
  for (const s of d.subdomains || []) {
    if (!s.id || !s.code || !s.title || !Array.isArray(s.topics) || !s.topics.length) errs.push(`subdomain ${s.id}: missing fields or no topics`);
    for (const t of s.topics || []) {
      nTopics++;
      const at = `${t.id || "?"}`;
      if (!t.id || ids.has(t.id)) errs.push(`${at}: missing or duplicate id`); ids.add(t.id);
      if (t.id && !t.id.startsWith(s.id + "-")) errs.push(`${at}: id must start with "${s.id}-"`);
      for (const k of ["title", "why", "examTip"]) if (!t[k]) errs.push(`${at}: missing ${k}`);
      if (!Array.isArray(t.concept) || t.concept.length < 2 || t.concept.length > 5) errs.push(`${at}: concept must have 2-5 chunks`);
      (t.concept || []).forEach((c, i) => { if (!c.h || !c.body) errs.push(`${at}: concept[${i}] needs h & body`); if (words(c.body) > 110) warns.push(`${at}: concept[${i}] ${words(c.body)} words (aim ≤70)`); });
      if (!Array.isArray(t.mnemonics) || t.mnemonics.length < 1 || t.mnemonics.length > 3) errs.push(`${at}: mnemonics must have 1-3`);
      (t.mnemonics || []).forEach((m, i) => { nM++; for (const k of ["device", "type", "recall", "text"]) if (!m[k]) errs.push(`${at}: mnemonics[${i}] missing ${k}`);
        if (m.type && !["acronym", "story", "visual", "chunk"].includes(m.type)) errs.push(`${at}: mnemonics[${i}] bad type ${m.type}`); });
      if (!Array.isArray(t.keyPoints) || t.keyPoints.length < 3 || t.keyPoints.length > 6) errs.push(`${at}: keyPoints must have 3-6`);
      if (!Array.isArray(t.quiz) || t.quiz.length < 3 || t.quiz.length > 5) errs.push(`${at}: quiz must have 3-5`);
      (t.quiz || []).forEach((q, i) => { nQ++;
        if (!q.q || !q.explain) errs.push(`${at}: quiz[${i}] needs q & explain`);
        if (!Array.isArray(q.options) || q.options.length !== 4) errs.push(`${at}: quiz[${i}] needs exactly 4 options`);
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errs.push(`${at}: quiz[${i}] answer must be 0-3`);
        if (q.options && new Set(q.options).size !== q.options.length) errs.push(`${at}: quiz[${i}] duplicate options`); });
      if (!Array.isArray(t.glossary) || t.glossary.length < 2) errs.push(`${at}: glossary needs ≥2 terms`);
      (t.glossary || []).forEach(g => { nG++; if (!g.term || !g.def) errs.push(`${at}: glossary entry missing term/def`);
        const k = String(g.term).toLowerCase(); if (terms.has(k)) warns.push(`${at}: glossary term "${g.term}" also in ${terms.get(k)}`); else terms.set(k, t.id); });
      if (t.diagram) { const dg = t.diagram, f = DT[dg.type];
        if (!f) errs.push(`${at}: diagram bad type ${dg.type}`);
        else if (!Array.isArray(dg[f]) || !dg[f].length) errs.push(`${at}: diagram ${dg.type} needs ${f}[]`);
        if (dg.type === "matrix" && (!Array.isArray(dg.rows) || !Array.isArray(dg.cols))) errs.push(`${at}: matrix needs rows & cols`);
        (dg.steps || dg.items || []).forEach(x => { if (!x.label) errs.push(`${at}: diagram item missing label`); else if (x.label.length > 18) warns.push(`${at}: diagram label "${x.label}" > 16 chars`);
          if (x.sub && x.sub.length > 26) warns.push(`${at}: diagram sub "${x.sub}" > 22 chars`); }); }
      if (!Array.isArray(t.sources) || !t.sources.length) warns.push(`${at}: no sources`);
    }
  }
}
// answer-position balance
const pos = [0, 0, 0, 0]; ctx.AAISM.domains.forEach(d => d.subdomains.forEach(s => s.topics.forEach(t => (t.quiz || []).forEach(q => pos[q.answer]++))));
warns.forEach(w => console.log("WARN  " + w)); errs.forEach(e => console.log("ERROR " + e));
console.log(`\n${ctx.AAISM.domains.length} domains, ${nTopics} topics, ${nQ} questions, ${nM} mnemonics, ${nG} glossary terms; answer positions A/B/C/D = ${pos.join("/")}`);
console.log(errs.length ? `FAIL: ${errs.length} error(s)` : "OK");
if (errs.length) process.exitCode = 1;
