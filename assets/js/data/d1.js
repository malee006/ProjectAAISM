/* Domain 1 — AI Governance and Program Management (31%). Schema: CONTENT_SCHEMA.md */
window.AAISM = window.AAISM || { domains: [] };
AAISM.domains.push({
  id: "d1",
  num: 1,
  title: "AI Governance and Program Management",
  weight: 31,
  summary: "Can you set up and run AI governance: who decides, which frameworks and laws apply, what the policies say, how AI assets and data are managed, how the AI security program is built and measured, and how AI incidents and outages are handled?",
  subdomains: [
    {
      id: "d1a",
      code: "1A",
      title: "Stakeholder Considerations, Industry Frameworks, and Regulatory Requirements",
      tasks: [1, 3, 8],
      topics: [
        {
          id: "d1a-stakeholders",
          title: "AI Stakeholders, Accountability and the Governance Charter",
          concept: [
            { h: "Who is involved", body: "<ul><li><b>Board</b> – sets AI risk appetite, oversees strategy</li><li><b>AI governance committee</b> – approves policy, prioritizes use cases, resolves conflicts</li><li><b>CAIO / AI program lead</b> – drives AI strategy and portfolio</li><li><b>CISO / AI security manager</b> – security requirements and advice</li><li><b>Legal, compliance, DPO</b> – laws, contracts, privacy</li><li><b>Business / system owners</b> – own each AI system and its risk</li></ul>" },
            { h: "Accountable vs responsible", body: "<p><b>Accountability</b> cannot be delegated: the <b>business (system) owner</b> is accountable for an AI system's risk decisions, including accepting residual risk. Security is <b>responsible</b> for advising and implementing controls. The committee coordinates and oversees; it does not own every system's risk.</p>" },
            { h: "External stakeholders", body: "<p>Customers, affected individuals, regulators, model vendors, auditors, investors and the public. Their expectations (rights, transparency, contract terms) become requirements. ISO/IEC 42001 asks you to identify these <b>interested parties</b> and their needs as part of the organization's context.</p>" },
            { h: "The governance charter", body: "<p>A charter gives AI governance its mandate. It states <b>purpose, authority, scope, structure</b> (membership), <b>decision rights, escalation paths</b> and <b>reporting</b> cadence, all aligned to business objectives. Membership is cross-functional: business, IT, security, risk, legal, privacy, HR and data science.</p>" }
          ],
          why: "<p>AI risk crosses every function. A security manager who tries to own AI risk alone will fail; one who knows who decides, who advises and who must be told can get secure AI shipped faster.</p>",
          mnemonics: [
            { device: "BLESS the AI", type: "acronym", recall: "Internal AI governance stakeholders", text: "<b>B</b>oard → <b>L</b>eadership committee (AI governance) → <b>E</b>xecutives (CAIO, CISO) → <b>S</b>pecialists (legal, compliance, DPO) → <b>S</b>ystem/business owners." },
            { device: "The owner holds the leash", type: "story", recall: "Who is accountable vs responsible for AI risk", text: "The business owner walks the AI dog and answers for what it bites (<b>accountable</b>). Security is the trainer who builds the fence (<b>responsible</b> for controls). The committee is the kennel club that sets the rules." },
            { device: "PASS the DER", type: "acronym", recall: "Contents of an AI governance charter", text: "<b>P</b>urpose, <b>A</b>uthority, <b>S</b>cope, <b>S</b>tructure — then <b>D</b>ecision rights, <b>E</b>scalation, <b>R</b>eporting." }
          ],
          diagram: {
            type: "layers",
            title: "AI governance layers",
            items: [
              { label: "Board", sub: "risk appetite, oversight" },
              { label: "AI committee", sub: "policy, priorities" },
              { label: "CAIO / CISO", sub: "strategy, security" },
              { label: "Legal / DPO", sub: "laws, privacy" },
              { label: "System owners", sub: "own system risk" }
            ]
          },
          examTip: "<p>When asked who should <b>accept</b> AI risk, pick the <b>business/system owner</b>, not the CISO or data scientist. When asked what to do <b>FIRST</b> to set up governance, pick <b>senior management support and an approved charter</b> over buying tools or writing technical standards.</p>",
          keyPoints: [
            "Business/system owner is accountable for an AI system's risk",
            "Security advises and implements controls; it does not accept business risk",
            "AI governance committee is cross-functional and needs a charter",
            "Charter: purpose, authority, scope, structure, decision rights, escalation, reporting",
            "ISO 42001 requires identifying interested parties and their requirements"
          ],
          quiz: [
            { q: "A business unit wants to deploy an AI model that scores loan applicants. Who should be ACCOUNTABLE for accepting the residual AI risk?", options: ["The CISO", "The data science lead who built the model", "The business owner of the lending process", "The chair of the AI governance committee"], answer: 2, explain: "Risk acceptance sits with the owner of the business process that benefits from the system. The CISO advises and the committee oversees, but neither owns each system's risk." },
            { q: "An organization is establishing an AI governance program. What should be done FIRST?", options: ["Deploy an AI security monitoring tool", "Obtain senior management sponsorship and an approved charter", "Inventory all AI models in use", "Draft an AI acceptable use policy"], answer: 1, explain: "Without a mandate and authority, inventories and policies cannot be enforced. The inventory is a strong runner-up, but it depends on the authority the charter grants." },
            { q: "The business and security teams disagree about launching a high-risk AI use case. Which charter element MOST helps resolve this?", options: ["The membership list", "The meeting frequency", "A glossary of AI terms", "Decision rights and escalation paths"], answer: 3, explain: "Decision rights and escalation paths define who decides and where disputes go. Membership tells you who attends, not who decides." },
            { q: "Under ISO/IEC 42001, identifying the needs of customers, regulators and affected individuals is part of:", options: ["Understanding the organization and its interested parties (context)", "Operational planning and control", "Management review", "Internal audit"], answer: 0, explain: "Interested parties and their requirements are identified when establishing the context of the AI management system. Operation, review and audit come later and rely on this input." }
          ],
          glossary: [
            { term: "AI governance committee", def: "Cross-functional body that approves AI policy, prioritizes AI use cases and resolves risk conflicts under a charter." },
            { term: "Accountability", def: "Answerability for outcomes and decisions; cannot be delegated, unlike responsibility for performing tasks." },
            { term: "Interested party", def: "ISO term for a person or organization that can affect, be affected by, or perceive itself affected by a decision or activity." },
            { term: "Chief AI Officer (CAIO)", def: "Executive who leads the organization's AI strategy and portfolio; works with the CISO on AI risk." }
          ],
          sources: [
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" },
            { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" }
          ]
        },
        {
          id: "d1a-nist-ai-rmf",
          title: "NIST AI Risk Management Framework (AI RMF 1.0)",
          concept: [
            { h: "What it is", body: "<p>A <b>voluntary</b>, non-sector-specific, use-case-agnostic framework from NIST (<b>NIST AI 100-1</b>, January 2023). Part 1 frames AI risk and trustworthiness; Part 2 is the <b>Core</b>. A companion <b>Playbook</b> suggests actions, and <b>Profiles</b> tailor the framework to a use case or sector.</p>" },
            { h: "The four core functions", body: "<ul><li><b>Govern</b> – culture, policies, accountability (cross-cutting, informs all others)</li><li><b>Map</b> – context, intended use, impacts, risks</li><li><b>Measure</b> – analyze, assess and track risks with metrics and TEVV</li><li><b>Manage</b> – prioritize, treat, respond and monitor</li></ul>" },
            { h: "Seven trustworthy characteristics", body: "<ul><li><b>Valid and reliable</b> (the base for the rest)</li><li>Safe</li><li>Secure and resilient</li><li>Explainable and interpretable</li><li>Privacy-enhanced</li><li>Fair – with harmful bias managed</li><li><b>Accountable and transparent</b> (spans all the others)</li></ul>" },
            { h: "Profiles and AI actors", body: "<p>A <b>current profile</b> vs a <b>target profile</b> shows gaps to close. Responsibility is shared by <b>AI actors</b> across the life cycle (designers, developers, deployers, operators, evaluators). Testing, evaluation, verification and validation (<b>TEVV</b>) runs throughout, not just at the end.</p>" }
          ],
          why: "<p>The AI RMF is the most common common-language framework for AI risk in the US and widely used elsewhere. Exam questions use its functions and characteristics to test whether you know what comes first and what each activity belongs to.</p>",
          mnemonics: [
            { device: "Good Maps Measure Mountains", type: "acronym", recall: "NIST AI RMF core functions (in order)", text: "<b>G</b>overn → <b>M</b>ap → <b>M</b>easure → <b>M</b>anage. Govern is the mountain base under everything." },
            { device: "Very Safe Systems Explain Privacy Fairly — Always", type: "acronym", recall: "The 7 AI RMF trustworthy characteristics", text: "<b>V</b>alid & reliable, <b>S</b>afe, <b>S</b>ecure & resilient, <b>E</b>xplainable & interpretable, <b>P</b>rivacy-enhanced, <b>F</b>air (bias managed), <b>A</b>ccountable & transparent. Picture a house: Valid & reliable is the foundation, Accountable & transparent is the roof over all." },
            { device: "What? How much? What now?", type: "chunk", recall: "Difference between Map, Measure and Manage", text: "<b>Map</b> = WHAT and WHERE (context, impacts). <b>Measure</b> = HOW MUCH (metrics, testing). <b>Manage</b> = WHAT NOW (treat, respond, monitor)." }
          ],
          diagram: { type: "cycle", title: "AI RMF Core", steps: [ { label: "Map", sub: "context, impacts" }, { label: "Measure", sub: "assess, TEVV" }, { label: "Manage", sub: "treat, monitor" } ], center: "Govern" },
          examTip: "<p><b>Govern</b> is the answer for FIRST / foundational questions. There is <b>no NIST certification</b> for the AI RMF — options claiming one are distractors. Documenting intended purpose and impacts is <b>Map</b>; computing metrics is <b>Measure</b>.</p>",
          keyPoints: [
            "AI RMF 1.0 = NIST AI 100-1 (Jan 2023), voluntary",
            "Core: Govern (cross-cutting), Map, Measure, Manage",
            "7 trustworthy characteristics; valid & reliable is the base",
            "Current vs target profiles show gaps",
            "No certification exists for the AI RMF"
          ],
          quiz: [
            { q: "An organization is starting its AI risk program. Which AI RMF function should be established FIRST?", options: ["Measure", "Govern", "Manage", "Map"], answer: 1, explain: "Govern is cross-cutting and sets the policies, roles and risk culture the other functions depend on. Map is a close runner-up but needs governance to define who maps and why." },
            { q: "A team documents the intended purpose, users and potential impacts of a new AI chatbot. Which AI RMF function is this?", options: ["Manage", "Measure", "Govern", "Map"], answer: 3, explain: "Establishing context, intended use and impacts is Map. Measure would quantify those risks; Manage would treat them." },
            { q: "Which trustworthy characteristic does NIST present as a necessary base for the others?", options: ["Secure and resilient", "Accountable and transparent", "Valid and reliable", "Explainable and interpretable"], answer: 2, explain: "NIST shows valid and reliable as the foundation. Accountable and transparent is the runner-up because it spans the others, but it is not the base." },
            { q: "The board wants to see the gap between current AI risk practices and the desired state using the AI RMF. What is the BEST approach?", options: ["Develop current and target AI RMF profiles", "Obtain NIST AI RMF certification", "Map controls to ISO/IEC 27001 Annex A", "Run a red-team exercise on key models"], answer: 0, explain: "Profiles are the AI RMF mechanism for comparing current and target states. NIST offers no certification, and red teaming tests one control area, not program gaps." }
          ],
          glossary: [
            { term: "AI RMF", def: "NIST AI Risk Management Framework 1.0 (NIST AI 100-1): voluntary guidance with the Govern, Map, Measure, Manage core." },
            { term: "TEVV", def: "Test, evaluation, verification and validation — assurance activities run across the AI life cycle." },
            { term: "AI RMF profile", def: "A tailored implementation of the AI RMF for a use case or sector; current vs target profiles show gaps." },
            { term: "AI actor", def: "Anyone playing an active role in the AI life cycle, e.g. designer, developer, deployer, operator, evaluator." }
          ],
          sources: [
            { label: "NIST AI 100-1 (AI RMF 1.0)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" },
            { label: "NIST AI RMF overview", url: "https://www.nist.gov/itl/ai-risk-management-framework" }
          ]
        },
        {
          id: "d1a-nist-genai-profile",
          title: "NIST Generative AI Profile (NIST AI 600-1)",
          concept: [
            { h: "What it is", body: "<p>A cross-sector <b>profile of the AI RMF for generative AI</b>, published by NIST in July 2024. It names <b>12 risks</b> that are unique to or made worse by generative AI and maps suggested actions to AI RMF Govern, Map, Measure and Manage subcategories. It does not replace the AI RMF.</p>" },
            { h: "The 12 risks (1–6)", body: "<ul><li>CBRN information or capabilities</li><li><b>Confabulation</b> (confident false content)</li><li>Dangerous, violent or hateful content</li><li>Data privacy</li><li>Environmental impacts</li><li>Harmful bias and homogenization</li></ul>" },
            { h: "The 12 risks (7–12)", body: "<ul><li><b>Human-AI configuration</b> (over-reliance, automation bias)</li><li>Information integrity (mis/disinformation)</li><li>Information security (e.g. prompt injection, easier cyberattacks)</li><li>Intellectual property</li><li>Obscene, degrading and/or abusive content</li><li><b>Value chain and component integration</b> (third-party models, data)</li></ul>" },
            { h: "Four primary considerations", body: "<p>From NIST's public working group: <b>governance</b>, <b>content provenance</b> (tracking origin of AI content), <b>pre-deployment testing</b> (incl. red teaming), and <b>incident disclosure</b>.</p>" }
          ],
          why: "<p>Most enterprise AI adoption today is generative AI. This profile gives a ready-made risk list for GenAI risk assessments and lets you justify controls with a recognized source.</p>",
          mnemonics: [
            { device: "CC-DD-E-HH-III-O-V", type: "chunk", recall: "The 12 GenAI risks in NIST AI 600-1", text: "NIST lists them alphabetically: <b>C</b>BRN, <b>C</b>onfabulation · <b>D</b>angerous content, <b>D</b>ata privacy · <b>E</b>nvironmental · <b>H</b>armful bias, <b>H</b>uman-AI configuration · <b>I</b>nformation integrity, <b>I</b>nformation security, <b>I</b>ntellectual property · <b>O</b>bscene content · <b>V</b>alue chain. Two Cs, two Ds, one E, two Hs, three Is, one O, one V." },
            { device: "Confabulation = CONfident FABrication", type: "chunk", recall: "Meaning of confabulation", text: "The model fabricates facts (fake citations, invented cases) and states them confidently. It is a model output problem, not an attacker problem." },
            { device: "Good Pilots Pre-check Instruments", type: "acronym", recall: "The 4 primary considerations in AI 600-1", text: "<b>G</b>overnance, <b>P</b>rovenance (content), <b>P</b>re-deployment testing, <b>I</b>ncident disclosure." }
          ],
          diagram: { type: "hub", title: "AI 600-1 primary considerations", center: "GenAI Profile", steps: [ { label: "Governance", sub: "policies, roles" }, { label: "Provenance", sub: "content origin" }, { label: "Pre-deploy test", sub: "evals, red teaming" }, { label: "Incident disclose", sub: "report, share" } ] },
          examTip: "<p>Separate <b>confabulation</b> (false output) from <b>information integrity</b> (mis/disinformation at scale). Over-trust by humans is <b>human-AI configuration</b>. Risks from third-party models, datasets and plugins are <b>value chain and component integration</b>.</p>",
          keyPoints: [
            "AI 600-1 (July 2024) = GenAI profile of the AI RMF",
            "12 GenAI risks, listed alphabetically from CBRN to value chain",
            "Confabulation = confidently stated false content",
            "Considerations: governance, provenance, pre-deployment testing, incident disclosure"
          ],
          quiz: [
            { q: "An LLM assistant confidently cites a court case that does not exist. Which NIST AI 600-1 risk does this BEST illustrate?", options: ["Information integrity", "Confabulation", "Harmful bias and homogenization", "Human-AI configuration"], answer: 1, explain: "Confabulation is false content presented confidently. Information integrity concerns mis/disinformation in the wider information ecosystem, so it is the runner-up rather than the best fit." },
            { q: "Developers routinely accept AI-generated code without review, introducing vulnerabilities. Which GenAI risk category BEST describes the root issue?", options: ["Information security", "Value chain and component integration", "Human-AI configuration", "Confabulation"], answer: 2, explain: "Over-reliance and automation bias fall under human-AI configuration. The vulnerabilities are an information security consequence, not the root cause." },
            { q: "A team plans to fine-tune an open-source foundation model downloaded from a public model hub. Which GenAI risk should the security manager highlight FIRST?", options: ["Environmental impacts", "Obscene, degrading or abusive content", "Data privacy", "Value chain and component integration"], answer: 3, explain: "Third-party models and components bring supply-chain risks (tampered weights, unknown training data). Privacy may matter later, but the immediate concern is the integrity of the component." },
            { q: "How does NIST AI 600-1 relate to the NIST AI RMF?", options: ["It is a certification scheme for GenAI vendors", "It replaces the AI RMF for generative AI", "It is a mandatory regulation for US companies", "It is a companion profile applying the AI RMF to GenAI"], answer: 3, explain: "AI 600-1 is a cross-sector profile that maps GenAI risks and actions to AI RMF subcategories. It is voluntary and does not replace the AI RMF." }
          ],
          glossary: [
            { term: "Confabulation", def: "Generative AI output that is false or fabricated but presented confidently (often called hallucination)." },
            { term: "Human-AI configuration", def: "AI 600-1 risk from how humans and AI interact, e.g. over-reliance, automation bias, anthropomorphizing." },
            { term: "Content provenance", def: "Information about the origin and history of content, e.g. watermarks or metadata showing it was AI-generated." },
            { term: "Homogenization", def: "Loss of diversity in outputs or decisions when many users rely on the same models." }
          ],
          sources: [ { label: "NIST AI 600-1 Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" } ]
        },
        {
          id: "d1a-iso-42001",
          title: "ISO/IEC 42001 AI Management System (AIMS)",
          concept: [
            { h: "What it is", body: "<p>International, <b>certifiable</b> management-system standard (December 2023) for any organization that <b>provides or uses</b> AI. It sets requirements to establish, implement, maintain and continually improve an <b>AI management system (AIMS)</b>. It uses the same harmonized structure as ISO/IEC 27001, so the two integrate easily.</p>" },
            { h: "Clauses 4–10 on PDCA", body: "<ul><li><b>Plan</b>: 4 Context · 5 Leadership · 6 Planning</li><li><b>Do</b>: 7 Support · 8 Operation</li><li><b>Check</b>: 9 Performance evaluation</li><li><b>Act</b>: 10 Improvement</li></ul>" },
            { h: "Key requirements", body: "<ul><li>AI policy and AI objectives</li><li>AI risk assessment and risk treatment</li><li><b>AI system impact assessment</b> (individuals, groups, society)</li><li><b>Statement of Applicability</b> justifying Annex A control choices</li><li>Internal audit and management review</li></ul>" },
            { h: "The annexes", body: "<ul><li><b>Annex A</b> – reference control objectives and controls (A.2–A.10)</li><li><b>Annex B</b> – implementation guidance for those controls</li><li><b>Annex C</b> – possible AI objectives and risk sources</li><li><b>Annex D</b> – use across domains and sectors</li></ul>" },
            { h: "Annex A areas", body: "<p>A.2 Policies related to AI · A.3 Internal organization · A.4 Resources for AI systems · A.5 Assessing impacts of AI systems · A.6 AI system life cycle · A.7 Data for AI systems · A.8 Information for interested parties · A.9 Use of AI systems · A.10 Third-party and customer relationships.</p>" }
          ],
          why: "<p>Customers increasingly ask for ISO/IEC 42001 certification as proof of responsible AI. If you already run an ISO 27001 ISMS, extending it to an AIMS is the most efficient route.</p>",
          mnemonics: [
            { device: "Cats Like Playing; Sleeping Often Ends Itchy", type: "acronym", recall: "ISO 42001 clauses 4–10 in order", text: "<b>C</b>ontext (4), <b>L</b>eadership (5), <b>P</b>lanning (6), <b>S</b>upport (7), <b>O</b>peration (8), <b>E</b>valuation of performance (9), <b>I</b>mprovement (10)." },
            { device: "The new AI hire", type: "story", recall: "ISO 42001 Annex A control areas A.2–A.10", text: "A new AI joins: reads the <b>Policy</b> handbook (A.2), joins the <b>Org chart</b> (A.3), gets <b>Resources</b> (A.4), checks its <b>Impact</b> (A.5), works the <b>Life cycle</b> (A.6) with <b>Data</b> (A.7), <b>Informs</b> stakeholders (A.8), is <b>Used</b> responsibly (A.9), and deals with <b>Third parties</b> (A.10)." },
            { device: "42001 is 27001's AI twin", type: "visual", recall: "Why ISO 42001 integrates with ISO 27001", text: "Same skeleton (clauses 4–10, PDCA, Annex A, Statement of Applicability), different heart: AI risks and AI impacts instead of information security risks." }
          ],
          diagram: { type: "cycle", title: "AIMS on PDCA", center: "AIMS", steps: [ { label: "Plan", sub: "Cl. 4-6 context, risk" }, { label: "Do", sub: "Cl. 7-8 support, ops" }, { label: "Check", sub: "Cl. 9 audit, review" }, { label: "Act", sub: "Cl. 10 improve" } ] },
          examTip: "<p>ISO/IEC 42001 certifies the <b>organization's management system</b>, not that each model is unbiased or legally compliant. The <b>Statement of Applicability</b> justifies included and excluded Annex A controls. Integration with an existing ISMS beats building a separate silo.</p>",
          keyPoints: [
            "ISO/IEC 42001:2023 = certifiable AI management system standard",
            "Clauses 4–10 follow PDCA, same structure as ISO 27001",
            "Requires AI risk assessment, treatment and AI system impact assessment",
            "Annex A controls A.2–A.10; SoA justifies choices",
            "Certifies the management system, not individual products"
          ],
          quiz: [
            { q: "The board asks what an ISO/IEC 42001 certificate demonstrates. What is the BEST answer?", options: ["Every AI model has been tested free of bias", "Its AI products are CE-marked under the EU AI Act", "An independently audited AI management system meets the standard's requirements", "It has adopted the NIST AI RMF"], answer: 2, explain: "Certification attests to the management system. It does not guarantee bias-free models or EU AI Act product conformity." },
            { q: "Which ISO/IEC 42001 document justifies why Annex A controls are included or excluded?", options: ["Statement of Applicability", "AI policy", "Risk register", "Management review minutes"], answer: 0, explain: "The Statement of Applicability lists necessary controls and justifies inclusions and exclusions. The risk register records risks but does not justify control selection against Annex A." },
            { q: "An organization certified to ISO/IEC 27001 now wants ISO/IEC 42001. What is the MOST efficient approach?", options: ["Build a separate AIMS with its own policies and audits", "Integrate the AIMS into the existing ISMS using the shared structure", "Wait for a combined ISO standard to be published", "Ask the AI vendor to obtain certification instead"], answer: 1, explain: "Both use the harmonized structure, so shared processes (document control, audit, management review) can be reused. A separate AIMS duplicates effort." },
            { q: "Which ISO/IEC 42001 activity specifically considers consequences of an AI system for individuals, groups and society?", options: ["AI risk treatment", "Internal audit", "Management review", "AI system impact assessment"], answer: 3, explain: "The AI system impact assessment focuses on effects on people and society. Risk treatment acts on organizational risks once they are assessed." }
          ],
          glossary: [
            { term: "AIMS", def: "AI management system: policies, objectives and processes for responsible development, provision or use of AI (ISO/IEC 42001)." },
            { term: "Statement of Applicability (SoA)", def: "Document listing required controls, justifying inclusions and exclusions, and stating implementation status." },
            { term: "Harmonized structure", def: "Common clause layout (4–10) used by ISO management-system standards, enabling integration." },
            { term: "AI system impact assessment", def: "Assessment of potential consequences of an AI system for individuals, groups and society." }
          ],
          sources: [ { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" } ]
        },
        {
          id: "d1a-eu-ai-act-risk",
          title: "EU AI Act: Risk Tiers and Operator Roles",
          concept: [
            { h: "What it is", body: "<p><b>Regulation (EU) 2024/1689</b>, the first comprehensive horizontal AI law, in force since <b>1 August 2024</b>. It is risk-based and reaches beyond the EU: it applies to providers placing AI on the EU market and to deployers outside the EU when the AI output is used in the EU.</p>" },
            { h: "Four risk tiers", body: "<ul><li><b>Unacceptable</b> – prohibited (Art. 5): e.g. social scoring, manipulative techniques, untargeted facial scraping, emotion recognition at work or school</li><li><b>High</b> – strict requirements (Art. 6; Annex I products, Annex III uses)</li><li><b>Limited</b> – transparency duties (Art. 50): chatbots, deepfakes</li><li><b>Minimal</b> – no new duties</li></ul>" },
            { h: "Annex III high-risk areas", body: "<p>Biometrics · critical infrastructure · education · employment and worker management · access to essential services (e.g. credit scoring, public benefits) · law enforcement · migration and border control · administration of justice and democratic processes.</p>" },
            { h: "Provider vs deployer", body: "<p><b>Provider</b>: develops the system and places it on the market under its own name — heaviest duties (risk management, data governance, technical documentation, logging, human-oversight design, accuracy/robustness/cybersecurity, QMS, conformity assessment, CE marking, post-market monitoring). <b>Deployer</b>: uses it professionally — follow instructions, assign human oversight, monitor, keep logs, inform workers; some must do a FRIA.</p>" },
            { h: "When a deployer becomes a provider", body: "<p>Under Art. 25 a deployer, importer or distributor is treated as the provider of a high-risk system if it puts its <b>name or trademark</b> on it, makes a <b>substantial modification</b>, or <b>changes the intended purpose</b> so that the system becomes high-risk.</p>" }
          ],
          why: "<p>Your obligations depend on two questions: which tier is the system in, and which role do you play? Getting either wrong means missing obligations (fines) or over-engineering low-risk uses.</p>",
          mnemonics: [
            { device: "STOP – STRICT – SAY – SLEEP", type: "visual", recall: "EU AI Act risk tiers and what each means", text: "Picture a pyramid. Top: <b>Unacceptable = STOP</b> (banned). Then <b>High = STRICT</b> (full controls). Then <b>Limited = SAY</b> (tell people it's AI). Base: <b>Minimal = SLEEP</b> easy." },
            { device: "One person's life through Annex III", type: "story", recall: "The 8 Annex III high-risk areas", text: "A <b>biometric</b> gate at a <b>power plant</b> (critical infrastructure) scans a <b>student</b> (education) going to a <b>job interview</b> (employment), then applying for a <b>loan</b> (essential services), stopped by <b>police</b> (law enforcement), at the <b>border</b> (migration), ending up in <b>court</b> (justice and democracy)." },
            { device: "Rebrand, Rebuild, Repurpose = you're the provider", type: "chunk", recall: "When a deployer becomes a provider (Art. 25)", text: "<b>Provider = builder/brand</b>; <b>deployer = driver</b>. The three Rs flip a driver into a builder: <b>R</b>ebrand (your name on it), <b>R</b>ebuild (substantial modification), <b>R</b>epurpose (new intended purpose that makes it high-risk)." }
          ],
          diagram: { type: "pyramid", title: "EU AI Act risk tiers", items: [ { label: "Unacceptable", sub: "prohibited, Art. 5" }, { label: "High-risk", sub: "conformity, controls" }, { label: "Limited", sub: "transparency, Art. 50" }, { label: "Minimal", sub: "voluntary codes" } ] },
          examTip: "<p>First classify <b>tier</b>, then <b>role</b>. CV screening, credit scoring and exam proctoring are <b>high-risk</b>; a customer chatbot is usually <b>limited</b> (disclose it is AI). Emotion recognition of employees is <b>prohibited</b> (except medical or safety reasons). Rebranding or substantially modifying makes you the <b>provider</b>.</p>",
          keyPoints: [
            "Regulation (EU) 2024/1689, in force 1 Aug 2024, extraterritorial",
            "Tiers: unacceptable, high, limited (transparency), minimal",
            "Annex III: 8 high-risk use areas (e.g. employment, credit)",
            "Providers carry most duties; deployers ensure oversight, logs, monitoring",
            "Rebrand, substantial modification or new purpose → treated as provider"
          ],
          quiz: [
            { q: "A company buys a third-party CV-screening AI and uses it to shortlist job candidates in the EU. What is its role and the system's tier?", options: ["Provider of a limited-risk system", "Deployer of a high-risk system", "Distributor of a minimal-risk system", "Provider of a prohibited system"], answer: 1, explain: "Employment uses are listed in Annex III (high-risk), and using a system under your authority makes you a deployer. You would become the provider only by rebranding, substantially modifying or repurposing it." },
            { q: "The same company substantially retrains the CV-screening system and sells it under its own brand. What is the PRIMARY consequence?", options: ["It remains a deployer but must keep logs longer", "The original vendor retains all provider obligations", "It is treated as the provider and must meet provider obligations", "The system is reclassified as limited risk"], answer: 2, explain: "Under Art. 25, putting your name on a high-risk system or substantially modifying it makes you the provider, including conformity assessment duties." },
            { q: "Which use is PROHIBITED under the EU AI Act?", options: ["Credit scoring of loan applicants", "A customer chatbot without an AI disclosure", "AI-based spam filtering", "Inferring employees' emotions at work to evaluate performance"], answer: 3, explain: "Emotion recognition in the workplace (outside medical or safety reasons) is a prohibited practice. Credit scoring is high-risk, and a chatbot without disclosure breaches a transparency duty but is not a prohibited practice." },
            { q: "A website chatbot answers customer questions and is not otherwise high-risk. What is the MAIN EU AI Act obligation?", options: ["Inform people they are interacting with an AI system", "Complete a third-party conformity assessment", "Register the system in the EU high-risk database", "None; chatbots are minimal risk"], answer: 0, explain: "Art. 50 requires people to be told they are interacting with AI unless it is obvious. Conformity assessment and registration apply to high-risk systems." }
          ],
          glossary: [
            { term: "Provider (EU AI Act)", def: "Entity that develops an AI system or GPAI model, or has one developed, and places it on the market or into service under its own name." },
            { term: "Deployer (EU AI Act)", def: "Entity using an AI system under its authority in a professional context." },
            { term: "High-risk AI system", def: "AI that is a safety component of an Annex I regulated product or is used in an Annex III area; subject to strict requirements." },
            { term: "Substantial modification", def: "A change after market placement not foreseen by the provider that affects compliance or the intended purpose." },
            { term: "FRIA", def: "Fundamental rights impact assessment required of certain deployers of high-risk AI (e.g. public bodies, credit and insurance uses) under Art. 27." }
          ],
          sources: [
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
            { label: "European Commission: AI Act overview", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" }
          ]
        },
        {
          id: "d1a-eu-ai-act-gpai",
          title: "EU AI Act: GPAI Models, Timeline and Penalties",
          concept: [
            { h: "GPAI model duties", body: "<p>Providers of <b>general-purpose AI (GPAI) models</b> must (Art. 53) keep technical documentation, give information to downstream providers, have a policy to comply with EU copyright law, and publish a summary of training content. The voluntary <b>GPAI Code of Practice</b> (July 2025) is one way to show compliance.</p>" },
            { h: "GPAI with systemic risk", body: "<p>Presumed when cumulative training compute exceeds <b>10^25 FLOPs</b>, or designated by the Commission. Extra duties (Art. 55): model evaluation incl. <b>adversarial testing</b>, assess and mitigate systemic risks, <b>report serious incidents</b> to the AI Office, and ensure adequate <b>cybersecurity</b>.</p>" },
            { h: "Timeline", body: "<ul><li><b>1 Aug 2024</b> – in force</li><li><b>2 Feb 2025</b> – prohibitions + AI literacy</li><li><b>2 Aug 2025</b> – GPAI duties, governance, penalties</li><li><b>2 Aug 2026</b> – most remaining rules, incl. Annex III high-risk</li><li><b>2 Aug 2027</b> – high-risk AI in Annex I products</li></ul><p>Watch for amendments (e.g. the 2025 'Digital Omnibus' proposal on high-risk dates).</p>" },
            { h: "Penalties (Art. 99)", body: "<ul><li>Prohibited practices: up to <b>€35M or 7%</b> of worldwide annual turnover</li><li>Most other obligations: up to <b>€15M or 3%</b></li><li>Incorrect or misleading information to authorities: up to <b>€7.5M or 1%</b></li></ul><p>Whichever is higher; for SMEs and start-ups, whichever is lower.</p>" }
          ],
          why: "<p>Roadmaps for EU AI Act readiness are planned around these dates, and boards ask about fine exposure. GPAI duties matter when you build on, fine-tune or provide foundation models.</p>",
          mnemonics: [
            { device: "Ban → Big models → Bulk → Built-in (6-12-24-36)", type: "chunk", recall: "EU AI Act application dates (months after entry into force)", text: "+<b>6</b> months (Feb 2025): <b>Ban</b> (prohibitions, literacy). +<b>12</b> (Aug 2025): <b>Big models</b> (GPAI). +<b>24</b> (Aug 2026): <b>Bulk</b> of the rules. +<b>36</b> (Aug 2027): <b>Built-in</b> products (Annex I)." },
            { device: "7 – 3 – 1", type: "story", recall: "EU AI Act maximum fine tiers", text: "The <b>7</b> deadly sins (prohibited practices) cost <b>7% / €35M</b>. Breaking the other rules costs <b>3% / €15M</b>. Telling <b>1</b> lie to the regulator costs <b>1% / €7.5M</b>." },
            { device: "Roll the DICE, then do the TRIC", type: "acronym", recall: "GPAI duties and extra systemic-risk duties", text: "All GPAI: <b>D</b>ocumentation, <b>I</b>nfo to downstream providers, <b>C</b>opyright policy, <b>E</b>xplain training data (public summary). Systemic risk adds <b>T</b>esting (evals, adversarial), <b>R</b>isk mitigation, <b>I</b>ncident reporting, <b>C</b>ybersecurity." }
          ],
          diagram: { type: "flow", title: "EU AI Act timeline", steps: [ { label: "Aug 2024", sub: "in force" }, { label: "Feb 2025", sub: "bans + AI literacy" }, { label: "Aug 2025", sub: "GPAI + penalties" }, { label: "Aug 2026", sub: "most rules, Annex III" }, { label: "Aug 2027", sub: "Annex I products" } ] },
          examTip: "<p>Readiness questions: the FIRST step is to <b>inventory and classify</b> AI systems against the tiers and roles, not to buy a tool or wait. Highest fines are for <b>prohibited practices</b>. Systemic-risk GPAI adds <b>evaluation, adversarial testing and incident reporting</b>.</p>",
          keyPoints: [
            "Prohibitions and AI literacy apply from 2 Feb 2025",
            "GPAI duties from 2 Aug 2025; most high-risk rules 2 Aug 2026",
            "Systemic-risk GPAI presumed above 10^25 training FLOPs",
            "Max fines: 7%/€35M, 3%/€15M, 1%/€7.5M",
            "Check for later amendments to application dates"
          ],
          quiz: [
            { q: "Which EU AI Act obligations applied FIRST, from February 2025?", options: ["GPAI provider documentation duties", "High-risk conformity assessment", "Prohibited practices and AI literacy", "Post-market monitoring plans"], answer: 2, explain: "Chapter I (incl. AI literacy) and Chapter II (prohibitions) applied six months after entry into force. GPAI duties followed in August 2025." },
            { q: "Which breach carries the HIGHEST maximum fine under the EU AI Act?", options: ["Failing to keep logs for a high-risk system", "Using a prohibited AI practice", "Supplying misleading information to a notified body", "Missing transparency labels on deepfakes"], answer: 1, explain: "Prohibited practices carry up to €35M or 7% of worldwide annual turnover. Log-keeping and transparency failures fall in the 3% tier; misleading information is the 1% tier." },
            { q: "A GPAI model is presumed to have systemic risk. What must its provider do IN ADDITION to the baseline GPAI duties?", options: ["Perform model evaluations incl. adversarial testing and report serious incidents", "Obtain ISO/IEC 42001 certification", "Affix CE marking to the model", "Register every downstream deployer"], answer: 0, explain: "Art. 55 adds evaluation, adversarial testing, systemic risk mitigation, incident reporting and cybersecurity. ISO 42001 certification is voluntary and CE marking applies to high-risk systems, not GPAI models." },
            { q: "An organization uses AI in HR decisions in the EU and asks how to start EU AI Act readiness. What should the security manager recommend FIRST?", options: ["Commission third-party conformity assessments for every AI system", "Wait until the high-risk obligations apply", "Buy an AI Act compliance tool", "Inventory AI systems and classify them against the Act's risk tiers and roles"], answer: 3, explain: "Obligations depend on tier and role, so inventory and classification come first. Assessing every system is wasteful, and waiting leaves no time for high-risk controls." }
          ],
          glossary: [
            { term: "GPAI model", def: "General-purpose AI model: shows significant generality and can perform a wide range of tasks; can be integrated into many systems." },
            { term: "Systemic risk (GPAI)", def: "Risk from high-impact GPAI capabilities with significant EU-wide effects; presumed above 10^25 training FLOPs." },
            { term: "AI Office", def: "European Commission body that supervises GPAI models and supports AI Act implementation." },
            { term: "AI literacy", def: "Skills, knowledge and understanding to deploy AI in an informed way and be aware of its risks (Art. 4 duty)." }
          ],
          sources: [
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
            { label: "European Commission: GPAI Code of Practice", url: "https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai" }
          ]
        },
        {
          id: "d1a-other-regulations",
          title: "Other AI Rules: GDPR, US Patchwork and OECD Principles",
          concept: [
            { h: "GDPR touchpoints", body: "<ul><li><b>Art. 22</b> – right not to be subject to solely automated decisions with legal or similarly significant effects; exceptions need safeguards (human intervention, express a view, contest)</li><li><b>Art. 35</b> – DPIA for high-risk processing</li><li><b>Art. 25</b> – data protection by design</li><li>Lawful basis and purpose limitation apply to training data</li></ul>" },
            { h: "US landscape", body: "<p>No single federal AI law. Expect a <b>patchwork</b>: sector regulators (e.g. FTC on unfair or deceptive AI, banking model risk guidance SR 11-7, equal-employment rules for hiring), <b>state laws</b> (e.g. Colorado's AI Act on high-risk AI and algorithmic discrimination; NYC Local Law 144 bias audits for hiring tools) and federal executive orders that change between administrations.</p>" },
            { h: "OECD AI Principles", body: "<p>Adopted 2019, updated 2024; non-binding but widely endorsed. Five values: <b>inclusive growth</b> and well-being; <b>human rights</b> and democratic values incl. fairness and privacy; <b>transparency</b> and explainability; <b>robustness</b>, security and safety; <b>accountability</b>.</p>" },
            { h: "Managing a moving target", body: "<p>Keep a <b>regulatory register</b> with owners (legal/compliance). Map each obligation once to a <b>common control set</b>. Scan the horizon: new laws are a trigger to reassess AI risk (task 6).</p>" }
          ],
          why: "<p>The EU AI Act is not the only rulebook. Privacy law already governs most AI that touches personal data, and US obligations depend on sector and state.</p>",
          mnemonics: [
            { device: "Article 22 = two humans", type: "visual", recall: "GDPR Art. 22 and its safeguards", text: "See '22' as two people standing side by side: a <b>human</b> must be available next to the machine. Safeguards = '<b>Have a Voice, Challenge</b>': <b>H</b>uman intervention, express your <b>V</b>iew, <b>C</b>ontest the decision." },
            { device: "I Have To Remain Accountable", type: "acronym", recall: "The 5 OECD AI values-based principles", text: "<b>I</b>nclusive growth, <b>H</b>uman rights & democratic values, <b>T</b>ransparency & explainability, <b>R</b>obustness, security & safety, <b>A</b>ccountability." },
            { device: "The US patchwork quilt", type: "visual", recall: "Sources of US AI obligations", text: "<b>Sector patches</b> (FTC, banking regulators, employment agencies) + <b>state patches</b> (Colorado, NYC) stitched with a <b>federal thread</b> that changes with each administration." }
          ],
          diagram: { type: "matrix", title: "Comparing AI rulebooks", rows: ["EU AI Act", "GDPR", "US", "OECD"], cols: ["Binding?", "Focus"], cells: [["Yes – regulation", "Risk-tiered AI rules"], ["Yes – regulation", "Personal data, Art. 22"], ["By sector/state", "Unfair, biased AI"], ["No – principles", "Trustworthy AI values"]] },
          examTip: "<p>Solely automated decisions with significant effects on people point to <b>GDPR Art. 22</b>. For many overlapping laws, the BEST answer is a <b>common control framework</b> mapped to obligations, not a separate project per law. For a new law, FIRST <b>assess applicability</b> with legal/compliance.</p>",
          keyPoints: [
            "GDPR Art. 22: safeguards for solely automated significant decisions",
            "DPIA (Art. 35) is often needed for AI on personal data",
            "US = sector regulators + state laws + shifting federal policy",
            "OECD: 5 non-binding values-based principles (updated 2024)",
            "Map obligations once to common controls; keep a regulatory register"
          ],
          quiz: [
            { q: "A bank's AI automatically rejects EU loan applicants with no human review. Which GDPR provision is MOST directly engaged?", options: ["Data portability", "Solely automated decisions with significant effects (Art. 22)", "Personal data breach notification", "Right to erasure"], answer: 1, explain: "Credit refusal is a significant effect, and no human review makes the decision solely automated, engaging Art. 22 safeguards." },
            { q: "An organization operates in several jurisdictions with overlapping AI rules. What is the BEST compliance approach?", options: ["Run a separate compliance project per law", "Apply only the strictest law everywhere", "Map obligations to a common control set with owners", "Rely on AI vendors' compliance attestations"], answer: 2, explain: "A common control framework avoids duplication and shows coverage of each law. 'Strictest law everywhere' can still miss jurisdiction-specific duties." },
            { q: "The OECD AI Principles are BEST described as:", options: ["A binding EU regulation", "A certifiable management system standard", "A US federal agency rule", "Non-binding intergovernmental principles for trustworthy AI"], answer: 3, explain: "The OECD principles are a non-binding recommendation adopted by member and partner countries. ISO/IEC 42001 is the certifiable standard." },
            { q: "A US state passes a new law on algorithmic discrimination. What should the AI security manager do FIRST?", options: ["Assess with legal/compliance which inventoried AI systems are in scope", "Retrain all models to remove bias", "Suspend all AI use in that state", "Update the acceptable use policy"], answer: 0, explain: "Applicability must be determined before deciding treatments. Retraining or suspension may be unnecessary for out-of-scope systems." }
          ],
          glossary: [
            { term: "Solely automated decision", def: "Decision made without meaningful human involvement; restricted by GDPR Art. 22 when it has legal or similarly significant effects." },
            { term: "DPIA", def: "Data protection impact assessment required by GDPR Art. 35 for processing likely to result in high risk to individuals." },
            { term: "OECD AI Principles", def: "Intergovernmental, non-binding principles for trustworthy AI (2019, updated 2024)." },
            { term: "Regulatory register", def: "Maintained list of applicable laws and obligations, with owners and mapped controls." }
          ],
          sources: [
            { label: "GDPR – Regulation (EU) 2016/679", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
            { label: "OECD AI Principles", url: "https://oecd.ai/en/ai-principles" }
          ]
        },
        {
          id: "d1a-framework-crosswalk",
          title: "Choosing and Crosswalking AI Frameworks (incl. ISO/IEC 23894)",
          concept: [
            { h: "Different tools, different jobs", body: "<ul><li><b>EU AI Act</b> – binding law: what you must do</li><li><b>ISO/IEC 42001</b> – certifiable management system: how to run it</li><li><b>NIST AI RMF</b> – voluntary risk framework: what to consider</li><li><b>ISO/IEC 23894</b> – AI risk management guidance</li><li><b>OWASP LLM Top 10, MITRE ATLAS</b> – threat references for controls and testing</li></ul>" },
            { h: "ISO/IEC 23894", body: "<p>Guidance (not certifiable, 2023) that adapts <b>ISO 31000</b> risk management to AI. Process: establish <b>context</b>, <b>identify</b>, <b>analyze</b>, <b>evaluate</b>, <b>treat</b>, then <b>monitor</b> and review — with communication and recording throughout. Its annexes cover AI objectives, risk sources and the AI life cycle.</p>" },
            { h: "Crosswalk = map once, test once", body: "<p>Map each requirement from each framework to one <b>common control</b>; test that control once and report the evidence to many audiences. NIST publishes crosswalks from the AI RMF to other standards, including ISO/IEC 42001.</p>" },
            { h: "How to select", body: "<p>Start with <b>mandatory</b> (laws, contracts), then <b>risk appetite and business goals</b>, then <b>certification needs</b> (do customers ask for 42001?), then current <b>maturity</b>. Pick one backbone and map the others to it; don't run parallel programs.</p>" }
          ],
          why: "<p>Exams and executives both ask 'which framework?'. The right answer depends on whether you need compliance (law), proof (certification), guidance (risk thinking) or attack knowledge (testing).</p>",
          mnemonics: [
            { device: "MUST – PROVE – THINK – ATTACK", type: "chunk", recall: "What each AI framework type is for", text: "<b>MUST</b> = law (EU AI Act). <b>PROVE</b> = certification (ISO 42001). <b>THINK</b> = risk guidance (NIST AI RMF, ISO 23894). <b>ATTACK</b> = threat catalogs (OWASP LLM Top 10, MITRE ATLAS)." },
            { device: "Clever Investigators Always Evaluate Their Methods", type: "acronym", recall: "ISO/IEC 23894 (ISO 31000) risk process steps", text: "<b>C</b>ontext → <b>I</b>dentify → <b>A</b>nalyze → <b>E</b>valuate → <b>T</b>reat → <b>M</b>onitor & review (with communication and recording all along)." },
            { device: "Map once, test once, report many", type: "chunk", recall: "Purpose of a framework crosswalk", text: "One common control satisfies many frameworks; one test produces evidence for every auditor." }
          ],
          diagram: { type: "matrix", title: "Framework comparison", rows: ["NIST AI RMF", "ISO/IEC 42001", "ISO/IEC 23894", "EU AI Act"], cols: ["Type", "Certifiable?"], cells: [["Voluntary framework", "No"], ["Mgmt system std", "Yes (organization)"], ["Risk guidance", "No"], ["Binding law", "Conformity (product)"]] },
          examTip: "<p>External <b>proof</b> of AI governance → ISO/IEC 42001 certification. <b>Guidance</b> on AI risk management extending ISO 31000 → ISO/IEC 23894. Threat-informed <b>testing</b> → MITRE ATLAS / OWASP. Multiple frameworks → <b>common control set</b>.</p>",
          keyPoints: [
            "Law = must; 42001 = prove; AI RMF/23894 = guide; OWASP/ATLAS = attack",
            "ISO/IEC 23894 applies ISO 31000 to AI; not certifiable",
            "Crosswalk: map once to common controls, test once, report many",
            "Select by obligations, appetite, certification needs, maturity"
          ],
          quiz: [
            { q: "A key customer demands independent evidence that the organization governs AI responsibly. Which option BEST meets this need?", options: ["ISO/IEC 42001 certification by an accredited body", "Self-attestation of NIST AI RMF alignment", "Adopting the OWASP Top 10 for LLM Applications", "Publishing model cards for each model"], answer: 0, explain: "Certification provides independent third-party assurance of the management system. Self-attestation lacks independence; OWASP and model cards cover narrower areas." },
            { q: "ISO/IEC 23894 is BEST described as:", options: ["Certifiable requirements for an AI management system", "AI-specific guidance applying ISO 31000 risk management", "An EU harmonized standard for CE marking", "A catalog of adversarial ML techniques"], answer: 1, explain: "ISO/IEC 23894 is guidance that tailors ISO 31000 to AI. Certifiable AIMS requirements are in ISO/IEC 42001." },
            { q: "An organization is subject to the EU AI Act, customers want ISO/IEC 42001, and teams already use the NIST AI RMF. What is the MOST efficient approach?", options: ["Run three separate compliance programs", "Choose one framework and ignore the others", "Build a common control set crosswalked to all three", "Assign each framework to a different consultant"], answer: 2, explain: "A crosswalked common control set meets all three without duplication. Ignoring the law is not an option, and separate programs waste effort." },
            { q: "Which reference PRIMARILY supports threat-informed testing of AI systems rather than governance?", options: ["ISO/IEC 42001", "NIST AI RMF", "OECD AI Principles", "MITRE ATLAS"], answer: 3, explain: "MITRE ATLAS catalogs adversary tactics and techniques against AI systems, used for threat modeling and red teaming. The others are governance or principles." }
          ],
          glossary: [
            { term: "ISO/IEC 23894", def: "2023 guidance on AI risk management, adapting ISO 31000 principles, framework and process to AI." },
            { term: "ISO 31000", def: "International guideline for enterprise risk management; the base for ISO/IEC 23894." },
            { term: "Crosswalk", def: "Mapping between frameworks showing which requirements correspond, so one control can satisfy several." },
            { term: "Common control framework", def: "Single set of controls mapped to all applicable laws, standards and contracts." }
          ],
          sources: [
            { label: "ISO/IEC 23894:2023", url: "https://www.iso.org/standard/77304.html" },
            { label: "NIST AI RMF (incl. crosswalks)", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
            { label: "MITRE ATLAS", url: "https://atlas.mitre.org/" },
            { label: "OWASP Top 10 for LLM Applications", url: "https://genai.owasp.org/llm-top-10/" }
          ]
        }
      ]
    },
    {
      id: "d1b",
      code: "1B",
      title: "AI-Related Strategies, Policies, and Procedures",
      tasks: [1, 2, 3, 21],
      topics: [
        {
          id: "d1b-ai-strategy",
          title: "AI Strategy, Risk Appetite and Use-Case Intake",
          concept: [
            { h: "Strategy first", body: "<p>AI security exists to let the business use AI <b>safely</b>. The AI strategy says where AI creates value, how much AI risk is acceptable, and what gets funded. The AI security strategy <b>aligns to it</b>, not the other way round.</p>" },
            { h: "Appetite and tolerance", body: "<p>The <b>board and senior management</b> set <b>risk appetite</b> (e.g. 'no fully automated decisions about customers'). <b>Risk tolerances</b> turn appetite into measurable limits that trigger escalation when exceeded.</p>" },
            { h: "Use-case intake", body: "<p>A standard path for new AI ideas: <b>business case</b> → <b>risk tier</b> → <b>review</b> (security, privacy, legal, ethics) → <b>approve</b> with conditions → <b>register</b> in the inventory. Low-risk ideas get a fast track; high-risk ideas get deeper review.</p>" },
            { h: "Opportunity, not just risk", body: "<p>Saying 'no' by default drives <b>shadow AI</b>. Offer safe paths: approved tools, sandboxes, guardrails. Present management with options and the risk of <b>not</b> adopting AI too; they make the informed decision.</p>" }
          ],
          why: "<p>Security programs that fight the AI strategy lose. Aligning to business goals and offering fast, safe approval paths earns security a seat at the table.</p>",
          mnemonics: [
            { device: "Business drives, security steers", type: "visual", recall: "Relationship between AI strategy and AI security", text: "The business is the driver choosing the destination. Security is the brakes and steering that let the car go fast <b>without crashing</b>. Nobody buys a car for its brakes, but nobody drives fast without them." },
            { device: "BRRAR — the lion at the gate", type: "acronym", recall: "Steps of an AI use-case intake process", text: "<b>B</b>usiness case → <b>R</b>isk tier → <b>R</b>eview → <b>A</b>pprove (with conditions) → <b>R</b>egister. The lion roars louder (deeper review) for high-risk cases." },
            { device: "Appetite vs tolerance = hungry vs sick", type: "chunk", recall: "Difference between risk appetite and risk tolerance", text: "<b>Appetite</b> = how much you are willing to eat (overall level of risk). <b>Tolerance</b> = the measurable point where you start to feel sick and must stop (thresholds that trigger escalation)." }
          ],
          diagram: { type: "flow", title: "AI use-case intake", steps: [ { label: "Business case", sub: "value, owner" }, { label: "Risk tier", sub: "impact, autonomy" }, { label: "Review", sub: "sec, privacy, legal" }, { label: "Approve", sub: "with conditions" }, { label: "Register", sub: "AI inventory" } ] },
          examTip: "<p>The PRIMARY driver of AI security strategy is <b>business objectives</b>. Risk appetite is set by the <b>board/senior management</b>. When a valuable use case exceeds tolerance, the security manager <b>presents risks and treatment options</b> for an informed management decision rather than rejecting or approving it alone.</p>",
          keyPoints: [
            "AI security strategy aligns to business objectives and AI strategy",
            "Board/senior management set AI risk appetite",
            "Tolerances are measurable limits that trigger escalation",
            "Risk-tiered intake: fast track low risk, deep review high risk",
            "Blocking everything fuels shadow AI"
          ],
          quiz: [
            { q: "When developing an AI security strategy, what should be the PRIMARY driver?", options: ["Latest AI threat intelligence", "Available security budget", "Business objectives and the AI strategy", "Framework control catalogs"], answer: 2, explain: "Security strategy must support business goals. Threat intelligence and frameworks inform how, but not why or what to prioritize." },
            { q: "Employees widely use unapproved generative AI because approvals take months. What is the BEST response?", options: ["Create a risk-tiered intake with a fast track and approved tools", "Block all generative AI domains at the proxy", "Discipline employees who used unapproved tools", "Pause AI use until the policy is rewritten"], answer: 0, explain: "A fast, risk-based path removes the reason for shadow AI. Blocking alone pushes use onto personal devices." },
            { q: "Who should define the organization's risk appetite for AI?", options: ["The CISO", "The board and senior management", "The data science team", "Internal audit"], answer: 1, explain: "Risk appetite is a governance decision. The CISO advises and internal audit provides assurance, but neither sets appetite." },
            { q: "A high-value AI use case exceeds the defined risk tolerance. What should the security manager do?", options: ["Reject it outright", "Approve it because benefits outweigh risk", "Ask the regulator for guidance", "Present risk and treatment options so management can make an informed decision"], answer: 3, explain: "The security manager advises; management decides. Rejecting or approving alone oversteps the role." }
          ],
          glossary: [
            { term: "Risk appetite", def: "The amount and type of risk an organization is willing to pursue or accept to meet objectives." },
            { term: "Risk tolerance", def: "Measurable acceptable variation around objectives; exceeding it triggers escalation." },
            { term: "Use-case intake", def: "Standard process for proposing, tiering, reviewing, approving and registering new AI uses." },
            { term: "AI strategy", def: "Plan stating where AI creates value, investment priorities and acceptable AI risk." }
          ],
          sources: [
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" },
            { label: "NIST AI 100-1 (Govern function)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" }
          ]
        },
        {
          id: "d1b-policy-hierarchy",
          title: "AI Policy Hierarchy: Policies, Standards, Procedures, Guidelines",
          concept: [
            { h: "Four levels", body: "<ul><li><b>Policy</b> – high-level intent, mandatory, approved by senior management ('AI use must be risk-assessed')</li><li><b>Standard</b> – mandatory, specific requirements ('LLM apps must use the approved gateway')</li><li><b>Procedure</b> – mandatory step-by-step how-to</li><li><b>Guideline</b> – recommended, flexible advice</li></ul>" },
            { h: "What an AI policy covers", body: "<p>Scope and definition of AI, roles, approved uses, when risk and impact assessments are required, data use, human oversight, third-party AI, monitoring, incident reporting, exceptions and enforcement. ISO/IEC 42001 requires a documented <b>AI policy</b> (clause 5.2, Annex A.2).</p>" },
            { h: "Integrate, don't duplicate", body: "<p>Add AI provisions to existing infosec, privacy, data, procurement, SDLC and HR policies. Write a dedicated AI policy for what is unique to AI. Check that documents don't conflict.</p>" },
            { h: "Keep the policy stable", body: "<p>Technology changes fast; policies should not. Put model names, tools and versions in <b>standards</b> or approved lists that the policy references, so they can change without board re-approval.</p>" }
          ],
          why: "<p>Clear hierarchy lets you change fast-moving technical rules without re-approving the policy, and tells staff which rules are mandatory and which are advice.</p>",
          mnemonics: [
            { device: "Please Stop Procrastinating, Gently", type: "acronym", recall: "Policy document hierarchy, top to bottom", text: "<b>P</b>olicy (why/what, mandatory) → <b>S</b>tandard (exact requirements, mandatory) → <b>P</b>rocedure (how, mandatory) → <b>G</b>uideline (<i>gently</i> — optional advice)." },
            { device: "Constitution, law, recipe, tip", type: "visual", recall: "Analogy for policy, standard, procedure, guideline", text: "<b>Policy</b> = the constitution. <b>Standard</b> = a specific law. <b>Procedure</b> = a recipe you must follow step by step. <b>Guideline</b> = a friendly cooking tip." }
          ],
          diagram: { type: "pyramid", title: "AI document hierarchy", items: [ { label: "Policy", sub: "intent, mandatory" }, { label: "Standards", sub: "specific rules" }, { label: "Procedures", sub: "step-by-step" }, { label: "Guidelines", sub: "recommended" } ] },
          examTip: "<p>Watch for mandatory vs optional: only <b>guidelines</b> are discretionary. A specific technical requirement is a <b>standard</b>; 'how to request access' is a <b>procedure</b>. Lists of approved models belong in a <b>standard</b>, not the policy.</p>",
          keyPoints: [
            "Policy, standard, procedure = mandatory; guideline = optional",
            "Senior management approves the AI policy",
            "ISO 42001 requires a documented AI policy",
            "Put fast-changing tech details in standards",
            "Extend existing policies; add AI policy for AI-unique gaps"
          ],
          quiz: [
            { q: "'All production LLM applications must route prompts through the approved filtering gateway.' This statement is BEST classified as a:", options: ["Policy", "Standard", "Procedure", "Guideline"], answer: 1, explain: "It is a mandatory, specific technical requirement, which is a standard. A policy would state the high-level intent, e.g. 'AI systems must be protected against misuse'." },
            { q: "A developer needs to know how to request access to the enterprise LLM. Which document should provide this?", options: ["AI policy", "AI security standard", "Procedure", "Guideline"], answer: 2, explain: "Step-by-step instructions are a procedure. The standard defines what must be in place, not how to request it." },
            { q: "Where should the list of approved AI model families and versions BEST be maintained?", options: ["In the AI policy itself", "In the board charter", "In a guideline", "In a standard referenced by the policy"], answer: 3, explain: "Approved lists change often and are mandatory, so they belong in a standard. Placing them in the policy would require senior re-approval for every change." },
            { q: "An organization already has information security, privacy and data policies. What is the BEST way to address AI?", options: ["Extend existing policies and add an AI policy only for AI-unique gaps", "Write a standalone AI policy that supersedes existing ones", "Adopt the AI vendor's usage policy", "Wait until regulations mature"], answer: 0, explain: "Integration avoids conflicts and duplication while covering what is unique to AI. A superseding standalone policy creates contradictions." }
          ],
          glossary: [
            { term: "Policy", def: "High-level, mandatory statement of management intent and direction, approved by senior management." },
            { term: "Standard", def: "Mandatory, specific requirement that supports a policy (e.g. a technical configuration)." },
            { term: "Procedure", def: "Mandatory step-by-step instructions to carry out a task in line with policy and standards." },
            { term: "Guideline", def: "Recommended, non-mandatory advice offering good practice." }
          ],
          sources: [
            { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" },
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" }
          ]
        },
        {
          id: "d1b-acceptable-use-shadow-ai",
          title: "AI Acceptable Use and Shadow AI",
          concept: [
            { h: "AI acceptable use policy", body: "<p>Tells staff which AI they may use and how: <b>approved tools</b>, <b>prohibited inputs</b> (confidential or personal data, source code unless approved), <b>verify outputs</b> before use, disclose AI use where needed, respect IP, and <b>report</b> issues. Keep it short; require acknowledgment.</p>" },
            { h: "What shadow AI looks like", body: "<p>AI used without approval: free GenAI websites, browser extensions, AI features silently added to SaaS, personal API keys, unvetted open-source models. Risks: data leakage, IP loss, regulatory breaches and unchecked outputs.</p>" },
            { h: "Detect and respond", body: "<p><b>Discover</b> via CASB/SSE, proxy and DNS logs, DLP, SaaS management, expense and procurement data. <b>Respond</b> by offering approved alternatives and enterprise licences (with no training on your data), and educate before disciplining.</p>" },
            { h: "Guardrails", body: "<ul><li><b>Technical</b>: DLP on prompts, SSO-only enterprise tenants, browser controls</li><li><b>Contractual</b>: no-training and data-retention terms, notice before new AI features</li><li><b>Human</b>: training and clear reporting channels</li></ul>" }
          ],
          why: "<p>Shadow AI is the most common AI risk in most organizations today. A usable AUP plus sanctioned tools reduces it far more than blocking.</p>",
          mnemonics: [
            { device: "AI traffic light", type: "visual", recall: "Acceptable use tiers for AI tools and data", text: "<b>Green</b>: approved tool + public data → go. <b>Amber</b>: approved enterprise tool + internal data → go with review. <b>Red</b>: unapproved or public tool + confidential/personal data → stop." },
            { device: "Clean up the DIRT", type: "acronym", recall: "How to handle shadow AI", text: "<b>D</b>iscover (CASB, logs, expenses) → <b>I</b>nform (educate) → <b>R</b>eplace with approved alternatives → <b>T</b>rack (monitor and measure)." },
            { device: "Use, Don't paste, Double-check, Disclose, Report", type: "chunk", recall: "Core rules in an AI acceptable use policy", text: "<b>Use</b> approved tools · <b>Don't paste</b> secrets or personal data · <b>Double-check</b> outputs · <b>Disclose</b> AI use where required · <b>Report</b> problems." }
          ],
          diagram: { type: "matrix", title: "AI traffic light", rows: ["Green", "Amber", "Red"], cols: ["Tool", "Data allowed"], cells: [["Approved", "Public"], ["Approved enterprise", "Internal + review"], ["Unapproved / public", "None sensitive"]] },
          examTip: "<p>Data already pasted into a public AI is a potential <b>incident</b>: FIRST determine what was exposed. The MOST effective long-term fix for shadow AI is <b>sanctioned tools plus awareness</b>, not blanket blocking. Vendors silently adding AI features is a <b>third-party/contract</b> issue.</p>",
          keyPoints: [
            "AUP: approved tools, prohibited inputs, verify outputs, report",
            "Shadow AI includes AI features silently added to SaaS",
            "Discover via CASB/SSE, DLP, logs, expenses",
            "Provide approved alternatives; educate before discipline",
            "Contracts: no training on your data, notice of new AI features"
          ],
          quiz: [
            { q: "Security discovers employees have been pasting customer data into a free public chatbot. What should be done FIRST?", options: ["Terminate the employees involved", "Purchase an enterprise license for the chatbot", "Determine what data was exposed and treat it as a potential incident", "Rewrite the acceptable use policy"], answer: 2, explain: "Possible exposure of customer data must be assessed under the incident process first, since notification duties may apply. Licensing and policy changes are later corrective actions." },
            { q: "Which approach is MOST effective in reducing shadow AI over the long term?", options: ["Blocking all AI websites", "Providing sanctioned AI tools with guardrails plus awareness", "Annual audits of browser history", "A strict disciplinary policy"], answer: 1, explain: "Meeting the business need safely removes the motive for shadow AI. Blocking is easily bypassed and discipline harms reporting culture." },
            { q: "Which control BEST detects employee use of unsanctioned generative AI SaaS?", options: ["CASB/SSE discovery of cloud application usage", "Secure code review", "Model cards", "Annual policy attestation"], answer: 0, explain: "CASB/SSE tools inspect traffic and identify cloud apps in use. Attestation relies on self-reporting and does not detect anything." },
            { q: "A SaaS vendor silently enables a generative AI feature that processes your customer data. How is this BEST addressed going forward?", options: ["Additional user awareness training", "Immediately terminating the vendor contract", "Rolling back the vendor's model", "Contract clauses requiring notice and approval of AI features, plus vendor reassessment"], answer: 3, explain: "This is a third-party risk issue solved through contract terms and reassessment. Training users does not control vendor behaviour, and termination is disproportionate as a first step." }
          ],
          glossary: [
            { term: "Shadow AI", def: "Use of AI tools, models or features without organizational approval or oversight." },
            { term: "Acceptable use policy (AUP)", def: "Policy stating permitted and prohibited uses of AI and related data by staff." },
            { term: "CASB", def: "Cloud access security broker: tool that discovers and controls use of cloud services." },
            { term: "Data loss prevention (DLP)", def: "Controls that detect and block sensitive data leaving approved boundaries, incl. into AI prompts." }
          ],
          sources: [
            { label: "OWASP Top 10 for LLM Applications 2025 (LLM02 Sensitive Information Disclosure)", url: "https://genai.owasp.org/llm-top-10/" },
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" }
          ]
        },
        {
          id: "d1b-responsible-ai",
          title: "Responsible and Ethical AI Principles and Human Oversight",
          concept: [
            { h: "Common principles", body: "<p>Across OECD, NIST AI RMF, EU AI Act and ISO/IEC 42001 you see the same core: <b>fairness</b> (harmful bias managed), <b>accountability</b>, <b>transparency</b> and explainability, <b>privacy</b>, <b>safety</b>, <b>security</b> and robustness, and <b>human oversight</b>.</p>" },
            { h: "Principles → practice", body: "<p>Principles are not controls. Operationalize them through policy requirements, impact assessments, bias and robustness testing, explainability standards, human-review design, documentation, and metrics with named owners.</p>" },
            { h: "Human oversight models", body: "<ul><li><b>Human-in-the-loop</b> – a human approves each decision (high impact)</li><li><b>Human-on-the-loop</b> – human monitors and can intervene (medium risk, scale)</li><li><b>Human-out-of-the-loop</b> – fully automated (low risk only)</li></ul><p>Choose by risk (task 20). Watch for <b>automation bias</b>.</p>" },
            { h: "Ethics review and security's role", body: "<p>An ethics or responsible AI board reviews high-impact uses. Security protects the <b>integrity, confidentiality and availability</b> of AI systems and their safeguards so ethical controls cannot be bypassed or tampered with.</p>" }
          ],
          why: "<p>Regulators and customers judge AI on these principles. The exam expects you to turn principles into enforceable controls and to match human oversight to risk.</p>",
          mnemonics: [
            { device: "FAT PSSH", type: "acronym", recall: "Seven common responsible AI principles", text: "<b>F</b>airness, <b>A</b>ccountability, <b>T</b>ransparency · <b>P</b>rivacy, <b>S</b>afety, <b>S</b>ecurity, <b>H</b>uman oversight. Imagine an ethics officer whispering 'psst… FAT!'." },
            { device: "In, on, out — hands on the wheel", type: "visual", recall: "Human-in / on / out-of-the-loop", text: "<b>IN</b> = hands on the wheel (approve every move). <b>ON</b> = driving instructor with a brake pedal (watch, can override). <b>OUT</b> = autopilot — only on an empty road (low risk)." },
            { device: "Principles → Policy → Practice → Proof", type: "chunk", recall: "How to operationalize responsible AI", text: "Write the <b>principle</b>, make it <b>policy</b>, build it into <b>practice</b> (assessments, testing, oversight), and keep <b>proof</b> (metrics, evidence)." }
          ],
          diagram: { type: "matrix", title: "Human oversight models", rows: ["In the loop", "On the loop", "Out of loop"], cols: ["Human role", "Use when"], cells: [["Approves each output", "High impact"], ["Monitors, can override", "Medium risk, scale"], ["None in real time", "Low risk only"]] },
          examTip: "<p>Decisions with serious effects on individuals → <b>human-in-the-loop</b>. Reviewers rubber-stamping outputs = <b>automation bias</b>, so oversight is not effective. Adopted principles that change nothing → <b>operationalize into policy, assessments and metrics</b>.</p>",
          keyPoints: [
            "Core principles: fairness, accountability, transparency, privacy, safety, security, human oversight",
            "Principles need policies, assessments, testing and metrics",
            "Oversight level must match risk: in, on, out of the loop",
            "Automation bias makes human review ineffective",
            "Security protects safeguards from bypass or tampering"
          ],
          quiz: [
            { q: "An AI system recommends denying medical insurance claims. Which oversight model is MOST appropriate?", options: ["Human-in-the-loop review before any denial", "Fully automated with annual sampling", "Human-on-the-loop with a weekly dashboard", "Rely on customer complaints"], answer: 0, explain: "Denials have significant effects on individuals, so a human should review each one. On-the-loop monitoring is the runner-up but would let harmful denials through before intervention." },
            { q: "The board adopted responsible AI principles, but project practices have not changed. What is the BEST next step?", options: ["Publish the principles on the website", "Translate principles into policy requirements, assessments and metrics with owners", "Hire an AI ethicist", "Train data scientists on the principles"], answer: 1, explain: "Principles drive behaviour only when they become enforceable requirements with measurement. Training helps but does not create accountability." },
            { q: "Reviewers approve 99.8% of AI recommendations unchanged, even when later found wrong. This MOST likely indicates:", options: ["The model is highly accurate", "Training data poisoning", "Automation bias weakening human oversight", "Insufficient compute"], answer: 2, explain: "Approving known-wrong outputs shows over-reliance on the AI, so the oversight control is not working. High accuracy would not explain approving wrong results." },
            { q: "What is security's PRIMARY contribution to responsible AI?", options: ["Setting the organization's fairness definitions", "Deciding which use cases are ethical", "Writing the public responsible AI statement", "Protecting AI systems and controls so safeguards cannot be bypassed or tampered with"], answer: 3, explain: "Security ensures the CIA of AI systems and their safeguards. Fairness definitions and ethical decisions belong to business, legal and ethics roles." }
          ],
          glossary: [
            { term: "Human-in-the-loop (HITL)", def: "Oversight design where a human must review or approve each AI decision before it takes effect." },
            { term: "Human-on-the-loop", def: "Oversight design where humans monitor AI operation and can intervene or override." },
            { term: "Explainability", def: "Ability to describe how an AI system reached an output in terms people can understand." },
            { term: "Harmful bias", def: "Systematic AI errors or disparities that unfairly disadvantage people or groups." }
          ],
          sources: [
            { label: "OECD AI Principles", url: "https://oecd.ai/en/ai-principles" },
            { label: "NIST AI 100-1 (AI RMF 1.0)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" }
          ]
        },
        {
          id: "d1b-policy-lifecycle",
          title: "Policy Life Cycle, Exceptions and Enforcement",
          concept: [
            { h: "Life cycle", body: "<p><b>Draft</b> with stakeholders → <b>Review</b> (legal, privacy, security, business) → <b>Approve</b> (senior management) → <b>Communicate</b> and train → <b>Implement</b> and enforce → <b>Monitor</b> compliance → <b>Revise</b> on schedule and on triggers.</p>" },
            { h: "Review triggers", body: "<p>Scheduled (e.g. annual) <b>plus events</b>: new regulation, new AI capability (e.g. autonomous agents), major incident, audit finding, new business model, merger or acquisition. AI moves fast, so review standards more often than policies.</p>" },
            { h: "Exceptions done right", body: "<p>Formal request with <b>business justification</b>, <b>risk assessment</b>, <b>compensating controls</b>, <b>approval</b> by the risk owner at the right authority level, and an <b>expiry date</b>, tracked in a register. Never permanent; never self-approved.</p>" },
            { h: "Enforcement", body: "<p>Measure adherence through attestations, technical monitoring and audits. Escalate non-compliance and apply consequences consistently. Rising exception counts signal a policy that needs updating.</p>" }
          ],
          why: "<p>A policy that is never reviewed or that is riddled with untracked exceptions gives false comfort. Auditors check the life cycle, not just the document.</p>",
          mnemonics: [
            { device: "Write it, Ship it, Watch it", type: "chunk", recall: "Policy life cycle stages", text: "<b>Write it</b>: Draft, Review, Approve. <b>Ship it</b>: Communicate, Implement. <b>Watch it</b>: Monitor, Revise — then loop." },
            { device: "Just Remember: Can't Approve Eternally", type: "acronym", recall: "Required elements of a policy exception", text: "<b>J</b>ustification, <b>R</b>isk assessment, <b>C</b>ompensating controls, <b>A</b>pproval by the risk owner, <b>E</b>xpiry date." }
          ],
          diagram: { type: "cycle", title: "Policy life cycle", steps: [ { label: "Draft", sub: "with stakeholders" }, { label: "Review", sub: "legal, sec, privacy" }, { label: "Approve", sub: "senior management" }, { label: "Communicate", sub: "train, acknowledge" }, { label: "Implement", sub: "enforce" }, { label: "Monitor", sub: "compliance" }, { label: "Revise", sub: "schedule + triggers" } ] },
          examTip: "<p>The MOST important part of an exception is the <b>documented risk, compensating controls, risk-owner approval and expiry</b>. Major external change → <b>out-of-cycle review</b>. Expired-but-active exceptions point to weak <b>monitoring</b> of the exception process.</p>",
          keyPoints: [
            "Life cycle: draft, review, approve, communicate, implement, monitor, revise",
            "Review on schedule and on triggers (law, incident, new capability)",
            "Exceptions: justification, risk, compensating controls, owner approval, expiry",
            "Track exceptions in a register; never permanent",
            "Senior management approves the AI policy"
          ],
          quiz: [
            { q: "The business requests an exception to the rule requiring human review of AI outputs for a pilot. What is MOST important in approving it?", options: ["Approval by the requesting data scientist's manager", "A permanent waiver to avoid repeated requests", "Documented risk, compensating controls, risk-owner approval and an expiry date", "Verbal approval from the CISO"], answer: 2, explain: "Exceptions must be risk-assessed, compensated, approved by the accountable owner and time-bound. Verbal or permanent approvals defeat governance." },
            { q: "A major regulator releases new guidance on generative AI. What should happen to AI policies?", options: ["Trigger an out-of-cycle review of affected policies and standards", "Wait for the scheduled annual review", "Rewrite every security policy", "Ignore it unless it becomes law"], answer: 0, explain: "Significant external change is a review trigger. Waiting risks non-alignment; rewriting everything is disproportionate." },
            { q: "Who should approve the enterprise AI policy?", options: ["The CISO alone", "The head of data science", "External counsel", "Senior management (e.g. executive committee or board)"], answer: 3, explain: "Policy expresses management intent and needs senior management authority. The CISO may own drafting but should not approve alone." },
            { q: "The exceptions register shows 40% of AI policy exceptions have expired but remain in effect. This MOST indicates:", options: ["The policy is too lenient", "Weak monitoring of the exception life cycle", "A need to automate model deployment", "Insufficient awareness training"], answer: 1, explain: "Expired exceptions still active show nobody is tracking expiry and renewal. The policy content may be fine; the process control is failing." }
          ],
          glossary: [
            { term: "Policy exception", def: "Formally approved, time-limited deviation from a policy or standard, with documented risk." },
            { term: "Compensating control", def: "Alternative control that reduces risk when the required control cannot be applied." },
            { term: "Out-of-cycle review", def: "Policy review triggered by an event rather than the regular schedule." },
            { term: "Attestation", def: "Formal statement by a person that they understand and comply with a policy or control." }
          ],
          sources: [
            { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" },
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" }
          ]
        }
      ]
    },
    {
      id: "d1c",
      code: "1C",
      title: "AI Asset and Data Life Cycle Management",
      tasks: [13, 14],
      topics: [
        {
          id: "d1c-ai-inventory",
          title: "AI Inventory and AI Bill of Materials (AI-BOM)",
          concept: [
            { h: "You can't protect what you don't know", body: "<p>Inventory every AI system — <b>built, bought, embedded in SaaS, or called via API</b> — with owner, purpose, risk tier, data used, models, vendor, deployment status and dependencies. EU AI Act classification, ISO/IEC 42001 and the AI RMF Map function all depend on it.</p>" },
            { h: "What to inventory", body: "<p><b>Models</b> (incl. versions and foundation models), <b>datasets</b> (training, validation, test, RAG corpora), <b>prompts</b> and system prompts, <b>pipelines</b> and MLOps tools, <b>agents</b>, plugins and APIs, <b>infrastructure</b> (GPUs, vector databases), and <b>third-party</b> AI services.</p>" },
            { h: "AI-BOM", body: "<p>A machine-readable list of an AI system's components and provenance: model lineage, datasets, libraries, licences, hashes. Formats include <b>CycloneDX</b> (ML-BOM) and <b>SPDX 3.0</b> AI and Dataset profiles. It speeds up response when a model or library is found compromised.</p>" },
            { h: "Keep it alive", body: "<p>Feed the inventory from the <b>intake</b> process, <b>MLOps registries</b>, <b>procurement</b>, and <b>SaaS/cloud discovery</b>. Reconcile regularly. A stale inventory creates blind spots.</p>" }
          ],
          why: "<p>Every other AI control — risk tiering, testing, monitoring, incident response — starts from knowing which AI you have and who owns it.</p>",
          mnemonics: [
            { device: "My Dog Prefers Pizza And Ice-cream Treats", type: "acronym", recall: "What to include in an AI inventory", text: "<b>M</b>odels, <b>D</b>atasets, <b>P</b>rompts, <b>P</b>ipelines, <b>A</b>gents & APIs, <b>I</b>nfrastructure, <b>T</b>hird-party AI services." },
            { device: "AI-BOM = the ingredients label", type: "visual", recall: "What an AI-BOM is", text: "The model is the dish. The AI-BOM is the label on the package: <b>ingredients</b> (datasets, libraries), <b>origin</b> (provenance, lineage) and <b>allergens</b> (licences, known vulnerabilities)." },
            { device: "Four nets catch the IMPS", type: "acronym", recall: "Sources that keep the AI inventory current", text: "<b>I</b>ntake process, <b>M</b>LOps/model registry, <b>P</b>rocurement, <b>S</b>aaS and cloud discovery. Shadow-AI imps slip through any single net." }
          ],
          diagram: { type: "hub", title: "What the AI inventory covers", center: "AI system", steps: [ { label: "Models", sub: "versions, base model" }, { label: "Datasets", sub: "train, test, RAG" }, { label: "Prompts", sub: "system prompts" }, { label: "Pipelines", sub: "MLOps tooling" }, { label: "Agents & APIs", sub: "tools, plugins" }, { label: "Infrastructure", sub: "GPUs, vector DBs" }, { label: "Third parties", sub: "vendor AI, SaaS" } ] },
          examTip: "<p>The FIRST step to manage enterprise AI risk is usually the <b>inventory</b>. The registry alone misses <b>AI embedded in SaaS</b> and shadow AI. For prioritization, the MOST important inventory fields are <b>risk tier and accountable owner</b>.</p>",
          keyPoints: [
            "Inventory built, bought, embedded and API-based AI",
            "Include models, data, prompts, pipelines, agents, infrastructure, vendors",
            "AI-BOM: machine-readable components and provenance (CycloneDX, SPDX)",
            "Feed from intake, registries, procurement and SaaS discovery",
            "Risk tier and owner drive prioritization"
          ],
          quiz: [
            { q: "An organization wants to manage AI risk across the enterprise. What should it do FIRST?", options: ["Red-team every model", "Deploy an AI firewall", "Build an inventory of AI systems and owners", "Purchase AI cyber insurance"], answer: 2, explain: "Without an inventory you cannot tier, test or protect systems. Red teaming and firewalls come after you know what exists and what matters most." },
            { q: "A popular open-source model on a public hub is found to contain a backdoor. Which artifact MOST quickly identifies affected internal systems?", options: ["AI-BOM", "Acceptable use policy", "Risk appetite statement", "A model card"], answer: 0, explain: "A machine-readable AI-BOM can be searched across systems for that component. A model card describes one model and is not built for enterprise-wide lookup." },
            { q: "Which AI use is MOST likely to be missed by an inventory built only from the internal model registry?", options: ["Custom in-house models", "AI features embedded in SaaS products", "Fine-tuned internal models", "Retired internal models"], answer: 1, explain: "Vendor-embedded AI never passes through your MLOps registry. Procurement and SaaS discovery are needed to catch it." },
            { q: "Which inventory data element is MOST important for prioritizing AI security controls?", options: ["Model architecture type", "Training hardware used", "Parameter count", "Risk classification and accountable owner"], answer: 3, explain: "Risk tier tells you where to focus, and the owner tells you who must act. Technical attributes matter less for prioritization." }
          ],
          glossary: [
            { term: "AI inventory", def: "Maintained register of AI systems and assets with owners, purpose, risk tier, data and dependencies." },
            { term: "AI-BOM", def: "AI bill of materials: machine-readable list of an AI system's components, data and provenance." },
            { term: "Model registry", def: "MLOps repository that stores model versions, metadata and approval status." },
            { term: "Provenance", def: "Record of where an asset (model, data) came from and how it changed over time." }
          ],
          sources: [
            { label: "CycloneDX ML-BOM", url: "https://cyclonedx.org/capabilities/mlbom/" },
            { label: "SPDX specifications", url: "https://spdx.dev/" },
            { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" }
          ]
        },
        {
          id: "d1c-classification-tiering",
          title: "Classification and Risk Tiering of AI Systems",
          concept: [
            { h: "Two different labels", body: "<p><b>Data classification</b> (confidential, internal, public) labels the data going in and out. An AI system's <b>risk tier</b> (high, medium, low) reflects the impact of how the system is used. Public data can still feed a high-impact decision.</p>" },
            { h: "Tiering criteria", body: "<ul><li><b>People</b> impact: rights, safety, livelihoods</li><li><b>Autonomy</b>: how much human oversight</li><li><b>Data</b> sensitivity</li><li><b>Regulatory</b> class (e.g. EU AI Act high-risk)</li><li><b>Exposure</b>: scale, reach, external users</li><li><b>Severity</b> and reversibility of harm, business criticality</li></ul>" },
            { h: "Tier drives controls", body: "<p>Higher tier → deeper impact assessment, more testing (bias, robustness, red teaming), stronger human oversight, closer monitoring, senior approval and more frequent review. Low tier → lightweight self-assessment. This is <b>proportionality</b>.</p>" },
            { h: "Re-tier on change", body: "<p>A new purpose, new data, new user group, model change or new regulation means <b>reassess the tier</b>. Classification is not one-and-done (task 6).</p>" }
          ],
          why: "<p>Tiering lets you spend scarce review effort where harm would be greatest, and lets low-risk innovation move fast.</p>",
          mnemonics: [
            { device: "The PADRES set the house rules", type: "acronym", recall: "Criteria for AI system risk tiering", text: "<b>P</b>eople impact, <b>A</b>utonomy, <b>D</b>ata sensitivity, <b>R</b>egulatory class, <b>E</b>xposure (scale, reach), <b>S</b>everity & reversibility. The stricter the padres, the higher the tier." },
            { device: "Speed bump size", type: "visual", recall: "How risk tier relates to controls", text: "Low tier = a painted line on the road. Medium = a speed bump. High tier = a full checkpoint with guards (impact assessment, red team, human-in-the-loop)." },
            { device: "Label the ingredient AND the meal", type: "chunk", recall: "Data classification vs AI system risk tier", text: "Data classification labels the <b>ingredient</b>. Risk tier labels the <b>meal</b> and who eats it. Harmless ingredients can still make a dangerous meal." }
          ],
          diagram: { type: "matrix", title: "Tier drives controls", rows: ["High", "Medium", "Low"], cols: ["Example", "Controls"], cells: [["Credit decisions", "Full IA, HITL, red team"], ["Internal copilot", "Review, monitoring"], ["Spam filter", "Self-assessment"]] },
          examTip: "<p>A change of <b>purpose or impact</b> means re-tiering even if the data did not change. The PRIMARY purpose of tiering is <b>proportionate controls</b>. Autonomous decisions about people's rights raise the tier most.</p>",
          keyPoints: [
            "Data classification ≠ AI system risk tier",
            "Tier criteria: people impact, autonomy, data, regulation, exposure, severity",
            "Higher tier → more assessment, testing, oversight, monitoring",
            "Re-tier when purpose, data, users, model or law changes"
          ],
          quiz: [
            { q: "An internal HR chatbot answers benefits questions from public policy documents. It will now also approve or deny leave requests. What is the BEST action?", options: ["Reassess the risk tier because purpose and impact changed", "Keep the tier, since the data is still public", "Raise the classification of the policy documents", "Retrain the model on more HR data"], answer: 0, explain: "Making decisions about employees changes the impact, and employment uses can be high-risk. The data classification is unchanged but irrelevant to the new impact." },
            { q: "What is the PRIMARY purpose of risk tiering AI systems?", options: ["Satisfy auditors' documentation requests", "Reduce the number of models", "Apply oversight and controls proportionate to risk", "Set software licence costs"], answer: 2, explain: "Tiering focuses effort where harm would be greatest. Audit evidence is a by-product, not the purpose." },
            { q: "Which factor MOST increases an AI system's risk tier?", options: ["It is hosted in a public cloud", "It makes autonomous decisions affecting individuals' legal rights", "It uses open-source libraries", "It has a large number of parameters"], answer: 1, explain: "Impact on people plus autonomy drives tier. Hosting and libraries affect specific security controls but not the inherent impact." },
            { q: "A dataset is classified 'public', yet the AI system using it is tiered 'high'. What BEST explains this?", options: ["The data was misclassified", "Public data is always high risk", "The tier must be lowered to match the data", "The tier reflects the impact of the system's use, not just data sensitivity"], answer: 3, explain: "Risk tier considers how outputs affect people, autonomy and regulation. Data classification is only one input." }
          ],
          glossary: [
            { term: "Risk tiering", def: "Assigning AI systems to risk levels to determine proportionate controls and oversight." },
            { term: "Data classification", def: "Labeling data by sensitivity (e.g. public, internal, confidential) to set handling rules." },
            { term: "Proportionality", def: "Principle that control strength should match the level of risk." },
            { term: "Intended purpose", def: "The use for which an AI system is designed, including context and conditions of use." }
          ],
          sources: [
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
            { label: "NIST AI 100-1 (AI RMF 1.0)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" }
          ]
        },
        {
          id: "d1c-data-lifecycle",
          title: "Data Life Cycle for AI",
          concept: [
            { h: "Stages", body: "<p><b>Acquire</b> (sourcing, rights, consent) → <b>Prepare</b> (clean, label, augment) → <b>Store</b> (secure, versioned) → <b>Use</b> (train, validate, test, RAG, inference) → <b>Share</b> (vendors, partners) → <b>Retain</b> and archive → <b>Dispose</b> (incl. derived artifacts).</p>" },
            { h: "AI-specific data risks", body: "<p>Data <b>poisoning</b> or tampering · unlicensed or copyrighted data · personal data without a lawful basis · biased or unrepresentative samples · label errors · sensitive data leaking through outputs or memorization · test data leaking into training (contamination).</p>" },
            { h: "Controls", body: "<p>Provenance and <b>lineage</b> tracking · quality and bias checks · access control and encryption · dataset <b>versioning and hashing</b> · minimization and PETs (anonymization, differential privacy, synthetic data) · retention schedules · contract limits on vendor training use. ISO/IEC 42001 Annex A.7 covers data for AI systems.</p>" },
            { h: "Deleted ≠ forgotten", body: "<p>Deleting a record does not remove its influence on an already-trained model. Plan for retraining, or machine unlearning where feasible, and document the decision.</p>" }
          ],
          why: "<p>AI is only as trustworthy as its data. Data problems become model problems that are expensive to find and fix later (task 14).</p>",
          mnemonics: [
            { device: "A Pretty Salad Uses Seven Ripe Dates", type: "acronym", recall: "Data life cycle stages for AI", text: "<b>A</b>cquire → <b>P</b>repare → <b>S</b>tore → <b>U</b>se → <b>S</b>hare → <b>R</b>etain → <b>D</b>ispose." },
            { device: "Poison the soil, poison every crop", type: "visual", recall: "Why data provenance and integrity matter", text: "Data is the soil; models are the crops. Poisoned or contaminated soil spoils every crop grown in it, so check where the soil came from (provenance) and lock the gate (integrity, hashing)." },
            { device: "Deleted ≠ forgotten", type: "chunk", recall: "Data disposal problem in AI", text: "Deleting the record leaves its 'memory' in trained weights. Disposal may mean <b>retrain</b> or <b>unlearn</b> — decide and document." }
          ],
          diagram: { type: "flow", title: "AI data life cycle", steps: [ { label: "Acquire", sub: "source, rights" }, { label: "Prepare", sub: "clean, label" }, { label: "Store", sub: "secure, version" }, { label: "Use", sub: "train, test, RAG" }, { label: "Share", sub: "vendors, partners" }, { label: "Retain", sub: "schedule" }, { label: "Dispose", sub: "incl. derived" } ] },
          examTip: "<p>Before using data for AI, FIRST confirm <b>rights, lawful basis and purpose compatibility</b>. Integrity of training data → <b>versioning, hashing and lineage</b>. Vendors wanting your data for training → <b>contract restrictions with audit rights</b>.</p>",
          keyPoints: [
            "Stages: acquire, prepare, store, use, share, retain, dispose",
            "Confirm data rights and lawful basis before training",
            "Lineage, versioning and hashing detect tampering",
            "PETs and minimization reduce privacy risk",
            "Erasure may require retraining or unlearning"
          ],
          quiz: [
            { q: "A team wants to train a model on customer support transcripts. What should be verified FIRST?", options: ["The transcripts have been labeled", "The dataset is encrypted at rest", "Legal rights, lawful basis and purpose compatibility for AI training", "Duplicates have been removed"], answer: 2, explain: "If the organization has no right to use the data for training, every later step is wasted and creates legal exposure. Encryption and labeling are needed but come after." },
            { q: "Which control BEST helps detect unauthorized modification of training datasets?", options: ["Dataset versioning with cryptographic hashes and lineage", "Collecting a larger dataset", "Differential privacy", "Model cards"], answer: 0, explain: "Hashes and lineage show if data changed and where. Differential privacy protects individuals' privacy, not data integrity." },
            { q: "A customer exercises their right to erasure, and their data was in a training set. What is MOST appropriate?", options: ["Delete the raw record; the model is unaffected", "Delete the raw records and assess whether retraining or unlearning is needed, documenting the decision", "Take no action because the model is already trained", "Delete the entire model immediately"], answer: 1, explain: "The record's influence may persist in the model, so assess retraining or unlearning. Deleting the whole model is disproportionate without that assessment." },
            { q: "A model vendor wants to use your submitted data to improve its foundation model. What is the BEST control?", options: ["Encrypt data in transit to the vendor", "Update the acceptable use policy", "Keep a rollback model ready", "Contract terms restricting training use, with audit rights"], answer: 3, explain: "Only a contractual restriction governs what the vendor does with your data. Encryption in transit does not limit use after receipt." }
          ],
          glossary: [
            { term: "Data lineage", def: "Record of data's origins, transformations and movements across systems." },
            { term: "Data poisoning", def: "Manipulating training or fine-tuning data to corrupt model behaviour or insert backdoors." },
            { term: "Machine unlearning", def: "Techniques to remove the influence of specific training data from a trained model." },
            { term: "Data minimization", def: "Collecting and using only the data necessary for the stated purpose." }
          ],
          sources: [
            { label: "NIST AI 100-2 E2025 Adversarial ML taxonomy", url: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final" },
            { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" }
          ]
        },
        {
          id: "d1c-documentation-ownership",
          title: "Model Cards, Datasheets, Documentation and Ownership",
          concept: [
            { h: "Model cards", body: "<p>Short structured documents describing a model: <b>intended use</b> and out-of-scope uses, training <b>data</b> summary, <b>performance</b> metrics (incl. across groups), <b>limitations</b>, <b>ethical</b> considerations and <b>version</b>. Proposed by Mitchell et al. (2019).</p>" },
            { h: "Datasheets for datasets", body: "<p>Document a dataset's motivation, composition, collection process, preprocessing and labeling, intended uses, distribution and maintenance (Gebru et al.). They support provenance, bias review and legal checks.</p>" },
            { h: "Regulatory documentation", body: "<p>EU AI Act high-risk providers need <b>technical documentation</b> (Art. 11, Annex IV), automatic <b>logs</b> (Art. 12) and <b>instructions for use</b> (Art. 13). GPAI providers document for downstream providers. ISO/IEC 42001 requires documented information and life-cycle records.</p>" },
            { h: "Ownership roles", body: "<ul><li><b>Business/system owner</b> – accountable for the system and its risk</li><li><b>Model owner</b> – technical performance and releases</li><li><b>Data owner</b> – data rights and classification</li><li><b>Data custodian</b> – day-to-day handling, backups, access</li></ul><p>Every inventory entry needs a named owner.</p>" }
          ],
          why: "<p>Documentation is how reviewers, auditors, regulators and downstream users understand an AI system. Clear owners mean someone is responsible when something goes wrong.</p>",
          mnemonics: [
            { device: "Nutrition label vs farm-of-origin label", type: "visual", recall: "Model card vs datasheet for datasets", text: "A <b>model card</b> is the nutrition label on the finished product (what it's for, how it performs, warnings). A <b>datasheet</b> is the farm-of-origin label on the raw ingredients (where data came from, how collected)." },
            { device: "I Don't Push Limits Every Version", type: "acronym", recall: "Contents of a model card", text: "<b>I</b>ntended use, <b>D</b>ata summary, <b>P</b>erformance (incl. by group), <b>L</b>imitations, <b>E</b>thical considerations, <b>V</b>ersion." },
            { device: "WHY – HOW – WHAT – WHERE", type: "chunk", recall: "Four AI ownership roles", text: "<b>Business owner</b> owns the WHY (purpose and risk). <b>Model owner</b> owns the HOW (performance). <b>Data owner</b> owns the WHAT (data rights, classification). <b>Custodian</b> owns the WHERE (storage and handling)." }
          ],
          diagram: { type: "matrix", title: "Who owns what", rows: ["Business owner", "Model owner", "Data owner", "Data custodian"], cols: ["Owns", "Example duty"], cells: [["System risk", "Accept residual risk"], ["Model performance", "Approve releases"], ["Data rights", "Classify data"], ["Daily handling", "Backups, access"]] },
          examTip: "<p>Disparities in performance across groups belong in the <b>model card</b>. The <b>data owner</b>, not IT or the custodian, decides data classification. EU AI Act <b>technical documentation</b> must exist before a high-risk system is placed on the market.</p>",
          keyPoints: [
            "Model card: intended use, data, performance, limitations, ethics, version",
            "Datasheet: dataset motivation, composition, collection, uses, maintenance",
            "EU AI Act high-risk: technical documentation, logs, instructions for use",
            "Data owner classifies; custodian handles",
            "Every AI asset needs a named owner"
          ],
          quiz: [
            { q: "A model card PRIMARILY helps to:", options: ["Encrypt the model weights", "Communicate intended use, performance and limitations", "Detect prompt injection in real time", "Calculate licence fees"], answer: 1, explain: "Model cards are transparency documents for users and reviewers. They are not technical security controls." },
            { q: "A model performs well overall but poorly for one demographic group. Where should this BEST be documented for reviewers?", options: ["Acceptable use policy", "Firewall change log", "The model card's disaggregated performance and limitations", "Incident register"], answer: 2, explain: "Model cards report performance across groups and known limitations. The incident register is for events, not known characteristics." },
            { q: "Who should decide the classification of a training dataset?", options: ["The data custodian in IT", "The data owner", "The model developer", "The CISO"], answer: 1, explain: "The data owner is accountable for the data and sets its classification. The custodian implements handling controls based on it." },
            { q: "Under the EU AI Act, what must a high-risk AI provider prepare BEFORE placing the system on the market?", options: ["A public GitHub model card", "An ISO/IEC 27001 certificate", "A marketing data sheet", "Technical documentation demonstrating compliance"], answer: 3, explain: "Art. 11 requires technical documentation drawn up before market placement and kept up to date. A model card may help but is not the legal requirement." }
          ],
          glossary: [
            { term: "Model card", def: "Structured summary of a model's intended use, performance, limitations and ethical considerations." },
            { term: "Datasheet for datasets", def: "Structured documentation of a dataset's motivation, composition, collection, uses and maintenance." },
            { term: "Technical documentation (EU AI Act)", def: "Annex IV documentation a high-risk AI provider must prepare to show compliance." },
            { term: "Data owner", def: "Person accountable for a dataset, including its classification and permitted uses." },
            { term: "Data custodian", def: "Person or team responsible for storing and handling data according to the owner's rules." }
          ],
          sources: [
            { label: "Mitchell et al., Model Cards for Model Reporting", url: "https://arxiv.org/abs/1810.03993" },
            { label: "Gebru et al., Datasheets for Datasets", url: "https://arxiv.org/abs/1803.09010" },
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" }
          ]
        }
      ]
    },
    {
      id: "d1d",
      code: "1D",
      title: "AI Security Program Development and Management",
      tasks: [1, 18, 19, 21],
      topics: [
        {
          id: "d1d-program-building",
          title: "Building the AI Security Program: Charter, Roadmap, Maturity",
          concept: [
            { h: "Start with a mandate", body: "<p><b>Executive sponsorship</b> plus an approved <b>program charter</b> (scope, authority, objectives, funding). Align to business strategy and plug into the existing ISMS and enterprise risk management (ERM) instead of building a silo.</p>" },
            { h: "Gap → roadmap", body: "<p><b>Assess</b> the current state (e.g. against the NIST AI RMF or ISO/IEC 42001). Define the <b>target</b> state from risk appetite and obligations. Prioritize gaps by <b>risk to business objectives</b> into a phased <b>roadmap</b>, with quick wins (inventory, AUP) first.</p>" },
            { h: "Maturity levels", body: "<p>A typical model: <b>1 Initial</b> (ad hoc) → <b>2 Managed</b> (repeatable) → <b>3 Defined</b> (documented, standard) → <b>4 Quantitatively managed</b> (measured) → <b>5 Optimizing</b> (continuous improvement). The right target depends on risk and business need — not always 5.</p>" },
            { h: "Resourcing", body: "<p>Skills (ML security, data science, privacy, legal), tools (inventory, testing, monitoring) and budget. Frame the business case as <b>risk reduction and safe enablement</b>, not fear.</p>" }
          ],
          why: "<p>Many organizations have scattered AI security efforts. A chartered, risk-prioritized program turns them into something the board can fund, measure and trust.</p>",
          mnemonics: [
            { device: "SCATR → program", type: "acronym", recall: "Steps to build an AI security program", text: "Turn SCATteRed efforts into a program: <b>S</b>ponsor → <b>C</b>harter → <b>A</b>ssess current state → <b>T</b>arget state → <b>R</b>oadmap. Then measure and improve, and loop." },
            { device: "I Must Do Quality Optimization", type: "acronym", recall: "Maturity levels 1–5", text: "<b>I</b>nitial → <b>M</b>anaged → <b>D</b>efined → <b>Q</b>uantitatively managed → <b>O</b>ptimizing." },
            { device: "Right shoe size, not biggest shoe", type: "chunk", recall: "How to choose target maturity", text: "Target maturity should <b>fit</b> the risk and business need. Level 5 everywhere is like buying size-15 shoes for everyone: expensive and you trip." }
          ],
          diagram: { type: "flow", title: "Program build", loop: true, steps: [ { label: "Sponsor", sub: "executive mandate" }, { label: "Charter", sub: "scope, authority" }, { label: "Assess", sub: "current state" }, { label: "Target", sub: "desired state" }, { label: "Roadmap", sub: "risk-prioritized" }, { label: "Improve", sub: "measure, iterate" } ] },
          examTip: "<p>FIRST step for a new program = <b>executive sponsorship and charter</b>. Prioritize gaps by <b>risk to business objectives</b>, not by ease or cost alone. Target maturity is set by <b>risk appetite, obligations and business needs</b>.</p>",
          keyPoints: [
            "Sponsor and charter first; integrate with ISMS/ERM",
            "Gap assessment against a framework → risk-prioritized roadmap",
            "Maturity: initial, managed, defined, quantitatively managed, optimizing",
            "Target maturity fits risk and need; not always level 5",
            "Business case = risk reduction + safe enablement"
          ],
          quiz: [
            { q: "An organization has scattered AI security efforts across teams. What should be done FIRST to build a program?", options: ["Secure executive sponsorship and an approved program charter", "Buy an AI security platform", "Hire an ML red team", "Write detailed technical standards"], answer: 0, explain: "Sponsorship and a charter give the program authority and funding. Tools and standards without a mandate stay scattered." },
            { q: "A gap assessment found 30 AI security gaps. How should the roadmap BEST be prioritized?", options: ["Easiest gaps first", "By risk to business objectives, including quick wins", "In framework clause order", "By cost only"], answer: 1, explain: "Risk-based prioritization addresses the most important exposures first. Quick wins are included but not as the primary rule." },
            { q: "Target maturity for AI security is BEST determined by:", options: ["Always aiming for level 5", "Peer benchmarks only", "Risk appetite, obligations and business needs", "Vendor recommendations"], answer: 2, explain: "Maturity is an investment decision tied to risk and requirements. Benchmarks help but do not reflect your own risk." },
            { q: "Why should the AI security program be integrated into the existing ISMS and ERM?", options: ["It avoids the need for board reporting", "It removes the need for AI-specific policies", "NIST requires a single ISMS", "It reduces duplication and makes AI risk visible in enterprise risk decisions"], answer: 3, explain: "Integration reuses processes and puts AI risk next to other enterprise risks. AI-specific policies and board reporting are still needed." }
          ],
          glossary: [
            { term: "Program charter", def: "Approved document granting a program its scope, authority, objectives and resources." },
            { term: "Gap assessment", def: "Comparison of current practices against a framework or target to identify what is missing." },
            { term: "Maturity model", def: "Staged scale (e.g. initial to optimizing) describing how established and measured processes are." },
            { term: "Roadmap", def: "Time-phased, prioritized plan of initiatives to move from current to target state." }
          ],
          sources: [
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" },
            { label: "NIST AI RMF overview", url: "https://www.nist.gov/itl/ai-risk-management-framework" }
          ]
        },
        {
          id: "d1d-roles-raci-three-lines",
          title: "Roles, RACI and the Three Lines Model for AI",
          concept: [
            { h: "RACI", body: "<ul><li><b>Responsible</b> – does the work</li><li><b>Accountable</b> – owns the outcome; exactly one per activity</li><li><b>Consulted</b> – two-way input before decisions</li><li><b>Informed</b> – kept updated</li></ul><p>One 'A' per row avoids gaps and finger-pointing.</p>" },
            { h: "Three Lines Model (IIA, 2020)", body: "<ul><li><b>Governing body</b> – oversight, accountability to stakeholders</li><li><b>1st line</b> – management and operations that own and manage risk (business, AI teams)</li><li><b>2nd line</b> – expertise, support, monitoring and challenge (risk, compliance, security, privacy)</li><li><b>3rd line</b> – independent assurance (internal audit)</li></ul><p>External assurance providers sit outside.</p>" },
            { h: "Where AI security sits", body: "<p>Often <b>2nd line</b> (sets AI security standards, challenges risk assessments) while security operations act as 1st line. Internal audit must stay <b>independent</b>: it should not design or operate the controls it later audits.</p>" },
            { h: "Example RACI rows", body: "<p><b>Approve a high-risk AI use</b>: A = business executive, R = system owner, C = security, privacy, legal, I = internal audit. <b>AI security testing</b>: A = CISO, R = AI red team, C = data science, I = system owner.</p>" }
          ],
          why: "<p>Unclear roles are a top cause of AI governance failures: everybody assumes someone else checked the model. RACI and the three lines make ownership explicit.</p>",
          mnemonics: [
            { device: "The restaurant RACI", type: "story", recall: "Meaning of R, A, C, I", text: "The <b>cook</b> is Responsible for the dish. The <b>head chef</b> is Accountable — only one per kitchen. The <b>sommelier</b> is Consulted on pairing. The <b>diners</b> are Informed when it's ready." },
            { device: "DO – CHECK – PROVE", type: "chunk", recall: "The three lines", text: "<b>1st line DOES</b> (owns and manages risk). <b>2nd line CHECKS</b> (expertise, oversight, challenge). <b>3rd line PROVES</b> independently (internal audit)." },
            { device: "One captain per ship", type: "visual", recall: "Rule for Accountable in a RACI", text: "Each RACI row is a ship: many sailors (R), advisers (C) and passengers (I), but exactly <b>one captain (A)</b>. Two captains = the ship goes in circles." }
          ],
          diagram: { type: "layers", title: "Three Lines Model", items: [ { label: "Governing body", sub: "oversight" }, { label: "1st line", sub: "own & manage risk" }, { label: "2nd line", sub: "expertise, challenge" }, { label: "3rd line", sub: "independent audit" } ] },
          examTip: "<p>Internal audit designing controls it will audit = <b>independence impairment</b>. Business AI teams = <b>1st line</b>; the security/risk function that sets standards and challenges = <b>2nd line</b>. Two 'A's in a RACI row = confusion and delay.</p>",
          keyPoints: [
            "RACI: one Accountable per activity",
            "1st line owns risk; 2nd line challenges; 3rd line assures",
            "AI security function often sits in the 2nd line",
            "Internal audit must not design or run controls it audits",
            "Governing body oversees; external assurance is outside the lines"
          ],
          quiz: [
            { q: "Internal audit is asked to design the AI governance controls and later audit them. What is the MAIN concern?", options: ["Audit lacks AI expertise", "Higher program cost", "Impaired independence and objectivity", "Slower deployment"], answer: 2, explain: "Auditing your own design impairs independence. Expertise gaps can be filled; independence cannot be restored after the fact." },
            { q: "In the Three Lines Model, business teams that build and operate AI models are:", options: ["First line", "Second line", "Third line", "The governing body"], answer: 0, explain: "Those who own and manage the risk day to day are first line. Second line provides expertise and challenge." },
            { q: "A RACI for AI incident decisions shows two roles as Accountable. What is the MOST likely result?", options: ["Faster decisions", "Confusion over who decides, delaying response", "Stronger oversight", "Improved regulatory compliance"], answer: 1, explain: "Shared accountability blurs decision ownership, which slows response. Oversight is not improved by duplication." },
            { q: "The AI security function sets AI security standards and challenges the business's AI risk assessments. This is:", options: ["First line", "Third line", "External assurance", "Second line"], answer: 3, explain: "Setting frameworks and challenging the first line is a second-line role. Third line provides independent assurance." }
          ],
          glossary: [
            { term: "RACI", def: "Responsibility matrix: Responsible, Accountable, Consulted, Informed." },
            { term: "Three Lines Model", def: "IIA (2020) model of governing body, first-line risk owners, second-line oversight and third-line internal audit." },
            { term: "Second line", def: "Roles providing risk expertise, monitoring and challenge (e.g. risk, compliance, security)." },
            { term: "Independence (audit)", def: "Freedom from conditions that threaten unbiased audit work, e.g. auditing one's own work." }
          ],
          sources: [ { label: "IIA Three Lines Model (2020)", url: "https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/" } ]
        },
        {
          id: "d1d-metrics-reporting",
          title: "AI Security Metrics, KPIs, KRIs and Board Reporting",
          concept: [
            { h: "Three metric types", body: "<ul><li><b>KPI</b> – are we performing? (% AI systems with a completed impact assessment)</li><li><b>KRI</b> – is risk rising? (shadow AI apps found, drift alerts, jailbreak attempts)</li><li><b>KCI</b> – do controls work? (% simulated prompt injections blocked)</li></ul>" },
            { h: "Good metrics", body: "<p><b>SMART</b>: specific, measurable, achievable, relevant, time-bound. Each metric has an <b>owner</b>, a data source and a <b>threshold</b> tied to risk appetite that triggers action. A metric nobody acts on is noise.</p>" },
            { h: "Board reporting", body: "<p>The board wants AI risk posture in <b>business terms</b>: trend versus appetite, top AI risks, material incidents, regulatory readiness, program progress, and the <b>decision or support needed</b>. Few metrics, trends, a clear ask — not raw technical counts.</p>" },
            { h: "Example AI metrics", body: "<p>Inventory coverage · % high-risk systems with tested human oversight · time to detect and respond to AI incidents · drift exceptions open · % AI vendors assessed · training completion and behaviour · open audit findings.</p>" }
          ],
          why: "<p>What gets measured gets managed (task 18). Metrics also let you show the board whether AI risk is within appetite and where investment is needed.</p>",
          mnemonics: [
            { device: "The AI dashboard", type: "visual", recall: "KPI vs KRI vs KCI", text: "In the car: <b>KPI</b> = speedometer (how well we're going). <b>KRI</b> = warning light (risk rising). <b>KCI</b> = brake test (does the control work)." },
            { device: "SMART metrics", type: "acronym", recall: "Qualities of a good metric", text: "<b>S</b>pecific, <b>M</b>easurable, <b>A</b>chievable, <b>R</b>elevant, <b>T</b>ime-bound — plus an owner and a threshold." },
            { device: "Tell The Real Answer", type: "acronym", recall: "What a board AI risk report should contain", text: "<b>T</b>rend vs appetite, <b>T</b>op risks, <b>R</b>eadiness (regulatory, program), <b>A</b>sk (decision or support needed)." }
          ],
          diagram: { type: "matrix", title: "Metric types", rows: ["KPI", "KRI", "KCI"], cols: ["Answers", "AI example"], cells: [["Are we performing?", "% systems inventoried"], ["Is risk rising?", "Shadow AI detections"], ["Do controls work?", "% injections blocked"]] },
          examTip: "<p>A <b>KRI</b> is forward-looking and compared with a threshold. The BEST board report shows <b>posture vs appetite, trends, top risks and decisions needed</b>. A metric without owner or threshold <b>won't drive action</b>.</p>",
          keyPoints: [
            "KPI = performance; KRI = rising risk; KCI = control effectiveness",
            "Metrics need owner, source and threshold tied to appetite",
            "Board: business terms, trends, top risks, clear ask",
            "Avoid raw technical counts for executives"
          ],
          quiz: [
            { q: "Which is the BEST key risk indicator for enterprise generative AI use?", options: ["Trend of sensitive-data DLP hits in AI prompts against a threshold", "Number of AI training sessions delivered", "Number of models in production", "AI security budget spent"], answer: 0, explain: "A KRI signals rising exposure and is compared with a threshold. Training sessions delivered is an activity KPI and does not show risk." },
            { q: "What is MOST useful in a board report on AI security?", options: ["AI risk posture vs appetite, trends, top risks and decisions needed", "Daily count of blocked prompts", "Full list of model vulnerabilities", "Model architecture diagrams"], answer: 0, explain: "Boards need business-level posture and the decisions they must make. Raw counts and technical details belong in operational reports." },
            { q: "An AI security metric has no owner and no threshold. What is its PRIMARY weakness?", options: ["It cannot be automated", "It will not trigger decisions or action", "It is too costly to collect", "It is not visible to auditors"], answer: 1, explain: "Without owner and threshold, nobody is obliged to act when the value changes. Automation and cost are secondary." },
            { q: "'Percentage of simulated prompt-injection attacks blocked by the LLM gateway' is BEST classified as a:", options: ["KPI for AI adoption", "KRI", "KCI (control effectiveness)", "Lagging financial metric"], answer: 2, explain: "It measures whether a control works, which is a key control indicator. A KRI would track exposure, e.g. rising attack attempts." }
          ],
          glossary: [
            { term: "KPI", def: "Key performance indicator: measures how well a process or program meets its objectives." },
            { term: "KRI", def: "Key risk indicator: early-warning measure that a risk is increasing, compared with a threshold." },
            { term: "KCI", def: "Key control indicator: measures whether a control is operating effectively." },
            { term: "SMART", def: "Specific, measurable, achievable, relevant, time-bound — criteria for good metrics." }
          ],
          sources: [
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" },
            { label: "NIST AI 100-1 (Measure function)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" }
          ]
        },
        {
          id: "d1d-awareness-training",
          title: "AI Security Awareness, Training and AI Literacy",
          concept: [
            { h: "Why it matters", body: "<p>People are the first control: they choose tools, enter data and trust outputs. The EU AI Act (Art. 4) requires providers and deployers to ensure a <b>sufficient level of AI literacy</b> among staff dealing with AI, applying since February 2025.</p>" },
            { h: "Role-based content", body: "<ul><li><b>All staff</b> – AUP, data handling, verifying outputs, AI phishing and deepfakes, reporting</li><li><b>Developers / data scientists</b> – secure AI development, OWASP LLM Top 10, poisoning</li><li><b>Executives / board</b> – AI risk, accountability, regulation</li><li><b>Human reviewers</b> – automation bias, override duties</li></ul>" },
            { h: "Make it stick", body: "<p>Short, frequent micro-learning · real examples · simulations (deepfake voice or video fraud, AI phishing) · just-in-time banners inside AI tools · AUP acknowledgment.</p>" },
            { h: "Measure behaviour", body: "<p>Completion rate is a KPI, but <b>behaviour</b> matters more: trend of sensitive data in prompts, simulation results, number of staff-reported AI issues, quiz scores.</p>" }
          ],
          why: "<p>Most AI data leaks and many AI-enabled frauds start with a well-meaning employee. Training turns staff into sensors and reduces shadow AI (task 21).</p>",
          mnemonics: [
            { device: "Everyone must READ", type: "acronym", recall: "Audiences for role-based AI training", text: "<b>R</b>eviewers (automation bias), <b>E</b>xecutives (risk, accountability), <b>A</b>ll staff (AUP, data), <b>D</b>evelopers (secure AI dev)." },
            { device: "The deepfake CFO call", type: "story", recall: "Training response to deepfake impersonation", text: "A 'CFO' appears on video asking finance for an urgent transfer. The face and voice look right. Trained staff hang up and <b>call back on a known number</b> before moving money." },
            { device: "Behaviour beats completion", type: "chunk", recall: "How to measure awareness effectiveness", text: "100% completion with rising data leaks = failed program. Watch what people <b>do</b>, not what they clicked." }
          ],
          diagram: { type: "hub", title: "Role-based AI training", center: "AI literacy", steps: [ { label: "All staff", sub: "AUP, data, verify" }, { label: "Developers", sub: "secure AI dev" }, { label: "Executives", sub: "risk, accountability" }, { label: "Reviewers", sub: "automation bias" } ] },
          examTip: "<p>Effectiveness = <b>behaviour change</b> (fewer risky prompts, more reports), not completion. Human reviewers need training on <b>automation bias and override</b>. Deepfake requests → <b>verify via an independent channel</b>.</p>",
          keyPoints: [
            "EU AI Act Art. 4: AI literacy duty for providers and deployers",
            "Training is role-based: all staff, developers, executives, reviewers",
            "Use micro-learning, simulations and in-tool prompts",
            "Measure behaviour, not just completion"
          ],
          quiz: [
            { q: "Which is the MOST effective indicator that an AI awareness program is working?", options: ["100% course completion", "Number of modules published", "Fewer sensitive-data prompt events and more staff-reported AI issues", "Positive feedback scores"], answer: 2, explain: "Behavioural outcomes show changed practice. Completion only shows attendance." },
            { q: "Staff who review AI-generated credit recommendations should be trained PRIMARILY on:", options: ["Python programming", "Automation bias and when and how to override", "EU AI Act penalty amounts", "Model architecture"], answer: 1, explain: "Effective human oversight depends on reviewers resisting over-reliance and knowing their override authority. Technical depth is unnecessary for this role." },
            { q: "Under the EU AI Act, the AI literacy obligation applies to:", options: ["Providers and deployers of AI systems", "Only GPAI model providers", "Only providers of high-risk systems", "Only public-sector bodies"], answer: 0, explain: "Art. 4 applies to providers and deployers of AI systems generally, not only high-risk ones." },
            { q: "A finance employee receives a video call from the 'CFO' requesting an urgent payment. What should training emphasize?", options: ["Comply if the face and voice match", "Ask the caller security questions on the same call", "Record the call for later review", "Verify through an independent, known channel before acting"], answer: 3, explain: "Deepfakes can defeat visual and voice checks, so out-of-band verification is needed. Questions on the same call can be answered by an attacker with research." }
          ],
          glossary: [
            { term: "Automation bias", def: "Tendency to over-trust automated outputs and under-use one's own judgment or contrary evidence." },
            { term: "Deepfake", def: "AI-generated or manipulated audio, image or video that convincingly imitates a real person." },
            { term: "Role-based training", def: "Training tailored to the risks and duties of a specific job role." },
            { term: "Micro-learning", def: "Short, focused learning units delivered frequently to improve retention." }
          ],
          sources: [
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
            { label: "OWASP Top 10 for LLM Applications", url: "https://genai.owasp.org/llm-top-10/" }
          ]
        },
        {
          id: "d1d-audit-assurance",
          title: "AI Audit and Assurance",
          concept: [
            { h: "Assurance layers", body: "<p><b>Self-assessment</b> (1st line) → <b>2nd-line</b> compliance reviews → <b>internal audit</b> (independent) → <b>external assurance</b>: ISO/IEC 42001 certification audits, EU AI Act conformity assessment, independent bias audits (e.g. NYC Local Law 144), vendor SOC 2 reports.</p>" },
            { h: "What an AI audit covers", body: "<p>Governance (charter, policy, roles) · inventory completeness · risk and impact assessments · data governance · model development and <b>change control</b> · testing (bias, robustness, security) · human oversight · monitoring · incident handling · third-party AI.</p>" },
            { h: "Evidence", body: "<p>Documented and reproducible: policies and approvals, risk and impact assessments, test results, model cards and datasheets, training records, oversight logs, model and dataset versions. 'If it isn't documented, it didn't happen.'</p>" },
            { h: "Certification vs conformity", body: "<p><b>ISO/IEC 42001 certification</b> covers the organization's management system, by an accredited certification body. <b>EU AI Act conformity assessment</b> covers a specific high-risk system before market placement (internal control or a <b>notified body</b>), leading to an EU declaration of conformity and <b>CE marking</b>.</p>" }
          ],
          why: "<p>Boards, regulators and customers rely on assurance, not promises. Designing for auditability from the start makes audits cheaper and findings fewer.</p>",
          mnemonics: [
            { device: "Kitchen vs dish", type: "visual", recall: "ISO 42001 certification vs EU AI Act conformity assessment", text: "<b>ISO/IEC 42001</b> certifies the <b>kitchen</b> (how the organization runs AI). <b>EU AI Act conformity</b> inspects the <b>dish</b> (one high-risk system) before it is served, then stamps it with CE." },
            { device: "Evidence PATROL", type: "acronym", recall: "Types of AI audit evidence", text: "<b>P</b>olicies & approvals, <b>A</b>ssessments (risk, impact), <b>T</b>est results, <b>R</b>ecords (model cards, datasheets, training), <b>O</b>versight evidence, <b>L</b>ogs & versions." },
            { device: "Me, Mentor, Inspector, Judge", type: "story", recall: "Layers of AI assurance", text: "<b>Me</b> checks my own work (self-assessment). A <b>mentor</b> challenges it (2nd line). An <b>inspector</b> from audit tests it independently (3rd line). A <b>judge</b> from outside certifies it (external assurance)." }
          ],
          diagram: { type: "layers", title: "Assurance layers", items: [ { label: "Self-assessment", sub: "1st line" }, { label: "2nd-line review", sub: "compliance, risk" }, { label: "Internal audit", sub: "independent, 3rd line" }, { label: "External", sub: "cert, conformity" } ] },
          examTip: "<p>MOST independent internal assurance to the board = <b>internal audit</b>. Production model differing from approved version = <b>change/version control</b> weakness. BEST evidence of oversight = <b>logs of actual reviewer decisions and overrides</b>, not a policy saying oversight is required.</p>",
          keyPoints: [
            "Assurance: self, 2nd line, internal audit, external",
            "Audit scope spans governance, data, models, oversight, incidents, vendors",
            "Evidence must be documented and reproducible",
            "ISO 42001 = org management system; AI Act conformity = specific product",
            "Operating evidence (logs) beats design evidence (policy)"
          ],
          quiz: [
            { q: "An auditor finds the model running in production differs from the version that was approved. What is the MOST significant control weakness?", options: ["Awareness training", "Model change and version control", "Encryption of model weights", "Budget approval"], answer: 1, explain: "Unapproved models reaching production show change management failed. Encryption protects confidentiality but would not prevent this." },
            { q: "Which provides the MOST independent internal assurance to the board on AI governance?", options: ["CISO self-assessment", "Data science peer review", "An internal audit engagement", "The vendor's marketing claims"], answer: 2, explain: "Internal audit is the independent third line. Self-assessment and peer review lack independence." },
            { q: "What must a provider of a high-risk AI system complete under the EU AI Act before placing it on the market?", options: ["The applicable conformity assessment, then CE marking", "ISO/IEC 42001 certification", "A SOC 2 Type II report", "Self-attestation to the NIST AI RMF"], answer: 0, explain: "Conformity assessment and CE marking are legal prerequisites. ISO 42001 can support compliance but is voluntary and not a substitute." },
            { q: "When preparing for an AI audit, what is the BEST evidence that human oversight operates effectively?", options: ["A policy that requires oversight", "The team org chart", "Training slide decks", "Logs of reviewer decisions, overrides and QA sampling results"], answer: 3, explain: "Operating evidence shows the control works in practice. A policy shows only that it was designed." }
          ],
          glossary: [
            { term: "Conformity assessment", def: "EU AI Act process verifying that a high-risk AI system meets requirements before market placement." },
            { term: "Notified body", def: "Independent organization designated by an EU member state to perform third-party conformity assessments." },
            { term: "CE marking", def: "Marking showing a product conforms with applicable EU legislation, incl. the AI Act for high-risk systems." },
            { term: "Audit evidence", def: "Information used by auditors to reach conclusions, e.g. records, logs, test results." }
          ],
          sources: [
            { label: "ISO/IEC 42001:2023", url: "https://www.iso.org/standard/81230.html" },
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" }
          ]
        }
      ]
    },
    {
      id: "d1e",
      code: "1E",
      title: "Business Continuity and Incident Response",
      tasks: [15, 16, 17],
      topics: [
        {
          id: "d1e-ai-incidents",
          title: "What Makes AI Incidents Different",
          concept: [
            { h: "Definition", body: "<p>An <b>AI incident</b> is an event where an AI system's development, use or malfunction causes or could cause harm — to security, safety, rights, finances or reputation. It includes <b>non-malicious failures</b> (drift, bias, confabulation), not just attacks.</p>" },
            { h: "AI-specific incident types", body: "<ul><li><b>Attacks</b>: prompt injection and jailbreaks, data or model poisoning, model theft or extraction, malicious model files in the supply chain</li><li><b>Accidents</b>: sensitive data leaking in outputs, harmful or biased outputs, model drift causing wrong decisions, agents misusing tools (excessive agency)</li></ul>" },
            { h: "Why they are harder", body: "<ul><li><b>Probabilistic</b> outputs are hard to reproduce</li><li><b>Baseline</b> of 'normal' is fuzzy</li><li><b>Evidence</b> lives in prompts, context, model and data versions</li><li><b>Many teams</b>: data science, legal, ethics, vendors</li><li>Fixes may need <b>retraining</b>, not a patch</li></ul>" },
            { h: "Severity criteria", body: "<p>Extend the IR severity matrix with AI factors: <b>impact on people's rights or safety</b>, <b>regulatory reportability</b> (e.g. EU AI Act serious incident, GDPR breach), scale of affected outputs or decisions, and whether the system must be withdrawn.</p>" }
          ],
          why: "<p>If the IR team only looks for attackers, a biased or drifting model can harm thousands of people before anyone opens a ticket. AI incidents need AI-aware detection, triage and playbooks.</p>",
          mnemonics: [
            { device: "The two As: Attackers and Accidents", type: "visual", recall: "Two sources of AI incidents and examples", text: "Picture two doors into the incident room. <b>Attackers</b> door: injection, poisoning, extraction, malicious models. <b>Accidents</b> door: drift, bias, confabulation, data leakage, runaway agents. Both doors lead to the same IR process." },
            { device: "Please Bring Extra Mops, Really", type: "acronym", recall: "Why AI incidents are harder to handle", text: "AI incidents are messy: <b>P</b>robabilistic outputs, <b>B</b>aseline unclear, <b>E</b>vidence in prompts/models/data, <b>M</b>any teams, <b>R</b>etraining may be the fix." }
          ],
          diagram: { type: "matrix", title: "AI incident sources", rows: ["Attacks", "Accidents"], cols: ["Examples", "Typical signal"], cells: [["Injection, poisoning, extraction", "Anomalous inputs/usage"], ["Drift, bias, confabulation", "Output quality, complaints"]] },
          examTip: "<p>A harmful outcome without an attacker is <b>still an incident</b> — route it through IR. The MOST important severity additions are <b>impact on people and regulatory reportability</b>. An agent tricked by web content into exfiltrating data = <b>indirect prompt injection + excessive agency</b>.</p>",
          keyPoints: [
            "AI incidents include non-malicious failures (drift, bias, confabulation)",
            "Attack types: injection, poisoning, extraction, supply chain",
            "Hard because outputs are probabilistic and evidence is in prompts/models",
            "Severity must include people impact and reportability"
          ],
          quiz: [
            { q: "After a data pipeline change, a loan model's approval rate drops sharply for one region. No attacker is involved. How should this be treated?", options: ["As an AI incident handled through the incident response process", "Not an incident, since there was no attacker", "As a routine IT change ticket only", "As a customer-service matter"], answer: 0, explain: "Harm to people from an AI malfunction is an AI incident regardless of cause, and may have regulatory implications. A change ticket would not trigger impact assessment or notification decisions." },
            { q: "What MOST complicates root-cause analysis of an LLM incident compared with a traditional application?", options: ["Use of cloud hosting", "Non-deterministic outputs that depend on prompts, context and model version", "Encryption of traffic", "A larger user base"], answer: 1, explain: "The same input may not reproduce the same output, and evidence depends on capturing prompts, context and versions. Cloud hosting and encryption affect traditional apps too." },
            { q: "When updating the incident severity matrix for AI, which addition is MOST important?", options: ["Model parameter count", "GPU utilization", "Impact on people's rights or safety and regulatory reportability", "Name of the model vendor"], answer: 2, explain: "Severity should reflect harm and legal obligations. Technical attributes do not indicate impact." },
            { q: "An AI agent with email access sends confidential files externally after summarizing a malicious web page. Which BEST describes the incident?", options: ["Model drift", "Training data poisoning", "Model extraction", "Indirect prompt injection exploiting excessive agency"], answer: 3, explain: "Instructions hidden in external content hijacked the agent, and over-broad permissions let it act. Poisoning would involve corrupted training data, not runtime content." }
          ],
          glossary: [
            { term: "AI incident", def: "Event where an AI system's development, use or malfunction causes or could cause harm." },
            { term: "Model drift", def: "Degradation of model performance as real-world data or relationships change over time." },
            { term: "Excessive agency", def: "OWASP LLM risk where an AI agent has more functionality, permissions or autonomy than needed." },
            { term: "Non-determinism", def: "Property where the same input can yield different outputs, complicating reproduction." }
          ],
          sources: [
            { label: "OECD AI Incidents Monitor", url: "https://oecd.ai/en/incidents" },
            { label: "OWASP Top 10 for LLM Applications 2025", url: "https://genai.owasp.org/llm-top-10/" },
            { label: "MITRE ATLAS", url: "https://atlas.mitre.org/" }
          ]
        },
        {
          id: "d1e-ir-lifecycle",
          title: "AI Incident Response Life Cycle",
          concept: [
            { h: "Phases", body: "<p><b>Prepare</b> → <b>Detect</b> and analyze → <b>Contain</b> → <b>Eradicate</b> → <b>Recover</b> → <b>Lessons</b> learned. Based on NIST SP 800-61 (Rev. 3 aligns incident response with CSF 2.0). AI adds model-specific playbooks, roles and evidence.</p>" },
            { h: "Prepare", body: "<p>AI playbooks (prompt injection, data leakage, poisoning, harmful output, vendor model compromise) · kill switches and feature flags · logging of prompts, outputs and model versions · vendor contacts · legal and comms roles · tabletop exercises.</p>" },
            { h: "Contain", body: "<ul><li><b>Fallback</b> or feature flag off</li><li><b>Limit</b> agent tool permissions</li><li><b>Input</b> blocking at the gateway</li><li><b>Pull</b> the vulnerable model version, revoke API keys</li></ul><p>Preserve evidence first where possible.</p>" },
            { h: "Eradicate, recover, learn", body: "<p>Remove poisoned data, fix prompts and guardrails, retrain or roll back to a known-good model, rotate secrets. <b>Validate</b> (regression and adversarial tests) before restoring, then monitor closely. Lessons learned update risk assessments, controls and playbooks.</p>" }
          ],
          why: "<p>Task 16 asks you to run containment, notification, escalation, eradication and recovery for AI. Playbooks prepared in advance turn a confusing AI failure into a rehearsed response.</p>",
          mnemonics: [
            { device: "Please Don't Cook Eggs Rare, Lads", type: "acronym", recall: "AI incident response phases in order", text: "<b>P</b>repare → <b>D</b>etect → <b>C</b>ontain → <b>E</b>radicate → <b>R</b>ecover → <b>L</b>essons learned." },
            { device: "FLIP the switch", type: "acronym", recall: "AI containment options", text: "<b>F</b>allback / feature flag off · <b>L</b>imit agent permissions · <b>I</b>nput blocking at the gateway · <b>P</b>ull the vulnerable version (and revoke keys)." },
            { device: "Validate before you reopen the restaurant", type: "chunk", recall: "What must happen before recovery to production", text: "After a food-poisoning scare, the health inspector checks the kitchen before reopening. After eradication, <b>re-test the model</b> (regression + adversarial) before restoring service." }
          ],
          diagram: { type: "cycle", title: "AI IR life cycle", center: "AI playbooks", steps: [ { label: "Prepare", sub: "playbooks, logging" }, { label: "Detect", sub: "triage, analyze" }, { label: "Contain", sub: "FLIP the switch" }, { label: "Eradicate", sub: "clean data, fix" }, { label: "Recover", sub: "validate, restore" }, { label: "Lessons", sub: "update controls" } ] },
          examTip: "<p>Active harm (e.g. data leaking) → FIRST <b>contain</b> (disable or fall back) while <b>preserving evidence</b>. Before restoring a fixed model → <b>validate with testing</b>. Lessons learned aim to <b>improve controls</b>, not assign blame.</p>",
          keyPoints: [
            "Phases: prepare, detect, contain, eradicate, recover, lessons learned",
            "Prepare AI playbooks, kill switches and prompt/model logging",
            "Contain: fallback, limit permissions, block inputs, pull version",
            "Validate before restoring; monitor closely after",
            "Lessons learned feed risk assessments and playbooks"
          ],
          quiz: [
            { q: "A customer chatbot starts showing other customers' order details. What should be done FIRST?", options: ["Disable the chatbot or switch to fallback while preserving logs", "Retrain the model on cleaned data", "Notify all customers immediately", "Complete a full root-cause analysis"], answer: 0, explain: "Containment stops ongoing harm, and preserving logs keeps evidence for scoping and notification. Notification follows once the scope is assessed." },
            { q: "Which preparation MOST improves the ability to investigate LLM incidents?", options: ["Larger GPU capacity", "Publishing model cards", "Logging prompts, outputs, retrieved context and model versions", "Updating the AUP"], answer: 2, explain: "Without these logs, investigators cannot reconstruct what happened. Model cards describe intended behaviour, not what occurred." },
            { q: "After removing poisoned data and retraining, what should happen BEFORE the model returns to production?", options: ["Close the incident ticket", "Validate the model with regression and adversarial testing", "Purge the investigation logs", "Announce the fix publicly"], answer: 1, explain: "Validation confirms the fix worked and did not introduce new issues. Closing the ticket before validation risks repeat harm." },
            { q: "What is the PRIMARY purpose of a lessons-learned review after an AI incident?", options: ["Identify who to discipline", "Satisfy the insurer's paperwork", "Close open audit findings", "Improve controls, risk assessments and playbooks"], answer: 3, explain: "Post-incident activity exists to prevent recurrence and improve response. A blame focus discourages reporting." }
          ],
          glossary: [
            { term: "Playbook", def: "Pre-defined steps, roles and decisions for responding to a specific incident type." },
            { term: "Kill switch", def: "Pre-built mechanism to quickly disable an AI feature or system or route to a fallback." },
            { term: "Containment", def: "IR actions that limit the spread and impact of an incident." },
            { term: "Tabletop exercise", def: "Discussion-based rehearsal of an incident scenario to test plans and roles." }
          ],
          sources: [
            { label: "NIST SP 800-61 Rev. 3", url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final" },
            { label: "MITRE ATLAS", url: "https://atlas.mitre.org/" }
          ]
        },
        {
          id: "d1e-investigation",
          title: "Investigating and Documenting AI Incidents",
          concept: [
            { h: "Follow the PROMPT", body: "<p>Evidence sources: <b>P</b>rompts and system prompts · <b>R</b>etrieved (RAG) context · <b>O</b>utputs · <b>M</b>odel and dataset versions and hashes · <b>P</b>ipeline, API and gateway logs · <b>T</b>ool calls by agents. Plus configs, guardrail settings, vendor logs and user reports.</p>" },
            { h: "Forensic principles", body: "<p><b>Preserve</b> before changing: snapshot model, data and configs. Keep <b>chain of custody</b> and time-synced logs. <b>Reproduce</b> in an isolated environment with the same model version, parameters (e.g. temperature, seed) and context — knowing outputs may still vary.</p>" },
            { h: "Root-cause angles", body: "<ul><li><b>Input</b> – malicious prompt or file?</li><li><b>Data</b> – poisoned or drifted?</li><li><b>Model</b> – vulnerable version?</li><li><b>Integration</b> – excessive permissions?</li><li><b>Process</b> – missing review?</li><li><b>Third party</b> – vendor change?</li></ul>" },
            { h: "Document and report", body: "<p>Record timeline, scope, affected people and data, root cause, actions, decisions and approvals. Report to management and legal, and to regulators or customers as <b>regulatory and contractual</b> obligations require (task 15). Prompt logs may hold personal data: restrict access and apply retention rules.</p>" }
          ],
          why: "<p>Good investigation answers the questions regulators, customers and the board will ask: what happened, who was affected, why, and what stops it happening again.</p>",
          mnemonics: [
            { device: "Follow the PROMPT", type: "acronym", recall: "Evidence sources for AI incident investigation", text: "<b>P</b>rompts, <b>R</b>etrieved context, <b>O</b>utputs, <b>M</b>odel & data versions, <b>P</b>ipeline/gateway logs, <b>T</b>ool calls." },
            { device: "Freeze the crime scene", type: "story", recall: "Preserve evidence before changing an AI system", text: "A detective photographs the room before anyone moves the furniture. Snapshot the model, prompts, configs and logs <b>before</b> the engineer 'quickly fixes' the system prompt." },
            { device: "I Don't Make It Perfect Today", type: "acronym", recall: "Root-cause angles for AI incidents", text: "<b>I</b>nput, <b>D</b>ata, <b>M</b>odel, <b>I</b>ntegration, <b>P</b>rocess, <b>T</b>hird party." }
          ],
          diagram: { type: "flow", title: "AI investigation flow", steps: [ { label: "Preserve", sub: "snapshot, custody" }, { label: "Collect", sub: "PROMPT evidence" }, { label: "Reproduce", sub: "isolated, same version" }, { label: "Root cause", sub: "input to third party" }, { label: "Document", sub: "timeline, impact" }, { label: "Report", sub: "mgmt, legal, regulator" } ] },
          examTip: "<p>Before any fix during an investigation, ensure <b>evidence is preserved</b>. Unable to reproduce? Replay with the <b>exact model version, parameters and context</b>. Who must be told externally is set by <b>regulatory and contractual obligations</b>.</p>",
          keyPoints: [
            "Evidence: prompts, retrieved context, outputs, versions, logs, tool calls",
            "Preserve and keep chain of custody before changes",
            "Reproduce with same model version, parameters, context",
            "Root cause: input, data, model, integration, process, third party",
            "Protect personal data inside prompt logs"
          ],
          quiz: [
            { q: "During an investigation, an engineer wants to hot-fix the system prompt immediately. What should the security manager ensure BEFORE the change?", options: ["The vendor is notified", "Users are informed", "Current configuration, prompts and logs are preserved", "The model is retrained"], answer: 2, explain: "Changing the system first destroys evidence of what happened. Notifications may follow, but preservation comes before modification." },
            { q: "Investigators cannot reproduce a harmful LLM output. What is the MOST likely reason and BEST approach?", options: ["The attacker deleted all logs; rebuild the system", "Non-deterministic outputs; replay with the exact model version, parameters and context", "Encryption prevents replay; decrypt traffic", "It proves no incident occurred; close the case"], answer: 1, explain: "LLM outputs vary with version, parameters and context, so these must be matched. Failure to reproduce does not prove nothing happened." },
            { q: "Prompt logs collected for an investigation contain customer personal data. What is MOST appropriate?", options: ["Delete them to reduce privacy risk", "Share them with all responders for speed", "Publish redacted samples", "Restrict access and apply retention rules while preserving them as evidence"], answer: 3, explain: "Evidence must be kept, but privacy obligations still apply. Deleting destroys evidence; wide sharing breaches need-to-know." },
            { q: "Which factor determines WHO must externally receive an AI incident report?", options: ["Regulatory and contractual obligations", "The lead engineer's preference", "Media interest", "The model vendor's policy"], answer: 0, explain: "Laws and contracts define mandatory recipients and deadlines. Media interest may shape communications but not obligations." }
          ],
          glossary: [
            { term: "Chain of custody", def: "Documented record of who collected, handled and stored evidence, and when." },
            { term: "Root cause analysis", def: "Structured method to identify the underlying cause of an incident so it can be prevented." },
            { term: "RAG", def: "Retrieval-augmented generation: the model answers using content retrieved from a knowledge source at query time." },
            { term: "Reproducibility", def: "Ability to recreate a result using the same inputs, versions and settings." }
          ],
          sources: [
            { label: "NIST SP 800-86 Guide to Integrating Forensic Techniques", url: "https://csrc.nist.gov/pubs/sp/800/86/final" },
            { label: "NIST SP 800-61 Rev. 3", url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final" }
          ]
        },
        {
          id: "d1e-notification",
          title: "Incident Notification and Reporting Obligations",
          concept: [
            { h: "EU AI Act serious incidents", body: "<p>Providers of high-risk AI report <b>serious incidents</b> to the market surveillance authority (Art. 73): no later than <b>15 days</b> after becoming aware; <b>10 days</b> if a person died; <b>2 days</b> for a widespread infringement or serious disruption of critical infrastructure. Deployers must inform the provider. Systemic-risk GPAI providers report to the AI Office.</p>" },
            { h: "GDPR personal data breach", body: "<p>Controller notifies the supervisory authority <b>without undue delay and, where feasible, within 72 hours</b> (Art. 33), unless the breach is unlikely to result in risk. Tell affected individuals without undue delay if risk is high (Art. 34). Processors notify the controller without undue delay. An AI leaking personal data is a breach.</p>" },
            { h: "Other obligations", body: "<p>Sector and cyber rules (e.g. <b>NIS2</b>: early warning within 24 hours for significant incidents; DORA for EU financial entities), US state breach laws, SEC disclosure for listed companies, and <b>contracts</b> (customer and vendor notification clauses).</p>" },
            { h: "Manage it with a matrix", body: "<p>A <b>notification matrix</b>: trigger, recipient, deadline, owner, template. <b>Legal/compliance</b> decides reportability; security supplies facts fast. Clocks often start at <b>awareness</b>, so escalate early and test the matrix in exercises.</p>" }
          ],
          why: "<p>Missing a notification deadline can cost more than the incident itself. Task 15 requires reporting per regulatory and contractual requirements; you must know the clocks.</p>",
          mnemonics: [
            { device: "2 – 10 – 15: shortest clock for widest harm", type: "chunk", recall: "EU AI Act serious incident reporting deadlines", text: "<b>2 days</b>: lights out (critical infrastructure) or widespread infringement. <b>10 days</b>: a death. <b>15 days</b>: any other serious incident." },
            { device: "72 hours = 3 days = 3 letters: DPA", type: "visual", recall: "GDPR breach notification deadline and recipient", text: "Picture a 3-day calendar with 'DPA' (data protection authority) stamped on day 3. Controller tells the DPA within <b>72 hours</b> where feasible; tell people if <b>high</b> risk." },
            { device: "TRaDe On Time", type: "acronym", recall: "Columns of a notification matrix", text: "<b>T</b>rigger, <b>R</b>ecipient, <b>D</b>eadline, <b>O</b>wner, <b>T</b>emplate." }
          ],
          diagram: { type: "matrix", title: "Notification clocks", rows: ["EU AI Act", "GDPR", "NIS2", "Contracts"], cols: ["Who reports", "Deadline"], cells: [["Provider (high-risk)", "2 / 10 / 15 days"], ["Controller", "72h to DPA"], ["Essential/important", "24h early warning"], ["Per agreement", "Per SLA"]] },
          examTip: "<p>GDPR = <b>72 hours</b> to the supervisory authority. EU AI Act death = <b>10 days</b>. <b>Legal/compliance</b> makes the reportability call. The BEST control for meeting deadlines is a <b>tested notification matrix</b>, not relying on memory or notifying everyone.</p>",
          keyPoints: [
            "EU AI Act serious incidents: 15 days; death 10; critical infra/widespread 2",
            "GDPR: supervisory authority within 72 hours where feasible",
            "NIS2: 24-hour early warning for significant incidents",
            "Contracts can add their own notification duties",
            "Legal decides reportability; keep a tested notification matrix"
          ],
          quiz: [
            { q: "An AI assistant leaks personal data of EU customers. As controller, within what time should the supervisory authority be notified where feasible?", options: ["24 hours", "72 hours", "15 days", "30 days"], answer: 1, explain: "GDPR Art. 33 requires notification without undue delay and, where feasible, within 72 hours. 15 days is the general EU AI Act serious incident limit." },
            { q: "A provider's high-risk AI system is linked to a person's death. What is the MAXIMUM time to report under the EU AI Act?", options: ["72 hours", "2 days", "10 days", "15 days"], answer: 2, explain: "Art. 73 sets 10 days for incidents involving death. 2 days applies to widespread infringements or critical infrastructure disruption." },
            { q: "Who should make the final determination on whether an AI incident is legally reportable?", options: ["Legal/compliance, using facts supplied by the incident team", "The data scientist who owns the model", "The model vendor", "The communications team"], answer: 0, explain: "Reportability is a legal judgment based on facts from responders. Communications handles messaging once the decision is made." },
            { q: "Which control BEST ensures notification deadlines are met across multiple regimes?", options: ["Rely on legal counsel's experience", "Notify every regulator for every incident", "Wait until root cause is confirmed", "A tested notification matrix of triggers, recipients, deadlines and owners"], answer: 3, explain: "A documented, exercised matrix makes duties and clocks explicit. Waiting for root cause can miss deadlines that start at awareness." }
          ],
          glossary: [
            { term: "Serious incident (EU AI Act)", def: "AI incident leading to death or serious harm to health, serious and irreversible critical infrastructure disruption, fundamental-rights infringement, or serious property or environmental harm." },
            { term: "Personal data breach", def: "Security breach leading to accidental or unlawful destruction, loss, alteration, disclosure of or access to personal data (GDPR)." },
            { term: "Supervisory authority", def: "Independent national data protection authority (DPA) under the GDPR." },
            { term: "Market surveillance authority", def: "National authority that monitors products, including AI systems, on the EU market." },
            { term: "Notification matrix", def: "Table of reporting triggers, recipients, deadlines, owners and templates." }
          ],
          sources: [
            { label: "Regulation (EU) 2024/1689 (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
            { label: "GDPR – Regulation (EU) 2016/679", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
            { label: "NIS2 – Directive (EU) 2022/2555", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" }
          ]
        },
        {
          id: "d1e-bcdr",
          title: "Business Continuity and Disaster Recovery for AI",
          concept: [
            { h: "BIA for AI", body: "<p>A <b>business impact analysis</b> identifies AI-dependent processes and the impact of an AI outage <b>or of wrong outputs</b>. Set <b>MTD</b> (maximum tolerable downtime), <b>RTO</b> (how fast to restore) and <b>RPO</b> (how much data or state you can lose) for models, data, feature stores, vector databases and pipelines.</p>" },
            { h: "Recovery assets", body: "<p>Versioned models in a registry (known-good <b>rollback</b>) · backups of training data, RAG indexes, prompts and configs · reproducible pipelines (infrastructure as code) · documented dependencies · secrets escrow.</p>" },
            { h: "Fallbacks", body: "<p><b>Graceful degradation</b>: roll back to a validated version, switch to a simpler model or rules, use an alternate provider, or run a <b>manual process</b> with trained staff. Define who decides and how to switch (kill switch, feature flag).</p>" },
            { h: "Third-party and capacity risk", body: "<p>Model API outages, model version deprecation, vendor exit, GPU shortages, region failures. Mitigate with SLAs, multi-provider design, exit plans and failover tests. Exercise BC/DR plans with AI scenarios (e.g. poisoned model → rollback).</p>" }
          ],
          why: "<p>As AI becomes embedded in core processes, an AI outage or a corrupted model becomes a business outage. Task 17 asks you to build AI risk into BC/DR planning.</p>",
          mnemonics: [
            { device: "RTO = Return, RPO = Point", type: "chunk", recall: "RTO vs RPO vs MTD", text: "<b>RTO</b> = Recovery <b>Time</b>: how fast you must Return. <b>RPO</b> = Recovery <b>Point</b>: how far back in data you can go (max data loss). <b>MTD</b> = the outer limit before the business is seriously harmed; RTO must fit inside it." },
            { device: "Really Smart Managers Adapt", type: "acronym", recall: "AI fallback options", text: "<b>R</b>oll back to known-good · <b>S</b>impler model or rules · <b>M</b>anual process · <b>A</b>lternate provider." },
            { device: "Pack the AI go-bag", type: "visual", recall: "Assets needed to recover an AI system", text: "The go-bag holds: <b>model versions</b>, <b>data backups</b>, <b>RAG index</b>, <b>prompts & configs</b>, <b>IaC pipelines</b>, <b>secrets</b>. Missing one item = you can't rebuild." }
          ],
          diagram: { type: "flow", title: "AI fallback ladder", steps: [ { label: "Primary model", sub: "normal operation" }, { label: "Roll back", sub: "known-good version" }, { label: "Simpler model", sub: "rules or small model" }, { label: "Alt provider", sub: "second vendor" }, { label: "Manual process", sub: "trained staff" } ] },
          examTip: "<p>For third-party model dependence, the MOST important BC element is a <b>tested fallback with switch criteria</b>. Poisoned model → <b>roll back to the last validated version</b> (that pre-dates the poisoning). RPO drives <b>backup frequency</b>; RTO drives <b>restore speed</b>. BIA FIRST identifies <b>critical AI-dependent processes</b>.</p>",
          keyPoints: [
            "BIA covers AI outages and wrong outputs",
            "Set MTD, RTO and RPO for models, data and indexes",
            "Keep versioned models, data backups and reproducible pipelines",
            "Fallbacks: rollback, simpler model, alternate provider, manual",
            "Test BC/DR with AI scenarios and vendor outages"
          ],
          quiz: [
            { q: "Customer service relies on a third-party LLM API. What is the MOST important business continuity consideration?", options: ["Negotiating a larger discount", "A tested fallback (alternate provider or manual process) with switch criteria", "Improving prompt templates", "Annual AUP refresh"], answer: 1, explain: "A tested fallback keeps the process running during a provider outage. SLAs and discounts do not restore service." },
            { q: "A production model is found to be poisoned. What is the fastest SAFE recovery option?", options: ["Keep running and monitor closely", "Retrain from scratch on all available data", "Roll back to the last validated version in the model registry", "Disable monitoring to reduce noise"], answer: 2, explain: "A known-good version (pre-dating the poisoning) restores service quickly. Retraining on all data may re-include the poison and takes longer." },
            { q: "The RPO for a RAG vector index determines:", options: ["How quickly the index must be restored", "The model's accuracy target", "The licence cost of the database", "The maximum acceptable data loss, driving backup frequency"], answer: 3, explain: "RPO is about how much data you can afford to lose, which sets backup or re-index frequency. Restore speed is the RTO." },
            { q: "When performing a BIA for AI-enabled operations, what should be done FIRST?", options: ["Identify critical processes that depend on AI and the impact of outage or incorrect output", "Purchase additional GPU capacity", "Select a disaster recovery site", "Write recovery runbooks"], answer: 0, explain: "Impact analysis defines priorities, RTOs and RPOs. Sites, capacity and runbooks follow from those requirements." }
          ],
          glossary: [
            { term: "BIA", def: "Business impact analysis: identifies critical processes and the impact of their disruption over time." },
            { term: "RTO", def: "Recovery time objective: target time to restore a process or system after disruption." },
            { term: "RPO", def: "Recovery point objective: maximum acceptable amount of data loss, measured in time." },
            { term: "MTD", def: "Maximum tolerable downtime: longest outage before the business suffers unacceptable harm." },
            { term: "Graceful degradation", def: "Design that keeps reduced but safe service when a component (e.g. a model) fails." }
          ],
          sources: [
            { label: "NIST SP 800-34 Rev. 1 Contingency Planning", url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final" },
            { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" }
          ]
        }
      ]
    }
  ]
});
