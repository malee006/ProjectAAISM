/* AAISM Study Companion — single-page app over hash routes. No build step, works from file://. */
(function () {
  "use strict";
  const esc = window.AAISMDiagram.esc;
  const P = window.AAISMPages;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const LETTERS = ["A", "B", "C", "D"];

  /* ---------- data index ---------- */
  const DOMAINS = ((window.AAISM && window.AAISM.domains) || []).slice().sort((a, b) => a.num - b.num);
  const TOPICS = [], BY_ID = {}, SUBS = {};
  DOMAINS.forEach(d => d.subdomains.forEach(s => {
    SUBS[s.id] = { s, d };
    s.topics.forEach(t => { const e = { t, s, d, i: TOPICS.length }; TOPICS.push(e); BY_ID[t.id] = e; });
  }));
  const words = h => String(h || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = w => Math.max(1, Math.round(w / 200));
  function readTimes(t) {
    const concept = (t.concept || []).reduce((a, c) => a + words(c.h) + words(c.body), 0) + (t.diagram ? 60 : 0);
    const r = {
      concept: mins(concept), why: mins(words(t.why)),
      mnemonic: mins((t.mnemonics || []).reduce((a, m) => a + words(m.device) + words(m.text), 0)),
      tip: mins(words(t.examTip)), quiz: Math.max(1, Math.round((t.quiz || []).length * 0.8))
    };
    r.total = r.concept + r.why + r.mnemonic + r.tip + r.quiz;
    return r;
  }

  /* ---------- persistent state (localStorage) ---------- */
  const KEY = "aaism.progress.v1";
  const blank = () => ({ done: {}, answers: {}, flash: {}, history: [], last: null });
  let S;
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = blank(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage disabled */ } };
  const pref = (k, v) => { try { if (v === undefined) return localStorage.getItem("aaism." + k); localStorage.setItem("aaism." + k, v); } catch (e) { return null; } };

  function topicScore(id) {
    const a = S.answers[id] || {}, e = BY_ID[id]; const n = e ? e.t.quiz.length : 0;
    const ks = Object.keys(a); return { answered: ks.length, correct: ks.filter(k => a[k].ok).length, total: n };
  }
  function domainStats(d) {
    const ts = TOPICS.filter(e => e.d === d);
    let answered = 0, correct = 0, qs = 0;
    ts.forEach(e => { const sc = topicScore(e.t.id); answered += sc.answered; correct += sc.correct; qs += sc.total; });
    return { topics: ts.length, done: ts.filter(e => S.done[e.t.id]).length, answered, correct, qs };
  }
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);

  /* ---------- theme & focus ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const b = $("#theme-toggle"); b.textContent = t === "dark" ? "☀" : "☾"; b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  applyTheme(pref("theme") || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("#theme-toggle").addEventListener("click", () => {
    const t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"; pref("theme", t); applyTheme(t);
  });
  let focusOn = pref("focus") === "1", focusStep = 0;
  function applyFocus() { document.body.classList.toggle("focus", focusOn); $("#focus-toggle").setAttribute("aria-pressed", String(focusOn)); }
  applyFocus();
  $("#focus-toggle").addEventListener("click", () => { focusOn = !focusOn; pref("focus", focusOn ? "1" : "0"); applyFocus(); focusStep = 0; route(); });
  $("#sidebar-toggle").addEventListener("click", () => document.body.classList.toggle("nav-open"));

  /* ---------- sidebar TOC ---------- */
  function renderTOC() {
    const cur = location.hash;
    const curE = BY_ID[(cur.match(/^#\/topic\/(.+)$/) || [])[1]];
    const curD = curE ? curE.d.id : (cur.match(/#\/(?:domain|cram)\/(d\d)/) || [])[1];
    let h = `<div class="toc-links">
      <a href="#/">Home</a><a href="#/study-path">Study path</a><a href="#/progress">Progress dashboard</a><a href="#/exam-tips">Exam-day tips</a></div><hr class="toc-sep">`;
    DOMAINS.forEach(d => {
      const st = domainStats(d);
      h += `<details class="toc-domain"${curD === d.id ? " open" : ""}><summary>D${d.num} · ${esc(short(d.title))}<span class="mini-bar" title="${st.done}/${st.topics} topics"><i style="width:${pct(st.done, st.topics)}%"></i></span></summary>
        <div class="toc-links" style="margin-left:1rem"><a href="#/domain/${d.id}">Overview</a><a href="#/cram/${d.id}">Cram sheet</a></div>`;
      d.subdomains.forEach(s => {
        h += `<details class="toc-sub"${curE && curE.s === s ? " open" : ""}><summary>${esc(s.code)} ${esc(s.title)}</summary><ul class="toc-topics">`;
        s.topics.forEach(t => {
          h += `<li class="${S.done[t.id] ? "done" : ""}"><a href="#/topic/${t.id}"><span class="tick" aria-label="${S.done[t.id] ? "completed" : "not completed"}">${S.done[t.id] ? "✓" : "○"}</span><span>${esc(t.title)}</span></a></li>`;
        });
        h += `</ul></details>`;
      });
      h += `</details>`;
    });
    h += `<hr class="toc-sep"><div class="toc-links"><a href="#/quiz">Master practice quiz</a><a href="#/flashcards">Mnemonic flashcards</a><a href="#/glossary">Glossary</a></div>`;
    $("#toc").innerHTML = h;
    $$("#toc a").forEach(a => { if (a.getAttribute("href") === (cur || "#/")) a.classList.add("active"); });
    const act = $("#toc a.active"); if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest" });
  }
  const short = t => t.replace(/^AI /, "").replace(" and Program Management", " & Program").replace(" Technologies and Controls", "Tech & Controls");

  /* ---------- shared components ---------- */
  function questionHTML(q, idx, prev, prefix) {
    const opts = q.options.map((o, i) => {
      let cls = "opt";
      if (prev) { if (i === q.answer) cls += " correct"; else if (i === prev.c) cls += " wrong"; }
      return `<button class="${cls}" data-i="${i}"${prev ? " disabled" : ""}><span class="letter">${LETTERS[i]}</span><span>${esc(o)}</span></button>`;
    }).join("");
    return `<div class="q" data-q="${idx}"><div class="q-stem"><span class="q-num">${prefix || "Q" + (idx + 1)}.</span>${esc(q.q)}</div>
      <div class="opts">${opts}</div><div class="fb-slot">${prev ? feedbackHTML(q, prev.c) : ""}</div></div>`;
  }
  function feedbackHTML(q, c) {
    const ok = c === q.answer;
    return `<div class="feedback" role="status">${ok ? '<b class="ok">Correct.</b>' : `<b class="no">Not quite.</b> Best answer: <b>${LETTERS[q.answer]}</b>.`} ${esc(q.explain)}</div>`;
  }
  function wireQuestion(el, q, onAnswer) {
    $$(".opt", el).forEach(b => b.addEventListener("click", () => {
      const c = +b.dataset.i;
      $$(".opt", el).forEach(x => { x.disabled = true; const i = +x.dataset.i; if (i === q.answer) x.classList.add("correct"); else if (i === c) x.classList.add("wrong"); });
      $(".fb-slot", el).innerHTML = feedbackHTML(q, c);
      onAnswer(c, c === q.answer);
    }));
  }
  const bar = p => `<div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const view = () => $("#view");
  function noContent() { return DOMAINS.length ? "" : `<div class="card"><p>No content files loaded. Check that <code>assets/js/data/d1.js</code>–<code>d3.js</code> exist.</p></div>`; }

  /* ---------- views ---------- */
  function viewHome() {
    const last = S.last && BY_ID[S.last];
    const next = TOPICS.find(e => !S.done[e.t.id]);
    let h = `<p class="eyebrow">ISACA · Advanced in AI Security Management</p><h1>AAISM Study Companion</h1>
      <p class="lead">Short topics, one idea at a time. Every topic follows the same five steps: <b>concept → why it matters → mnemonic → exam tip → quick check</b>.</p>${noContent()}
      <div class="btn-row">${last ? `<a class="btn primary" href="#/topic/${last.t.id}">Continue: ${esc(last.t.title)}</a>` : ""}
      ${next && (!last || next !== last) ? `<a class="btn${last ? "" : " primary"}" href="#/topic/${next.t.id}">Next unfinished topic</a>` : ""}
      <a class="btn" href="#/study-path">Study path</a></div>
      <h2>The three domains</h2><div class="grid">`;
    DOMAINS.forEach(d => {
      const st = domainStats(d);
      h += `<a class="card" href="#/domain/${d.id}"><p class="eyebrow">Domain ${d.num} · ${d.weight}% of exam</p><h3>${esc(d.title)}</h3>
        <p class="muted" style="font-size:.9rem">${st.topics} topics · ${st.done} done</p>${bar(pct(st.done, st.topics))}</a>`;
    });
    h += `</div><h2>Exam at a glance</h2><div class="card"><dl class="gloss-list" style="margin:0">${P.examFacts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
      <p class="muted" style="font-size:.85rem;margin-top:1rem">${esc(P.factsNote)}</p></div>
      <h2>Tools</h2><div class="grid">
      <a class="card" href="#/quiz"><h3>Master practice quiz</h3><p class="muted">Questions drawn from every topic, weighted like the real exam.</p></a>
      <a class="card" href="#/flashcards"><h3>Mnemonic flashcards</h3><p class="muted">Flip cards to test your memory aids.</p></a>
      <a class="card" href="#/glossary"><h3>Glossary</h3><p class="muted">Searchable terms. Press <code>/</code> from any page.</p></a>
      <a class="card" href="#/progress"><h3>Progress dashboard</h3><p class="muted">Completion and accuracy per domain.</p></a></div>`;
    view().innerHTML = h;
  }

  function viewDomain(id) {
    const d = DOMAINS.find(x => x.id === id); if (!d) return viewNotFound();
    const st = domainStats(d);
    let h = `<p class="eyebrow">Domain ${d.num} · ${d.weight}% of exam</p><h1>${esc(d.title)}</h1><p class="lead">${esc(d.summary || "")}</p>
      <div class="meta-row"><span class="pill">${st.topics} topics</span><span class="pill">${st.done} completed</span><span class="pill">${st.qs} practice questions</span></div>${bar(pct(st.done, st.topics))}
      <div class="btn-row"><a class="btn primary" href="#/topic/${(d.subdomains[0].topics.find(t => !S.done[t.id]) || d.subdomains[0].topics[0]).id}">Start / continue</a><a class="btn" href="#/cram/${d.id}">Cram sheet</a><a class="btn" href="#/quiz?d=${d.id}">Quiz this domain</a></div>`;
    d.subdomains.forEach(s => {
      const m = s.topics.reduce((a, t) => a + readTimes(t).total, 0);
      h += `<details class="section" open><summary><span class="step-no">${esc(s.code)}</span><h2>${esc(s.title)}</h2><span class="pill">≈ ${m} min</span></summary><div class="section-body">
        ${s.tasks && s.tasks.length ? `<p class="muted" style="font-size:.85rem">Supports ISACA tasks ${s.tasks.join(", ")}</p>` : ""}<ul class="toc-topics" style="margin-left:0">`;
      s.topics.forEach(t => { h += `<li class="${S.done[t.id] ? "done" : ""}"><a href="#/topic/${t.id}"><span class="tick">${S.done[t.id] ? "✓" : "○"}</span><span>${esc(t.title)} <span class="muted" style="font-size:.85em">· ${readTimes(t).total} min</span></span></a></li>`; });
      h += `</ul></div></details>`;
    });
    view().innerHTML = h;
  }

  function sectionHTML(n, key, title, minutes, body, sand) {
    return `<details class="section${sand ? " sand" : ""}" open data-key="${key}"><summary><span class="step-no">${n}</span><h2>${title}</h2><span class="pill">≈ ${minutes} min</span></summary><div class="section-body">${body}</div></details>`;
  }
  function viewTopic(id) {
    const e = BY_ID[id]; if (!e) return viewNotFound();
    const { t, s, d } = e, rt = readTimes(t);
    S.last = id; save();
    const pos = s.topics.indexOf(t) + 1;
    const chunk = c => `<div class="chunk"><h3>${esc(c.h)}</h3>${c.body}</div>`;
    const diagram = t.diagram ? window.AAISMDiagram.render(t.diagram) : "";
    const mn = (t.mnemonics || []).map(m => `<div class="mnemonic"><div class="device">${esc(m.device)}</div><div class="recall">${esc(m.type)} · ${esc(m.recall)}</div>${m.text}</div>`).join("");
    const quizBody = `<div class="topic-quiz"></div><div class="quiz-foot"></div>`;
    let steps;
    if (focusOn) {
      const cs = t.concept || [];
      steps = cs.map((c, i) => sectionHTML(1, "c" + i, `Concept ${cs.length > 1 ? `${i + 1}/${cs.length}: ` : ""}${esc(c.h)}`, mins(words(c.body)), c.body, false));
      if (diagram) steps.push(sectionHTML(1, "dg", "Concept: the picture", 1, diagram, false));
    } else {
      steps = [sectionHTML(1, "concept", "Concept", rt.concept, `<div class="chunks">${(t.concept || []).map(chunk).join("")}</div>${diagram ? `<div style="margin-top:1rem">${diagram}</div>` : ""}`, false)];
    }
    steps.push(sectionHTML(2, "why", "Why it matters", rt.why, t.why, false));
    steps.push(sectionHTML(3, "mnemonic", "Mnemonic", rt.mnemonic, mn, true));
    steps.push(sectionHTML(4, "tip", "Exam tip", rt.tip, `<div class="tip-box">${t.examTip}</div>`, true));
    steps.push(sectionHTML(5, "quiz", "Quick check", rt.quiz, quizBody, false));
    const prevT = TOPICS[e.i - 1], nextT = TOPICS[e.i + 1];
    const srcs = (t.sources || []).map(x => `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)}</a>`).join(" · ");
    focusStep = Math.min(focusStep, steps.length - 1);
    view().innerHTML = `<p class="eyebrow"><a href="#/domain/${d.id}">Domain ${d.num}</a> · ${esc(s.code)} ${esc(s.title)} · topic ${pos} of ${s.topics.length}</p>
      <h1>${esc(t.title)}</h1>
      <div class="meta-row"><span class="pill">≈ ${rt.total} min</span><span class="pill">${t.quiz.length} questions</span>
        <button class="btn done-btn" aria-pressed="${!!S.done[id]}">${S.done[id] ? "✓ Completed" : "Mark complete"}</button>
        ${focusOn ? "" : `<button class="btn collapse-all no-print">Collapse all</button>`}</div>
      <div class="stepper">${steps.join("")}</div>
      ${focusOn ? `<div class="focus-nav"><button class="btn f-prev">← Back</button><div><div class="focus-dots">${steps.map((_, i) => `<span class="${i === focusStep ? "on" : ""}"></span>`).join("")}</div><div class="focus-hint">Step ${focusStep + 1} of ${steps.length} · arrow keys work</div></div><button class="btn primary f-next">Next →</button></div>` : ""}
      ${srcs ? `<p class="sources" style="margin-top:1.2rem">Sources: ${srcs}</p>` : ""}
      <nav class="pager">${prevT ? `<a href="#/topic/${prevT.t.id}"><small>← Previous</small>${esc(prevT.t.title)}</a>` : "<span></span>"}
        ${nextT ? `<a href="#/topic/${nextT.t.id}" style="text-align:right"><small>Next →</small>${esc(nextT.t.title)}</a>` : `<a href="#/progress" style="text-align:right"><small>Finished!</small>See your progress</a>`}</nav>`;

    // quiz
    const qbox = $(".topic-quiz"), foot = $(".quiz-foot");
    function renderQuiz() {
      const ans = S.answers[id] || {};
      qbox.innerHTML = t.quiz.map((q, i) => questionHTML(q, i, ans[i])).join("");
      $$(".q", qbox).forEach(el => { const i = +el.dataset.q; if (!ans[i]) wireQuestion(el, t.quiz[i], (c, ok) => { (S.answers[id] = S.answers[id] || {})[i] = { c, ok }; save(); foot.innerHTML = footHTML(); wireFoot(); if (topicScore(id).answered === t.quiz.length && !S.done[id]) { S.done[id] = true; save(); syncDone(); renderTOC(); } }); });
      foot.innerHTML = footHTML(); wireFoot();
    }
    function footHTML() {
      const sc = topicScore(id);
      return sc.answered ? `<p class="score">${sc.correct} / ${sc.total} correct${sc.answered < sc.total ? ` (${sc.total - sc.answered} to go)` : ""}</p><button class="btn reset-q">Retry questions</button>` : `<p class="muted">Choose an answer. You'll get feedback straight away.</p>`;
    }
    function wireFoot() { const r = $(".reset-q", foot); if (r) r.addEventListener("click", () => { delete S.answers[id]; save(); renderQuiz(); }); }
    renderQuiz();

    function syncDone() { const b = $(".done-btn"); b.setAttribute("aria-pressed", String(!!S.done[id])); b.textContent = S.done[id] ? "✓ Completed" : "Mark complete"; }
    $(".done-btn").addEventListener("click", () => { if (S.done[id]) delete S.done[id]; else S.done[id] = true; save(); syncDone(); renderTOC(); });
    const ca = $(".collapse-all");
    if (ca) ca.addEventListener("click", () => { const anyOpen = $$(".stepper .section").some(x => x.open); $$(".stepper .section").forEach(x => { x.open = !anyOpen; }); ca.textContent = anyOpen ? "Expand all" : "Collapse all"; });

    if (focusOn) {
      const secs = $$(".stepper .section");
      const show = () => {
        secs.forEach((x, i) => { x.classList.toggle("current", i === focusStep); x.open = true; });
        $$(".focus-dots span").forEach((x, i) => x.classList.toggle("on", i === focusStep));
        $(".focus-hint").textContent = `Step ${focusStep + 1} of ${secs.length} · arrow keys work`;
        $(".f-prev").disabled = focusStep === 0 && !prevT;
        $(".f-next").textContent = focusStep === secs.length - 1 ? (nextT ? "Next topic →" : "Done") : "Next →";
      };
      const go = dir => {
        if (dir > 0 && focusStep === secs.length - 1) { if (nextT) { focusStep = 0; location.hash = "#/topic/" + nextT.t.id; } else location.hash = "#/progress"; return; }
        if (dir < 0 && focusStep === 0) { if (prevT) { focusStep = 0; location.hash = "#/topic/" + prevT.t.id; } return; }
        focusStep += dir; show(); window.scrollTo(0, 0);
      };
      $(".f-prev").addEventListener("click", () => go(-1));
      $(".f-next").addEventListener("click", () => go(1));
      keyHandler = ev => { if (ev.target.closest && ev.target.closest("input,textarea,select")) return; if (ev.key === "ArrowRight") go(1); else if (ev.key === "ArrowLeft") go(-1); };
      show();
    }
  }

  function viewCram(id) {
    const d = DOMAINS.find(x => x.id === id); if (!d) return viewNotFound();
    let h = `<p class="eyebrow">Cram sheet · Domain ${d.num} · ${d.weight}%</p><h1>${esc(d.title)}</h1>
      <p class="lead">Every key point and mnemonic on one page. Read it the day before the exam, or print it.</p>
      <div class="btn-row no-print"><button class="btn" onclick="window.print()">Print</button>${DOMAINS.filter(x => x !== d).map(x => `<a class="btn" href="#/cram/${x.id}">Domain ${x.num} cram</a>`).join("")}</div>`;
    d.subdomains.forEach(s => {
      h += `<details class="section cram-sub" open><summary><span class="step-no">${esc(s.code)}</span><h2>${esc(s.title)}</h2></summary><div class="section-body">`;
      s.topics.forEach(t => {
        h += `<div class="cram-topic"><h3><a href="#/topic/${t.id}">${esc(t.title)}</a></h3><ul>${(t.keyPoints || []).map(k => `<li>${esc(k)}</li>`).join("")}</ul>
          ${(t.mnemonics || []).map(m => `<div class="cram-mn">${esc(m.device)} <span>— ${esc(m.recall)}</span></div>`).join("")}</div>`;
      });
      h += `</div></details>`;
    });
    view().innerHTML = h;
  }

  /* master quiz */
  let MQ = null;
  function buildPool(domain, missedOnly) {
    const pool = [];
    TOPICS.forEach(e => {
      if (domain !== "all" && e.d.id !== domain) return;
      e.t.quiz.forEach((q, i) => {
        if (missedOnly) { const a = (S.answers[e.t.id] || {})[i]; const m = (S.missed || {})[e.t.id + "#" + i]; if (!(a && !a.ok) && !m) return; }
        pool.push({ e, q, i });
      });
    });
    return pool;
  }
  function pickWeighted(pool, n) {
    const byD = {}; pool.forEach(x => (byD[x.e.d.id] = byD[x.e.d.id] || []).push(x));
    const ds = Object.keys(byD); if (ds.length <= 1) return shuffle(pool).slice(0, n);
    const out = []; const wsum = ds.reduce((a, k) => a + BY_D(k).weight, 0);
    ds.forEach(k => { out.push.apply(out, shuffle(byD[k]).slice(0, Math.round((n * BY_D(k).weight) / wsum))); });
    const rest = shuffle(pool.filter(x => out.indexOf(x) < 0));
    while (out.length < n && rest.length) out.push(rest.pop());
    return shuffle(out.slice(0, n));
  }
  const BY_D = id => DOMAINS.find(d => d.id === id);
  function viewQuiz(params) {
    if (MQ && MQ.active) return renderMQ();
    const dsel = params.get("d") || "all";
    const total = buildPool("all", false).length;
    const hist = (S.history || []).slice(-5).reverse();
    view().innerHTML = `<p class="eyebrow">Practice</p><h1>Master practice quiz</h1>
      <p class="lead">Questions from every topic, one at a time, with instant feedback. "All domains" uses the exam weights (31 / 31 / 38).</p>${noContent()}
      <div class="card"><form id="mq-form" style="display:grid;gap:.9rem">
        <label>Domain<br><select name="d"><option value="all">All domains (exam-weighted)</option>${DOMAINS.map(d => `<option value="${d.id}"${dsel === d.id ? " selected" : ""}>Domain ${d.num}: ${esc(d.title)}</option>`).join("")}</select></label>
        <label>Number of questions<br><select name="n"><option>10</option><option selected>25</option><option>50</option><option value="90">90 (full exam simulation)</option></select></label>
        <label><input type="checkbox" name="missed"> Only questions I've missed before</label>
        <label><input type="checkbox" name="timer"> Show elapsed time (target pace: 1 min 40 s per question)</label>
        <div><button class="btn primary" type="submit">Start quiz</button> <span class="muted" style="font-size:.9rem">${total} questions in the bank</span></div>
        <p class="mq-msg muted" role="status"></p></form></div>
      ${hist.length ? `<h2>Recent attempts</h2><div class="card"><ul style="margin:0">${hist.map(x => `<li>${new Date(x.at).toLocaleDateString()} · ${esc(x.label)} · <b>${x.correct}/${x.total}</b> (${pct(x.correct, x.total)}%)</li>`).join("")}</ul></div>` : ""}`;
    $("#mq-form").addEventListener("submit", ev => {
      ev.preventDefault();
      const f = new FormData(ev.target), d = f.get("d"), n = +f.get("n"), missed = !!f.get("missed");
      const pool = buildPool(d, missed);
      if (!pool.length) { $(".mq-msg").textContent = missed ? "No missed questions yet. Nice work!" : "No questions available."; return; }
      MQ = { active: true, items: d === "all" ? pickWeighted(pool, n) : shuffle(pool).slice(0, n), idx: 0, results: [], timer: !!f.get("timer"), start: Date.now(),
        label: (d === "all" ? "All domains" : "Domain " + BY_D(d).num) + (missed ? " · missed only" : "") };
      renderMQ();
    });
  }
  let tick = null;
  function renderMQ() {
    clearInterval(tick);
    const m = MQ, it = m.items[m.idx];
    if (m.idx >= m.items.length) return renderMQResult();
    const done = m.results[m.idx];
    view().innerHTML = `<p class="eyebrow">Master quiz · ${esc(m.label)}</p>
      <div class="meta-row"><span class="pill">Question ${m.idx + 1} of ${m.items.length}</span><span class="pill">D${it.e.d.num} · ${esc(it.e.s.code)}</span>${m.timer ? `<span class="pill mq-time"></span>` : ""}<button class="btn mq-quit" style="margin-left:auto">End quiz</button></div>
      ${bar(pct(m.idx, m.items.length))}<div style="margin-top:1rem" class="mq-q"></div>
      <div class="btn-row"><button class="btn primary mq-next"${done ? "" : " disabled"}>${m.idx === m.items.length - 1 ? "See results" : "Next question →"}</button></div>`;
    const box = $(".mq-q");
    box.innerHTML = questionHTML(it.q, m.idx, done, "Q" + (m.idx + 1)) + (done ? `<p class="muted" style="font-size:.9rem">From: <a href="#/topic/${it.e.t.id}" class="mq-src">${esc(it.e.t.title)}</a></p>` : "");
    if (!done) wireQuestion($(".q", box), it.q, (c, ok) => {
      m.results[m.idx] = { c, ok };
      S.missed = S.missed || {}; const k = it.e.t.id + "#" + it.i; if (ok) delete S.missed[k]; else S.missed[k] = 1; save();
      $(".mq-next").disabled = false; $(".mq-next").focus();
      box.insertAdjacentHTML("beforeend", `<p class="muted" style="font-size:.9rem">From: <a href="#/topic/${it.e.t.id}">${esc(it.e.t.title)}</a></p>`);
    });
    $(".mq-next").addEventListener("click", () => { m.idx++; renderMQ(); window.scrollTo(0, 0); });
    $(".mq-quit").addEventListener("click", () => { m.items = m.items.slice(0, m.results.filter(Boolean).length); m.idx = m.items.length; renderMQ(); });
    if (m.timer) { const upd = () => { const s = Math.floor((Date.now() - m.start) / 1000), el = $(".mq-time"); if (!el) return clearInterval(tick); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} elapsed · target ${Math.floor((m.idx + 1) * 100 / 60)}:${String((m.idx + 1) * 100 % 60).padStart(2, "0")}`; }; upd(); tick = setInterval(upd, 1000); }
  }
  function renderMQResult() {
    const m = MQ; m.active = false; clearInterval(tick);
    const total = m.results.filter(Boolean).length, correct = m.results.filter(r => r && r.ok).length;
    if (total) { S.history = (S.history || []).concat([{ at: Date.now(), label: m.label, total, correct }]).slice(-30); save(); }
    const perD = DOMAINS.map(d => { const xs = m.items.map((it, i) => ({ it, r: m.results[i] })).filter(x => x.it.e.d === d && x.r); return { d, n: xs.length, c: xs.filter(x => x.r.ok).length }; }).filter(x => x.n);
    const missed = m.items.map((it, i) => ({ it, r: m.results[i] })).filter(x => x.r && !x.r.ok);
    view().innerHTML = `<p class="eyebrow">Master quiz · results</p><h1>${correct} / ${total} correct (${pct(correct, total)}%)</h1>
      <p class="lead">${pct(correct, total) >= 75 ? "Strong result. Keep the streak going with the questions you missed." : "Every miss shows you what to review next. Open the source topics below."}</p>
      <div class="card">${perD.map(x => `<div class="dash-row"><div><b>Domain ${x.d.num}</b> <span class="muted">${x.c}/${x.n}</span>${bar(pct(x.c, x.n))}</div><div class="stat" style="font-size:1.1rem">${pct(x.c, x.n)}%</div></div>`).join("")}</div>
      <div class="btn-row"><a class="btn primary" href="#/quiz">New quiz</a><a class="btn" href="#/progress">Dashboard</a></div>
      ${missed.length ? `<h2>Review what you missed</h2>${missed.map((x, i) => `<div class="card">${questionHTML(x.it.q, i, x.r, "✗")}<p class="muted" style="font-size:.9rem">Review: <a href="#/topic/${x.it.e.t.id}">${esc(x.it.e.t.title)}</a></p></div>`).join("")}` : ""}`;
  }

  /* flashcards */
  let FC = null;
  function viewFlash(params) {
    const dsel = params.get("d") || (FC && FC.d) || "all";
    const hideKnown = params.has("hide") ? params.get("hide") === "1" : (FC ? FC.hide : false);
    if (!FC || FC.d !== dsel || FC.hide !== hideKnown) {
      const cards = [];
      TOPICS.forEach(e => { if (dsel !== "all" && e.d.id !== dsel) return; (e.t.mnemonics || []).forEach((m, i) => { const k = e.t.id + "#" + i; if (hideKnown && S.flash[k]) return; cards.push({ e, m, k }); }); });
      FC = { d: dsel, hide: hideKnown, cards, idx: 0, flipped: false };
    }
    const known = Object.keys(S.flash).filter(k => S.flash[k]).length;
    const c = FC.cards[FC.idx];
    view().innerHTML = `<p class="eyebrow">Practice</p><h1>Mnemonic flashcards</h1>
      <div class="meta-row"><select class="fc-d"><option value="all">All domains</option>${DOMAINS.map(d => `<option value="${d.id}"${dsel === d.id ? " selected" : ""}>Domain ${d.num}</option>`).join("")}</select>
        <label><input type="checkbox" class="fc-hide"${hideKnown ? " checked" : ""}> Hide cards I know</label><span class="pill">${known} marked known</span></div>
      ${c ? `<div class="meta-row"><span class="pill">Card ${FC.idx + 1} of ${FC.cards.length}</span><span class="pill">D${c.e.d.num} · ${esc(c.e.s.code)}</span>${S.flash[c.k] ? '<span class="pill">✓ known</span>' : ""}</div>
      <div class="flash" tabindex="0" role="button" aria-label="Flip card">${FC.flipped
        ? `<div class="device">${esc(c.m.device)}</div><div>${c.m.text}</div><p class="muted" style="font-size:.85rem;margin-top:1rem">From <a href="#/topic/${c.e.t.id}">${esc(c.e.t.title)}</a></p>`
        : `<div class="front-q">${esc(c.m.recall)}</div><div class="muted" style="margin-top:.4rem">${esc(c.e.t.title)}</div><div class="flip-hint">Recall the mnemonic, then click or press Space to flip</div>`}</div>
      <div class="btn-row"><button class="btn fc-prev"${FC.idx === 0 ? " disabled" : ""}>← Prev</button><button class="btn fc-flip">Flip</button>
        <button class="btn fc-again">Still learning</button><button class="btn primary fc-know">I know this ✓</button>
        <button class="btn fc-next"${FC.idx >= FC.cards.length - 1 ? " disabled" : ""}>Next →</button><button class="btn fc-shuffle">Shuffle</button></div>`
      : `<div class="card"><p>${hideKnown ? "You've marked every card in this set as known." : "No cards yet."}</p>${hideKnown ? '<button class="btn fc-reset">Reset known cards</button>' : ""}</div>`}`;
    const rer = () => viewFlash(new URLSearchParams());
    $(".fc-d").addEventListener("change", ev => { FC = null; viewFlash(new URLSearchParams("d=" + ev.target.value + "&hide=" + (hideKnown ? 1 : 0))); });
    $(".fc-hide").addEventListener("change", ev => { FC = null; viewFlash(new URLSearchParams("d=" + dsel + "&hide=" + (ev.target.checked ? 1 : 0))); });
    const r = $(".fc-reset"); if (r) r.addEventListener("click", () => { S.flash = {}; save(); FC = null; viewFlash(new URLSearchParams("d=" + dsel + "&hide=1")); });
    if (!c) return;
    const flip = () => { FC.flipped = !FC.flipped; rer(); $(".flash").focus(); };
    const move = n => { FC.idx = Math.max(0, Math.min(FC.cards.length - 1, FC.idx + n)); FC.flipped = false; rer(); };
    $(".flash").addEventListener("click", ev => { if (!ev.target.closest("a")) flip(); });
    $(".fc-flip").addEventListener("click", flip);
    $(".fc-prev").addEventListener("click", () => move(-1));
    $(".fc-next").addEventListener("click", () => move(1));
    $(".fc-know").addEventListener("click", () => { S.flash[c.k] = 1; save(); if (FC.idx < FC.cards.length - 1) move(1); else rer(); });
    $(".fc-again").addEventListener("click", () => { delete S.flash[c.k]; save(); if (FC.idx < FC.cards.length - 1) move(1); else rer(); });
    $(".fc-shuffle").addEventListener("click", () => { FC.cards = shuffle(FC.cards); FC.idx = 0; FC.flipped = false; rer(); });
    keyHandler = ev => { if (ev.target.closest && ev.target.closest("input,select")) return; if (ev.key === " " || ev.key === "Enter") { if (ev.target.closest && ev.target.closest("button,a")) return; ev.preventDefault(); flip(); } else if (ev.key === "ArrowRight") move(1); else if (ev.key === "ArrowLeft") move(-1); };
  }

  /* glossary */
  function glossary() {
    const map = new Map();
    TOPICS.forEach(e => (e.t.glossary || []).forEach(g => {
      const k = g.term.toLowerCase();
      if (!map.has(k)) map.set(k, { term: g.term, def: g.def, refs: [e] }); else map.get(k).refs.push(e);
    }));
    return Array.from(map.values()).sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: "base" }));
  }
  function viewGlossary(params) {
    const all = glossary(), q0 = params.get("q") || "";
    view().innerHTML = `<p class="eyebrow">Reference</p><h1>Glossary</h1><p class="lead">${all.length} terms. Type to filter, or press <code>/</code> anywhere to search.</p>
      <input type="search" class="g-filter" placeholder="Filter terms…" value="${esc(q0)}" aria-label="Filter glossary"><div class="alpha"></div><dl class="gloss-list"></dl>`;
    const draw = () => {
      const q = $(".g-filter").value.trim().toLowerCase();
      const xs = all.filter(g => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
      const letters = Array.from(new Set(xs.map(g => g.term[0].toUpperCase())));
      $(".alpha").innerHTML = letters.map(l => `<a href="javascript:void 0" data-l="${esc(l)}">${esc(l)}</a>`).join("");
      $$(".alpha a").forEach(a => a.addEventListener("click", () => { const el = document.getElementById("g-" + a.dataset.l); if (el) el.scrollIntoView(); }));
      let lastL = "";
      $(".gloss-list").innerHTML = xs.map(g => { const L = g.term[0].toUpperCase(); const anchor = L !== lastL ? ` id="g-${esc(L)}"` : ""; lastL = L;
        return `<dt${anchor}>${esc(g.term)}</dt><dd>${esc(g.def)} ${g.refs.map(e => `<a href="#/topic/${e.t.id}">→ ${esc(e.t.title)}</a>`).join(" ")}</dd>`; }).join("") || "<p>No matches.</p>";
    };
    $(".g-filter").addEventListener("input", draw); draw();
  }

  /* progress dashboard */
  function viewProgress() {
    const tot = TOPICS.length, done = TOPICS.filter(e => S.done[e.t.id]).length;
    let ans = 0, cor = 0; TOPICS.forEach(e => { const sc = topicScore(e.t.id); ans += sc.answered; cor += sc.correct; });
    const fcTotal = TOPICS.reduce((a, e) => a + (e.t.mnemonics || []).length, 0), fcKnown = Object.keys(S.flash).length;
    const next = TOPICS.find(e => !S.done[e.t.id]);
    const weak = TOPICS.map(e => ({ e, sc: topicScore(e.t.id) })).filter(x => x.sc.answered && x.sc.correct / x.sc.answered < 0.67).slice(0, 8);
    view().innerHTML = `<p class="eyebrow">Your progress</p><h1>Progress dashboard</h1>
      <p class="muted">Saved in this browser only (localStorage). Use export to move it to another device.</p>
      <div class="grid"><div class="card"><div class="stat">${pct(done, tot)}%</div><div class="muted">${done}/${tot} topics completed</div></div>
        <div class="card"><div class="stat">${ans ? pct(cor, ans) + "%" : "–"}</div><div class="muted">topic quiz accuracy (${cor}/${ans})</div></div>
        <div class="card"><div class="stat">${fcKnown}/${fcTotal}</div><div class="muted">flashcards known</div></div></div>
      ${next ? `<div class="btn-row"><a class="btn primary" href="#/topic/${next.t.id}">Next up: ${esc(next.t.title)}</a></div>` : `<p><b>All topics completed.</b> Time for a full 90-question simulation.</p>`}
      <h2>Completion per domain</h2><div class="card">${DOMAINS.map(d => { const st = domainStats(d); return `<div class="dash-row"><div><a href="#/domain/${d.id}"><b>Domain ${d.num}</b> · ${esc(d.title)}</a> <span class="muted">(${d.weight}% of exam)</span><br><span class="muted" style="font-size:.88rem">${st.done}/${st.topics} topics · quiz ${st.answered ? pct(st.correct, st.answered) + "% correct" : "not started"}</span>${bar(pct(st.done, st.topics))}</div><div class="stat" style="font-size:1.2rem">${pct(st.done, st.topics)}%</div></div>`; }).join("")}</div>
      <h2>Per subdomain</h2><div class="card">${DOMAINS.map(d => d.subdomains.map(s => { const n = s.topics.length, k = s.topics.filter(t => S.done[t.id]).length; return `<div class="dash-row"><div><span class="muted">${esc(s.code)}</span> ${esc(s.title)}${bar(pct(k, n))}</div><div class="muted">${k}/${n}</div></div>`; }).join("")).join("")}</div>
      ${weak.length ? `<h2>Topics to revisit</h2><div class="card"><ul style="margin:0">${weak.map(x => `<li><a href="#/topic/${x.e.t.id}">${esc(x.e.t.title)}</a> <span class="muted">${x.sc.correct}/${x.sc.answered}</span></li>`).join("")}</ul></div>` : ""}
      ${(S.history || []).length ? `<h2>Master quiz history</h2><div class="card"><ul style="margin:0">${S.history.slice().reverse().slice(0, 10).map(x => `<li>${new Date(x.at).toLocaleString()} · ${esc(x.label)} · <b>${x.correct}/${x.total}</b> (${pct(x.correct, x.total)}%)</li>`).join("")}</ul></div>` : ""}
      <h2>Backup</h2><div class="btn-row"><button class="btn p-export">Export progress</button><label class="btn">Import progress<input type="file" accept="application/json" class="p-import" hidden></label><button class="btn p-reset">Reset all progress</button></div>`;
    $(".p-export").addEventListener("click", () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: "application/json" })); a.download = "aaism-progress.json"; a.click(); });
    $(".p-import").addEventListener("change", ev => { const f = ev.target.files[0]; if (!f) return; f.text().then(txt => { try { S = Object.assign(blank(), JSON.parse(txt)); save(); route(); } catch (e) { alert("That file isn't a valid progress export."); } }); });
    $(".p-reset").addEventListener("click", () => { if (confirm("Reset all progress, quiz answers and flashcards?")) { S = blank(); save(); route(); } });
  }

  function viewStudyPath() {
    const sp = P.studyPath, pageNames = { "exam-tips": "Exam-day tips", glossary: "Glossary", cram: "Cram sheets", flashcards: "Mnemonic flashcards", quiz: "Master practice quiz (90-question simulation)" };
    const pageHref = { "exam-tips": "#/exam-tips", glossary: "#/glossary", cram: "#/cram/d1", flashcards: "#/flashcards", quiz: "#/quiz" };
    let totalMin = 0;
    const phases = sp.phases.map((ph, i) => {
      const items = ph.items.map(x => {
        if (x.startsWith("page:")) { const k = x.slice(5); return `<li><a href="${pageHref[k]}">${pageNames[k]}</a></li>`; }
        const sd = SUBS[x]; if (!sd) return "";
        const n = sd.s.topics.length, k = sd.s.topics.filter(t => S.done[t.id]).length, m = sd.s.topics.reduce((a, t) => a + readTimes(t).total, 0); totalMin += m;
        const first = sd.s.topics.find(t => !S.done[t.id]) || sd.s.topics[0];
        return `<li><a href="#/topic/${first.id}"><b>${esc(sd.s.code)}</b> ${esc(sd.s.title)}</a> <span class="muted" style="font-size:.88rem">· ${n} topics · ≈ ${m} min · ${k}/${n} done</span></li>`;
      }).join("");
      return `<details class="section" ${i < 3 ? "open" : ""}><summary><span class="step-no">${i}</span><h2>${esc(ph.title)}</h2><span class="pill">${esc(ph.days)}</span></summary><div class="section-body"><p>${esc(ph.note)}</p><ul>${items}</ul></div></details>`;
    }).join("");
    view().innerHTML = `<p class="eyebrow">Plan</p><h1>Study path</h1><p class="lead">${esc(sp.intro)}</p>
      <div class="meta-row"><span class="pill">≈ ${Math.round(totalMin / 60)} hours of topic time</span><span class="pill">About 6 weeks at 30–45 min a day</span></div>
      <div class="card" style="border-left:4px solid var(--sand)"><h3>How to study each topic (ADHD-friendly)</h3><ul>${sp.habits.map(x => `<li>${x}</li>`).join("")}</ul></div>${phases}`;
  }

  function viewExamTips() {
    view().innerHTML = `<p class="eyebrow">Exam day</p><h1>Exam-day tips</h1><p class="lead">How the exam works, how ISACA questions think, and how to keep focus for 150 minutes.</p>
      <div class="card"><dl class="gloss-list" style="margin:0">${P.examFacts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl><p class="muted" style="font-size:.85rem;margin-top:1rem">${esc(P.factsNote)}</p></div>
      ${P.examTips.map((x, i) => sectionHTML(i + 1, "tip" + i, esc(x.h), mins(words(x.body)), x.body, i === 2)).join("")}`;
  }
  function viewNotFound() { view().innerHTML = `<h1>Page not found</h1><p><a href="#/">Back to home</a></p>`; }

  /* ---------- search overlay ---------- */
  const ov = $("#search-overlay"), si = $("#search-input"), sr = $("#search-results");
  let searchIndex = null;
  function openSearch() { ov.hidden = false; si.value = ""; sr.innerHTML = ""; si.focus(); }
  function closeSearch() { ov.hidden = true; }
  function doSearch() {
    if (!searchIndex) {
      searchIndex = [];
      TOPICS.forEach(e => searchIndex.push({ kind: "Topic", title: e.t.title, text: e.t.title + " " + (e.t.keyPoints || []).join(" ") + " " + (e.t.mnemonics || []).map(m => m.device).join(" "), href: "#/topic/" + e.t.id, sub: `D${e.d.num} · ${e.s.code} ${e.s.title}` }));
      glossary().forEach(g => searchIndex.push({ kind: "Glossary", title: g.term, text: g.term + " " + g.def, href: "#/glossary?q=" + encodeURIComponent(g.term), sub: g.def }));
    }
    const q = si.value.trim().toLowerCase(); if (!q) { sr.innerHTML = ""; return; }
    const terms = q.split(/\s+/);
    const hits = searchIndex.map(x => { const tl = x.title.toLowerCase(), tx = x.text.toLowerCase(); if (!terms.every(t => tx.includes(t))) return null; return { x, s: (tl.startsWith(q) ? 3 : 0) + (tl.includes(q) ? 2 : 0) + (x.kind === "Glossary" ? 0.5 : 0) }; })
      .filter(Boolean).sort((a, b) => b.s - a.s).slice(0, 25);
    sr.innerHTML = hits.map(h => `<a href="${h.x.href}"><b>${esc(h.x.title)}</b> <span class="pill">${h.x.kind}</span><small>${esc(h.x.sub.slice(0, 140))}</small></a>`).join("") || '<p class="muted">No matches.</p>';
  }
  $("#search-toggle").addEventListener("click", openSearch);
  $("#search-close").addEventListener("click", closeSearch);
  ov.addEventListener("click", ev => { if (ev.target === ov) closeSearch(); if (ev.target.closest("#search-results a")) closeSearch(); });
  si.addEventListener("input", doSearch);
  si.addEventListener("keydown", ev => { if (ev.key === "Enter") { const a = $("#search-results a"); if (a) { location.hash = a.getAttribute("href"); closeSearch(); } } });

  let keyHandler = null;
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape" && !ov.hidden) return closeSearch();
    if (ev.key === "/" && ov.hidden && !(ev.target.closest && ev.target.closest("input,textarea,select"))) { ev.preventDefault(); return openSearch(); }
    if (ov.hidden && keyHandler) keyHandler(ev);
  });

  /* ---------- router ---------- */
  let lastHash = null;
  function route() {
    const hash = location.hash || "#/";
    const [path, qs] = hash.slice(1).split("?");
    const params = new URLSearchParams(qs || "");
    const parts = path.split("/").filter(Boolean);
    if (hash !== lastHash) { if (lastHash && !/^#\/topic\//.test(hash)) focusStep = 0; if (lastHash && /^#\/topic\//.test(hash) && hash !== lastHash) focusStep = 0; }
    const changed = hash !== lastHash; lastHash = hash;
    keyHandler = null; clearInterval(tick);
    if (parts[0] !== "quiz" && MQ && MQ.active && changed) { /* keep quiz in progress */ }
    switch (parts[0]) {
      case undefined: viewHome(); break;
      case "domain": viewDomain(parts[1]); break;
      case "topic": viewTopic(parts[1]); break;
      case "cram": viewCram(parts[1]); break;
      case "quiz": viewQuiz(params); break;
      case "flashcards": viewFlash(params); break;
      case "glossary": viewGlossary(params); break;
      case "progress": viewProgress(); break;
      case "study-path": viewStudyPath(); break;
      case "exam-tips": viewExamTips(); break;
      default: viewNotFound();
    }
    renderTOC();
    document.body.classList.remove("nav-open");
    if (changed) { window.scrollTo(0, 0); $("#main").focus({ preventScroll: true }); }
    const h1 = $("#view h1"); document.title = (h1 ? h1.textContent + " · " : "") + "AAISM Study Companion";
  }
  window.addEventListener("hashchange", route);
  route();
})();
