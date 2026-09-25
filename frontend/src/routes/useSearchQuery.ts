import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

// Wait this long after the last keystroke before writing the query to the URL
const URL_SYNC_DELAY_MS = 350;

// The search box's text, mirrored into the URL (?q=) so searches can be shared.
// The box owns its value and filters on every keystroke; the URL is written only
// once typing pauses. Binding the input straight to the URL dropped characters,
// because React Router applies URL updates as low-priority transitions that a
// fast typist can outrun.
export function useSearchQuery(): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  // The last value this hook wrote to the URL
  const [written, setWritten] = useState(urlQuery);
  const [seenUrl, setSeenUrl] = useState(urlQuery);

  // Adopt URL changes made elsewhere (Back/Forward, an opened link), but not
  // the echo of our own writes, which could land after further typing
  if (urlQuery !== seenUrl) {
    setSeenUrl(urlQuery);
    if (urlQuery !== written) {
      setQuery(urlQuery);
      setWritten(urlQuery);
    }
  }

  useEffect(() => {
    if (query === written) return;
    const timer = setTimeout(() => {
      setWritten(query);
      setSearchParams(query ? { q: query } : {}, { replace: true });
    }, URL_SYNC_DELAY_MS);
    return () => clearTimeout(timer);
  }, [query, written, setSearchParams]);

  return [query, setQuery];
}
