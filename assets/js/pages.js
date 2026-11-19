/* Static guide pages: exam facts, exam-day tips and the suggested study path. */
window.AAISMPages = {
  examFacts: [
    ["Questions", "90 multiple-choice (one BEST answer of four)"],
    ["Time", "150 minutes ≈ 1 min 40 s per question"],
    ["Passing score", "450 on a 200–800 scaled score"],
    ["Domains", "D1 Governance 31% · D2 Risk 31% · D3 Technologies & Controls 38%"],
    ["Prerequisite", "Active CISM or CISSP to become certified"],
    ["Delivery", "Computer-based at PSI test centres or remotely proctored"]
  ],
  factsNote: "Format figures are from ISACA's AAISM page and exam candidate guide. ISACA says a new AAISM exam content outline takes effect on 18 May 2027, so check the current guide before you book.",

  studyPath: {
    intro: "Recommended order through the material. Frameworks come first because the other topics refer back to them. Technologies & Controls is the largest domain (38%), so it gets the most time. Incident response comes after threats and controls so the playbooks make sense.",
    habits: [
      "<b>One topic per sitting.</b> A topic is 5–10 minutes. Stop at the quick check.",
      "<b>Timer on:</b> 25 minutes study, 5 minutes away from the screen. After four rounds, take 20 minutes.",
      "<b>Turn on Focus mode</b> (top bar) to see one card at a time and hide the sidebar.",
      "<b>Say the mnemonic out loud</b> before you open the exam tip. Then do the quick check without scrolling back up.",
      "<b>Finish each day with 5 minutes of flashcards</b> for topics you already did. Spaced recall beats re-reading.",
      "<b>Missed a question?</b> Tick nothing. The dashboard tracks it, and the master quiz can drill only your misses."
    ],
    phases: [
      { title: "Phase 0 · Orientation", days: "Day 1", items: ["page:exam-tips", "page:glossary"], note: "Learn the exam format and the ISACA “manager mindset”. Skim the glossary; don't memorise it yet." },
      { title: "Phase 1 · Frameworks & regulation", days: "Week 1", items: ["d1a"], note: "NIST AI RMF, ISO/IEC 42001, EU AI Act and the other rules. Everything after this refers back to them." },
      { title: "Phase 2 · Governance & program", days: "Week 1–2", items: ["d1b", "d1c", "d1d"], note: "Strategy, policy, inventory and the AI security program. Finish with the Domain 1 cram sheet." },
      { title: "Phase 3 · Risk management", days: "Week 2–3", items: ["d2a", "d2b", "d2c"], note: "The risk cycle first, then threats (OWASP LLM Top 10, MITRE ATLAS), then vendors and the supply chain." },
      { title: "Phase 4 · Technologies & controls", days: "Week 3–5", items: ["d3a", "d3b", "d3c", "d3d", "d3e"], note: "The largest domain. Do one subdomain, then a 10-question master quiz filtered to Domain 3." },
      { title: "Phase 5 · Incident response & continuity", days: "Week 5", items: ["d1e"], note: "Now you know the threats and controls. Learn how to contain, report and recover." },
      { title: "Phase 6 · Consolidate", days: "Week 6", items: ["page:cram", "page:flashcards", "page:quiz"], note: "Read the cram sheets, clear the flashcards, then take a full 90-question practice exam. Retake only the questions you missed." }
    ]
  },

  examTips: [
    { h: "Think like an AI security manager", body: "<ul><li>Governance and business alignment come before tools and tech fixes.</li><li>You <b>advise and oversee</b>. Engineers implement.</li><li>Decisions are <b>risk-based</b>: link every action to risk appetite and business objectives.</li><li>Senior management/the board <b>owns</b> risk. Security <b>advises</b> on it.</li></ul>" },
    { h: "Decode the keyword in the stem", body: "<ul><li><b>FIRST</b>: what comes earliest in the process. Usually understand, assess or get the facts before acting.</li><li><b>BEST / MOST effective</b>: the answer that deals with the root cause and lasts, rather than a quick patch.</li><li><b>PRIMARY</b>: the main purpose or reason, not a side benefit.</li><li><b>GREATEST concern / risk</b>: the item with the largest business impact.</li></ul>" },
    { h: "Mnemonic for every question: S.T.O.P.", body: "<ul><li><b>S</b>tem: find the keyword (FIRST, BEST, MOST) and who is asking.</li><li><b>T</b>hink manager: which answer would a governance-minded leader pick?</li><li><b>O</b>ptions: rule out answers that are too technical, too narrow or too extreme.</li><li><b>P</b>ick and move on. Flag the question if you're unsure.</li></ul>" },
    { h: "Pacing (150 min / 90 questions)", body: "<ul><li>Checkpoints: Q30 by about 0:50, Q60 by about 1:40, Q90 by about 2:20. That leaves around 10 minutes to review.</li><li>If you're stuck for more than 2 minutes, choose your best guess, flag it and move on. A blank answer scores nothing.</li><li>Change an answer only if you find a clear reason. A vague feeling isn't enough.</li></ul>" },
    { h: "Common distractor patterns", body: "<ul><li>A technical control offered when the gap is in policy or governance.</li><li>“Ban AI entirely” or “accept all risk”. Extreme answers are rarely right.</li><li>Acting before assessing, for example deploying a tool before a risk assessment.</li><li>Answers that are true but don't address what the question asks.</li></ul>" },
    { h: "The week before", body: "<ul><li>Take one full 90-question practice exam in a single sitting to build stamina.</li><li>Review the cram sheets and flashcards only. Don't start new topics.</li><li>Run the PSI system check if you're testing remotely, and read the ID rules.</li></ul>" },
    { h: "Exam day: ADHD-friendly set-up", body: "<ul><li>Eat, drink water and take any usual medication at your normal time. Don't make big changes on exam day.</li><li>Arrive or log in early. Late arrival can forfeit the appointment.</li><li>Remote: clear the desk, close every app and expect a room scan. Have the room quiet.</li><li>Use the flag feature as your external working memory. Don't hold doubts in your head.</li><li>Mini-reset every 30 questions: breathe in for 4 seconds, out for 6, three times, then shoulders down.</li><li>Check ISACA's candidate guide for break and accommodation rules. Request testing accommodations in advance if you need them.</li></ul>" },
    { h: "After the exam", body: "<ul><li>You'll usually see a preliminary result on screen. The official score follows by email.</li><li>To become certified after passing: apply within 5 years, keep CISM or CISSP active, follow the Code of Professional Ethics and meet the CPE requirements.</li></ul>" }
  ]
};
