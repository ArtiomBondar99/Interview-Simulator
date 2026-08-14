// Every backend call lives here -- components never call fetch() directly, and never need to
// know the request/response shape or the URL structure. See backend/src/routes/*.routes.js for
// the endpoints this wraps.
//
// Every error response from the backend (validation, not-found, AI failures, anything) uses the
// same { error: { code, message, details? } } shape (see backend/src/middleware/errorHandler.js)
// -- so request() below can unwrap it in exactly one place instead of every call site guessing.

const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error?.message || "Something went wrong. Please try again.");
    error.code = data?.error?.code || "UNKNOWN_ERROR";
    error.status = response.status;
    error.details = data?.error?.details;
    throw error;
  }

  return data;
}

export function getAiStatus() {
  return request("/ai/status");
}

// Returns { questions, blueprint, model } -- see ai.service.js's generateInterviewQuestions.
export function generateQuestions(payload) {
  return request("/ai/questions", { method: "POST", body: JSON.stringify(payload) });
}

// Batch fallback evaluation (used if a per-answer evaluation is missing for some question).
export function evaluateInterview(payload) {
  return request("/ai/evaluate", { method: "POST", body: JSON.stringify(payload) });
}

// Live per-answer evaluation -- the normal path while an interview is in progress.
export function evaluateAnswer(payload) {
  return request("/ai/evaluate-answer", { method: "POST", body: JSON.stringify(payload) });
}

export function summarizeInterview(payload) {
  return request("/ai/summarize", { method: "POST", body: JSON.stringify(payload) });
}

export function listInterviews() {
  return request("/interviews");
}

export function getInterview(id) {
  return request(`/interviews/${id}`);
}

// Returns { id }.
export function startInterview(payload) {
  return request("/interviews/start", { method: "POST", body: JSON.stringify(payload) });
}

export function finishInterview(id, payload) {
  return request(`/interviews/${id}/finish`, { method: "PATCH", body: JSON.stringify(payload) });
}

// Wipes all interview history. The confirm token is required by the backend on purpose (see
// interview.controller.js) -- this is a destructive action, so callers should confirm with the
// user before calling this, not just wire it straight to a button.
export function deleteAllInterviews() {
  return request("/interviews", {
    method: "DELETE",
    body: JSON.stringify({ confirm: "DELETE_ALL_INTERVIEWS" }),
  });
}
