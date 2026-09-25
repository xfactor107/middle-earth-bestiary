import { useMemo } from "react";
import { Outlet } from "react-router";
import { useApi } from "../api/useApi";
import { buildChapters } from "../data/chapters";
import StatusSpread from "../components/StatusSpread";
import type { CreatureListResponse } from "../types/creature";
import type { CodexContext } from "./codexContext";

// Codex order (by chapter, then name); 50 is the API's page-size cap
const CONTENTS_PATH = "/api/creatures?limit=50&sortBy=category";

// Loads the contents once; every page of the codex reads it from outlet context
export default function CodexLayout() {
  const contents = useApi<CreatureListResponse>(CONTENTS_PATH);

  const context = useMemo<CodexContext | null>(() => {
    if (contents.status !== "success") return null;
    const creatures = contents.data.data;
    return { creatures, chapters: buildChapters(creatures) };
  }, [contents]);

  if (contents.status === "error") {
    return (
      <StatusSpread
        title="The codex will not open"
        message="The archive could not be reached. Check that the backend server is running, then refresh the page."
      />
    );
  }

  if (!context) {
    return <StatusSpread title="Opening the codex…" />;
  }

  return <Outlet context={context} />;
}
