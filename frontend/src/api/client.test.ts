import { describe, expect, it, vi } from "vitest";
import { ApiError, getJson, type RetryOptions } from "./client";

// Millisecond timings so retries run instantly; production waits are seconds
const fast: RetryOptions = { budgetMs: 1_000, attemptTimeoutMs: 50, baseDelayMs: 1, maxDelayMs: 5 };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// A fetch that plays back the given outcomes in order
function scriptedFetch(...outcomes: Array<Response | Error | "hang">) {
  return vi.fn((_url: string | URL | Request, init?: RequestInit) => {
    const next = outcomes.shift() ?? json({});
    if (next === "hang") {
      // Never answers; settles only when the request is aborted
      return new Promise<Response>((_, reject) =>
        init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))),
      );
    }
    return next instanceof Error ? Promise.reject(next) : Promise.resolve(next);
  });
}

describe("getJson", () => {
  it("returns the parsed body", async () => {
    const fetchImpl = scriptedFetch(json({ name: "Balrog" }));

    await expect(getJson("/api/creatures/1", undefined, { ...fast, fetchImpl })).resolves.toEqual({
      name: "Balrog",
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("retries gateway errors while the server wakes up", async () => {
    const fetchImpl = scriptedFetch(json({}, 502), json({}, 503), json({ ok: true }));

    await expect(getJson("/api/x", undefined, { ...fast, fetchImpl })).resolves.toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("retries network failures and attempts that hang", async () => {
    const fetchImpl = scriptedFetch(new TypeError("Failed to fetch"), "hang", json({ ok: true }));

    await expect(getJson("/api/x", undefined, { ...fast, fetchImpl })).resolves.toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("does not retry a real answer such as 404", async () => {
    const fetchImpl = scriptedFetch(json({ error: "Creature not found" }, 404));

    const error = await getJson<never>("/api/x", undefined, { ...fast, fetchImpl }).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(404);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("gives up once the retry budget is spent", async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(json({}, 502)));

    const error = await getJson<never>("/api/x", undefined, { ...fast, budgetMs: 30, fetchImpl }).catch(
      (e) => e,
    );
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(502);
    expect(fetchImpl.mock.calls.length).toBeGreaterThan(1);
  });

  it("stops retrying when the caller aborts, e.g. by leaving the page", async () => {
    const controller = new AbortController();
    const fetchImpl = vi.fn(() => Promise.resolve(json({}, 502)));
    const pending = getJson("/api/x", controller.signal, {
      ...fast,
      baseDelayMs: 1_000,
      maxDelayMs: 1_000,
      fetchImpl,
    });

    // Leave during the wait before the second attempt
    setTimeout(() => controller.abort(), 20);
    await expect(pending).rejects.toBeDefined();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
