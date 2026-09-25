import { useCallback, useEffect, useState } from "react";
import { getJson } from "./client";

export type ApiState<T> =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: T };

// Fetches `path` and refetches whenever it changes; in-flight requests are aborted.
// Results are tagged with the request they answer, so a stale response never shows.
// `retry` runs the request again from scratch, e.g. from a "Try again" button.
export function useApi<T>(path: string): [ApiState<T>, () => void] {
  const [attempt, setAttempt] = useState(0);
  const request = `${attempt}:${path}`;
  const [result, setResult] = useState<{ request: string; state: ApiState<T> } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getJson<T>(path, controller.signal)
      .then((data) => setResult({ request, state: { status: "success", data } }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResult({
          request,
          state: {
            status: "error",
            error: error instanceof Error ? error : new Error(String(error)),
          },
        });
      });

    return () => controller.abort();
  }, [path, request]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const state: ApiState<T> = result?.request === request ? result.state : { status: "loading" };
  return [state, retry];
}
