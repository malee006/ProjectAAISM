/* Domain 3 — AI Technologies and Controls (38%). Schema: CONTENT_SCHEMA.md */
window.AAISM = window.AAISM || { domains: [] };
(function () {

var OWASP_LLM = "https://genai.owasp.org/llm-top-10/";

/* ---------------- 3A AI Security Architecture and Design ---------------- */
var d3a = [
{
  id: "d3a-attack-surface",
  title: "AI System Components and Attack Surface",
  concept: [
    { h: "Five layers to protect", body: "<ul><li><b>Data</b> – training, fine-tuning and retrieval (RAG) data</li><li><b>Model</b> – weights, configuration, system prompts</li><li><b>Pipeline</b> – MLOps tooling, CI/CD, model registry</li><li><b>Inference API</b> – serving endpoints, gateways</li><li><b>Application</b> – UI, plugins, agents, tools</li></ul>" },
    { h: "What is new vs classic IT", body: "<p>AI adds attack paths through <b>data</b> and <b>natural language</b>: poisoning, evasion (adversarial inputs), prompt injection, model extraction, membership inference and model inversion. Behaviour is probabilistic, so testing can show flaws but never prove their absence.</p>" },
    { h: "Classifying attacks", body: "<p><b>NIST AI 100-2</b> (adversarial ML taxonomy) sorts attacks by life-cycle stage (training vs deployment), attacker goal (<b>availability, integrity, privacy</b>, plus <b>misuse</b> for GenAI) and attacker knowledge (white-, gray-, black-box). <b>MITRE ATLAS</b> catalogs real adversary tactics and techniques against AI, modeled on ATT&amp;CK.</p>" },
    { h: "Threat modeling AI", body: "<p>Extend data-flow diagrams and STRIDE with AI trust boundaries: training data sources, model-hub downloads, user prompts, retrieved documents, tool outputs. <b>Every boundary where untrusted content reaches the model is an injection point.</b></p>" }
  ],
  why: "<p>You cannot secure what you have not decomposed. Architecture reviews, threat models, control ownership and monitoring all attach to these layers. Missing one (often the data pipeline) leaves a blind spot attackers will find.</p>",
  mnemonics: [
    { device: "Don't Make Poor Insecure Apps", type: "acronym", recall: "Five layers of the AI attack surface", text: "<b>D</b>ata → <b>M</b>odel → <b>P</b>ipeline → <b>I</b>nference API → <b>A</b>pplication. Bottom (data) to top (app)." },
    { device: "AIP + M: the AI pain points", type: "chunk", recall: "NIST AI 100-2 attacker goals", text: "<b>A</b>vailability, <b>I</b>ntegrity, <b>P</b>rivacy — the classic three — plus <b>M</b>isuse added for generative AI." },
    { device: "ATLAS maps the attacker's world", type: "visual", recall: "What MITRE ATLAS is for", text: "Picture an atlas of enemy routes: ATLAS = real-world adversary tactics and techniques against AI, like ATT&amp;CK for ML." }
  ],
  diagram: { type: "layers", title: "AI attack surface (top → bottom)", items: [
    { label: "Application", sub: "UI, plugins, agents" },
    { label: "Inference API", sub: "serving, gateway" },
    { label: "Model", sub: "weights, prompts" },
    { label: "Pipeline", sub: "MLOps, CI/CD, registry" },
    { label: "Data", sub: "training, RAG corpora" } ] },
  examTip: "<p>When a question asks what to do <b>FIRST</b> for a new AI system, prefer understanding it (inventory, data flows, threat model) over buying or deploying a tool. 'Deploy an LLM firewall' is a classic premature distractor.</p>",
  keyPoints: [
    "AI attack surface = Data, Model, Pipeline, Inference API, Application",
    "AI adds data- and language-borne attacks: poisoning, evasion, prompt injection, extraction",
    "NIST AI 100-2 goals: availability, integrity, privacy (+ misuse for GenAI)",
    "MITRE ATLAS = adversary tactics/techniques against AI (ATT&CK-style)",
    "Threat model every trust boundary where untrusted content reaches the model"
  ],
  quiz: [
    { q: "A business unit wants to launch a customer-service chatbot built on a third-party LLM with retrieval over internal documents. What should the security manager do FIRST?",
      options: ["Deploy a prompt-filtering gateway in front of the chatbot", "Threat model the solution, mapping components, data flows and trust boundaries", "Request the LLM vendor's SOC 2 report", "Commission an external red-team exercise"],
      answer: 1, explain: "Understanding components and trust boundaries comes first; it determines which controls (gateway, vendor assurance, red teaming) are needed. The other options are useful later but premature without the threat model." },
    { q: "Which component is MOST likely to be overlooked when a traditional application security assessment is applied to an AI system?",
      options: ["Web front-end authentication", "TLS configuration of the API", "The training and retrieval data pipeline", "Operating system patching of servers"],
      answer: 2, explain: "Classic AppSec covers front ends, transport and hosts. The data pipeline is AI-specific and is where poisoning and leakage risks enter, so it is the most commonly missed." },
    { q: "An attacker sends thousands of crafted queries to a public model API to build a functionally equivalent copy. Under the NIST AI 100-2 taxonomy, this is BEST classified as which type of attack?",
      options: ["Availability attack", "Integrity attack", "Privacy attack", "Misuse attack"],
      answer: 2, explain: "NIST AI 100-2 groups model extraction with privacy attacks because it compromises the confidentiality of the model. Integrity attacks change outputs; availability attacks degrade service." },
    { q: "A security team wants realistic adversary techniques against ML systems to build threat scenarios. Which resource is MOST appropriate?",
      options: ["MITRE ATLAS", "ISO/IEC 42001", "OWASP ASVS", "NIST Cybersecurity Framework"],
      answer: 0, explain: "ATLAS catalogs observed tactics and techniques against AI systems. ISO/IEC 42001 is a management system standard; ASVS and the CSF are not AI-specific threat catalogs." }
  ],
  glossary: [
    { term: "Attack surface (AI)", def: "All points where an attacker can influence an AI system: data, model, pipeline, inference API and application." },
    { term: "MITRE ATLAS", def: "Adversarial Threat Landscape for Artificial-Intelligence Systems: a knowledge base of adversary tactics and techniques against AI." },
    { term: "NIST AI 100-2", def: "NIST taxonomy and terminology of adversarial machine learning attacks and mitigations." },
    { term: "Trust boundary", def: "A point where data or control passes between components with different trust levels." }
  ],
  sources: [
    { label: "NIST AI 100-2 E2025 Adversarial Machine Learning", url: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final" },
    { label: "MITRE ATLAS", url: "https://atlas.mitre.org/" }
  ]
},
{
  id: "d3a-llm-reference-arch",
  title: "Secure Reference Architecture for LLM Applications (RAG, Gateway, Guardrails)",
  concept: [
    { h: "Building blocks", body: "<p>User/app → <b>LLM gateway</b> → <b>input guardrails</b> → <b>orchestrator</b> (prompt template, retrieval, tools) → <b>model</b> → <b>output guardrails</b> → app. Logging and monitoring span every hop.</p>" },
    { h: "RAG done securely", body: "<ul><li>Retrieve with the <b>end user's permissions</b>, not a super-user service account</li><li>Treat retrieved text as untrusted (indirect prompt injection)</li><li>Sanitize and approve content before indexing</li><li>Isolate tenants in the vector store (OWASP LLM08)</li><li>Cite sources so users can verify</li></ul>" },
    { h: "LLM gateway", body: "<p>A central chokepoint for all model calls: authentication and authorization, routing to <b>approved</b> models, quotas and rate limits, DLP/redaction, logging, cost control and a kill switch. It gives consistent policy and lets you swap models quickly.</p>" },
    { h: "Guardrails are probabilistic", body: "<p>Input checks (injection, PII, off-topic) and output checks (toxicity, data leakage, schema, grounding) catch a lot but can be bypassed. Layer them with <b>deterministic</b> controls: least privilege, output encoding, human approval.</p>" },
    { h: "A system prompt is not a control", body: "<p>OWASP LLM07 (System Prompt Leakage): assume the system prompt can be extracted. Never put credentials, secrets or authorization logic in it; enforce access decisions outside the model.</p>" }
  ],
  why: "<p>Most enterprise GenAI is an LLM wrapped in retrieval and tools. A standard, approved reference architecture lets the security manager review new projects quickly and ensures every app inherits the same baseline controls.</p>",
  mnemonics: [
    { device: "Good Ideas Rarely Make Outages", type: "acronym", recall: "Order of components in a secure LLM request path", text: "<b>G</b>ateway → <b>I</b>nput guardrail → <b>R</b>etrieval/orchestration → <b>M</b>odel → <b>O</b>utput guardrail." },
    { device: "RAG = Retrieve As the Guest", type: "chunk", recall: "Whose permissions should RAG retrieval use?", text: "Retrieval runs with the <b>requesting user's</b> rights — never the admin's. If the user can't open the file, the bot can't quote it." },
    { device: "The system prompt is a postcard", type: "visual", recall: "Why secrets don't belong in system prompts", text: "Anyone handling a postcard can read it. Write nothing on it you wouldn't show an attacker: no keys, no access rules." }
  ],
  diagram: { type: "flow", title: "Secure LLM request path", steps: [
    { label: "LLM gateway", sub: "authN, quotas, logs" },
    { label: "Input guard", sub: "injection, PII" },
    { label: "Orchestrator", sub: "RAG + tools" },
    { label: "Model", sub: "approved LLM only" },
    { label: "Output guard", sub: "validate, redact" },
    { label: "App / user", sub: "encoded, cited" } ] },
  examTip: "<p>If an option fixes a data-exposure problem by 'telling the model' (system prompt instructions), it is almost never BEST. Prefer controls enforced outside the model: permission-aware retrieval, gateway policy, output validation.</p>",
  keyPoints: [
    "Reference path: gateway → input guard → orchestrator/RAG → model → output guard",
    "RAG must enforce the end user's access rights at retrieval time",
    "LLM gateway = single point for authZ, routing, quotas, DLP, logging, kill switch",
    "Guardrails are probabilistic; layer with deterministic controls",
    "Never store secrets or authorization logic in the system prompt (LLM07)"
  ],
  quiz: [
    { q: "An internal RAG assistant returns salary documents to employees who are not authorized to see them. Which control BEST addresses the root cause?",
      options: ["Strengthen the system prompt to forbid discussing salaries", "Add an output filter that blocks numbers formatted as currency", "Retrain the model to exclude HR topics", "Enforce the requesting user's access rights during retrieval"],
      answer: 3, explain: "The root cause is retrieval using broader rights than the user has. Permission-aware retrieval stops the data reaching the model at all; prompt instructions and output filters are bypassable compensating controls." },
    { q: "What is the PRIMARY security benefit of routing all enterprise LLM traffic through a central LLM gateway?",
      options: ["It improves model accuracy", "It provides one point to enforce consistent access, logging and data-protection policy", "It eliminates prompt injection", "It removes the need for vendor contracts"],
      answer: 1, explain: "A gateway centralizes policy enforcement and visibility. It does not remove prompt injection (no single control does) and does not affect accuracy or contracts." },
    { q: "Developers placed a database API key in the system prompt so the model can query customer records. What should the security manager recommend?",
      options: ["Move credentials to a tool layer that authenticates and authorizes each call outside the model", "Encrypt the system prompt at rest", "Instruct the model never to reveal the key", "Shorten the system prompt to reduce leakage"],
      answer: 0, explain: "System prompts can leak (OWASP LLM07). Credentials must live in a controlled tool layer that enforces authorization; encryption at rest or instructions do not stop the model from disclosing what it sees." },
    { q: "Why should guardrail products NOT be relied on as the sole control for an LLM application?",
      options: ["They are not permitted under the EU AI Act", "They only work with open-weight models", "They are probabilistic and can be bypassed, so deterministic controls must also be layered", "They significantly reduce model accuracy"],
      answer: 2, explain: "Guardrails use classifiers or rules that attackers can evade. Defense in depth with least privilege, output encoding and human approval limits impact when they fail." }
  ],
  glossary: [
    { term: "RAG", def: "Retrieval-augmented generation: the model answers using documents retrieved at query time from a knowledge base." },
    { term: "LLM gateway", def: "Proxy that brokers all calls to language models and enforces authentication, routing, quotas, DLP and logging." },
    { term: "Guardrails", def: "Input and output checks around a model that detect or block unsafe, off-policy or malicious content." },
    { term: "System prompt", def: "Hidden instructions sent with every request that set the model's role and behaviour." },
    { term: "Indirect prompt injection", def: "Malicious instructions hidden in content the model processes (documents, web pages, emails) rather than typed by the user." }
  ],
  sources: [
    { label: "OWASP Top 10 for LLM Applications 2025", url: OWASP_LLM },
    { label: "OWASP LLM08:2025 Vector and Embedding Weaknesses", url: "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/" },
    { label: "OWASP LLM07:2025 System Prompt Leakage", url: "https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/" }
  ]
},
{
  id: "d3a-agents-zero-trust",
  title: "Agentic AI, Tool Use, Zero Trust and Least Privilege",
  concept: [
    { h: "Why agents raise the stakes", body: "<p>Agents plan and <b>act</b>: they call APIs, browse, run code, send email, change records. A prompt injection now becomes an <b>action</b>, not just bad text. OWASP LLM06 calls this <b>Excessive Agency</b>.</p>" },
    { h: "Three roots of excessive agency", body: "<ul><li><b>Excessive functionality</b> – tools the task doesn't need</li><li><b>Excessive permissions</b> – tools with broad rights (write, delete, admin)</li><li><b>Excessive autonomy</b> – high-impact actions without human approval</li></ul>" },
    { h: "Zero trust for AI", body: "<p>Never implicitly trust model output, retrieved content or tool results. Give each agent its own <b>non-human identity</b>; authenticate and authorize <b>every</b> tool call in the downstream system; use short-lived, narrowly scoped tokens; act with the <b>user's</b> delegated rights to avoid the confused-deputy problem (NIST SP 800-207 principles).</p>" },
    { h: "Practical controls", body: "<ul><li>Tool allow-lists; read-only by default</li><li>Sandboxed code execution, restricted egress</li><li>Human approval for irreversible or high-value actions</li><li>Per-action logging, rate and spend limits</li><li>Kill switch to stop the agent</li></ul>" }
  ],
  why: "<p>Agent frameworks and tool protocols make it easy to connect models to real systems. The security manager's job is to keep the <b>blast radius</b> of a manipulated agent within risk appetite.</p>",
  mnemonics: [
    { device: "FPA = Fewer Powers, Always", type: "acronym", recall: "Three root causes of excessive agency (OWASP LLM06)", text: "<b>F</b>unctionality, <b>P</b>ermissions, <b>A</b>utonomy — trim all three." },
    { device: "The intern with the master key", type: "story", recall: "Least privilege for AI agents", text: "A new intern (the agent) gets a badge only for the rooms the job needs, it expires tonight, and a manager must countersign any cheque. Never hand the intern the master key." },
    { device: "Confused deputy = sheriff's badge on a stranger", type: "visual", recall: "Why agents should use the user's delegated rights", text: "If the agent uses its own powerful badge for anyone who asks, any stranger gets sheriff powers. Make it act with the asker's own badge." }
  ],
  diagram: { type: "matrix", title: "Excessive agency: risk → control", rows: ["Functionality", "Permissions", "Autonomy"], cols: ["Risk", "Control"], cells: [
    ["Unneeded tools/plugins", "Tool allow-list, minimal set"],
    ["Broad write/admin rights", "Scoped, short-lived, user-delegated tokens"],
    ["Acts without checks", "Human approval for high impact"] ] },
  examTip: "<p>For agent scenarios, the BEST answer usually <b>limits impact</b> (least privilege, human approval, downstream authorization) rather than trying to make the model 'behave' (better prompts, bigger model). Monitoring alone is detective, not preventive.</p>",
  keyPoints: [
    "Agents turn prompt injection into real actions",
    "Excessive agency = excessive functionality, permissions or autonomy (LLM06)",
    "Agents are non-human identities: authenticate and authorize every call",
    "Use user-delegated, scoped, short-lived credentials (avoid confused deputy)",
    "Human approval for irreversible or high-impact actions; keep a kill switch"
  ],
  quiz: [
    { q: "An email-summarizing agent uses a plugin that can also send and delete mail. A malicious email instructs it to forward the inbox externally, and it does. What is the PRIMARY root cause?",
      options: ["Training data poisoning of the base model", "Excessive agency: the plugin grants more functionality and permission than summarizing requires", "Model hallucination", "Unbounded consumption of tokens"],
      answer: 1, explain: "The injection only caused harm because the agent had send/delete capability it didn't need. Removing that functionality is the root-cause fix; the base model was not poisoned and nothing was hallucinated." },
    { q: "Which control MOST effectively prevents an AI agent from retrieving records the requesting user is not entitled to see?",
      options: ["Give the agent a service account with read access to all records", "Add a system-prompt rule listing restricted records", "Log all agent queries for monthly review", "Execute tool calls with the user's delegated, scoped credentials and enforce authorization downstream"],
      answer: 3, explain: "Delegated credentials with downstream authorization prevent the confused-deputy problem. A broad service account creates it, prompt rules are bypassable, and log review only detects after the fact." },
    { q: "An agent can initiate supplier payments. Which control BEST reduces the impact of a successful prompt injection?",
      options: ["Require human approval for payments above a risk-based threshold", "Upgrade to a larger, more capable model", "Add more examples to the system prompt", "Review agent logs each month"],
      answer: 0, explain: "Human approval directly limits the harm an injected instruction can cause. A larger model or better prompt may reduce likelihood but can still be manipulated; monthly log review is too late." },
    { q: "Under a zero trust architecture, how should AI agents be treated?",
      options: ["As trusted internal components once deployed inside the network", "As extensions of the developer who built them", "As non-human identities authenticated and authorized per request with least privilege", "As users exempt from strong authentication"],
      answer: 2, explain: "Zero trust removes implicit trust based on location or origin. Agents need their own identities and per-request authorization; treating them as trusted insiders is exactly what zero trust rejects." }
  ],
  glossary: [
    { term: "AI agent", def: "An AI system that plans and takes actions toward a goal, typically by calling tools and APIs." },
    { term: "Excessive agency", def: "OWASP LLM06: damaging actions enabled by too much functionality, permission or autonomy given to an LLM system." },
    { term: "Confused deputy", def: "A privileged component tricked into misusing its authority on behalf of a less-privileged party." },
    { term: "Non-human identity", def: "An identity for a workload, service or agent rather than a person, managed with its own credentials and permissions." },
    { term: "Zero trust", def: "Security model with no implicit trust; every access request is authenticated, authorized and evaluated (NIST SP 800-207)." }
  ],
  sources: [
    { label: "OWASP LLM06:2025 Excessive Agency", url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" },
    { label: "NIST SP 800-207 Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final" }
  ]
},
{
  id: "d3a-enterprise-integration",
  title: "Integrating AI into Enterprise Architecture",
  concept: [
    { h: "AI is not an island", body: "<p>AI systems use enterprise data, identities, networks and APIs. Plug them into existing services: <b>IAM/SSO</b>, data classification, network segmentation, logging/SIEM, change management, asset inventory/CMDB and BC/DR. Separate 'shadow' AI stacks create control gaps.</p>" },
    { h: "Architecture governance", body: "<p>Add AI to the architecture review board: approved reference architectures, approved models and providers, a standard gateway, and data-flow approval for sensitive data. Record AI components in the AI inventory so ownership and risk tier are known.</p>" },
    { h: "Deployment models & shared responsibility", body: "<ul><li><b>SaaS AI</b> – vendor runs model and app; you control configuration, data and users</li><li><b>Managed model API</b> – you build the app; provider runs the model</li><li><b>Self-hosted / open weights</b> – most control, most responsibility</li></ul>" },
    { h: "Interfaces and dependencies", body: "<p>Map upstream data feeds and downstream consumers. AI output feeding other systems is a new integrity risk: treat it as untrusted input (OWASP LLM05 Improper Output Handling) — validate, parameterize, encode.</p>" }
  ],
  why: "<p>Integration is where AI risk becomes enterprise risk: an AI tool outside IAM and the SIEM is invisible to the security program. Reusing enterprise services is cheaper and gives consistent control.</p>",
  mnemonics: [
    { device: "I Do Need Lots of Common Rules", type: "acronym", recall: "Enterprise services every AI system must plug into", text: "<b>I</b>dentity (IAM/SSO), <b>D</b>ata classification, <b>N</b>etwork segmentation, <b>L</b>ogging/SIEM, <b>C</b>hange management, <b>R</b>esilience (BC/DR)." },
    { device: "Taxi, rental car, own car", type: "visual", recall: "Shared responsibility across AI deployment models", text: "SaaS AI = taxi (you choose destination and passengers). Managed API = rental car (you drive, they maintain). Self-hosted = your own car (you do everything)." }
  ],
  diagram: { type: "matrix", title: "Who controls what", rows: ["SaaS AI", "Managed API", "Self-hosted"], cols: ["You control", "Provider controls"], cells: [
    ["Config, data, users", "Model, app, infrastructure"],
    ["App, prompts, data, identity", "Model, serving infrastructure"],
    ["Model, app, data, serving", "Hardware/cloud (if used)"] ] },
  examTip: "<p>When a business unit builds AI outside standard services, the BEST answer brings it into existing enterprise controls (IAM, SIEM, architecture review) rather than creating a separate AI-only process or banning it.</p>",
  keyPoints: [
    "Integrate AI with enterprise IAM, classification, network, logging, change and BC/DR",
    "Add AI patterns and approved models to the architecture review board",
    "Responsibility grows from SaaS → managed API → self-hosted",
    "Treat AI output sent to other systems as untrusted input (LLM05)"
  ],
  quiz: [
    { q: "A business unit deploys an AI tool with its own user directory, and its logs are not sent to the SIEM. What is the security manager's PRIMARY concern?",
      options: ["Licensing cost of the separate directory", "Lack of integration with enterprise IAM and monitoring creates control gaps and blind spots", "Model accuracy for the business unit", "Vendor lock-in"],
      answer: 1, explain: "Separate identity and unmonitored logs mean joiners/leavers, access reviews and detection don't apply. Cost and lock-in are secondary to the security blind spot." },
    { q: "Which deployment model places the MOST security responsibility on the organization?",
      options: ["A SaaS AI writing assistant", "An AI feature embedded in a vendor's CRM", "A managed model API from a cloud provider", "An open-weight model self-hosted on the organization's own infrastructure"],
      answer: 3, explain: "Self-hosting makes the organization responsible for the model, serving stack, patching and hardening. In the other models the provider handles part or most of the stack." },
    { q: "LLM-generated SQL is passed directly to a production database. Which architectural control is BEST?",
      options: ["Treat the output as untrusted: validate it, use parameterized queries and a least-privilege database account", "Instruct the model to generate only safe SQL", "Switch to a larger model with better coding ability", "Log all generated queries for later review"],
      answer: 0, explain: "Improper output handling (LLM05) is fixed by validating and constraining output before it reaches downstream systems. Instructions and larger models don't guarantee safe output; logging is only detective." },
    { q: "What is the BEST way to ensure new AI projects consistently follow approved security patterns?",
      options: ["Create a separate AI team that must personally approve every AI use", "Rely on each AI vendor's default configuration", "Add AI reference architectures and review criteria to the existing architecture review process", "Penetration test each AI system after go-live"],
      answer: 2, explain: "Embedding AI criteria in existing architecture governance scales and catches issues before build. A separate approval team becomes a bottleneck; post-go-live testing is late; vendor defaults may not meet policy." }
  ],
  glossary: [
    { term: "Enterprise architecture", def: "The structured view of an organization's business, data, application and technology layers and how they fit together." },
    { term: "Shared responsibility model", def: "Division of security duties between a cloud/AI provider and the customer, varying by service model." },
    { term: "Improper output handling", def: "OWASP LLM05: passing model output to downstream components without validation, sanitization or encoding." },
    { term: "Shadow AI", def: "AI tools or models used without the organization's knowledge, approval or controls." }
  ],
  sources: [
    { label: "OWASP LLM05:2025 Improper Output Handling", url: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/" },
    { label: "NSA et al. — Deploying AI Systems Securely (2024)", url: "https://media.defense.gov/2024/Apr/15/2003439257/-1/-1/0/CSI-DEPLOYING-AI-SYSTEMS-SECURELY.PDF" }
  ]
},
{
  id: "d3a-secure-by-design",
  title: "Secure-by-Design Principles for AI",
  concept: [
    { h: "Four stages of secure AI development", body: "<p>The joint UK NCSC / US CISA <b>Guidelines for Secure AI System Development</b> (Nov 2023) organize practice into: <b>secure design</b>, <b>secure development</b>, <b>secure deployment</b>, and <b>secure operation and maintenance</b>.</p>" },
    { h: "Core principles", body: "<ul><li><b>Least privilege</b> for users, services, agents</li><li><b>Defense in depth</b> – no single control trusted</li><li><b>Fail safe</b> – default deny or refuse on error</li><li><b>Secure defaults</b> out of the box</li><li><b>Minimize</b> data, features and exposure</li></ul>" },
    { h: "AI-specific twists", body: "<p>Treat models and datasets as supply-chain artifacts; design for model misbehaviour (non-determinism); build in human oversight and a kill switch; protect weights as crown-jewel IP; document limitations in model/system cards.</p>" },
    { h: "Supporting frameworks", body: "<p>Google <b>SAIF</b>, the <b>OWASP AI Exchange</b>, ISO/IEC 42001 Annex A controls on the AI system life cycle, and EU AI Act Art. 15 (accuracy, robustness and cybersecurity of high-risk systems throughout their life cycle).</p>" }
  ],
  why: "<p>Security added after launch costs more and fits worse. Making security a business requirement at inception is the cheapest way to keep AI risk within appetite — and it's what regulators increasingly expect.</p>",
  mnemonics: [
    { device: "Design, Develop, Deploy, Operate — 3 Ds and an O", type: "chunk", recall: "Four areas of the NCSC/CISA secure AI guidelines", text: "<b>D</b>esign → <b>D</b>evelop → <b>D</b>eploy → <b>O</b>perate &amp; maintain. Three Ds build it, the O keeps it safe." },
    { device: "Let's Do Fewer Silly Mistakes", type: "acronym", recall: "Five secure-by-design principles", text: "<b>L</b>east privilege, <b>D</b>efense in depth, <b>F</b>ail safe, <b>S</b>ecure defaults, <b>M</b>inimize." }
  ],
  diagram: { type: "flow", title: "Secure AI system development (NCSC/CISA)", loop: true, steps: [
    { label: "Secure design", sub: "threat model, risk" },
    { label: "Secure develop", sub: "supply chain, docs" },
    { label: "Secure deploy", sub: "harden, protect" },
    { label: "Operate", sub: "monitor, update" } ] },
  examTip: "<p>'Address security during design/requirements' beats 'test before go-live' or 'fix after the first incident'. If business pressure pushes security to 'version 2', the BEST answer defines minimum requirements now and routes exceptions to the risk owner.</p>",
  keyPoints: [
    "NCSC/CISA guidelines: secure design, development, deployment, operation & maintenance",
    "Principles: least privilege, defense in depth, fail safe, secure defaults, minimize",
    "Design for model misbehaviour, oversight and a kill switch",
    "Security requirements at inception are cheapest and most effective"
  ],
  quiz: [
    { q: "At which point is it MOST cost-effective to address AI security requirements?",
      options: ["During penetration testing before release", "During design and requirements definition", "At deployment, through configuration hardening", "After the first security incident"],
      answer: 1, explain: "Requirements set at design shape architecture and are cheapest to implement. Testing and deployment hardening find or patch issues later at higher cost." },
    { q: "When the guardrail service is unavailable, an AI application passes prompts to the model unfiltered. Which principle is violated?",
      options: ["Separation of duties", "Economy of mechanism", "Fail safe (secure failure)", "Psychological acceptability"],
      answer: 2, explain: "Fail-safe design means that on failure the system defaults to a secure state (block or degrade), not an open one. The other principles do not address failure behaviour." },
    { q: "The NCSC/CISA Guidelines for Secure AI System Development are organized into which areas?",
      options: ["Govern, Map, Measure, Manage", "Plan, Do, Check, Act", "Identify, Protect, Detect, Respond", "Secure design, development, deployment, and operation and maintenance"],
      answer: 3, explain: "The guidelines follow the AI system life cycle in four areas. Govern–Map–Measure–Manage is the NIST AI RMF; PDCA is the ISO management cycle; Identify–Protect–Detect–Respond is from the NIST CSF." },
    { q: "A product team wants to launch quickly and add security 'in version 2'. What is the security manager's BEST response?",
      options: ["Agree minimum security requirements as launch criteria and have the risk owner formally accept any exceptions", "Accept the plan to avoid delaying the business", "Block the launch until all security features are complete", "Let the AI vendor decide which controls are needed"],
      answer: 0, explain: "The manager enables the business while keeping risk within appetite: minimum requirements plus formal risk acceptance by the owner. Simply accepting or blocking ignores risk-based decision making; the vendor is not the risk owner." }
  ],
  glossary: [
    { term: "Secure by design", def: "Building security into a product from the start as a core business requirement rather than adding it later." },
    { term: "Fail safe", def: "Design principle that a system defaults to a secure state when a component fails." },
    { term: "SAIF", def: "Google's Secure AI Framework: a conceptual framework of practices for securing AI systems." },
    { term: "Defense in depth", def: "Layering multiple independent controls so that one failure does not compromise the system." }
  ],
  sources: [
    { label: "NCSC/CISA Guidelines for Secure AI System Development", url: "https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development" },
    { label: "OWASP AI Exchange", url: "https://owaspai.org/" },
    { label: "Google Secure AI Framework (SAIF)", url: "https://saif.google/" }
  ]
}
];

/* ---------------- 3B AI Life Cycle ---------------- */
var d3b = [
{
  id: "d3b-lifecycle-stages",
  title: "AI/ML Life Cycle Stages and Security Gates",
  concept: [
    { h: "The stages", body: "<p><b>Plan/design</b> → <b>Data</b> (collect, prepare, label) → <b>Build/train</b> → <b>Validate/test</b> → <b>Deploy</b> → <b>Operate &amp; monitor</b> → <b>Retire</b>. ISO/IEC 22989 and ISO/IEC 5338 describe similar stages. It is iterative: monitoring feeds re-training and re-validation.</p>" },
    { h: "A security gate at every stage", body: "<ul><li>Plan: impact/risk assessment, use-case approval</li><li>Data: provenance, quality, legal basis</li><li>Train: isolated, reproducible environment</li><li>Validate: acceptance criteria met (incl. robustness, bias)</li><li>Deploy: change approval, hardening</li><li>Operate: monitoring, incident handling</li><li>Retire: revoke, archive, delete</li></ul>" },
    { h: "How it differs from a classic SDLC", body: "<p>Behaviour emerges from <b>data</b>, not just code. Performance degrades over time (<b>drift</b>), so validation is continuous. More stakeholders are involved: data scientists, domain experts, legal, ethics, risk.</p>" }
  ],
  why: "<p>Gates give the security manager defined points to require evidence and stop risky releases. Controls tied to stages are easier to audit than ad-hoc reviews.</p>",
  mnemonics: [
    { device: "Please Don't Build Very Dangerous Old Robots", type: "acronym", recall: "Seven AI life cycle stages in order", text: "<b>P</b>lan → <b>D</b>ata → <b>B</b>uild/train → <b>V</b>alidate → <b>D</b>eploy → <b>O</b>perate/monitor → <b>R</b>etire." },
    { device: "Data is the new source code", type: "chunk", recall: "Key difference between AI life cycle and SDLC", text: "Change the data and you change the program — so data needs version control, review and change management just like code." }
  ],
  diagram: { type: "cycle", title: "AI life cycle", center: "Governance & risk", steps: [
    { label: "Plan", sub: "use case, impact" },
    { label: "Data", sub: "collect, label" },
    { label: "Build/train", sub: "isolated env" },
    { label: "Validate", sub: "acceptance criteria" },
    { label: "Deploy", sub: "change approval" },
    { label: "Operate", sub: "monitor, drift" },
    { label: "Retire", sub: "revoke, delete" } ] },
  examTip: "<p>Risk/impact assessment belongs at <b>plan/design</b> — the earliest stage — and is revisited later. When performance degrades after go-live, the answer is monitoring with re-validation triggers, not an arbitrary retraining schedule.</p>",
  keyPoints: [
    "Stages: plan, data, build/train, validate, deploy, operate/monitor, retire",
    "Each stage has a gate with required evidence",
    "AI life cycle is iterative; monitoring triggers re-validation",
    "Data changes behaviour, so data is managed like code"
  ],
  quiz: [
    { q: "At which life-cycle stage should an AI impact and risk assessment FIRST be performed?",
      options: ["Plan/design", "Validation", "Deployment", "Operation and monitoring"],
      answer: 0, explain: "Assessing impact at planning lets the organization decide whether and how to proceed before investing. It is revisited later, but doing it first at validation or deployment is too late to shape design." },
    { q: "A model performed well in validation, but its accuracy declined steadily six months after deployment. Which life-cycle activity MOST directly addresses this?",
      options: ["Retraining from scratch every year", "Improving data labeling guidelines", "Operational monitoring for drift with defined re-validation triggers", "Retiring the model immediately"],
      answer: 2, explain: "Drift is detected and managed through monitoring with thresholds that trigger re-validation or retraining. A fixed annual schedule may be too late; retiring is premature without analysis." },
    { q: "What is the MAIN reason an AI life cycle needs controls beyond a traditional SDLC?",
      options: ["AI systems are written in different programming languages", "AI systems do not require change management", "AI systems cannot be tested", "Model behaviour depends on data and can change after deployment"],
      answer: 3, explain: "Data-driven behaviour and post-deployment change (drift) require data controls and continuous validation. AI systems can be tested and absolutely need change management." },
    { q: "Which evidence BEST shows that a deployment gate is operating effectively?",
      options: ["The number of models deployed per quarter", "Documented approval by the accountable owner that validation acceptance criteria were met before release", "A data scientist's verbal assurance", "The vendor's marketing claims about model safety"],
      answer: 1, explain: "Gate effectiveness is evidenced by documented, accountable approval against predefined criteria. Counts, verbal assurances and marketing provide no assurance the gate worked." }
  ],
  glossary: [
    { term: "AI life cycle", def: "The stages an AI system passes through from inception and design to operation and retirement." },
    { term: "Security gate", def: "A checkpoint where defined evidence must be provided before work proceeds to the next stage." },
    { term: "ISO/IEC 5338", def: "International standard defining AI system life cycle processes." },
    { term: "ISO/IEC 22989", def: "International standard on AI concepts and terminology, including the AI system life cycle." }
  ],
  sources: [
    { label: "ISO/IEC 5338:2023 AI system life cycle processes", url: "https://www.iso.org/standard/81118.html" },
    { label: "ISO/IEC 22989:2022 AI concepts and terminology", url: "https://www.iso.org/standard/74296.html" },
    { label: "NIST AI 100-1 (AI RMF) — AI life cycle", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" }
  ]
},
{
  id: "d3b-model-selection",
  title: "Model Selection: Build vs Buy vs Fine-Tune; Open vs Closed Weights",
  concept: [
    { h: "Sourcing options", body: "<ul><li><b>Buy/consume</b> – SaaS or API foundation model</li><li><b>RAG</b> – adapt with retrieval, weights unchanged</li><li><b>Fine-tune</b> – adapt a base model with your data</li><li><b>Build</b> – train from scratch</li></ul><p>Control, cost and security responsibility all rise toward 'build'.</p>" },
    { h: "Open vs closed weights", body: "<p><b>Open-weight</b>: inspect, self-host, data stays in-house — but you own vetting, hardening, patching and license compliance. <b>Closed/API</b>: provider secures the model, but less transparency, data leaves your boundary, lock-in, and the provider can change the model.</p>" },
    { h: "Selection criteria", body: "<ul><li><b>Fit</b> for purpose and performance</li><li><b>Security</b> posture, red-team and jailbreak results</li><li><b>Data</b> handling: retention, training on your data, residency</li><li><b>Transparency</b>: model card, training-data info</li><li><b>Legal</b>: license, IP terms, regulatory duties</li><li><b>Exit</b> strategy, cost, scalability</li></ul>" },
    { h: "Fine-tuning risks", body: "<p>Fine-tuning can weaken a model's safety alignment and can memorize the fine-tuning data (leakage risk). Re-validate safety, security and privacy after <b>every</b> fine-tune.</p>" }
  ],
  why: "<p>Model selection is a risk decision as much as a technical one. The security manager makes sure data handling, transparency and exit terms are evaluated before the business commits.</p>",
  mnemonics: [
    { device: "Buy → RAG → Tune → Build: the control ladder", type: "visual", recall: "Model sourcing options from least to most control/responsibility", text: "Each rung up gives more control but adds cost and security duties. Climb only as high as the use case needs." },
    { device: "Five Sharp Detectives Track Legal Exits", type: "acronym", recall: "Model selection criteria", text: "<b>F</b>it, <b>S</b>ecurity, <b>D</b>ata handling, <b>T</b>ransparency, <b>L</b>egal, <b>E</b>xit." },
    { device: "Open = own the garden", type: "chunk", recall: "Trade-off of open-weight vs closed models", text: "Open weights: you own the garden — full view, full weeding duty. Closed: you rent a flat — landlord fixes it, but can redecorate without asking." }
  ],
  diagram: { type: "matrix", title: "Sourcing options compared", rows: ["Buy / API", "RAG", "Fine-tune", "Build"], cols: ["Control", "Effort/cost", "Your extra security duty"], cells: [
    ["Low", "Low", "Usage, data sent, contract"],
    ["Medium", "Low–medium", "Retrieval access, corpus integrity"],
    ["Med–high", "Medium", "Training data, re-validation"],
    ["High", "High", "Entire model life cycle"] ] },
  examTip: "<p>For frequently changing knowledge, RAG usually beats fine-tuning or training. For third-party models, the BEST due-diligence question is about <b>data use and retention</b> (is our data used for training?), not parameter counts or leaderboards.</p>",
  keyPoints: [
    "Options: buy/API, RAG, fine-tune, build — control and duty increase",
    "Open weights: more control, you own vetting, patching, license",
    "Closed/API: provider secures model; data leaves boundary; lock-in",
    "Criteria: fit, security, data handling, transparency, legal, exit",
    "Re-validate safety after every fine-tune"
  ],
  quiz: [
    { q: "A company needs an assistant to answer questions about frequently updated internal policies, with minimal training cost and always-current answers. Which approach is MOST appropriate?",
      options: ["Train a model from scratch on the policy library", "Fine-tune a model monthly on the latest policies", "Allow staff to paste policies into a public chatbot", "Use RAG over an approved policy repository with a vetted base model"],
      answer: 3, explain: "RAG keeps answers current without retraining and keeps data under access control. Monthly fine-tuning is costly and always lags; a public chatbot leaks data." },
    { q: "When choosing an open-weight model to self-host, which responsibility should the security manager emphasize the organization is taking on?",
      options: ["Supply-chain vetting, hardening, patching and monitoring of the model and serving stack", "Nothing beyond what an API provider would handle", "Only paying license fees", "Only measuring model accuracy"],
      answer: 0, explain: "Self-hosting moves the model's security duties in-house. Open weights shift responsibility to the organization rather than removing it." },
    { q: "Which contractual question is MOST important when selecting a third-party API model that will process confidential data?",
      options: ["How many parameters the model has", "Where the model ranks on public benchmarks", "Whether the provider retains or uses prompts and outputs for training, and the retention and residency terms", "Which GPU type the provider uses"],
      answer: 2, explain: "Data use, retention and residency determine confidentiality and compliance risk. Size, rankings and hardware matter for performance, not data protection." },
    { q: "A team fine-tuned a vendor model on internal support tickets. What should happen BEFORE it is redeployed?",
      options: ["Nothing, because the base model was already validated", "Re-run validation, including safety/jailbreak and data-leakage tests", "Increase the temperature setting to vary responses", "Update the user documentation only"],
      answer: 1, explain: "Fine-tuning can erode safety behaviour and embed sensitive ticket data. The base model's validation no longer applies to the changed model." }
  ],
  glossary: [
    { term: "Foundation model", def: "A large model trained on broad data that can be adapted to many tasks." },
    { term: "Fine-tuning", def: "Further training a pre-trained model on task-specific data, changing its weights." },
    { term: "Open-weight model", def: "A model whose trained weights are published for others to download and run." },
    { term: "Model card", def: "Documentation of a model's intended use, performance (incl. by subgroup), limitations and evaluation." }
  ],
  sources: [
    { label: "OWASP LLM03:2025 Supply Chain", url: "https://genai.owasp.org/llmrisk/llm032025-supply-chain/" },
    { label: "NIST AI 600-1 Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" }
  ]
},
{
  id: "d3b-secure-training",
  title: "Secure Training Environment, Reproducibility and Model Supply Chain",
  concept: [
    { h: "Isolate the training environment", body: "<p>Dedicated, segmented compute; <b>default-deny egress</b>; least-privilege access to data and GPUs; secrets in a vault, not notebooks; separate dev/train/prod; monitor for exfiltration of data and weights.</p>" },
    { h: "Reproducibility", body: "<p>Record the <b>dataset version/hash</b>, <b>code commit</b>, <b>hyperparameters</b>, <b>random seeds</b> and the <b>environment</b> (libraries, container image). This supports audit, incident investigation and rollback, and proves which data trained which model.</p>" },
    { h: "Model supply chain", body: "<p>Pre-trained models, datasets and libraries from public hubs are third-party code. <b>Pickle</b>-based model files can execute code when loaded — prefer safer formats (e.g., safetensors), scan model files, verify hashes/signatures, and pin versions (OWASP LLM03).</p>" },
    { h: "AI bill of materials", body: "<p>An <b>AIBOM/ML-BOM</b> (e.g., CycloneDX ML-BOM, SPDX 3.0 AI profile) lists models, datasets and dependencies with provenance, supporting vulnerability response and license management. Model signing (e.g., OpenSSF/Sigstore model signing) proves integrity.</p>" }
  ],
  why: "<p>Training environments hold the most sensitive data and the most valuable artifact (weights). A compromised dependency or model file can backdoor everything built on it.</p>",
  mnemonics: [
    { device: "Dogs Chase Hot Sausages Everywhere", type: "acronym", recall: "What to record for reproducible training", text: "<b>D</b>ata version/hash, <b>C</b>ode commit, <b>H</b>yperparameters, <b>S</b>eeds, <b>E</b>nvironment (libraries, container)." },
    { device: "The pickle jar with a spring snake", type: "visual", recall: "Why pickle model files are dangerous", text: "Opening (loading) the jar launches whatever is inside. Scan it, check the seal (signature), or use a jar that can't hold a snake (safetensors)." },
    { device: "Isolate, Record, Verify", type: "chunk", recall: "Three pillars of secure training", text: "<b>Isolate</b> the environment, <b>record</b> everything for reproducibility, <b>verify</b> every third-party artifact." }
  ],
  diagram: { type: "flow", title: "Secure model supply chain", steps: [
    { label: "Vet source", sub: "trusted hub/vendor" },
    { label: "Scan", sub: "malware, pickle" },
    { label: "Verify", sub: "hash, signature" },
    { label: "Train isolated", sub: "no egress" },
    { label: "Record lineage", sub: "data, code, seeds" },
    { label: "Sign & register", sub: "AIBOM, registry" } ] },
  examTip: "<p>A downloaded model is <b>code</b>, not just data. For 'greatest immediate risk' of an unvetted pickle file, pick arbitrary code execution over bias or licensing. For investigations, pick lineage that links dataset versions to model versions.</p>",
  keyPoints: [
    "Isolate training: segmented, default-deny egress, least privilege, vaulted secrets",
    "Reproducibility: data hash, code commit, hyperparameters, seeds, environment",
    "Pickle model files can execute code on load; scan, verify, prefer safetensors",
    "AIBOM lists models, datasets, dependencies with provenance",
    "Sign models and verify signatures before use"
  ],
  quiz: [
    { q: "Data scientists download a pre-trained model in pickle format from a public hub. What is the GREATEST immediate risk?",
      options: ["The model may contain demographic bias", "The license may restrict commercial use", "Loading the file could execute arbitrary code", "Inference may be slow on internal hardware"],
      answer: 2, explain: "Pickle deserialization can run embedded code, compromising the environment the moment it is loaded. Bias and licensing are real but not immediate compromise risks." },
    { q: "Which control BEST enables investigators to determine whether a poisoned dataset was used to train a production model?",
      options: ["Lineage records linking dataset versions and hashes to each model version in the registry", "The model card's description of intended use", "Production accuracy metrics", "Interviews with the data science team"],
      answer: 0, explain: "Recorded lineage gives authoritative, auditable evidence of which data trained which model. Accuracy metrics and interviews are indirect and unreliable." },
    { q: "Which network control is MOST appropriate for a training cluster processing sensitive data?",
      options: ["Open internet access so packages can be installed freely", "Placing the cluster on the corporate user network for convenience", "Public IP addresses for better performance", "Default-deny egress with only approved destinations allowed"],
      answer: 3, explain: "Default-deny egress limits exfiltration and malicious downloads. The other options widen exposure." },
    { q: "What is the PRIMARY purpose of an AI bill of materials (AIBOM)?",
      options: ["To replace the model card", "To inventory model, dataset and dependency components with provenance for risk, vulnerability and license management", "To measure model accuracy", "To encrypt model weights"],
      answer: 1, explain: "An AIBOM is a component inventory that lets you respond when a component is found vulnerable or mislicensed. It complements, not replaces, the model card." }
  ],
  glossary: [
    { term: "AIBOM", def: "AI bill of materials: inventory of models, datasets, software dependencies and their provenance used in an AI system." },
    { term: "Pickle", def: "Python serialization format; loading an untrusted pickle file can execute arbitrary code." },
    { term: "Safetensors", def: "A model weight file format designed to store tensors without executable code." },
    { term: "Reproducibility", def: "Ability to recreate a model's training and results from recorded data, code, parameters and environment." },
    { term: "Model signing", def: "Cryptographically signing model artifacts so consumers can verify integrity and origin." }
  ],
  sources: [
    { label: "OWASP LLM03:2025 Supply Chain", url: "https://genai.owasp.org/llmrisk/llm032025-supply-chain/" },
    { label: "CycloneDX ML-BOM", url: "https://cyclonedx.org/capabilities/mlbom/" },
    { label: "Hugging Face — safetensors", url: "https://huggingface.co/docs/safetensors/index" },
    { label: "OpenSSF/Sigstore model signing (model-transparency)", url: "https://github.com/sigstore/model-transparency" }
  ]
},
{
  id: "d3b-validation-testing",
  title: "Model Validation, Red Teaming and AI Vulnerability Management",
  concept: [
    { h: "Validate against acceptance criteria", body: "<p>Business and risk owners set criteria <b>before</b> testing: performance (accuracy, precision/recall, error rates), robustness, fairness, safety, explainability, security, latency. Test on held-out data representative of production — never on training data.</p>" },
    { h: "Robustness and adversarial testing", body: "<p>Test adversarial (evasion) inputs, out-of-distribution data and noise. For LLMs: prompt injection, jailbreaks, data leakage and harmful content. <b>AI red teaming</b> is structured adversarial testing by people and tools; NIST AI 600-1 recommends it for GenAI.</p>" },
    { h: "Vulnerability management for AI", body: "<p>Scan dependencies and model files, track AI-specific weaknesses, retest after every model, prompt or data change, and prioritize by risk. Some flaws (e.g., prompt injection) can't be fully patched — mitigate, monitor and accept residual risk formally.</p>" },
    { h: "Independence", body: "<p>Validation should be performed by people independent of the developers (the model-risk 'effective challenge' idea, e.g., US banking guidance SR 11-7). Record results and limitations in the model card.</p>" }
  ],
  why: "<p>Validation is the last chance to stop a flawed model before it affects customers. Predefined criteria make go/no-go a business risk decision, not a data scientist's judgement call.</p>",
  mnemonics: [
    { device: "Pretty Robots Feel Safe Explaining Security", type: "acronym", recall: "Dimensions of AI acceptance criteria", text: "<b>P</b>erformance, <b>R</b>obustness, <b>F</b>airness, <b>S</b>afety, <b>E</b>xplainability, <b>S</b>ecurity." },
    { device: "Never grade your own homework", type: "story", recall: "Independent validation and held-out test data", text: "A student who writes and marks their own exam always passes. Use a different marker (independent validator) and questions the student hasn't seen (held-out data)." }
  ],
  diagram: { type: "hub", title: "Acceptance criteria", center: "Go / no-go", steps: [
    { label: "Performance", sub: "accuracy, errors" },
    { label: "Robustness", sub: "adversarial, OOD" },
    { label: "Fairness", sub: "by subgroup" },
    { label: "Safety", sub: "harmful output" },
    { label: "Explainability", sub: "reasons, limits" },
    { label: "Security", sub: "injection, leakage" } ] },
  examTip: "<p>Who sets acceptance criteria? The <b>business/risk owner, before testing</b>. Spectacular test scores usually signal train/test leakage. For jailbreak resistance, structured red teaming beats vendor claims or post-launch feedback.</p>",
  keyPoints: [
    "Acceptance criteria defined by business/risk owners before testing",
    "Test on held-out, production-representative data",
    "AI red teaming = structured adversarial testing; recommended for GenAI",
    "Retest after every model, prompt or data change",
    "Independent validation provides effective challenge"
  ],
  quiz: [
    { q: "Who should define the acceptance criteria for a high-impact credit-decision model?",
      options: ["The data scientists, after reviewing test results", "The model vendor", "Internal audit", "The business owner with risk and compliance stakeholders, before testing begins"],
      answer: 3, explain: "Criteria reflect risk appetite and must be set by accountable owners in advance. Developers setting criteria after seeing results invites bias; audit provides independent assurance rather than owning criteria." },
    { q: "A model scores 99% accuracy on its test set, but the test set was later found to overlap with training data. What is the MAIN issue?",
      options: ["Train/test data leakage has inflated the measured performance", "The model is under-fitted", "The model has concept drift", "The model is too explainable"],
      answer: 0, explain: "Testing on data the model has seen measures memorization, not generalization. Drift and under-fitting are unrelated to the overlap." },
    { q: "What is the BEST way to evaluate a GenAI chatbot's resistance to jailbreaks before launch?",
      options: ["Review the vendor's marketing materials", "Conduct structured AI red teaming with documented scenarios and retest fixes", "Measure accuracy on the FAQ dataset", "Collect user feedback after launch"],
      answer: 1, explain: "Red teaming actively probes for jailbreaks and produces evidence. Accuracy on FAQs doesn't test adversarial behaviour; post-launch feedback exposes customers to the risk." },
    { q: "Why is validation by a party independent of the model developers important?",
      options: ["It is always faster", "It is mandated by GDPR for all models", "It provides effective challenge and reduces developer blind spots and bias", "It removes the need for monitoring"],
      answer: 2, explain: "Independence gives credible challenge to assumptions and results. It is not necessarily faster, is not a blanket GDPR rule, and does not replace monitoring." }
  ],
  glossary: [
    { term: "Acceptance criteria", def: "Predefined thresholds a model must meet (performance, robustness, fairness, safety, security) before release." },
    { term: "AI red teaming", def: "Structured adversarial testing of an AI system to find failures, vulnerabilities and harmful behaviours." },
    { term: "Held-out data", def: "Data kept separate from training and used only to evaluate the model." },
    { term: "Effective challenge", def: "Critical, independent analysis of a model by objective, informed parties (model risk management concept)." },
    { term: "Jailbreak", def: "A prompt technique that bypasses a model's safety restrictions." }
  ],
  sources: [
    { label: "NIST AI 600-1 Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
    { label: "NIST AI 100-2 E2025 Adversarial Machine Learning", url: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final" }
  ]
},
{
  id: "d3b-mlops-change",
  title: "MLOps, Model Registry, Versioning and Change Management",
  concept: [
    { h: "MLOps pipelines", body: "<p>MLOps automates build, test and deploy for models (CI/CD plus continuous training). Security needs <b>pipeline integrity</b>: protected branches, signed artifacts, segregation of duties, approvals built into the pipeline, secrets out of code.</p>" },
    { h: "Model registry & versioning", body: "<p>A central registry stores each model version with lineage, validation results, approval status, owner and risk tier. Only <b>approved</b> versions can be promoted to production, and earlier versions remain available for <b>rollback</b>.</p>" },
    { h: "What counts as a change", body: "<ul><li>New <b>model</b> version or fine-tune</li><li>Retraining on new <b>data</b></li><li><b>Prompt</b>/system-prompt edits</li><li><b>Guardrail</b> configuration</li><li><b>Retrieval</b> corpus updates</li><li><b>Vendor</b> updating a hosted model</li></ul>" },
    { h: "Safe release patterns", body: "<p><b>Shadow</b> (run silently alongside), <b>canary</b> (small % of traffic), A/B and blue-green deployments limit blast radius. Define rollback criteria and monitor closely after release.</p>" }
  ],
  why: "<p>Uncontrolled change is a leading cause of AI incidents: a one-line prompt edit can change behaviour as much as a new model. Change control keeps validated behaviour validated.</p>",
  mnemonics: [
    { device: "My Dog Prefers Green Rubber Vegetables", type: "acronym", recall: "Six kinds of AI change that need change control", text: "<b>M</b>odel, <b>D</b>ata, <b>P</b>rompt, <b>G</b>uardrail, <b>R</b>etrieval corpus, <b>V</b>endor update. If it changes behaviour, it's a change." },
    { device: "Registry = library checkout desk", type: "visual", recall: "Purpose of a model registry", text: "Only catalogued, approved books (model versions) leave the library, every loan is recorded, and old editions stay on the shelf for rollback." },
    { device: "Send the canary in first", type: "story", recall: "Canary/shadow deployment", text: "Miners sent a canary ahead to detect danger. Send a small slice of traffic to the new model first; if it struggles, pull back." }
  ],
  diagram: { type: "flow", title: "Controlled model release", loop: true, steps: [
    { label: "Commit", sub: "code, data, prompt" },
    { label: "Train", sub: "pipeline, signed" },
    { label: "Validate", sub: "criteria met" },
    { label: "Approve", sub: "owner sign-off" },
    { label: "Register", sub: "version + lineage" },
    { label: "Canary deploy", sub: "limited traffic" },
    { label: "Monitor", sub: "rollback ready" } ] },
  examTip: "<p>When behaviour changed unexpectedly after a prompt, guardrail or data edit, the root cause is usually <b>missing change management</b>. For vendor-hosted models, the answer is contractual change notification plus version pinning and regression tests.</p>",
  keyPoints: [
    "MLOps pipelines need integrity: signing, approvals, segregation of duties",
    "Registry: approved versions only, with lineage; enables rollback",
    "Changes include model, data, prompt, guardrail, retrieval, vendor updates",
    "Use shadow/canary releases with rollback criteria"
  ],
  quiz: [
    { q: "A team edited a chatbot's system prompt directly in production without review, and the bot began disclosing internal pricing. What is the ROOT control gap?",
      options: ["Insufficient GPU capacity", "Lack of encryption on the prompt store", "Prompt changes were not subject to change management", "The model was too small"],
      answer: 2, explain: "Prompt edits change behaviour and need review, testing and approval like code. Encryption and capacity don't address an unreviewed change." },
    { q: "What is the PRIMARY security value of a model registry?",
      options: ["It provides an authoritative record of approved versions with lineage, enabling controlled promotion and rollback", "It speeds up training", "It provides free storage for experiments", "It tunes hyperparameters automatically"],
      answer: 0, explain: "The registry is a control point: only approved, traceable versions reach production and can be rolled back. Speed and tuning are not security benefits." },
    { q: "The provider of a hosted LLM updates the model without notice, changing outputs. Which mitigation is BEST?",
      options: ["Accept the change because the provider is responsible", "Immediately migrate to a self-hosted open-weight model", "Retrain the organization's own model", "Contract for change notification and version pinning, and run regression tests on vendor updates"],
      answer: 3, explain: "Contractual notice, pinning and regression testing bring vendor changes under change control. Migrating or retraining are disproportionate first steps." },
    { q: "Which deployment strategy BEST limits the impact of a new, higher-risk model version?",
      options: ["Replace the old model for all users at once", "Canary or shadow deployment with monitoring and defined rollback criteria", "Deploy outside business hours without monitoring", "Deploy without logging to improve performance"],
      answer: 1, explain: "Canary/shadow limits exposure and provides evidence before full rollout. Big-bang releases maximize blast radius; skipping monitoring or logging removes the ability to detect problems." }
  ],
  glossary: [
    { term: "MLOps", def: "Practices and tooling that automate and govern building, deploying and operating ML models." },
    { term: "Model registry", def: "Central repository of model versions with metadata such as lineage, validation results and approval status." },
    { term: "Canary deployment", def: "Releasing a new version to a small share of traffic first to detect problems before full rollout." },
    { term: "Shadow deployment", def: "Running a new model on live inputs without its outputs affecting users, to compare behaviour." },
    { term: "Version pinning", def: "Fixing a dependency or hosted model to a specific version so it cannot change unexpectedly." }
  ],
  sources: [
    { label: "ISO/IEC 42001:2023 AI management system", url: "https://www.iso.org/standard/81230.html" },
    { label: "NCSC/CISA Guidelines for Secure AI System Development", url: "https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development" }
  ]
},
{
  id: "d3b-sdlc-retirement",
  title: "Advising on AI in the Development Life Cycle and Decommissioning",
  concept: [
    { h: "Security's advisory role", body: "<p>Embed security in each phase: <b>requirements</b> (abuse cases, data classification), <b>design</b> (threat model), <b>build</b> (secure coding, dependency scanning), <b>test</b> (AI red teaming), <b>release</b> (go/no-go evidence), <b>operate</b> (monitoring). Security advises; the business owner accepts residual risk.</p>" },
    { h: "AI coding assistants", body: "<p>AI-generated code can contain vulnerabilities, suggest <b>non-existent packages</b> that attackers then register, raise license questions, and leak secrets pasted into prompts. Controls: approved tools, human code review, SAST/SCA, no secrets in prompts, developer training.</p>" },
    { h: "Decommissioning triggers & steps", body: "<p>Triggers: replaced, persistent poor performance, risk outside appetite, regulation, contract end. Steps: <b>notify</b> dependents, <b>revoke</b> credentials/API keys, <b>remove</b> endpoints, <b>archive</b> records per retention, securely <b>delete</b> data and weights not retained, <b>update</b> the inventory.</p>" },
    { h: "Don't forget the copies", body: "<p>Weights in other environments, cached embeddings, fine-tuning datasets, logs containing prompts, and vendor-side copies — get written confirmation of deletion from vendors.</p>" }
  ],
  why: "<p>The security manager is an advisor across the whole life cycle (task 22). Retirement is often the forgotten stage, leaving live keys, orphaned endpoints and data copies behind.</p>",
  mnemonics: [
    { device: "Never Run Rusty Aircraft Down Unchecked", type: "acronym", recall: "AI decommissioning steps", text: "<b>N</b>otify, <b>R</b>evoke access, <b>R</b>emove endpoints, <b>A</b>rchive records, <b>D</b>elete data/weights, <b>U</b>pdate inventory." },
    { device: "The eager intern", type: "story", recall: "Risks of AI coding assistants", text: "Fast, confident, sometimes invents things — like a library that doesn't exist. Always review the intern's work before it ships." },
    { device: "Security advises, owner decides", type: "chunk", recall: "Who accepts residual risk in AI development", text: "Security brings the risk analysis and control options to every gate; the accountable business owner signs off residual risk." }
  ],
  diagram: { type: "flow", title: "Decommissioning an AI system", steps: [
    { label: "Notify", sub: "users, dependents" },
    { label: "Revoke", sub: "keys, accounts" },
    { label: "Remove", sub: "endpoints, routes" },
    { label: "Archive", sub: "docs per retention" },
    { label: "Delete", sub: "data, weights, vendor" },
    { label: "Update", sub: "AI inventory" } ] },
  examTip: "<p>The security manager's role is to <b>advise</b> and ensure risk is understood; the business owner <b>owns</b> residual risk. In retirement questions, the overlooked step is usually revoking credentials and deleting copies, not announcing the change.</p>",
  keyPoints: [
    "Security advises at every SDLC phase; business owner accepts residual risk",
    "AI coding assistants: review code, scan dependencies, watch for hallucinated packages",
    "Retire when risk can no longer be kept within appetite",
    "Decommission: notify, revoke, remove, archive, delete, update inventory",
    "Confirm deletion of all copies, including at vendors"
  ],
  quiz: [
    { q: "Developers have started using an AI coding assistant. Which risk is MOST specific to this tool?",
      options: ["Slower compile times", "Higher cloud hosting costs", "Increased font rendering issues", "Suggesting non-existent package names that attackers can register"],
      answer: 3, explain: "Package hallucination is an AI-specific supply-chain risk: attackers publish malicious packages under names models tend to invent. The other options are not specific security risks." },
    { q: "A model is being retired. Which step is MOST often overlooked and leaves residual risk?",
      options: ["Revoking its API keys and service credentials and deleting copies of weights, embeddings and data across environments and vendors", "Announcing the retirement to users", "Removing it from the dashboard", "Thanking the project team"],
      answer: 0, explain: "Live credentials and forgotten data copies remain exploitable after retirement. Communication steps matter but do not reduce security exposure." },
    { q: "What is the security manager's PRIMARY role in the AI solution development life cycle?",
      options: ["Writing the model code", "Advising on security risks and controls at each phase so the business owner can make risk-informed decisions", "Owning the residual risk of each AI system", "Personally approving every code commit"],
      answer: 1, explain: "Task 22 is advisory: identify risk and recommend controls. Ownership of residual risk sits with the business owner; approving every commit doesn't scale." },
    { q: "Which is the BEST trigger to start decommissioning an AI system?",
      options: ["The lead developer leaves the company", "The model is more than one year old", "Its risk can no longer be treated to within appetite, for example after a regulatory change", "The product team adopts a new logo"],
      answer: 2, explain: "Retirement is a risk-based decision. Age or staff changes alone are not reasons; they may call for review, not retirement." }
  ],
  glossary: [
    { term: "Decommissioning", def: "Controlled retirement of an AI system, including access revocation, archiving and secure deletion." },
    { term: "Package hallucination", def: "An AI coding tool recommending a software package that does not exist, which attackers may register maliciously." },
    { term: "SAST/SCA", def: "Static application security testing / software composition analysis: scanning code and dependencies for vulnerabilities." },
    { term: "Residual risk", def: "Risk remaining after controls are applied; accepted by the accountable risk owner." }
  ],
  sources: [
    { label: "NCSC/CISA Guidelines for Secure AI System Development", url: "https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development" },
    { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" }
  ]
}
];

/* ---------------- 3C Data Management Controls ---------------- */
var d3c = [
{
  id: "d3c-data-quality-labeling",
  title: "Data Quality, Integrity and Labeling Controls",
  concept: [
    { h: "Quality dimensions", body: "<ul><li><b>Accuracy</b> – values are correct</li><li><b>Completeness</b> – no critical gaps</li><li><b>Consistency</b> – same meaning across sources</li><li><b>Timeliness</b> – current enough</li><li><b>Validity</b> – right format and range</li><li><b>Representativeness</b> – matches the population served</li></ul><p>ISO/IEC 5259 covers data quality for analytics and ML.</p>" },
    { h: "Regulatory hook", body: "<p>EU AI Act <b>Art. 10</b>: training, validation and testing data for high-risk systems must be relevant, sufficiently representative and, to the best extent possible, free of errors and complete, under documented data-governance practices that include examining possible biases.</p>" },
    { h: "Integrity controls", body: "<p>Cryptographic hashes verified before each training run, versioned and access-controlled (ideally write-once) 'golden' datasets, validation rules at ingestion, anomaly/outlier detection, and reconciliation of record counts with sources.</p>" },
    { h: "Labeling/annotation controls", body: "<ul><li>Clear labeling guidelines</li><li>Vetted, trained annotators (incl. outsourced)</li><li>Multiple annotators; measure <b>inter-annotator agreement</b></li><li>Seeded <b>gold-standard</b> items for spot checks</li><li>Audit trail of who labeled what</li><li>Protect sensitive data shown to labelers</li></ul>" }
  ],
  why: "<p>Garbage in, garbage out: no amount of model tuning fixes biased, stale or tampered data. Data quality failures show up as unfair decisions, errors and audit findings.</p>",
  mnemonics: [
    { device: "All Cats Can Totally Vote Responsibly", type: "acronym", recall: "Six data quality dimensions", text: "<b>A</b>ccuracy, <b>C</b>ompleteness, <b>C</b>onsistency, <b>T</b>imeliness, <b>V</b>alidity, <b>R</b>epresentativeness." },
    { device: "Good Teams Agree, Grade, Audit", type: "acronym", recall: "Labeling quality controls", text: "<b>G</b>uidelines, <b>T</b>rained annotators, <b>A</b>greement measured, <b>G</b>old-standard checks, <b>A</b>udit trail." }
  ],
  diagram: { type: "hub", title: "Fit-for-purpose data", center: "Data quality", steps: [
    { label: "Accuracy", sub: "values correct" },
    { label: "Completeness", sub: "no gaps" },
    { label: "Consistency", sub: "same meaning" },
    { label: "Timeliness", sub: "current" },
    { label: "Validity", sub: "format, range" },
    { label: "Representative", sub: "matches population" } ] },
  examTip: "<p>A model that works in one setting but fails in another usually points to <b>representativeness</b>. For outsourced labeling quality, the BEST control is measurement (agreement + gold items), not contracts or pay.</p>",
  keyPoints: [
    "Quality: accuracy, completeness, consistency, timeliness, validity, representativeness",
    "EU AI Act Art. 10: high-risk data relevant, representative, as error-free and complete as possible",
    "Integrity: hashes, versioning, write-once golden sets, ingestion validation",
    "Labeling: guidelines, trained annotators, agreement, gold items, audit trail"
  ],
  quiz: [
    { q: "A medical triage model trained mostly on data from one urban hospital performs poorly in rural clinics. Which data quality dimension is PRIMARILY lacking?",
      options: ["Timeliness", "Validity", "Representativeness", "Consistency"],
      answer: 2, explain: "The data doesn't reflect the population the model serves. The records may be current, valid and consistent but still unrepresentative." },
    { q: "Which control BEST detects inconsistent labeling by an outsourced annotation vendor?",
      options: ["Measuring inter-annotator agreement and seeding gold-standard items", "Increasing the vendor's pay rate", "Requiring a non-disclosure agreement", "Doubling the number of labels collected"],
      answer: 0, explain: "Agreement metrics and gold items directly measure label quality. NDAs protect confidentiality, not accuracy; more labels without checks just adds more noise." },
    { q: "Under EU AI Act Article 10, training, validation and testing data for high-risk AI systems must be:",
      options: ["Publicly available for audit", "Entirely synthetic", "Stored only within the EU", "Relevant, sufficiently representative and, to the best extent possible, free of errors and complete"],
      answer: 3, explain: "Art. 10 sets data-governance and quality requirements. It does not require public release, synthetic data or EU-only storage." },
    { q: "Which control BEST protects the integrity of a curated training dataset?",
      options: ["Daily backups only", "Versioned, access-controlled storage with cryptographic hashes verified before each training run", "Monitoring model accuracy in production", "Approving changes by email"],
      answer: 1, explain: "Hash verification and controlled versioning detect and prevent tampering before it reaches the model. Backups restore but don't detect; accuracy monitoring detects only after harm." }
  ],
  glossary: [
    { term: "Data quality", def: "Degree to which data is fit for its intended use: accurate, complete, consistent, timely, valid and representative." },
    { term: "Inter-annotator agreement", def: "Measure of how consistently different labelers assign the same labels to the same items." },
    { term: "Gold-standard item", def: "An item with a known correct label inserted into labeling work to check annotator accuracy." },
    { term: "ISO/IEC 5259", def: "Multi-part standard on data quality for analytics and machine learning." }
  ],
  sources: [
    { label: "EU AI Act Art. 10 — Data and data governance", url: "https://artificialintelligenceact.eu/article/10/" },
    { label: "ISO/IEC 5259-1 Data quality for analytics and ML", url: "https://www.iso.org/standard/81088.html" }
  ]
},
{
  id: "d3c-provenance-lineage",
  title: "Data Provenance and Lineage",
  concept: [
    { h: "Two different questions", body: "<p><b>Provenance</b>: where did the data come from, who created it, and under what rights or consent? <b>Lineage</b>: how did it move and transform from source, through preparation, into each model version?</p>" },
    { h: "Why it's a security control", body: "<ul><li><b>Verify</b> trusted sources (poisoning defense)</li><li><b>Legal</b>: consent, license, copyright</li><li><b>Impact</b> analysis when a source is compromised</li><li><b>Deletion</b> requests: find affected models</li><li><b>Audit</b> evidence for regulators</li></ul>" },
    { h: "How to implement", body: "<p>Data catalogs and metadata, <b>datasheets for datasets</b>, the Data &amp; Trust Alliance Data Provenance Standards, cryptographic hashes and signatures, immutable logs, pipeline lineage tools, and dataset versions linked to model versions in the registry. CISA/NSA AI data security guidance (2025) stresses provenance tracking and signatures.</p>" },
    { h: "Third-party and web data", body: "<p>Check licenses and terms; record collection dates and URLs; <b>snapshot and hash</b> content. Web content can change after it was curated, letting attackers swap in poisoned data ('split-view' poisoning).</p>" }
  ],
  why: "<p>When something goes wrong — a poisoned source, a deletion request, a regulator's question — provenance and lineage let you answer in hours instead of weeks.</p>",
  mnemonics: [
    { device: "Birth certificate vs travel diary", type: "visual", recall: "Provenance vs lineage", text: "<b>Provenance</b> = the data's birth certificate (origin, parents, rights). <b>Lineage</b> = its travel diary (every stop and change on the way to the model)." },
    { device: "Very Little Is Done Accidentally", type: "acronym", recall: "Five reasons provenance/lineage matter", text: "<b>V</b>erify sources, <b>L</b>egal rights, <b>I</b>mpact analysis, <b>D</b>eletion requests, <b>A</b>udit evidence." }
  ],
  diagram: { type: "flow", title: "Tracking data to the model", steps: [
    { label: "Source", sub: "rights, consent" },
    { label: "Ingest", sub: "hash, sign" },
    { label: "Transform", sub: "logged steps" },
    { label: "Dataset ver.", sub: "catalogued" },
    { label: "Model ver.", sub: "registry link" } ] },
  examTip: "<p>Questions about 'which data trained model X' or 'which models used source Y' are answered by <b>lineage linked to the model registry</b>. License/consent issues are caught by <b>provenance review before ingestion</b>.</p>",
  keyPoints: [
    "Provenance = origin and rights; lineage = path and transformations",
    "Uses: verify sources, legal rights, impact analysis, deletion, audit",
    "Link dataset versions to model versions in the registry",
    "Snapshot and hash web data; URLs can change after curation"
  ],
  quiz: [
    { q: "A regulator asks which datasets were used to train model version 3.2. Which control would answer this MOST efficiently?",
      options: ["Interviewing the data science team", "Retraining the model and observing which data is used", "Lineage records linking dataset versions to model versions in the registry", "The model card's summary of intended use"],
      answer: 2, explain: "Lineage provides authoritative, queryable evidence. Interviews are unreliable; model cards summarize but rarely identify exact dataset versions." },
    { q: "A vendor-supplied dataset turns out to have a license prohibiting commercial use. Which practice would MOST likely have caught this?",
      options: ["Accuracy testing of the trained model", "Provenance review recording source, rights and license before ingestion", "Encrypting the dataset at rest", "Penetration testing the data platform"],
      answer: 1, explain: "Provenance review checks rights before data is used. Accuracy, encryption and pen testing do not examine licensing." },
    { q: "Why are web-scale datasets distributed as lists of URLs vulnerable to poisoning?",
      options: ["Content at those URLs can change after curation, letting attackers substitute malicious data", "URLs are always encrypted", "The lists are too large to download", "URL lists cannot be versioned"],
      answer: 0, explain: "If an attacker controls a listed domain (e.g., an expired one), they can serve different content at download time. Snapshotting and hashing content mitigates this." },
    { q: "Which statement BEST describes the difference between data provenance and data lineage?",
      options: ["They are the same thing", "Lineage covers only the data's origin", "Provenance applies only to images", "Provenance covers origin and rights; lineage covers movement and transformations"],
      answer: 3, explain: "Provenance answers 'where from and with what rights'; lineage answers 'how it got here and what changed'. Both are needed." }
  ],
  glossary: [
    { term: "Data provenance", def: "Record of a dataset's origin, creator, collection method and the rights or consent under which it can be used." },
    { term: "Data lineage", def: "Record of how data moves and is transformed from source through processing into downstream datasets and models." },
    { term: "Datasheet for datasets", def: "Structured documentation of a dataset's motivation, composition, collection, uses and limitations." },
    { term: "Split-view poisoning", def: "Poisoning in which content at a curated URL is changed after curation so later downloads differ from what was reviewed." }
  ],
  sources: [
    { label: "Data & Trust Alliance — Data Provenance Standards", url: "https://dataandtrustalliance.org/work/data-provenance-standards" },
    { label: "Gebru et al. — Datasheets for Datasets", url: "https://arxiv.org/abs/1803.09010" },
    { label: "Carlini et al. — Poisoning Web-Scale Training Datasets is Practical", url: "https://arxiv.org/abs/2302.10149" },
    { label: "CISA et al. — AI Data Security (2025)", url: "https://www.cisa.gov/resources-tools/resources/ai-data-security-best-practices-securing-data-used-train-operate-ai-systems" }
  ]
},
{
  id: "d3c-data-poisoning",
  title: "Data Poisoning Prevention and Detection",
  concept: [
    { h: "What it is", body: "<p>An attacker manipulates training, fine-tuning or retrieval data to degrade the model, cause targeted errors, or implant a <b>backdoor</b> that triggers on a secret pattern. OWASP <b>LLM04</b> Data and Model Poisoning; NIST AI 100-2 poisoning attacks.</p>" },
    { h: "Common forms", body: "<ul><li><b>Backdoor/trojan</b> – hidden trigger causes chosen output</li><li><b>Label flipping</b> – wrong labels</li><li><b>Clean-label</b> – correct-looking labels, crafted samples</li><li><b>RAG/knowledge-base</b> poisoning</li><li><b>Supply chain</b> – poisoned pre-trained models</li><li><b>Split-view</b> – changed web content</li></ul>" },
    { h: "Prevent", body: "<p>Trusted, verified sources; provenance and hashes; access control and segregation of duties on datasets; validation and sanitization at ingestion; tight control over who can feed online/continuous learning or edit RAG corpora; vetted third-party models.</p>" },
    { h: "Detect and respond", body: "<p>Outlier/anomaly detection, data diffs before retraining, held-out and canary test sets, backdoor scanning, behaviour monitoring. Keep the ability to <b>roll back</b> to the last known-good model and dataset versions.</p>" }
  ],
  why: "<p>Poisoning is hard to see after training — the model looks normal until the trigger appears. Prevention at the data gate is far cheaper than finding a backdoor in production.</p>",
  mnemonics: [
    { device: "Bad Labels Can Ruin Smart Systems", type: "acronym", recall: "Six forms of data poisoning", text: "<b>B</b>ackdoor, <b>L</b>abel flipping, <b>C</b>lean-label, <b>R</b>AG poisoning, <b>S</b>upply-chain models, <b>S</b>plit-view web data." },
    { device: "The water treatment plant", type: "visual", recall: "Layered poisoning controls", text: "Protect the reservoir (trusted sources), filter the water (sanitize), test samples (canary sets), and keep a valve to switch to clean supply (rollback)." },
    { device: "Sleeper agent", type: "story", recall: "How a backdoor behaves", text: "A sleeper agent acts normally for years until hearing a code word. A backdoored model passes every test until it sees its trigger." }
  ],
  diagram: { type: "flow", title: "Poisoning defense pipeline", steps: [
    { label: "Trusted source", sub: "vetted, licensed" },
    { label: "Verify", sub: "hash, provenance" },
    { label: "Sanitize", sub: "outliers, diffs" },
    { label: "Train", sub: "access-controlled" },
    { label: "Test", sub: "canary, backdoor" },
    { label: "Monitor", sub: "rollback ready" } ] },
  examTip: "<p>Normal behaviour except on a specific pattern = <b>backdoor</b>. For continuous-learning systems, the BEST preventive control restricts and validates what can enter the training loop. After confirmed poisoning, contain first: <b>roll back</b>.</p>",
  keyPoints: [
    "Poisoning targets training, fine-tuning or retrieval data (OWASP LLM04)",
    "Forms: backdoor, label flip, clean-label, RAG, supply chain, split-view",
    "Prevent: trusted sources, provenance, access control, sanitization",
    "Detect: anomaly detection, canary/held-out tests, backdoor scans",
    "Respond: roll back to last known-good model and dataset"
  ],
  quiz: [
    { q: "An image classifier behaves normally except that it misclassifies any stop sign carrying a small yellow sticker. Which attack is MOST likely?",
      options: ["Model extraction", "Backdoor (trojan) poisoning", "Membership inference", "Denial of service"],
      answer: 1, explain: "A hidden trigger causing a specific wrong output while normal accuracy is preserved is the signature of a backdoor implanted through poisoned training data." },
    { q: "A fraud model continuously retrains on analyst and customer feedback. Which is the MOST effective PREVENTIVE control against poisoning?",
      options: ["Restrict and validate feedback sources, rate-limit contributions, and review before incorporation", "Switch to a larger model", "Encrypt the model weights", "Add more GPUs to retrain faster"],
      answer: 0, explain: "Controlling what enters the training loop prevents poisoning. Encryption protects confidentiality, not data integrity; model size and speed are irrelevant." },
    { q: "A company's RAG knowledge base is an internal wiki that every employee can edit. What is the PRIMARY risk?",
      options: ["Model overfitting", "Increased latency", "Copyright infringement", "Knowledge-base poisoning, including indirect prompt injection via edited pages"],
      answer: 3, explain: "Anyone who can edit retrieved content can plant false information or hidden instructions. Overfitting doesn't apply to retrieval; latency and copyright are lesser concerns." },
    { q: "Poisoning of a production model has been confirmed. Which capability is needed FIRST?",
      options: ["Issuing a press release", "Retraining on the same dataset", "Rolling back to the last known-good model and dataset versions", "Deleting the training logs"],
      answer: 2, explain: "Containment comes first: restore known-good versions to stop harm. Retraining on the same data repeats the poisoning; deleting logs destroys evidence." }
  ],
  glossary: [
    { term: "Data poisoning", def: "Manipulating data used to train, fine-tune or ground a model to corrupt its behaviour." },
    { term: "Backdoor attack", def: "Poisoning that makes a model produce attacker-chosen outputs when a specific trigger appears, while behaving normally otherwise." },
    { term: "Clean-label poisoning", def: "Poisoning using correctly labeled but subtly crafted samples, making it hard to spot by label review." },
    { term: "Label flipping", def: "Poisoning by changing the labels of training examples to incorrect values." },
    { term: "Canary test set", def: "A protected set of known inputs and expected outputs used to detect unexpected behaviour changes after retraining." }
  ],
  sources: [
    { label: "OWASP LLM04:2025 Data and Model Poisoning", url: "https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/" },
    { label: "NIST AI 100-2 E2025 Adversarial Machine Learning", url: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final" },
    { label: "MITRE ATLAS", url: "https://atlas.mitre.org/" }
  ]
},
{
  id: "d3c-access-encryption",
  title: "Classifying, Access-Controlling and Encrypting AI Data (incl. Vector Stores)",
  concept: [
    { h: "Inventory and classify first", body: "<p>Identify and classify AI data assets (task 13): training and fine-tuning sets, embeddings and vector databases, prompt/response logs, evaluation sets and model weights. Classification drives every handling control that follows.</p>" },
    { h: "Access control", body: "<p>Least privilege with RBAC/ABAC; separate roles (data owner, steward, data scientist); just-in-time access; logged break-glass; narrowly scoped service accounts; carry source-system permissions into vector stores.</p>" },
    { h: "Encryption in three states", body: "<ul><li><b>At rest</b> – KMS/HSM-managed keys; customer-managed keys with vendors</li><li><b>In transit</b> – TLS / mTLS</li><li><b>In use</b> – confidential computing (TEEs)</li></ul><p>Protect model weights like secrets; separate keys per tenant.</p>" },
    { h: "Vector stores are sensitive", body: "<p>Embeddings can be partly inverted to recover source text, leak across tenants, or be poisoned (OWASP <b>LLM08</b>). Give them the same classification as the source documents, isolate tenants, filter by permissions server-side, and log access.</p>" }
  ],
  why: "<p>AI concentrates data: a single vector store or training bucket may hold copies of thousands of sensitive documents. If you classify and protect the sources but not the AI copies, you've built a back door.</p>",
  mnemonics: [
    { device: "Rest, Road, Room", type: "chunk", recall: "Three data states needing encryption", text: "Data at <b>rest</b> (storage), on the <b>road</b> (in transit, TLS), in the <b>room</b> (in use, protected by a TEE)." },
    { device: "Embeddings are photocopies, not shredded paper", type: "visual", recall: "Why vector embeddings need protection", text: "An embedding looks like numbers, but it's a blurry photocopy of the original — enough can be recovered to leak secrets. Classify it like the original." },
    { device: "CARE for AI data", type: "acronym", recall: "Order of AI data protection steps", text: "<b>C</b>lassify, restrict <b>A</b>ccess, encrypt at <b>R</b>est/road/room, and treat <b>E</b>mbeddings as sensitive." }
  ],
  diagram: { type: "matrix", title: "Encrypting AI data", rows: ["At rest", "In transit", "In use"], cols: ["Control", "Example"], cells: [
    ["Encrypt with managed keys", "KMS/HSM, customer-managed keys"],
    ["Encrypt the channel", "TLS 1.2+/mTLS"],
    ["Protect during compute", "TEE / confidential VM"] ] },
  examTip: "<p>'Inventory and classify' is the FIRST step before choosing protection controls. If a team claims embeddings aren't sensitive 'because they're just numbers', the correct answer classifies them like the source data.</p>",
  keyPoints: [
    "Inventory and classify AI data assets first (incl. embeddings, logs, weights)",
    "Least privilege, role separation, scoped service accounts",
    "Encrypt at rest, in transit, in use (TEE)",
    "Vector stores: same classification as sources, tenant isolation (LLM08)"
  ],
  quiz: [
    { q: "A team argues that embeddings stored in a vector database are not sensitive because they are only numbers. What is the BEST response?",
      options: ["Agree, and exclude the vector database from classification", "Classify embeddings at the same level as their source data, since information can be recovered from them", "Delete the vector database", "Encrypt the embeddings in transit only"],
      answer: 1, explain: "Embeddings can leak source content through inversion and similarity search. Excluding them creates an unprotected copy; transit encryption alone leaves stored copies exposed." },
    { q: "What is the FIRST step in protecting the data assets of a new AI program?",
      options: ["Inventory and classify AI data assets", "Purchase an encryption solution", "Train data scientists", "Penetration test the data platform"],
      answer: 0, explain: "You can't apply proportionate controls until you know what data exists and how sensitive it is. Tools, training and testing follow classification." },
    { q: "A SaaS vector database is shared by several business units with different access rights. Which control is MOST important?",
      options: ["Filtering results in the client application only", "Longer API keys", "Daily backups", "Server-side tenant isolation and permission-based filtering"],
      answer: 3, explain: "Isolation enforced server-side prevents cross-tenant leakage even if a client is compromised. Client-side filtering can be bypassed; backups and key length don't address authorization." },
    { q: "Which control protects training data while it is being processed on cloud GPUs?",
      options: ["TLS encryption", "Full-disk encryption", "Confidential computing using a trusted execution environment", "Hashing the dataset"],
      answer: 2, explain: "Data in use is protected by TEEs/confidential computing. TLS covers transit, disk encryption covers rest, hashing provides integrity, not confidentiality." }
  ],
  glossary: [
    { term: "Embedding", def: "A numeric vector representing the meaning of text, images or other data, used for similarity search." },
    { term: "Vector database", def: "A data store optimized for storing and searching embeddings, commonly used in RAG." },
    { term: "Data classification", def: "Assigning sensitivity levels to data so that handling and protection controls are proportionate." },
    { term: "Customer-managed key", def: "Encryption key controlled by the customer rather than the service provider, allowing revocation." }
  ],
  sources: [
    { label: "OWASP LLM08:2025 Vector and Embedding Weaknesses", url: "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/" },
    { label: "CISA et al. — AI Data Security (2025)", url: "https://www.cisa.gov/resources-tools/resources/ai-data-security-best-practices-securing-data-used-train-operate-ai-systems" }
  ]
},
{
  id: "d3c-retention-unlearning",
  title: "Data Minimization, Retention, Deletion and Machine Unlearning",
  concept: [
    { h: "Minimize", body: "<p>Collect and keep only data needed for the defined purpose (GDPR <b>data minimisation</b>, Art. 5(1)(c)). Drop unneeded fields and personal data; prefer aggregated, pseudonymized or synthetic data; avoid logging full prompts unless there's a need.</p>" },
    { h: "Retain on a schedule", body: "<p>Set retention periods for raw data, training sets, prompt/response logs and model versions. Balance <b>storage limitation</b> (Art. 5(1)(e)) against legal holds and regulatory logging duties. Automate deletion.</p>" },
    { h: "Deletion is hard in AI", body: "<p>Deleting a record from storage does <b>not</b> remove its influence on trained weights. Models can memorize and regurgitate training data, so erasure requests may affect models too.</p>" },
    { h: "Machine unlearning limits", body: "<p><b>Exact</b> unlearning usually means retraining without the data — costly. <b>Approximate</b> methods are hard to verify. Designs like SISA (sharded training) cut retraining cost. Plan before training: minimize personal data, track lineage, design for retraining.</p>" }
  ],
  why: "<p>Every extra record is extra breach impact and extra deletion work later. Minimization decided at design time is the cheapest privacy control in the AI life cycle.</p>",
  mnemonics: [
    { device: "Need it, Keep it short, Kill it on time", type: "chunk", recall: "Minimization, retention and deletion in one line", text: "<b>Need</b> it (minimize), <b>keep</b> it only as long as required (retention), <b>kill</b> it on schedule (automated deletion)." },
    { device: "Taking sugar out of a baked cake", type: "visual", recall: "Why machine unlearning is hard", text: "Once baked in, you can't pick the sugar out — it's easier to bake a new cake without it (retrain). Approximate unlearning is scraping icing off and hoping." }
  ],
  diagram: { type: "flow", title: "Data life in an AI system", steps: [
    { label: "Collect min.", sub: "purpose-bound" },
    { label: "Retain", sub: "scheduled periods" },
    { label: "Delete", sub: "automated" },
    { label: "Assess model", sub: "memorization?" },
    { label: "Unlearn", sub: "retrain or approx." } ] },
  examTip: "<p>For erasure requests touching trained models, the BEST answer deletes from datasets <b>and</b> assesses the model (retrain or unlearn based on risk and legal advice), documenting the decision — neither 'impossible' nor 'always delete the model'.</p>",
  keyPoints: [
    "Minimize personal data at design time (GDPR Art. 5(1)(c))",
    "Define and automate retention for data, logs and model versions",
    "Deleting source data doesn't remove influence from trained weights",
    "Exact unlearning ≈ retraining; approximate unlearning is hard to verify",
    "Lineage tells you which models a deletion request affects"
  ],
  quiz: [
    { q: "An individual exercises their right to erasure, and their data was in the training set of a deployed model. What is the BEST course of action?",
      options: ["Reply that erasure is impossible once a model is trained", "Delete only the raw record and take no action on the model", "Delete the record from datasets and assess the model's retention of it, retraining or applying unlearning as risk and legal advice require, and document the decision", "Always delete the model immediately"],
      answer: 2, explain: "A risk-based, documented approach handles both stored data and model influence. Claiming impossibility or ignoring the model is non-compliant; automatically deleting the model is disproportionate." },
    { q: "Which practice MOST reduces the future burden of machine unlearning?",
      options: ["Minimizing personal data in training sets and tracking lineage so affected models can be identified", "Encrypting model weights", "Using larger models", "Keeping all historical data indefinitely"],
      answer: 0, explain: "Less personal data in training means fewer models to fix, and lineage pinpoints which ones. Encryption and model size don't affect unlearning; keeping everything increases the burden." },
    { q: "A chatbot stores full user prompts indefinitely 'for future analytics'. What is the PRIMARY concern?",
      options: ["It slows model inference", "It introduces model bias", "It increases vendor lock-in", "It conflicts with minimization and storage limitation and increases breach impact"],
      answer: 3, explain: "Indefinite retention without a defined purpose breaches privacy principles and enlarges the impact of any breach. Performance and lock-in are secondary." },
    { q: "Why is relying on approximate machine unlearning for compliance risky?",
      options: ["It is prohibited by law", "It is difficult to verify that the data's influence has been fully removed", "It deletes audit logs", "It is always slower than retraining"],
      answer: 1, explain: "Approximate methods lack strong guarantees, so proving removal to a regulator is hard. They are not illegal and are usually faster than full retraining." }
  ],
  glossary: [
    { term: "Data minimisation", def: "Privacy principle of limiting personal data to what is adequate, relevant and necessary for the purpose." },
    { term: "Storage limitation", def: "Privacy principle of keeping personal data in identifiable form no longer than necessary." },
    { term: "Machine unlearning", def: "Techniques to remove the influence of specific training data from a trained model." },
    { term: "Memorization", def: "A model storing and reproducing specific training examples rather than only general patterns." }
  ],
  sources: [
    { label: "GDPR — Regulation (EU) 2016/679", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
    { label: "Bourtoule et al. — Machine Unlearning (SISA)", url: "https://arxiv.org/abs/1912.03817" }
  ]
},
{
  id: "d3c-synthetic-data",
  title: "Synthetic Data",
  concept: [
    { h: "What it is", body: "<p>Artificially generated data that mimics the statistical properties of real data, produced by generative models, simulation or rules. Uses: privacy protection, filling gaps and rare cases, testing, and class balancing.</p>" },
    { h: "Not automatically anonymous", body: "<p>Generators can memorize and reproduce real records, especially outliers. Test privacy (e.g., membership-inference and nearest-record checks) and consider differentially private generators before sharing.</p>" },
    { h: "Evaluate three things", body: "<ul><li><b>Fidelity</b> – resembles the real distribution</li><li><b>Utility</b> – models trained on it work on real data</li><li><b>Privacy</b> – no re-identification</li></ul><p>More fidelity usually means more privacy risk.</p>" },
    { h: "Other risks", body: "<p>Copies or amplifies source bias; misses real-world edge cases; <b>model collapse</b> when models are repeatedly trained on AI-generated output. Label synthetic data clearly in lineage.</p>" }
  ],
  why: "<p>Synthetic data is often pitched as a privacy fix. The security manager makes sure it is evaluated, not assumed safe, before it's shared or used to make decisions.</p>",
  mnemonics: [
    { device: "The FUP triangle", type: "visual", recall: "Three synthetic data evaluation criteria", text: "<b>F</b>idelity, <b>U</b>tility, <b>P</b>rivacy at the corners of a triangle: pull one corner and the others stretch." },
    { device: "Photocopy of a photocopy", type: "story", recall: "Model collapse", text: "Copy a copy enough times and the picture fades to grey. Models trained on model output lose detail and diversity the same way." }
  ],
  diagram: { type: "hub", title: "Synthetic data checks", center: "Synthetic data", steps: [
    { label: "Fidelity", sub: "looks like real" },
    { label: "Utility", sub: "train-synth/test-real" },
    { label: "Privacy", sub: "no re-identification" },
    { label: "Bias", sub: "not amplified" },
    { label: "Lineage label", sub: "marked synthetic" } ] },
  examTip: "<p>'It's synthetic, so it's safe to publish' is a trap. The BEST answer requires a privacy evaluation first. Validate models trained on synthetic data against <b>real</b> held-out data.</p>",
  keyPoints: [
    "Synthetic data mimics real data statistics; not automatically anonymous",
    "Evaluate fidelity, utility and privacy",
    "Can amplify bias and miss real edge cases",
    "Model collapse: degradation from training on AI-generated data"
  ],
  quiz: [
    { q: "A team says synthetic patient data is safe to publish because it contains no real records. What is the BEST response?",
      options: ["Agree and publish it", "Encrypt it before publishing", "Require a privacy evaluation, such as re-identification and membership tests, before release", "Publish only half of the records"],
      answer: 2, explain: "Generators can memorize real records, so privacy must be tested. Encryption doesn't apply to published data; halving the data doesn't remove leaked records." },
    { q: "Synthetic data is used to augment rare fraud cases. Which risk should be monitored MOST closely?",
      options: ["It may not reflect real attacker behaviour and could amplify bias, so validate on real held-out data", "Its file size", "Its software license", "Inference latency"],
      answer: 0, explain: "Synthetic samples reflect the generator's assumptions, not attackers' real tactics. Validation on real data reveals whether the augmentation helps." },
    { q: "What does 'model collapse' refer to?",
      options: ["A server crash during training", "Theft of model weights", "Failure of encryption on model files", "Degradation in quality and diversity when models are repeatedly trained on AI-generated data"],
      answer: 3, explain: "Model collapse describes recursive training on synthetic output eroding the model's grasp of the real distribution." },
    { q: "Which evaluation BEST demonstrates the utility of a synthetic dataset?",
      options: ["Visually inspecting sample records", "Training on synthetic data and testing on real data, compared with a model trained on real data", "Counting the number of rows", "Checking the file format"],
      answer: 1, explain: "Train-synthetic/test-real measures whether the data supports real-world performance. Inspection and row counts say nothing about usefulness." }
  ],
  glossary: [
    { term: "Synthetic data", def: "Artificially generated data designed to reflect the statistical properties of real data." },
    { term: "Model collapse", def: "Progressive degradation of models trained on data generated by other models." },
    { term: "Fidelity", def: "How closely synthetic data matches the statistical properties of the real data." },
    { term: "TSTR", def: "Train on synthetic, test on real: a method for measuring synthetic data utility." }
  ],
  sources: [
    { label: "Shumailov et al. — AI models collapse when trained on recursively generated data (Nature, 2024)", url: "https://www.nature.com/articles/s41586-024-07566-y" },
    { label: "UK ICO — Privacy-enhancing technologies guidance", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/privacy-enhancing-technologies/" }
  ]
}
];

/* ---------------- 3D Privacy, Ethical, Trust and Safety Controls ---------------- */
var d3d = [
{
  id: "d3d-pets",
  title: "Privacy-Enhancing Technologies (DP, FL, HE, SMPC, TEEs)",
  concept: [
    { h: "Differential privacy (DP)", body: "<p>Adds calibrated noise so results barely change whether or not any one person is included. The privacy budget <b>ε (epsilon)</b>: <b>smaller ε = stronger privacy</b>, less accuracy. DP-SGD applies it during training. NIST SP 800-226 guides evaluating DP claims.</p>" },
    { h: "Federated learning (FL)", body: "<p>Train where the data lives; only model <b>updates</b> go to a central aggregator. Raw data doesn't move, but updates can still leak information or be poisoned — pair FL with secure aggregation, DP and anomaly detection.</p>" },
    { h: "Cryptographic PETs", body: "<p><b>Homomorphic encryption (HE)</b>: compute directly on encrypted data — strong, but slow and costly. <b>Secure multi-party computation (SMPC)</b>: several parties jointly compute a result (e.g., private set intersection) without revealing their inputs to each other.</p>" },
    { h: "Trusted execution environments (TEEs)", body: "<p>Hardware-isolated enclaves or confidential VMs protect data and models <b>in use</b>, even from cloud administrators. <b>Remote attestation</b> proves what code is running. Trust shifts to the hardware vendor; side-channel attacks remain a concern.</p>" },
    { h: "Choosing a PET", body: "<p>No PET is a silver bullet. Start from the threat — <b>who must not see what</b> — then weigh performance, maturity and cost. PETs are often combined (e.g., FL + secure aggregation + DP).</p>" }
  ],
  why: "<p>PETs let the business use sensitive data for AI that would otherwise be off-limits. The security manager must match the PET to the threat and avoid over-trusting any single technique.</p>",
  mnemonics: [
    { device: "Don't Forget How Secrets Travel", type: "acronym", recall: "Five main privacy-enhancing technologies", text: "<b>D</b>P, <b>F</b>ederated learning, <b>H</b>omomorphic encryption, <b>S</b>MPC, <b>T</b>EEs." },
    { device: "Five pictures", type: "visual", recall: "What each PET does", text: "<b>DP</b> = crowd noise hides one voice. <b>FL</b> = the teacher travels; students stay home. <b>HE</b> = glovebox: work inside without opening it. <b>SMPC</b> = average salaries without anyone revealing theirs. <b>TEE</b> = sealed vault room with a camera proving who's inside (attestation)." },
    { device: "Small epsilon, small leak", type: "chunk", recall: "Effect of epsilon in differential privacy", text: "Lower ε → more noise → stronger privacy but less accuracy. Higher ε → less noise → weaker privacy." }
  ],
  diagram: { type: "hub", title: "PET toolbox", center: "PETs", steps: [
    { label: "DP", sub: "noise; ε budget" },
    { label: "Federated", sub: "data stays local" },
    { label: "Homomorphic", sub: "compute encrypted" },
    { label: "SMPC", sub: "joint, inputs hidden" },
    { label: "TEE", sub: "hardware enclave" } ] },
  examTip: "<p>Map the scenario to the PET: data can't leave sites → <b>FL</b>; publish statistics safely → <b>DP</b>; parties compare data without disclosing it → <b>SMPC</b>; cloud admin mustn't see data in use → <b>TEE</b>; compute on ciphertext → <b>HE</b>.</p>",
  keyPoints: [
    "DP: calibrated noise; smaller ε = stronger privacy",
    "FL: data stays local; updates can leak or be poisoned",
    "HE: compute on encrypted data; high overhead",
    "SMPC: joint computation without revealing inputs",
    "TEE: protects data in use; attestation; hardware trust",
    "Pick PETs by threat; combine them"
  ],
  quiz: [
    { q: "Several hospitals want to jointly train a diagnostic model, but regulations prevent them from sharing patient records. Which approach is MOST appropriate?",
      options: ["Centralize the records in a cloud data lake with encryption at rest", "Federated learning with secure aggregation", "Remove names and email the files to one hospital", "Homomorphic encryption of the data in storage only"],
      answer: 1, explain: "FL keeps records on site and shares only model updates, with secure aggregation protecting individual updates. Centralizing or emailing data still shares the records." },
    { q: "An analytics team will publish statistics using differential privacy and is choosing between ε = 10 and ε = 0.5. Which statement is TRUE?",
      options: ["ε = 10 provides stronger privacy", "Both values provide the same privacy", "ε affects only computation speed", "ε = 0.5 provides stronger privacy but adds more noise"],
      answer: 3, explain: "A smaller privacy budget means more noise and stronger guarantees, at the cost of accuracy." },
    { q: "Cloud provider administrators must not be able to view model weights or customer data during inference. Which control is BEST?",
      options: ["Confidential computing in a TEE with remote attestation", "TLS between client and service", "Differential privacy on outputs", "Pseudonymization of customer IDs"],
      answer: 0, explain: "TEEs protect data in use from the host and its administrators, and attestation verifies the environment. TLS protects transit; DP and pseudonymization don't hide weights from admins." },
    { q: "Two banks want to identify shared fraudulent customers without revealing their full customer lists to each other. Which technique BEST fits?",
      options: ["Federated learning", "Differential privacy", "Secure multi-party computation, such as private set intersection", "Synthetic data generation"],
      answer: 2, explain: "SMPC/private set intersection reveals only the overlap. FL trains models rather than matching records; DP and synthetic data prevent exact matching." },
    { q: "What limitation of federated learning should the security manager highlight?",
      options: ["Shared model updates can still leak information or be poisoned, so secure aggregation, DP and anomaly detection are needed", "It requires centralizing all raw data", "It cannot train neural networks", "It is prohibited under the EU AI Act"],
      answer: 0, explain: "FL reduces data movement but not all risk: updates can reveal training data and malicious participants can poison the global model." }
  ],
  glossary: [
    { term: "Differential privacy", def: "Mathematical privacy guarantee achieved by adding calibrated noise so outputs reveal little about any individual." },
    { term: "Epsilon (ε)", def: "The differential privacy budget; smaller values mean stronger privacy and more noise." },
    { term: "Federated learning", def: "Training a shared model across decentralized data holders by exchanging model updates, not raw data." },
    { term: "Homomorphic encryption", def: "Encryption that allows computation on ciphertext, producing encrypted results." },
    { term: "SMPC", def: "Secure multi-party computation: parties jointly compute a function over their inputs while keeping those inputs private." },
    { term: "TEE", def: "Trusted execution environment: hardware-isolated area protecting code and data in use, with remote attestation." }
  ],
  sources: [
    { label: "NIST SP 800-226 Guidelines for Evaluating Differential Privacy Guarantees", url: "https://csrc.nist.gov/pubs/sp/800/226/final" },
    { label: "UK ICO — Privacy-enhancing technologies", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/privacy-enhancing-technologies/" },
    { label: "Confidential Computing Consortium", url: "https://confidentialcomputing.io/" }
  ]
},
{
  id: "d3d-deidentification",
  title: "Anonymization vs Pseudonymization",
  concept: [
    { h: "Pseudonymization", body: "<p>Replace identifiers with tokens or codes; re-identification is possible using additional information kept separately (e.g., a key or mapping table). Under GDPR (Art. 4(5)) pseudonymized data is <b>still personal data</b> — it reduces risk, not obligations.</p>" },
    { h: "Anonymization", body: "<p>Irreversibly prevents identification by any means reasonably likely to be used (GDPR Recital 26). Truly anonymous data falls <b>outside</b> GDPR — but the bar is high and must be tested.</p>" },
    { h: "Techniques", body: "<ul><li>Masking, tokenization, keyed hashing</li><li>Generalization (age bands), suppression, aggregation</li><li>Models: k-anonymity, l-diversity, t-closeness</li><li>Differential privacy for formal guarantees</li></ul><p>Unkeyed hashes of guessable values (emails, phone numbers) can be reversed by brute force.</p>" },
    { h: "Re-identification risk in AI", body: "<p><b>Linkage attacks</b> combine quasi-identifiers (postcode, birth date, gender) with other datasets. Models can also memorize records. Re-assess periodically — risk grows as more auxiliary data becomes available.</p>" }
  ],
  why: "<p>Calling data 'anonymous' when it's only pseudonymized is a common, costly compliance error. The distinction decides whether privacy law applies to an AI training set.</p>",
  mnemonics: [
    { device: "Pseudo keeps the key", type: "chunk", recall: "Core difference between pseudonymization and anonymization", text: "If <b>anyone</b> holds a key or mapping that can re-identify people, it's <b>pseudo</b>nymized — still personal data. No key, no reasonable way back = anonymous." },
    { device: "Mask vs melted face", type: "visual", recall: "Reversibility of the two techniques", text: "Pseudonymization is a mask — it can come off. Anonymization melts the face — there's nothing to recognize." },
    { device: "ZIP + Birthday + Gender = door key", type: "story", recall: "Quasi-identifiers and linkage attacks", text: "No names in the file, yet postcode, birth date and gender together unlock most people's identity when matched to a public list." }
  ],
  diagram: { type: "matrix", title: "Pseudonymized vs anonymized", rows: ["Pseudonymized", "Anonymized"], cols: ["Reversible?", "Personal data (GDPR)?", "Typical use"], cells: [
    ["Yes, with key/extra info", "Yes", "Internal analytics, training"],
    ["No (if done properly)", "No", "Open data, external sharing"] ] },
  examTip: "<p>If a mapping table or key exists anywhere in the organization, the data is <b>pseudonymized</b>, not anonymous. Removing names but keeping quasi-identifiers is a re-identification risk.</p>",
  keyPoints: [
    "Pseudonymized = reversible with extra info; still personal data",
    "Anonymized = not reasonably re-identifiable; outside GDPR",
    "Unkeyed hashes of guessable values are reversible",
    "Quasi-identifiers enable linkage re-identification",
    "Re-assess anonymization periodically"
  ],
  quiz: [
    { q: "A team replaces customer names with IDs and keeps the mapping table in another database. They state the training data is anonymous, so GDPR no longer applies. Is this correct?",
      options: ["Yes, because names have been removed", "Yes, as long as the mapping table is encrypted", "No — the data is pseudonymized and remains personal data", "Only if the dataset has fewer than 1,000 records"],
      answer: 2, explain: "Re-identification is possible with the mapping table, so this is pseudonymization. Encrypting the table protects it but doesn't make the data anonymous." },
    { q: "A dataset removes names but keeps postcode, full date of birth and gender. What is the MAIN risk?",
      options: ["Re-identification through linkage of quasi-identifiers", "Data poisoning", "Concept drift", "Model extraction"],
      answer: 0, explain: "These quasi-identifiers can be linked to external data to identify individuals. The other risks are unrelated to de-identification." },
    { q: "Which technique BEST reduces the risk that tokenized email addresses could be reversed by an outsider?",
      options: ["Unkeyed SHA-256 hashing", "Base64 encoding", "Converting emails to upper case", "Keyed hashing (HMAC) or vault tokenization with the key held separately"],
      answer: 3, explain: "Without the secret key, an outsider can't brute-force guessable emails. Unkeyed hashes can be reversed by hashing candidate emails; encoding is trivially reversible." },
    { q: "Why should the effectiveness of anonymization be re-assessed periodically?",
      options: ["Hash functions expire annually", "New auxiliary datasets and techniques can increase re-identification risk over time", "Storage costs change", "Regulations require monthly re-anonymization"],
      answer: 1, explain: "Re-identification risk depends on what other data is available, which keeps growing. Hashes don't expire, and there is no universal monthly requirement." }
  ],
  glossary: [
    { term: "Pseudonymization", def: "Processing personal data so it can't be attributed to a person without additional information kept separately; still personal data under GDPR." },
    { term: "Anonymization", def: "Irreversibly transforming data so individuals can't be identified by any means reasonably likely to be used." },
    { term: "Quasi-identifier", def: "An attribute (e.g., postcode, birth date) that is not unique alone but can identify someone when combined with others." },
    { term: "k-anonymity", def: "Property that each record is indistinguishable from at least k−1 others on its quasi-identifiers." },
    { term: "Linkage attack", def: "Re-identifying individuals by joining a de-identified dataset with other data sources." }
  ],
  sources: [
    { label: "GDPR Art. 4(5) and Recital 26 — Regulation (EU) 2016/679", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
    { label: "EDPB Guidelines 01/2025 on pseudonymisation", url: "https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-pseudonymisation_en" },
    { label: "UK ICO — Anonymisation guidance", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/" }
  ]
},
{
  id: "d3d-bias-fairness",
  title: "Bias and Fairness Controls",
  concept: [
    { h: "Where bias comes from", body: "<p>NIST SP 1270 groups AI bias into three categories: <b>systemic</b> (institutional and historical), <b>human</b> (cognitive, e.g., confirmation or automation bias), and <b>statistical/computational</b> (sampling, measurement, algorithmic). Bias can enter at every life-cycle stage.</p>" },
    { h: "Measuring fairness", body: "<p>Common metrics: <b>demographic parity</b> (equal positive rates), <b>equal opportunity</b> (equal true-positive rates), <b>equalized odds</b> (equal TPR and FPR), <b>predictive parity</b>. When base rates differ, they generally can't all be satisfied at once — choose with business, legal and affected stakeholders.</p>" },
    { h: "Where to mitigate", body: "<ul><li><b>Pre-processing</b> – rebalance or reweigh the data</li><li><b>In-processing</b> – fairness constraints in training</li><li><b>Post-processing</b> – adjust thresholds per group</li></ul><p>Plus governance: diverse teams, impact assessments, human review of adverse decisions, monitoring by group.</p>" },
    { h: "Legal hooks", body: "<p>EU AI Act Art. 10 requires examining and mitigating bias in high-risk data and, under strict safeguards, allows processing special-category data for bias detection (Art. 10(5)). Also anti-discrimination law, NYC Local Law 144 bias audits for hiring tools, and the US 'four-fifths' disparate-impact screen.</p>" }
  ],
  why: "<p>Biased AI creates legal liability, reputational damage and real harm. Fairness is a business and legal decision the security manager helps operationalize through controls and monitoring.</p>",
  mnemonics: [
    { device: "Society, Heads, Sums", type: "chunk", recall: "NIST SP 1270 bias categories", text: "Bias lives in <b>society</b> (systemic), in our <b>heads</b> (human/cognitive), and in the <b>sums</b> (statistical/computational)." },
    { device: "Ingredients, recipe, plating", type: "visual", recall: "Pre-, in- and post-processing bias mitigation", text: "Fix the <b>ingredients</b> (pre: data), the <b>recipe</b> (in: training constraints) or the <b>plating</b> (post: thresholds) of the dish." }
  ],
  diagram: { type: "matrix", title: "Bias mitigation points", rows: ["Pre-processing", "In-processing", "Post-processing"], cols: ["Acts on", "Example"], cells: [
    ["Training data", "Reweighing, resampling"],
    ["Learning algorithm", "Fairness constraints"],
    ["Model outputs", "Group-aware thresholds"] ] },
  examTip: "<p>No single fairness metric is 'correct'; the BEST answer chooses metrics with stakeholders based on context and documents why. If you can't retrain a vendor model, post-processing and human review remain options. Ongoing monitoring by group beats a one-time test.</p>",
  keyPoints: [
    "NIST SP 1270: systemic, human, statistical/computational bias",
    "Fairness metrics can conflict; choose by context and document",
    "Mitigate pre-, in- or post-processing, plus governance",
    "EU AI Act Art. 10 requires bias examination for high-risk data",
    "Monitor outcomes by group in production"
  ],
  quiz: [
    { q: "A hiring model trained on ten years of past hiring decisions favours male candidates. Which type of bias is PRIMARILY responsible?",
      options: ["Random measurement noise", "Hardware-induced error", "Overfitting alone", "Systemic (historical) bias reflected in the training data"],
      answer: 3, explain: "The data encodes past institutional decisions, so the model learns historical bias. Noise and overfitting don't explain a consistent demographic skew." },
    { q: "A team cannot satisfy both demographic parity and equalized odds for a lending model. What is the BEST approach?",
      options: ["Select the fairness metric with business, legal and affected stakeholders based on context, and document the rationale", "Choose whichever metric gives the highest accuracy", "Drop fairness requirements", "Let the model vendor decide"],
      answer: 0, explain: "Fairness trade-offs are value and legal decisions requiring accountable stakeholders. Optimizing for accuracy or deferring to the vendor avoids accountability." },
    { q: "An organization uses a vendor model it cannot retrain and finds disparate outcomes. Which mitigation is MOST feasible?",
      options: ["Pre-processing the vendor's training data", "Post-processing, such as adjusting decision thresholds, with human review of adverse outcomes", "In-processing fairness constraints", "Ignoring the disparity because the vendor is responsible"],
      answer: 1, explain: "Post-processing works on outputs without access to training. Pre- and in-processing require the training pipeline; accountability for impacts stays with the deployer." },
    { q: "Which is the MOST important ongoing fairness control after deployment?",
      options: ["A one-time fairness test at launch", "Annual awareness training", "Monitoring outcomes by relevant groups and triggering review when disparities exceed thresholds", "Collecting a larger dataset"],
      answer: 2, explain: "Fairness can drift as populations change; monitoring with thresholds detects it. A launch test is a snapshot only." }
  ],
  glossary: [
    { term: "Systemic bias", def: "Bias from institutional practices and historical patterns that disadvantage certain groups." },
    { term: "Demographic parity", def: "Fairness criterion requiring similar positive-outcome rates across groups." },
    { term: "Equalized odds", def: "Fairness criterion requiring equal true-positive and false-positive rates across groups." },
    { term: "Four-fifths rule", def: "US screening guideline: a selection rate for a group below 80% of the highest group's rate may indicate adverse impact." },
    { term: "Disparate impact", def: "A practice that appears neutral but disproportionately harms a protected group." }
  ],
  sources: [
    { label: "NIST SP 1270 Towards a Standard for Identifying and Managing Bias in AI", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf" },
    { label: "EU AI Act Art. 10", url: "https://artificialintelligenceact.eu/article/10/" },
    { label: "NYC Automated Employment Decision Tools (Local Law 144)", url: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page" }
  ]
},
{
  id: "d3d-explainability",
  title: "Explainability, Interpretability and Model Documentation",
  concept: [
    { h: "Two related ideas", body: "<p><b>Interpretability</b>: how understandable the model's mechanics are (e.g., linear models, small decision trees). <b>Explainability</b>: the ability to give reasons for an output, often through post-hoc methods. NIST AI RMF lists 'explainable and interpretable' as a trustworthiness characteristic.</p>" },
    { h: "Methods: global vs local", body: "<ul><li><b>Global</b> – how the model works overall: feature importance, partial dependence</li><li><b>Local</b> – why this decision: SHAP, LIME, counterfactuals</li></ul><p><b>SHAP</b> uses Shapley values to attribute a prediction to features. <b>LIME</b> fits a simple surrogate model around one prediction.</p>" },
    { h: "Limits of explanations", body: "<p>Post-hoc explanations are <b>approximations</b>: they can be unstable, misleading or even manipulated. For high-stakes decisions, an inherently interpretable model may be preferable if it performs adequately.</p>" },
    { h: "NIST's four principles", body: "<p>NISTIR 8312: <b>Explanation</b> (give reasons), <b>Meaningful</b> (understandable to the audience), <b>Explanation accuracy</b> (reflects the real process), <b>Knowledge limits</b> (operates only within its design conditions and signals when it's outside them).</p>" },
    { h: "Documentation", body: "<p><b>Model cards</b> (intended use, performance by group, limitations), <b>datasheets</b> for datasets, system cards. EU AI Act Art. 13 requires high-risk systems to come with instructions for use for deployers; GDPR Art. 22 covers solely automated decisions.</p>" }
  ],
  why: "<p>Explanations let regulators, auditors, customers and your own staff trust — and challenge — AI decisions. Without them, errors and bias go undetected and adverse decisions are hard to defend.</p>",
  mnemonics: [
    { device: "Every Model Asks for Knowledge", type: "acronym", recall: "NIST four principles of explainable AI", text: "<b>E</b>xplanation, <b>M</b>eaningful, explanation <b>A</b>ccuracy, <b>K</b>nowledge limits." },
    { device: "SHAP shares the bonus; LIME shines a flashlight", type: "visual", recall: "SHAP vs LIME", text: "<b>SHAP</b> splits a team bonus fairly among players (features) using game theory. <b>LIME</b> shines a local flashlight on one prediction and sketches a simple model of just that spot." },
    { device: "Global = map, Local = street view", type: "chunk", recall: "Global vs local explanations", text: "Global explanations show the whole map of how the model behaves; local explanations show street view of one decision." }
  ],
  diagram: { type: "matrix", title: "Explanation scope", rows: ["Global", "Local"], cols: ["Question answered", "Example methods"], cells: [
    ["How does the model work overall?", "Feature importance, partial dependence, aggregated SHAP"],
    ["Why this specific decision?", "SHAP values, LIME, counterfactuals"] ] },
  examTip: "<p>An individual asking 'why was I denied?' needs a <b>local</b> explanation. For high-stakes, regulated decisions, prefer an inherently interpretable model when performance allows. A model answering confidently far outside its training domain violates <b>knowledge limits</b>.</p>",
  keyPoints: [
    "Interpretability = understandable mechanics; explainability = reasons for outputs",
    "Global vs local explanations; SHAP and LIME are local (SHAP also aggregates)",
    "Post-hoc explanations are approximations and can mislead",
    "NIST principles: explanation, meaningful, accuracy, knowledge limits",
    "Model cards document intended use, performance by group, limitations"
  ],
  quiz: [
    { q: "A loan applicant who was declined asks why. Which technique provides a reason for this individual decision?",
      options: ["The model's overall accuracy", "A local explanation such as SHAP values or a counterfactual", "The confusion matrix", "The training loss curve"],
      answer: 1, explain: "Local methods explain a specific prediction. Accuracy, confusion matrices and loss curves describe the model in aggregate." },
    { q: "For a high-stakes decision where regulators demand transparency, which approach is generally BEST?",
      options: ["Use the deepest available neural network and explain it with LIME", "Provide no explanations to protect intellectual property", "Prefer an inherently interpretable model if it meets performance requirements", "Use a black-box vendor model with contractual assurances"],
      answer: 2, explain: "Inherently interpretable models give faithful explanations, while post-hoc explanations of black boxes are approximations. Withholding explanations ignores regulatory demands." },
    { q: "What is the PRIMARY purpose of a model card?",
      options: ["To document intended use, performance including by subgroup, limitations and ethical considerations", "To store the model weights", "To encrypt the model", "To market the model to customers"],
      answer: 0, explain: "Model cards are transparency documentation for stakeholders, not storage, security or marketing artifacts." },
    { q: "A model gives confident answers to inputs far outside the domain it was trained on. Which NIST explainability principle is MOST clearly violated?",
      options: ["Meaningful", "Explanation", "Explanation accuracy", "Knowledge limits"],
      answer: 3, explain: "Knowledge limits require systems to operate only under conditions they were designed for and to signal when they're outside them." }
  ],
  glossary: [
    { term: "Explainability", def: "Ability to describe why an AI system produced a particular output in terms humans can understand." },
    { term: "Interpretability", def: "Degree to which a human can understand how a model's internal mechanics map inputs to outputs." },
    { term: "SHAP", def: "SHapley Additive exPlanations: attributes a prediction to input features using Shapley values from game theory." },
    { term: "LIME", def: "Local Interpretable Model-agnostic Explanations: approximates a model locally with a simple surrogate to explain one prediction." },
    { term: "Counterfactual explanation", def: "Explanation stating what minimal change to the input would have changed the outcome." }
  ],
  sources: [
    { label: "NISTIR 8312 Four Principles of Explainable AI", url: "https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8312.pdf" },
    { label: "Mitchell et al. — Model Cards for Model Reporting", url: "https://arxiv.org/abs/1810.03993" },
    { label: "Lundberg & Lee — SHAP", url: "https://arxiv.org/abs/1705.07874" },
    { label: "Ribeiro et al. — LIME", url: "https://arxiv.org/abs/1602.04938" }
  ]
},
{
  id: "d3d-human-oversight",
  title: "Risk-Based Human Oversight (HITL, HOTL, HIC)",
  concept: [
    { h: "Three oversight models", body: "<ul><li><b>Human-in-the-loop (HITL)</b> – a human intervenes in every decision cycle</li><li><b>Human-on-the-loop (HOTL)</b> – a human monitors operation and can intervene</li><li><b>Human-in-command (HIC)</b> – a human oversees overall activity and decides when and how to use the AI, including not using it</li></ul><p>(EU HLEG Ethics Guidelines for Trustworthy AI, 2019.)</p>" },
    { h: "Choosing the level", body: "<p>Higher impact or irreversibility, lower model confidence and novel situations → more human involvement. Use confidence thresholds and escalation rules; for low-risk volume, use sample-based quality review.</p>" },
    { h: "EU AI Act Art. 14", body: "<p>High-risk systems must let overseers <b>understand</b> capabilities and limits, stay <b>aware</b> of automation bias, correctly <b>interpret</b> outputs, decide not to use or <b>override</b> them, and <b>stop</b> the system. Certain remote biometric identification results need verification by two people.</p>" },
    { h: "Make oversight real", body: "<p>Reviewers need competence, training, time and authority. Watch for <b>automation bias</b> (rubber-stamping): track override rates and review times. Oversight covers inputs and outputs for trust &amp; safety, quality, explainability and robustness (task 20).</p>" }
  ],
  why: "<p>Human oversight is a primary control for AI risk and a legal requirement for high-risk systems. Poorly designed oversight gives false comfort — humans approving everything adds cost but no protection.</p>",
  mnemonics: [
    { device: "Driver, instructor, fleet manager", type: "visual", recall: "HITL vs HOTL vs HIC", text: "<b>In</b> the loop = you're steering every turn. <b>On</b> the loop = driving instructor with a dual brake. <b>In command</b> = fleet manager deciding whether the car goes out at all." },
    { device: "Usually Alert Inspectors Override & Stop", type: "acronym", recall: "EU AI Act Art. 14 oversight capabilities", text: "<b>U</b>nderstand limits, be <b>A</b>ware of automation bias, <b>I</b>nterpret output, <b>O</b>verride it, <b>S</b>top the system." },
    { device: "Rubber stamp ≠ oversight", type: "chunk", recall: "Automation bias in human review", text: "99.9% approvals in 3 seconds each means the human is a rubber stamp. Measure override rates and review time." }
  ],
  diagram: { type: "layers", title: "Oversight levels (broadest → closest)", items: [
    { label: "Human-in-command", sub: "decide whether/how use" },
    { label: "Human-on-loop", sub: "monitor, can intervene" },
    { label: "Human-in-loop", sub: "approve each decision" } ] },
  examTip: "<p>Match oversight to risk: HITL for high-impact individual decisions, HOTL with escalation for high-volume tasks. Near-100% approval with very short review times signals <b>automation bias</b> — the fix is redesigning oversight, not adding reviewers.</p>",
  keyPoints: [
    "HITL = every decision; HOTL = monitor and intervene; HIC = overall command",
    "Oversight level scales with impact, irreversibility and uncertainty",
    "EU AI Act Art. 14: understand, aware of automation bias, interpret, override, stop",
    "Track override rates to detect rubber-stamping",
    "Reviewers need competence, time and authority"
  ],
  quiz: [
    { q: "An AI system recommends cancer diagnoses, and a radiologist makes the final decision on every case. Which oversight model is this?",
      options: ["Human-in-the-loop", "Human-on-the-loop", "Human-in-command", "Fully autonomous"],
      answer: 0, explain: "A human decides in every decision cycle. HOTL would mean monitoring with the ability to intervene, not approving each case." },
    { q: "Reviewers approve 99.8% of AI recommendations, spending an average of four seconds on each. What is the MOST likely issue?",
      options: ["The model is too accurate to need review", "Reviewer salaries are too high", "Automation bias is making the oversight ineffective", "System latency is too high"],
      answer: 2, explain: "Near-universal approval with minimal review time suggests rubber-stamping. The response is to redesign oversight (training, sampling, escalation, metrics)." },
    { q: "A platform moderates millions of posts daily with AI. Which oversight design is MOST appropriate?",
      options: ["Human review of every post before publication", "No human involvement to keep costs low", "A weekly review of a few posts", "Human-on-the-loop with confidence-based escalation of uncertain or high-severity cases and sample quality checks"],
      answer: 3, explain: "Risk-based HOTL focuses humans where they add most value. Reviewing every post doesn't scale; no oversight or token weekly checks leave serious harms unaddressed." },
    { q: "Under EU AI Act Article 14, high-risk AI systems must enable the people overseeing them to:",
      options: ["Retrain the model on new data", "Override or reverse outputs and interrupt the system through a stop procedure", "Access the provider's source code", "Approve vendor invoices"],
      answer: 1, explain: "Art. 14 requires overseers to be able to disregard, override or reverse outputs and to intervene or stop the system. It does not require retraining rights or source code access." }
  ],
  glossary: [
    { term: "Human-in-the-loop", def: "Oversight model in which a human intervenes in or approves every decision cycle." },
    { term: "Human-on-the-loop", def: "Oversight model in which a human monitors the system's operation and can intervene." },
    { term: "Human-in-command", def: "Oversight of the AI system's overall activity, including deciding when and how to use it, or not." },
    { term: "Automation bias", def: "Tendency to over-rely on automated outputs, even when they are wrong." }
  ],
  sources: [
    { label: "EU AI Act Art. 14 — Human oversight", url: "https://artificialintelligenceact.eu/article/14/" },
    { label: "EU HLEG Ethics Guidelines for Trustworthy AI (2019)", url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai" }
  ]
},
{
  id: "d3d-transparency-provenance",
  title: "Transparency, Disclosure and Content Provenance (Watermarking, C2PA)",
  concept: [
    { h: "Disclosure duties (EU AI Act Art. 50)", body: "<ul><li>Tell people they're interacting with an AI system, unless obvious</li><li>Providers of generative AI must mark synthetic output in a machine-readable, detectable way</li><li>Deployers must disclose deepfakes and AI-generated text published to inform the public (with exceptions)</li></ul><p>Applies from 2 Aug 2026 (as adopted).</p>" },
    { h: "Watermarking", body: "<p>Embeds a signal in content — visible or invisible (e.g., statistical patterns in generated text or pixels). Editing, paraphrasing, cropping or compression can degrade it, and detection needs the right detector.</p>" },
    { h: "Content credentials (C2PA)", body: "<p>An open standard that attaches <b>cryptographically signed provenance metadata</b> describing who or what created and edited content. It is tamper-evident, but the metadata can be <b>stripped</b> (e.g., screenshots, re-encoding). NIST AI 100-4 (2024) reviews these techniques.</p>" },
    { h: "Layer it", body: "<p>Combine disclosure labels, watermarks, signed provenance and detection. No single technique is reliable on its own.</p>" }
  ],
  why: "<p>Synthetic media drives fraud, misinformation and reputational damage. Transparency obligations are now law in the EU, and customers expect to know when they're dealing with AI.</p>",
  mnemonics: [
    { device: "Tell, Tag, Trace", type: "chunk", recall: "Three layers of AI content transparency", text: "<b>Tell</b> people (disclosure), <b>tag</b> the content (watermark), <b>trace</b> its origin (signed C2PA credentials)." },
    { device: "Invisible ink vs shipping manifest", type: "visual", recall: "Watermark vs C2PA weaknesses", text: "A watermark is invisible ink in the paper — fades if you wash it (edits). C2PA is a signed manifest stapled on — tamper-evident, but it can be torn off." }
  ],
  diagram: { type: "matrix", title: "Transparency techniques", rows: ["Disclosure label", "Watermark", "C2PA credential"], cols: ["Strength", "Weakness"], cells: [
    ["Clear to humans", "Easily removed; relies on honesty"],
    ["Embedded in the content", "Degraded by edits/paraphrase"],
    ["Signed, tamper-evident", "Metadata can be stripped"] ] },
  examTip: "<p>For EU-facing chatbots, the minimum is telling users they're talking to AI. Realistic synthetic people or events = deepfake disclosure under Art. 50. The BEST labelling answer is <b>layered</b>, not a single technique.</p>",
  keyPoints: [
    "Art. 50: inform users of AI interaction; mark synthetic content; disclose deepfakes",
    "Watermarks can be degraded by edits and paraphrasing",
    "C2PA = signed provenance metadata; can be stripped",
    "Layer disclosure, watermarking, provenance and detection"
  ],
  quiz: [
    { q: "Marketing plans an AI-generated video of a realistic, non-existent spokesperson for EU audiences. Which obligation is MOST relevant?",
      options: ["Art. 5 prohibited practices", "GPAI training-data summary obligations", "No obligation, because the person doesn't exist", "Art. 50 disclosure that the content is artificially generated or manipulated"],
      answer: 3, explain: "Realistic synthetic persons are deepfake content requiring disclosure under Art. 50. It isn't a prohibited practice, and GPAI obligations apply to model providers, not this marketing use." },
    { q: "Why should C2PA content credentials NOT be the only control for identifying AI-generated images?",
      options: ["The metadata can be stripped when content is screenshotted or re-encoded", "C2PA is a proprietary vendor format", "C2PA only works for text", "C2PA uses no cryptography"],
      answer: 0, explain: "C2PA is an open, cryptographically signed standard, but stripped metadata leaves no trace, so it should be combined with watermarking and detection." },
    { q: "A company deploys a customer-service chatbot for EU customers. What is the MINIMUM transparency step required?",
      options: ["Publish the model's source code", "Watermark every text response", "Inform users they are interacting with an AI system unless it is obvious", "Register the chatbot in the EU high-risk database"],
      answer: 2, explain: "Art. 50 requires informing people they're interacting with AI. Source code publication isn't required, and database registration applies to high-risk systems." },
    { q: "Which approach to labelling AI-generated images at scale is MOST robust?",
      options: ["A visible label only", "Layering machine-readable watermarks, C2PA credentials and visible disclosure where required", "Relying on users to report AI content", "No labelling, since detection tools exist"],
      answer: 1, explain: "Each technique fails in different ways, so layering gives resilience. Single techniques or reliance on users and detectors leave gaps." }
  ],
  glossary: [
    { term: "Deepfake", def: "AI-generated or manipulated image, audio or video that resembles real people, objects or events and could falsely appear authentic." },
    { term: "Watermarking (AI)", def: "Embedding a detectable signal in AI-generated content to indicate its synthetic origin." },
    { term: "C2PA", def: "Coalition for Content Provenance and Authenticity standard for cryptographically signed content credentials." },
    { term: "Content credentials", def: "Signed metadata recording the origin and edit history of a piece of digital content." }
  ],
  sources: [
    { label: "EU AI Act Art. 50 — Transparency obligations", url: "https://artificialintelligenceact.eu/article/50/" },
    { label: "C2PA Specifications", url: "https://c2pa.org/specifications/" },
    { label: "NIST AI 100-4 Reducing Risks Posed by Synthetic Content", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf" }
  ]
},
{
  id: "d3d-trust-safety",
  title: "Trust & Safety: Hallucination and Harmful Content",
  concept: [
    { h: "Hallucination / confabulation", body: "<p>GenAI can produce fluent but false or fabricated content — NIST AI 600-1 calls this <b>confabulation</b>. OWASP <b>LLM09 Misinformation</b> also covers <b>overreliance</b> on such output. Risk is highest for legal, medical and financial advice.</p>" },
    { h: "Reducing hallucination", body: "<ul><li><b>Ground</b> answers in vetted sources (RAG) with citations</li><li><b>Restrict</b> scope to supported topics</li><li>Let the model <b>admit</b> uncertainty ('I don't know')</li><li>Automated groundedness <b>checks</b></li><li><b>Escalate</b> high-impact outputs to human review</li></ul>" },
    { h: "Harmful content", body: "<p>Toxic, hateful, violent, sexual or self-harm content; dangerous instructions (e.g., CBRN); privacy leaks. Controls: safety-tuned models, input/output classifiers, acceptable use policy, abuse reporting, red teaming, and escalation to a trust &amp; safety team.</p>" },
    { h: "You own what your bot says", body: "<p>In 2024 a Canadian tribunal held Air Canada liable for incorrect refund advice given by its website chatbot (Moffatt v. Air Canada). Disclaimers do not transfer accountability or replace output controls.</p>" }
  ],
  why: "<p>Trust &amp; safety failures are the most visible AI incidents — they reach customers and the press directly. Controls must prevent harm, not just disclaim it.</p>",
  mnemonics: [
    { device: "GRACE under pressure", type: "acronym", recall: "Controls that reduce hallucination", text: "<b>G</b>round in sources, <b>R</b>estrict scope, <b>A</b>dmit uncertainty, <b>C</b>heck groundedness, <b>E</b>scalate to a human." },
    { device: "The confident tour guide", type: "story", recall: "Why hallucination happens and how to contain it", text: "A charming guide who invents history when unsure. Give him a guidebook (RAG), tell him to say 'I don't know', and have a supervisor check the tricky tours." }
  ],
  diagram: { type: "flow", title: "Trust & safety response path", steps: [
    { label: "User prompt", sub: "acceptable use" },
    { label: "Input check", sub: "abuse, injection" },
    { label: "Grounded gen.", sub: "RAG, citations" },
    { label: "Output check", sub: "harm, groundedness" },
    { label: "Human review", sub: "high-impact only" },
    { label: "Response", sub: "cited, logged" } ] },
  examTip: "<p>A disclaimer alone is never the BEST control for harmful or false output. Prefer grounding, verification and human review proportional to impact. Remember the NIST AI 600-1 term: <b>confabulation</b>.</p>",
  keyPoints: [
    "Hallucination = confabulation (NIST AI 600-1); OWASP LLM09 Misinformation",
    "Reduce with grounding, scope limits, uncertainty, checks, escalation",
    "Harmful content controls: safety tuning, classifiers, policy, red teaming",
    "Organizations remain accountable for chatbot output"
  ],
  quiz: [
    { q: "A legal-research assistant cites court cases that do not exist. Which control is BEST?",
      options: ["Ground answers in a verified legal database with citation verification and mandatory lawyer review", "Add a disclaimer that answers may be inaccurate", "Increase the model's temperature", "Switch to a larger model"],
      answer: 0, explain: "Grounding plus verification and expert review directly prevents fabricated citations reaching clients. A disclaimer doesn't prevent harm; higher temperature increases randomness; larger models still confabulate." },
    { q: "Which term does NIST AI 600-1 use for the generation of confidently stated but false content?",
      options: ["Data drift", "Confabulation", "Poisoning", "Evasion"],
      answer: 1, explain: "NIST AI 600-1 lists confabulation as a GenAI risk. Drift, poisoning and evasion are different phenomena." },
    { q: "A business leader argues that a chatbot disclaimer removes liability for wrong answers. What is the security manager's BEST response?",
      options: ["Agree, as disclaimers are legally sufficient", "Only the model vendor is liable", "The organization generally remains accountable, so disclaimers must be backed by output controls", "Liability only applies in the United States"],
      answer: 2, explain: "Cases such as Moffatt v. Air Canada show organizations are held responsible for their chatbots. Disclaimers supplement, not replace, controls." },
    { q: "What is the PRIMARY purpose of output content classifiers in a GenAI application?",
      options: ["To improve answer accuracy", "To reduce token costs", "To log user prompts", "To detect and block harmful or policy-violating responses before they reach users"],
      answer: 3, explain: "Output classifiers are a safety control screening responses. They don't improve accuracy or cost, and logging is a separate function." }
  ],
  glossary: [
    { term: "Confabulation", def: "NIST AI 600-1 term for GenAI producing confidently stated but erroneous or fabricated content (hallucination)." },
    { term: "Overreliance", def: "Users trusting AI output without appropriate verification." },
    { term: "Groundedness", def: "Degree to which a generated answer is supported by provided source material." },
    { term: "Trust and safety", def: "The function and controls that protect users from harmful, abusive or misleading content and conduct." }
  ],
  sources: [
    { label: "NIST AI 600-1 Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
    { label: "OWASP LLM09:2025 Misinformation", url: "https://genai.owasp.org/llmrisk/llm092025-misinformation/" }
  ]
}
];

/* ---------------- 3E Security Controls and Monitoring ---------------- */
var d3e = [
{
  id: "d3e-input-output-controls",
  title: "Input and Output Controls (Prompt Filtering, Output Validation, Rate Limiting)",
  concept: [
    { h: "Input controls", body: "<ul><li>Validate type, length and format</li><li>Detect prompt-injection and jailbreak patterns (OWASP <b>LLM01</b>)</li><li>Redact PII and secrets (DLP)</li><li>Separate and label untrusted content (retrieved docs, emails) from instructions</li><li>Restrict file types for multimodal input</li></ul>" },
    { h: "Output controls", body: "<p>Treat output as untrusted (OWASP <b>LLM05</b>): <b>validate</b> against a schema, <b>encode</b> before rendering (XSS), <b>parameterize</b> before database or shell use, <b>scan</b> for sensitive data leaks (LLM02) and harmful content. Strip active links and markdown images that can exfiltrate data.</p>" },
    { h: "Rate and resource limits", body: "<p>Per-user and per-key quotas, token and context limits, timeouts, maximum tool-call depth and spend caps. They counter denial-of-service, 'denial-of-wallet' and model extraction — OWASP <b>LLM10 Unbounded Consumption</b>.</p>" },
    { h: "Defense in depth", body: "<p>Prompt injection has no complete fix. Combine input and output filters with least privilege, human approval for risky actions and monitoring, so a bypass doesn't become a breach.</p>" }
  ],
  why: "<p>Inputs and outputs are where users and attackers touch the model. These controls are the most direct, measurable layer the security team can own across every AI application.</p>",
  mnemonics: [
    { device: "Frisk the front door, check the back door, meter the tap", type: "visual", recall: "Three groups of AI I/O controls", text: "<b>Front door</b> = input filtering, <b>back door</b> = output validation, <b>tap meter</b> = rate and resource limits." },
    { device: "Very Efficient Pizza Service", type: "acronym", recall: "Four output-handling controls", text: "<b>V</b>alidate (schema), <b>E</b>ncode (before rendering), <b>P</b>arameterize (before DB/shell), <b>S</b>can (leaks, harm)." }
  ],
  diagram: { type: "flow", title: "I/O control chain", steps: [
    { label: "Rate limit", sub: "quotas, spend caps" },
    { label: "Validate input", sub: "type, length" },
    { label: "Filter input", sub: "injection, DLP" },
    { label: "Model", sub: "least privilege" },
    { label: "Validate output", sub: "schema, leaks" },
    { label: "Encode & send", sub: "safe rendering" } ] },
  examTip: "<p>XSS or SQL injection via model output → fix with <b>output encoding/parameterization</b>, not a better prompt. Cost spikes from automated abuse → <b>LLM10</b>, fixed with quotas and spend caps. Injection classifiers are a layer, never a complete fix.</p>",
  keyPoints: [
    "Input: validate, detect injection (LLM01), redact PII, separate untrusted content",
    "Output: validate, encode, parameterize, scan (LLM05, LLM02)",
    "Rate/resource limits counter DoS, denial-of-wallet, extraction (LLM10)",
    "No complete fix for prompt injection: layer controls"
  ],
  quiz: [
    { q: "An LLM's summaries are rendered as HTML in an internal portal, and an attacker induces the model to output a script tag. Which control BEST prevents exploitation?",
      options: ["A stronger system prompt forbidding HTML", "Limiting input length", "Encoding or sanitizing model output before rendering", "Retraining the model"],
      answer: 2, explain: "This is improper output handling; encoding neutralizes the script regardless of how it was produced. Prompts and retraining don't guarantee safe output." },
    { q: "An LLM API bill rises 40-fold because automated scripts submit very long prompts. Which OWASP risk and control BEST apply?",
      options: ["LLM10 Unbounded Consumption — per-user quotas, token limits and spend caps", "LLM01 Prompt Injection — input classifiers", "LLM04 Data and Model Poisoning — data validation", "LLM07 System Prompt Leakage — prompt hardening"],
      answer: 0, explain: "Uncontrolled resource use is LLM10, addressed by quotas and limits. The other risks don't explain cost-based abuse." },
    { q: "A team has deployed a prompt-injection classifier. What is the security manager's BEST view of it?",
      options: ["It is a complete fix for prompt injection", "It is unnecessary if the model is safety-tuned", "It can replace all other controls", "It is a useful layer but can be bypassed, so least privilege and output controls are still needed"],
      answer: 3, explain: "Classifiers reduce but don't eliminate injection. Defense in depth limits impact when they fail." },
    { q: "Employees are pasting customer personal data into a public AI chatbot. Which technical control is MOST effective?",
      options: ["A memo banning AI use", "DLP/redaction for prompts at a gateway or browser, alongside an approved enterprise AI tool", "An output content filter", "A rate limit on the chatbot"],
      answer: 1, explain: "Prompt DLP stops sensitive data leaving, and an approved alternative reduces the incentive to use public tools. A memo isn't technical; output filters and rate limits don't stop data being sent." }
  ],
  glossary: [
    { term: "Prompt injection", def: "OWASP LLM01: input that manipulates an LLM into ignoring instructions or performing unintended actions." },
    { term: "Jailbreak prompt", def: "A form of prompt injection crafted specifically to bypass a model's safety rules." },
    { term: "Unbounded consumption", def: "OWASP LLM10: uncontrolled use of model resources leading to denial of service, cost spikes or extraction." },
    { term: "Denial of wallet", def: "Attack that drives up usage-based cloud or API costs rather than taking a service offline." },
    { term: "Sensitive information disclosure", def: "OWASP LLM02: an LLM revealing confidential data, PII or proprietary information in its output." }
  ],
  sources: [
    { label: "OWASP LLM01:2025 Prompt Injection", url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/" },
    { label: "OWASP LLM05:2025 Improper Output Handling", url: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/" },
    { label: "OWASP LLM10:2025 Unbounded Consumption", url: "https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/" },
    { label: "OWASP LLM02:2025 Sensitive Information Disclosure", url: "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/" }
  ]
},
{
  id: "d3e-model-api-protection",
  title: "Protecting Models and Inference APIs",
  concept: [
    { h: "Threats", body: "<ul><li><b>Extraction</b> – cloning a model via queries</li><li><b>Weight theft</b> – from storage or registry</li><li><b>Membership inference</b> – was this record in training?</li><li><b>Model inversion</b> – reconstruct training data</li><li><b>Adversarial evasion</b> inputs</li><li><b>DoS</b> and abuse</li></ul>" },
    { h: "Access controls", body: "<p>Strong authentication (OAuth tokens, mTLS — no shared static keys in client apps), fine-grained authorization per model and endpoint, private endpoints, key rotation and tenant isolation. Protect weights in registries with encryption, strict access and download monitoring.</p>" },
    { h: "Extraction and privacy defenses", body: "<p>Rate limits and quotas; return only what's needed (labels rather than full confidence scores or logits); detect anomalous query patterns; differentially private training against membership inference; model watermarking or fingerprinting to prove theft; restrictive terms of use.</p>" }
  ],
  why: "<p>Models are valuable IP and can leak the data they were trained on. The inference API is the front door that every outsider can knock on.</p>",
  mnemonics: [
    { device: "Every Wizard Must Inspect All Doors", type: "acronym", recall: "Six threats to models and inference APIs", text: "<b>E</b>xtraction, <b>W</b>eight theft, <b>M</b>embership inference, <b>I</b>nversion, <b>A</b>dversarial evasion, <b>D</b>oS." },
    { device: "Sell the can, not the recipe", type: "visual", recall: "Why limit confidence scores/logits", text: "A vending machine that prints exact recipe percentages on every can lets rivals reverse-engineer the recipe. Hand out the can (label) only." },
    { device: "Membership = 'were you there?'; Inversion = 'draw their face'", type: "chunk", recall: "Membership inference vs model inversion", text: "Membership inference asks whether a record was in training. Inversion tries to reconstruct what training data looked like." }
  ],
  diagram: { type: "matrix", title: "Model threats → controls", rows: ["Extraction", "Membership inf.", "Weight theft", "Evasion"], cols: ["Attacker goal", "Key control"], cells: [
    ["Clone the model", "Rate limits, label-only output, anomaly detection"],
    ["Learn who was in training", "DP training, limit confidence scores"],
    ["Steal the IP directly", "Encryption, least privilege, download monitoring"],
    ["Force wrong outputs", "Adversarial training, input checks"] ] },
  examTip: "<p>For suspected cloning via high-volume queries, the BEST answer combines <b>rate limiting/anomaly detection</b> with <b>reducing output detail</b>. Encryption at rest doesn't stop query-based extraction.</p>",
  keyPoints: [
    "Threats: extraction, weight theft, membership inference, inversion, evasion, DoS",
    "Strong per-user authN/Z; no static shared keys in clients",
    "Limit output detail (labels, not logits) to hinder extraction",
    "DP training reduces membership inference risk",
    "Encrypt and monitor model weights in registries"
  ],
  quiz: [
    { q: "A competitor is suspected of cloning a public credit-scoring API through high-volume queries. Which control MOST reduces this risk?",
      options: ["Encrypting the model at rest", "Adding more training data", "Changing the model nightly", "Rate limiting with query anomaly detection and returning labels instead of confidence scores"],
      answer: 3, explain: "Extraction relies on many detailed responses; limiting volume and detail directly hinders it. Encryption at rest doesn't affect query-based attacks." },
    { q: "Researchers show they can determine whether a specific patient's record was in a model's training data. Which attack is this?",
      options: ["Membership inference", "Model inversion", "Evasion", "Data poisoning"],
      answer: 0, explain: "Membership inference determines whether a record was in the training set. Model inversion attempts to reconstruct training data features." },
    { q: "Which control BEST protects model weights stored in a model registry?",
      options: ["A public storage bucket with an obscure name", "Encryption with managed keys, least-privilege access and download monitoring", "Compressing the files", "Watermarking the model only"],
      answer: 1, explain: "Encryption, access control and monitoring prevent and detect theft. Obscurity isn't security; watermarking only helps prove theft afterwards." },
    { q: "An inference API is protected by one static API key embedded in a mobile app. What is the PRIMARY risk and BEST fix?",
      options: ["Key leakage; rotate the key monthly", "Performance; increase rate limits", "The key can be extracted and abused; issue per-user tokens through a backend with scoped authorization", "Compliance; Base64-encode the key"],
      answer: 2, explain: "Client-embedded keys are easily extracted. Per-user tokens with backend authorization allow attribution, scoping and revocation. Rotation alone still ships the key to every client." }
  ],
  glossary: [
    { term: "Model extraction", def: "Reconstructing a functionally similar copy of a model by querying it and learning from its outputs." },
    { term: "Membership inference", def: "Attack that determines whether a specific record was part of a model's training data." },
    { term: "Model inversion", def: "Attack that uses model outputs to reconstruct sensitive features of training data." },
    { term: "Evasion attack", def: "Crafting inputs at inference time (adversarial examples) that cause a model to make wrong predictions." },
    { term: "Logits", def: "Raw, pre-normalization model output scores; exposing them leaks more information than labels alone." }
  ],
  sources: [
    { label: "NIST AI 100-2 E2025 Adversarial Machine Learning", url: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final" },
    { label: "MITRE ATLAS", url: "https://atlas.mitre.org/" },
    { label: "OWASP AI Exchange", url: "https://owaspai.org/" }
  ]
},
{
  id: "d3e-logging-monitoring",
  title: "Logging and Monitoring for AI Systems (Drift, Anomalies, Abuse)",
  concept: [
    { h: "What to log", body: "<ul><li><b>Who</b>: user or agent identity, time</li><li><b>What</b>: inputs and outputs (minimized/redacted)</li><li><b>Which</b>: model, prompt-template and config version</li><li><b>Where</b>: retrieved sources, tool calls and parameters</li><li>Guardrail decisions, errors, token usage, latency</li></ul><p>Protect logs — they contain sensitive data.</p>" },
    { h: "What to monitor", body: "<p>Performance and <b>drift</b>; <b>anomalies</b> (unusual query volume or patterns that suggest extraction); <b>abuse</b> (jailbreak attempts, policy violations); <b>cost</b> spikes; safety incidents; fairness by group. Send security events to the SIEM with AI-specific detection use cases.</p>" },
    { h: "Drift types", body: "<p><b>Data drift</b>: the input distribution changes. <b>Concept drift</b>: the relationship between inputs and the target changes (e.g., new fraud tactics). Detect with statistical tests (e.g., PSI, KS test) and set re-validation triggers.</p>" },
    { h: "Regulatory hooks", body: "<p>EU AI Act <b>Art. 12</b>: high-risk systems must technically allow automatic recording of events (logs) over their lifetime. <b>Art. 26</b>: deployers keep those logs at least six months unless other law says otherwise. <b>Art. 72</b>: providers run post-market monitoring.</p>" }
  ],
  why: "<p>Without the right logs you can't investigate an AI incident, prove compliance, or notice slow degradation. Monitoring turns one-time validation into continuous assurance.</p>",
  mnemonics: [
    { device: "Who, What, Which, Where", type: "chunk", recall: "Core fields to log for each AI interaction", text: "<b>Who</b> asked, <b>what</b> went in and out, <b>which</b> model/prompt version answered, <b>where</b> it looked or acted (retrieval, tools)." },
    { device: "New customers vs new rules", type: "story", recall: "Data drift vs concept drift", text: "Data drift: different customers walk into the shop. Concept drift: same customers, but the rules of the game changed (fraudsters adopt new tactics)." },
    { device: "People Don't Always Admit Costs", type: "acronym", recall: "What to monitor in AI systems", text: "<b>P</b>erformance, <b>D</b>rift, <b>A</b>nomalies, <b>A</b>buse, <b>C</b>ost (plus fairness and safety)." }
  ],
  diagram: { type: "hub", title: "AI monitoring", center: "AI monitoring", steps: [
    { label: "Performance", sub: "accuracy, errors" },
    { label: "Drift", sub: "data & concept" },
    { label: "Anomalies", sub: "query patterns" },
    { label: "Abuse", sub: "jailbreaks, policy" },
    { label: "Cost", sub: "tokens, spend" },
    { label: "Fairness", sub: "outcomes by group" } ] },
  examTip: "<p>If investigators can't tell which configuration produced a harmful output, the missing log field is <b>model/prompt version</b>. Accuracy dropping while inputs look the same = <b>concept drift</b>. The answer to PII in logs is minimize/redact and restrict, not stop logging.</p>",
  keyPoints: [
    "Log who, what (minimized), which model/prompt version, where (retrieval, tools)",
    "Monitor performance, drift, anomalies, abuse, cost, fairness",
    "Data drift = inputs change; concept drift = input–target relationship changes",
    "EU AI Act Art. 12 logging; Art. 26 deployers keep logs ≥ 6 months",
    "Feed AI security events into the SIEM"
  ],
  quiz: [
    { q: "During an investigation, the team cannot determine which prompt template produced a harmful chatbot response. Which logging element was MISSING?",
      options: ["The model and prompt/configuration version for each request", "CPU utilization", "Full network packet captures", "The user's browser version"],
      answer: 0, explain: "Version identifiers link each output to the exact configuration that produced it. Infrastructure metrics don't explain model behaviour." },
    { q: "A fraud model's accuracy drops because fraudsters changed tactics, even though input distributions look similar. What is this?",
      options: ["Data drift", "Overfitting", "Concept drift", "Data poisoning"],
      answer: 2, explain: "The relationship between inputs and fraud changed, which is concept drift. Data drift would show a change in input distributions." },
    { q: "AI interaction logs contain full prompts with customer personal data. What is the BEST approach?",
      options: ["Stop logging prompts entirely", "Store logs indefinitely for analytics", "Make logs available to all engineers for troubleshooting", "Minimize and redact sensitive fields, restrict log access, and set retention aligned with legal requirements"],
      answer: 3, explain: "This balances investigation and compliance needs with privacy. Not logging removes accountability; indefinite or broad access increases risk." },
    { q: "What does EU AI Act Article 12 PRIMARILY require of high-risk AI systems?",
      options: ["Quarterly external audits", "Automatic recording of events (logs) over the system's lifetime to support traceability", "Publishing the source code", "Watermarking all outputs"],
      answer: 1, explain: "Art. 12 covers record-keeping through automatic logging. Watermarking relates to Art. 50; the Act does not require publishing source code." }
  ],
  glossary: [
    { term: "Data drift", def: "Change in the statistical distribution of a model's input data over time." },
    { term: "Concept drift", def: "Change in the relationship between input data and the target being predicted." },
    { term: "PSI", def: "Population stability index: a measure of how much a variable's distribution has shifted between two periods." },
    { term: "Post-market monitoring", def: "EU AI Act duty for providers to collect and analyze data on high-risk system performance after placing it on the market." }
  ],
  sources: [
    { label: "EU AI Act Art. 12 — Record-keeping", url: "https://artificialintelligenceact.eu/article/12/" },
    { label: "EU AI Act Art. 26 — Obligations of deployers", url: "https://artificialintelligenceact.eu/article/26/" },
    { label: "NSA et al. — Deploying AI Systems Securely (2024)", url: "https://media.defense.gov/2024/Apr/15/2003439257/-1/-1/0/CSI-DEPLOYING-AI-SYSTEMS-SECURELY.PDF" }
  ]
},
{
  id: "d3e-security-tooling",
  title: "AI Security Tools in the Information Security Program",
  concept: [
    { h: "The tool landscape", body: "<ul><li><b>AI-SPM</b> – discover AI assets and shadow AI, find misconfigurations and risky data access</li><li><b>LLM firewall / AI gateway</b> – filter prompts and responses, enforce policy</li><li><b>Model scanners</b> – malicious code or vulnerabilities in model files</li><li><b>DLP for AI</b> – stop sensitive data entering prompts</li><li>AI red-teaming tools; AI-aware SIEM detections</li></ul>" },
    { h: "Selecting tools", body: "<p>Start from <b>risk and requirements</b>, not vendor hype. Evaluate coverage of your architecture (SaaS AI, APIs, self-hosted), integration with IAM/SIEM/SOAR, false-positive rates, latency impact, privacy of inspected data, and the vendor's own security.</p>" },
    { h: "Integrate into the program", body: "<p>Assign owners, update runbooks and playbooks, tune and measure effectiveness, and include AI tools in asset and vulnerability management. Avoid tool sprawl — extend existing DLP, CASB/SSE and SIEM where they can do the job.</p>" },
    { h: "Shadow AI", body: "<p>Use CASB/SSE and network telemetry to discover unsanctioned AI apps. Provide approved alternatives and clear acceptable-use rules rather than only blocking — blocking alone drives use further underground.</p>" }
  ],
  why: "<p>Task 19 expects the security manager to review and implement AI security tools as part of the wider program — choosing what adds real risk reduction and making sure it's owned and measured.</p>",
  mnemonics: [
    { device: "The 4 Ps of AI tooling", type: "chunk", recall: "Four main AI security tool types", text: "<b>Posture</b> (AI-SPM), <b>Perimeter</b> (LLM firewall/gateway), <b>Payload</b> (model scanner), <b>Privacy</b> (DLP for AI)." },
    { device: "Healthy snacks, not just a locked cupboard", type: "story", recall: "How to respond to shadow AI", text: "Kids sneaking snacks? Locking the cupboard alone fails. Offer healthy snacks (approved AI tools), set rules (acceptable use), and keep an eye on the cupboard (monitoring)." }
  ],
  diagram: { type: "matrix", title: "AI security tools", rows: ["AI-SPM", "LLM firewall", "Model scanner", "DLP for AI"], cols: ["Protects", "Example finding"], cells: [
    ["Posture & inventory", "Unsanctioned model endpoint"],
    ["Runtime prompts/responses", "Blocked injection attempt"],
    ["Model supply chain", "Malicious pickle payload"],
    ["Sensitive data", "PII pasted into prompt"] ] },
  examTip: "<p>Before buying an AI tool, the FIRST step is <b>defining requirements from the risk assessment</b>. For 'what AI is in use across the estate', pick AI-SPM/discovery. For shadow AI, the BEST answer provides an approved alternative plus policy and monitoring — not a blanket ban.</p>",
  keyPoints: [
    "AI-SPM = discovery and posture; LLM firewall = runtime filtering",
    "Model scanners address malicious model files",
    "DLP for AI stops sensitive data in prompts",
    "Select tools from risk requirements; integrate with IAM/SIEM/SOAR",
    "Shadow AI: discover, provide approved tools, set acceptable use"
  ],
  quiz: [
    { q: "The CISO wants to know which AI services and models are in use across all cloud accounts, including unsanctioned ones. Which tool fits BEST?",
      options: ["A model file scanner", "An LLM firewall", "AI security posture management (AI-SPM) with discovery", "An AI red-teaming tool"],
      answer: 2, explain: "AI-SPM discovers and inventories AI assets and misconfigurations. Firewalls protect known traffic; scanners and red-team tools assess specific models." },
    { q: "Before purchasing an LLM firewall, what should the security manager do FIRST?",
      options: ["Define requirements based on the risk assessment and AI architecture", "Arrange a vendor demonstration", "Buy the most popular product", "Disable existing DLP to avoid overlap"],
      answer: 0, explain: "Requirements derived from risk ensure the tool addresses real gaps. Demos and popularity don't establish fit; disabling DLP creates a gap." },
    { q: "Data scientists download models from a public hub every week. Which tool MOST directly addresses malicious payloads in those files?",
      options: ["AI-SPM", "A model scanner integrated into the ingestion pipeline", "DLP for AI", "SIEM correlation rules"],
      answer: 1, explain: "Model scanners inspect files for malicious code before use. AI-SPM is posture-focused, DLP protects data, and SIEM detects after the fact." },
    { q: "A survey shows many employees use unapproved AI chat tools for work. What is the BEST response?",
      options: ["Block all AI websites permanently", "Ignore it, since productivity has improved", "Discipline employees found using the tools", "Provide an approved enterprise AI tool with controls, update acceptable use guidance, and monitor or block high-risk services"],
      answer: 3, explain: "A sanctioned alternative plus policy and monitoring reduces risk while meeting the business need. Blanket blocks drive workarounds; ignoring or punishing doesn't manage the risk." }
  ],
  glossary: [
    { term: "AI-SPM", def: "AI security posture management: tools that discover AI assets and assess their configurations, data access and risks." },
    { term: "LLM firewall", def: "Runtime control that inspects and filters prompts and responses to enforce security and content policy." },
    { term: "Model scanner", def: "Tool that inspects model files for malicious code, unsafe serialization or known vulnerabilities." },
    { term: "DLP for AI", def: "Data loss prevention controls that detect and block sensitive data in prompts, uploads and AI outputs." },
    { term: "CASB/SSE", def: "Cloud access security broker / security service edge: controls and visibility over cloud and SaaS (incl. AI app) usage." }
  ],
  sources: [
    { label: "OWASP Top 10 for LLM Applications 2025", url: OWASP_LLM },
    { label: "NIST AI 600-1 Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" }
  ]
},
{
  id: "d3e-metrics-control-review",
  title: "AI Security Metrics and Continuous Control Review",
  concept: [
    { h: "KPIs vs KRIs", body: "<p><b>KPIs</b> measure how well controls perform: % of models with completed risk assessments, % of red-team findings fixed within SLA, mean time to remediate. <b>KRIs</b> signal rising risk: jailbreak attempt rate, drift alerts, shadow AI usage, unreviewed model changes.</p>" },
    { h: "What makes a good metric", body: "<p>Tied to objectives and risk appetite, measurable and repeatable, with an owner and <b>thresholds that trigger action</b>. Tailor to the audience: the board sees trends against appetite; engineers see operational detail. Avoid vanity metrics (e.g., raw counts of blocked prompts without context).</p>" },
    { h: "Example AI security metrics", body: "<ul><li>AI inventory coverage</li><li>% high-risk systems with oversight and monitoring</li><li>Red-team findings open past SLA</li><li>Guardrail false-positive/negative rates</li><li>AI vendor assessments completed</li><li>AI incidents, MTTD and MTTR</li><li>Training completion</li></ul>" },
    { h: "Continuous control review", body: "<p>Controls must keep risk within appetite as models, threats and laws change (task 12). Review on a schedule <b>and</b> on triggers: model change, incident, threat intelligence, regulation. Test <b>operating effectiveness</b>, not just design, and feed results into the risk register and treatment plans.</p>" }
  ],
  why: "<p>Metrics show leadership whether AI risk is under control and justify investment (task 18). Continuous review keeps controls effective as AI changes faster than traditional systems.</p>",
  mnemonics: [
    { device: "KPI = Performance, KRI = Radar", type: "chunk", recall: "KPI vs KRI", text: "KPIs tell you how well your controls <b>performed</b>; KRIs are the <b>radar</b> warning of rising risk ahead." },
    { device: "Tim Measures Our Triggers", type: "acronym", recall: "Qualities of a good security metric", text: "<b>T</b>ied to objectives/appetite, <b>M</b>easurable and repeatable, <b>O</b>wned, with <b>T</b>hresholds that trigger action." },
    { device: "MITRe reviews", type: "acronym", recall: "Triggers for out-of-cycle control review", text: "<b>M</b>odel change, <b>I</b>ncident, <b>T</b>hreat intelligence, <b>R</b>egulation." }
  ],
  diagram: { type: "cycle", title: "Metrics-driven control review", center: "Risk appetite", steps: [
    { label: "Define metric", sub: "owner, threshold" },
    { label: "Collect", sub: "automated data" },
    { label: "Report", sub: "audience-specific" },
    { label: "Review", sub: "vs appetite" },
    { label: "Adjust controls", sub: "treat, re-test" } ] },
  examTip: "<p>For board reporting, the BEST answer shows <b>risk trends against appetite</b> with treatment status — not raw technical counts. A control that exists but is routinely bypassed in testing is <b>not operating effectively</b>; treat and re-test.</p>",
  keyPoints: [
    "KPIs measure control performance; KRIs signal rising risk",
    "Good metrics: tied to appetite, measurable, owned, thresholded",
    "Report trends vs appetite to the board; detail to operators",
    "Review controls on schedule and on triggers: model change, incident, threat intel, regulation",
    "Test operating effectiveness, not just design"
  ],
  quiz: [
    { q: "Which of the following is a key risk indicator (KRI) rather than a key performance indicator (KPI)?",
      options: ["Percentage of staff who completed AI security training", "Percentage of models with model cards", "A rising weekly rate of detected jailbreak attempts", "Number of controls tested this quarter"],
      answer: 2, explain: "A rising attack rate signals increasing risk exposure. The others measure how well the program is performing its activities." },
    { q: "The board asks for regular AI security reporting. Which content is MOST useful?",
      options: ["Raw LLM firewall logs", "Trends in key AI risks against risk appetite, with the status of treatment actions", "The total number of prompts blocked", "Parameter counts of deployed models"],
      answer: 1, explain: "Boards need decision-useful information about risk posture relative to appetite. Raw logs and counts lack context." },
    { q: "Which event should MOST clearly trigger an out-of-cycle review of AI security controls?",
      options: ["A major model upgrade or a new regulatory requirement", "A routine weekly operating system patch", "A change to the company logo", "Staff holiday season"],
      answer: 0, explain: "Model changes and new regulations alter risk and control requirements. Routine patches and unrelated events don't warrant special review." },
    { q: "A control review finds a prompt filter is in place, but red teamers bypassed it in most attempts. What does this indicate?",
      options: ["The control is effective because it exists", "No action is needed until an incident occurs", "The control should simply be removed", "The control is designed but not operating effectively, so it needs treatment and re-testing"],
      answer: 3, explain: "Effectiveness is about results, not existence. The finding should lead to remediation (and possibly compensating controls), then re-testing." }
  ],
  glossary: [
    { term: "KPI", def: "Key performance indicator: measures how well a process or control is performing." },
    { term: "KRI", def: "Key risk indicator: an early-warning metric that signals increasing risk exposure." },
    { term: "Operating effectiveness", def: "Whether a control actually works as intended over time, as opposed to merely being designed and in place." },
    { term: "MTTD / MTTR", def: "Mean time to detect / mean time to respond (or remediate) for incidents or vulnerabilities." },
    { term: "Risk appetite", def: "The amount and type of risk an organization is willing to accept in pursuit of its objectives." }
  ],
  sources: [
    { label: "NIST SP 800-55 Vol. 1 Measurement Guide for Information Security", url: "https://csrc.nist.gov/pubs/sp/800/55/v1/final" },
    { label: "ISACA AAISM exam content outline", url: "https://www.isaca.org/credentialing/aaism/aaism-exam-content-outline" }
  ]
}
];

AAISM.domains.push({
  id: "d3",
  num: 3,
  title: "AI Technologies and Controls",
  weight: 38,
  summary: "Tests how you design, build, operate and monitor AI systems securely: architecture, life cycle, data controls, privacy/trust/safety controls, and security monitoring.",
  subdomains: [
    { id: "d3a", code: "3A", title: "AI Security Architecture and Design", tasks: [10, 11], topics: d3a },
    { id: "d3b", code: "3B", title: "AI Life Cycle (e.g., Model Selection, Training, and Validation)", tasks: [7, 22], topics: d3b },
    { id: "d3c", code: "3C", title: "Data Management Controls", tasks: [13, 14], topics: d3c },
    { id: "d3d", code: "3D", title: "Privacy, Ethical, Trust and Safety Controls", tasks: [3, 20], topics: d3d },
    { id: "d3e", code: "3E", title: "Security Controls and Monitoring", tasks: [12, 18, 19], topics: d3e }
  ]
});

})();
