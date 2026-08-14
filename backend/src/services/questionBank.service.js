const { questionBank } = require("../data/questionBank");

// Maps the free-text `role` slug the client sends (see frontend/index.html's <select>, which
// has ~58 options, e.g. "backend-node", "python-backend", "java-backend", "react", "devops",
// "ml-engineer", "general-tech"...) to one of the 6 curated bank domains.
//
// Precision over recall, on purpose: a role with no confident, well-fitting match resolves to
// `null` (meaning "no bank grounding, pure AI generation" -- identical to how this worked before
// the bank existed) rather than being force-fit into a wrong-flavored domain. For example,
// "java-backend"/"dotnet-backend"/"php-backend"/"ruby-backend"/"golang-backend" are deliberately
// LEFT UNMAPPED here rather than routed to backendNode, since backendNode's bank is Node/JS-
// specific and injecting that into a Java interview would be a worse outcome than no grounding
// at all. Same reasoning keeps "angular"/"vue" out of frontendReact, and "data-analyst"/
// "data-engineer"/"data-scientist"/"dba" out of aiMl.
//
// Match patterns are checked in order, first match wins -- more specific domains are listed
// before backendNode's broader patterns so e.g. "python-backend" (which also contains "backend")
// is claimed by pythonBackend first, never reaching backendNode's rule.
const ROLE_DOMAIN_RULES = [
  { domain: "pythonBackend", match: ["python-backend", "python"] },
  { domain: "frontendReact", match: ["react", "frontend"] },
  { domain: "fullStack", match: ["fullstack", "full-stack", "full stack"] },
  { domain: "devops", match: ["devops", "sre", "cloud-engineer"] },
  { domain: "aiMl", match: ["ml-engineer", "ai-engineer", "machine-learning"] },
  { domain: "backendNode", match: ["backend-node", "node"] },
];

function resolveBankDomain(role) {
  if (typeof role !== "string" || !role.trim()) {
    return null;
  }

  const normalized = role.toLowerCase();

  for (const { domain, match } of ROLE_DOMAIN_RULES) {
    if (match.some((needle) => normalized.includes(needle))) {
      return domain;
    }
  }

  return null;
}

const BANK_SAMPLE_SIZE = 6;

function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Random sample so every candidate at a given role+level doesn't always see grounding drawn
// from the exact same questions. Relies on each level's bank array already being spread across
// distinct topics (see questionBank.js's authoring guideline) rather than doing stratified
// sampling itself -- reasonable for a ~10-entry starter bank per level, worth revisiting if the
// bank grows much larger.
function selectBankQuestions({ domain, level, count = BANK_SAMPLE_SIZE } = {}) {
  const levelBank = domain && questionBank[domain] ? questionBank[domain][level] : null;

  if (!levelBank || levelBank.length === 0) {
    return [];
  }

  return shuffle(levelBank)
    .slice(0, count)
    .map(({ topic, question, difficulty }) => ({ topic, question, difficulty }));
}

module.exports = { resolveBankDomain, selectBankQuestions, ROLE_DOMAIN_RULES, BANK_SAMPLE_SIZE };
