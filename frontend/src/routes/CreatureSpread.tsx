import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useApi } from "../api/useApi";
import { ApiError } from "../api/client";
import Book from "../components/Book";
import LeftPage from "../components/LeftPage";
import MainIllustration from "../components/MainIllustration";
import RightPage, { type PageLink } from "../components/RightPage";
import StatusSpread from "../components/StatusSpread";
import type { Creature } from "../types/creature";
import { useCodex } from "./codexContext";

const toLink = (c: Creature | undefined): PageLink | null => (c ? { id: c.id, name: c.name } : null);

export default function CreatureSpread() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { creatures, chapters } = useCodex();
  const detail = useApi<Creature>(`/api/creatures/${encodeURIComponent(id)}`);

  const index = creatures.findIndex((c) => String(c.id) === id);
  const prev = toLink(creatures[index - 1]);
  const next = toLink(index >= 0 ? creatures[index + 1] : undefined);

  // Arrow keys turn the page
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === "ArrowLeft" && prev) navigate(`/creatures/${prev.id}`);
      if (e.key === "ArrowRight" && next) navigate(`/creatures/${next.id}`);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next, navigate]);

  // The contents already hold every entry, so show that copy at once
  // and swap in the fresh detail when it arrives
  const creature = detail.status === "success" ? detail.data : creatures[index];

  if (!creature) {
    if (detail.status === "loading") {
      return <StatusSpread title="Turning the page…" chapters={chapters} />;
    }
    const missing = detail.status === "error" && detail.error instanceof ApiError &&
      (detail.error.status === 404 || detail.error.status === 400);
    return missing ? (
      <StatusSpread
        title="This page is lost"
        message="No such creature is recorded in this codex. Perhaps the page was torn out long ago."
        chapters={chapters}
        showIndexLink
      />
    ) : (
      <StatusSpread
        title="The ink has run"
        message="This entry could not be read from the archive. Try again in a moment."
        chapters={chapters}
        showIndexLink
      />
    );
  }

  return (
    <Book label={`Bestiary entry: ${creature.name}`}>
      <title>{`${creature.name} · Tolkien Bestiary`}</title>
      <LeftPage chapters={chapters} activeChapter={creature.taxonomy}>
        <MainIllustration
          name={creature.name}
          imageUrl={creature.imageUrl}
          caption={creature.figureCaption}
        />
      </LeftPage>
      <RightPage
        creature={creature}
        pageNumber={index >= 0 ? index + 1 : null}
        totalPages={creatures.length}
        prev={prev}
        next={next}
      />
    </Book>
  );
}
