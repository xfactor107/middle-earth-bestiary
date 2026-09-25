import { useEffect, useState } from "react";
import { getJson } from "./client";

export type ApiState<T> =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: T };

// Fetches `path` and refetches whenever it changes; in-flight requests are aborted.
// Results are tagged with their path so a stale response never shows for a new one.
export function useApi<T>(path: string): ApiState<T> {
  const [result, setResult] = useState<{ path: string; state: ApiState<T> } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getJson<T>(path, controller.signal)
      .then((data) => setResult({ path, state: { status: "success", data } }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResult({
          path,
          state: {
            status: "error",
            error: error instanceof Error ? error : new Error(String(error)),
          },
        });
      });

    return () => controller.abort();
  }, [path]);

  return result?.path === path ? result.state : { status: "loading" };
}
