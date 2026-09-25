// Empty in development (Vite proxies /api); set VITE_API_URL when the API lives elsewhere.
// A trailing slash is dropped so ".../" + "/api" does not become "//api".
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// A request attempt that took too long; treated like a network failure
class AttemptTimeoutError extends Error {}

export interface RetryOptions {
  // Total time to keep retrying; Render's free tier can take ~60s to wake
  budgetMs?: number;
  // Abandon a single attempt after this long and try again
  attemptTimeoutMs?: number;
  // First wait between attempts; doubles each time, capped at maxDelayMs
  baseDelayMs?: number;
  maxDelayMs?: number;
  fetchImpl?: typeof fetch;
}

const DEFAULTS = {
  budgetMs: 90_000,
  attemptTimeoutMs: 20_000,
  baseDelayMs: 2_000,
  maxDelayMs: 10_000,
} satisfies RetryOptions;

// Gateway errors are what Render returns while an instance is waking up
const TRANSIENT_STATUSES = new Set([502, 503, 504]);

function isTransient(error: unknown): boolean {
  if (error instanceof ApiError) return TRANSIENT_STATUSES.has(error.status);
  // fetch rejects with a TypeError when the network or server is unreachable
  return error instanceof TypeError || error instanceof AttemptTimeoutError;
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

async function attempt<T>(
  url: string,
  signal: AbortSignal | undefined,
  timeoutMs: number,
  fetchImpl: typeof fetch,
): Promise<T> {
  // One controller per attempt, aborted by the caller's signal or the timeout
  const controller = new AbortController();
  const onAbort = () => controller.abort(signal?.reason);
  signal?.addEventListener("abort", onAbort, { once: true });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const res = await fetchImpl(url, { signal: controller.signal });
    if (!res.ok) throw new ApiError(res.status, `GET ${url} failed with ${res.status}`);
    return (await res.json()) as T;
  } catch (error) {
    if (timedOut && !signal?.aborted) throw new AttemptTimeoutError(`GET ${url} timed out`);
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

// GETs JSON, retrying temporary failures (network errors, timeouts, 502/503/504)
// with growing waits until the budget runs out. Other errors fail immediately.
export async function getJson<T>(
  path: string,
  signal?: AbortSignal,
  options: RetryOptions = {},
): Promise<T> {
  const { budgetMs, attemptTimeoutMs, baseDelayMs, maxDelayMs } = { ...DEFAULTS, ...options };
  const fetchImpl = options.fetchImpl ?? fetch;
  const deadline = Date.now() + budgetMs;

  for (let tries = 0; ; tries++) {
    try {
      return await attempt<T>(`${API_BASE}${path}`, signal, attemptTimeoutMs, fetchImpl);
    } catch (error) {
      const delay = Math.min(baseDelayMs * 2 ** tries, maxDelayMs);
      if (signal?.aborted || !isTransient(error) || Date.now() + delay > deadline) throw error;
      await sleep(delay, signal);
    }
  }
}
