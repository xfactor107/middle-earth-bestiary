import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { usePageTurn, type TurnDirection } from "./pageTurn";
import { useApi } from "../api/useApi";
import { ApiError } from "../api/client";
import Book from "../components/Book";
import LeftPage from "../components/LeftPage";
import MainIllustration from "../components/MainIllustration";
import RightPage, { type PageLink } from "../components/RightPage";
import StatusSpread from "../components/StatusSpread";
import type { Creature } from "../types/creature";
import { useCodex } from "./codexContext";

// Minimum horizontal travel, in px, for a touch to count as a page turn
const SWIPE_DISTANCE = 60;

// Figures are numbered by the entry's page, e.g. "Fig. 3 — The Orc"
function figureCaption(creature: Creature, page: number | null): string {
  const caption = creature.figureCaption ?? `The ${creature.name}`;
  return page != null ? `Fig. ${page} — ${caption}` : caption;
}

const toLink = (c: Creature | undefined): PageLink | null => (c ? { id: c.id, name: c.name } : null);

export default function CreatureSpread() {
  const { id = "" } = useParams();
  const turnPage = usePageTurn();
  const { creatures, chapters } = useCodex();
  const [detail, retryDetail] = useApi<Creature>(`/api/creatures/${encodeURIComponent(id)}`);

  const index = creatures.findIndex((c) => String(c.id) === id);
  // Memoized so the input listeners below are not re-registered mid-swipe
  const prev = useMemo(() => toLink(creatures[index - 1]), [creatures, index]);
  const next = useMemo(
    () => toLink(index >= 0 ? creatures[index + 1] : undefined),
    [creatures, index],
  );

  // Arrow keys and horizontal swipes turn the page
  useEffect(() => {
    const turn = (to: PageLink | null, direction: TurnDirection) => {
      if (to) turnPage(`/creatures/${to.id}`, direction);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === "ArrowLeft") turn(prev, "back");
      if (e.key === "ArrowRight") turn(next, "forward");
    };

    let start: { x: number; y: number } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      start = e.touches.length === 1 && t ? { x: t.clientX, y: t.clientY } : null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      start = null;
      // A deliberate sideways stroke, not a vertical scroll
      if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dy) > Math.abs(dx) / 2) return;
      if (dx > 0) turn(prev, "back");
      else turn(next, "forward");
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [prev, next, turnPage]);

  const pageNumber = index >= 0 ? index + 1 : null;

  // Fetch the neighbouring entries' art in the background, so a page turn
  // lands on finished illustrations rather than empty frames
  useEffect(() => {
    for (const neighbour of [creatures[index - 1], creatures[index + 1]]) {
      if (!neighbour) continue;
      const urls = [neighbour.imageUrl, ...neighbour.anatomicalSketches.map((s) => s.imageUrl)];
      for (const url of urls) if (url) new Image().src = url;
    }
  }, [creatures, index]);

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
        message="This entry could not be read from the archive."
        chapters={chapters}
        onRetry={retryDetail}
        showIndexLink
      />
    );
  }

  return (
    <Book label={`Bestiary entry: ${creature.name}`}>
      <title>{`${creature.name} · Tolkien Bestiary`}</title>
      <LeftPage chapters={chapters} activeChapter={creature.category} currentPage={pageNumber}>
        <MainIllustration
          name={creature.name}
          imageUrl={creature.imageUrl}
          caption={figureCaption(creature, pageNumber)}
        />
      </LeftPage>
      <RightPage
        creature={creature}
        pageNumber={pageNumber}
        totalPages={creatures.length}
        prev={prev}
        next={next}
      />
    </Book>
  );
}
