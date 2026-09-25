import { Link } from "react-router";
import Book from "./Book";
import LeftPage from "./LeftPage";
import { Divider } from "./Ornaments";
import type { Chapter } from "../data/chapters";
import "./StatusSpread.css";

interface StatusSpreadProps {
  title: string;
  message?: string;
  chapters?: Chapter[];
  showIndexLink?: boolean;
}

// A spread with no entry on it: loading, errors and missing pages
export default function StatusSpread({
  title,
  message,
  chapters = [],
  showIndexLink = false,
}: StatusSpreadProps) {
  return (
    <Book label={title}>
      <title>{`${title} · Tolkien Bestiary`}</title>
      <LeftPage chapters={chapters} activeChapter={null} />
      <section className="page page--right status">
        <h1 className="status__title">{title}</h1>
        <Divider />
        {message && <p className="status__message">{message}</p>}
        {showIndexLink && (
          <Link to="/" className="status__link">
            <span aria-hidden="true">‹</span> Return to the contents
          </Link>
        )}
      </section>
    </Book>
  );
}
