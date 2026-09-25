import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router";

export type TurnDirection = "forward" | "back";

// Longest we hold the old page on screen waiting for the new page's art
const IMAGE_WAIT_MS = 400;

// Resolves once the new spread's images are decoded, or after the wait runs out
function imagesReady(): Promise<unknown> {
  const images = [...document.querySelectorAll<HTMLImageElement>(".book img")];
  const decoded = Promise.all(images.map((img) => img.decode().catch(() => undefined)));
  return Promise.race([decoded, new Promise((resolve) => setTimeout(resolve, IMAGE_WAIT_MS))]);
}

// Navigates between spreads with a page-turn animation (see pageTurn.css).
// Falls back to a plain navigation where View Transitions are unsupported
// or the reader prefers reduced motion.
export function usePageTurn() {
  const navigate = useNavigate();

  return useCallback(
    (to: string, direction: TurnDirection = "forward") => {
      const go = () => {
        navigate(to);
        // Stacked pages on phones: start the new entry at its top
        window.scrollTo({ top: 0 });
      };

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduceMotion) {
        go();
        return;
      }

      const root = document.documentElement;
      root.dataset.turn = direction;
      const transition = document.startViewTransition(async () => {
        // Render the new spread synchronously so the browser snapshots it
        flushSync(go);
        await imagesReady();
      });
      transition.finished.finally(() => delete root.dataset.turn);
    },
    [navigate],
  );
}
