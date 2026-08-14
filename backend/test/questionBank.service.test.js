const test = require("node:test");
const assert = require("node:assert/strict");

const { resolveBankDomain, selectBankQuestions, BANK_SAMPLE_SIZE } = require("../src/services/questionBank.service");
const { questionBank, BANK_DOMAINS } = require("../src/data/questionBank");

test("resolveBankDomain maps real role slugs to the correct domain", () => {
  const cases = [
    ["backend-node", "backendNode"],
    ["node", "backendNode"],
    ["python-backend", "pythonBackend"],
    ["react", "frontendReact"],
    ["frontend", "frontendReact"],
    ["fullstack", "fullStack"],
    ["full-stack", "fullStack"],
    ["devops", "devops"],
    ["sre", "devops"],
    ["cloud-engineer", "devops"],
    ["ml-engineer", "aiMl"],
    ["ai-engineer", "aiMl"],
  ];

  for (const [role, expectedDomain] of cases) {
    assert.equal(resolveBankDomain(role), expectedDomain, `expected "${role}" to resolve to ${expectedDomain}`);
  }
});

test("resolveBankDomain is case-insensitive", () => {
  assert.equal(resolveBankDomain("REACT"), "frontendReact");
  assert.equal(resolveBankDomain("Backend-Node"), "backendNode");
});

test("resolveBankDomain deliberately leaves unmapped roles as null, not force-fit", () => {
  const unmapped = ["java-backend", "dotnet-backend", "php-backend", "ruby-backend", "golang-backend", "angular", "vue", "data-analyst", "dba", "general-tech"];

  for (const role of unmapped) {
    assert.equal(resolveBankDomain(role), null, `expected "${role}" to be unmapped`);
  }
});

test("resolveBankDomain never throws on missing/empty/garbage input", () => {
  assert.equal(resolveBankDomain(undefined), null);
  assert.equal(resolveBankDomain(null), null);
  assert.equal(resolveBankDomain(""), null);
  assert.equal(resolveBankDomain("   "), null);
  assert.equal(resolveBankDomain(42), null);
  assert.equal(resolveBankDomain("some-role-that-does-not-exist"), null);
});

test("selectBankQuestions returns at most `count` questions, all real members of the source bank", () => {
  const result = selectBankQuestions({ domain: "backendNode", level: "junior" });

  assert.ok(result.length <= BANK_SAMPLE_SIZE);
  assert.ok(result.length > 0);

  const sourceQuestions = new Set(questionBank.backendNode.junior.map((item) => item.question));
  for (const item of result) {
    assert.ok(sourceQuestions.has(item.question), `"${item.question}" should be a real bank entry`);
    assert.ok(!("id" in item), "id should be stripped before leaving the service");
  }
});

test("selectBankQuestions respects a custom count", () => {
  const result = selectBankQuestions({ domain: "devops", level: "mid", count: 3 });
  assert.ok(result.length <= 3);
});

test("selectBankQuestions returns [] for an unknown domain or level, without throwing", () => {
  assert.deepEqual(selectBankQuestions({ domain: null, level: "junior" }), []);
  assert.deepEqual(selectBankQuestions({ domain: "backendNode", level: "expert" }), []);
  assert.deepEqual(selectBankQuestions({ domain: "not-a-real-domain", level: "junior" }), []);
  assert.deepEqual(selectBankQuestions(), []);
});

test("the bank data itself is well-formed (typo/regression guard as it grows)", () => {
  const validDifficulties = new Set(["easy", "medium", "hard"]);
  const validLevels = ["junior", "mid", "senior"];

  assert.deepEqual([...BANK_DOMAINS].sort(), ["aiMl", "backendNode", "devops", "frontendReact", "fullStack", "pythonBackend"]);

  for (const domain of BANK_DOMAINS) {
    for (const level of validLevels) {
      const entries = questionBank[domain][level];
      assert.ok(Array.isArray(entries) && entries.length > 0, `${domain}.${level} should be a non-empty array`);

      for (const entry of entries) {
        assert.ok(entry.topic && entry.topic.trim().length > 0, `${domain}.${level} has an entry with an empty topic`);
        assert.ok(entry.question && entry.question.trim().length > 0, `${domain}.${level} has an entry with an empty question`);
        assert.ok(validDifficulties.has(entry.difficulty), `${domain}.${level} has an entry with an invalid difficulty: ${entry.difficulty}`);
      }
    }
  }
});
