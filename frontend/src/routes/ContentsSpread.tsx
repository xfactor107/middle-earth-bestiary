import Book from "../components/Book";
import LeftPage from "../components/LeftPage";
import MainIllustration from "../components/MainIllustration";
import ContentsPage from "../components/ContentsPage";
import { useCodex } from "./codexContext";

// The index at "/": the frontispiece on the left page, the searchable contents
// on the right.
export default function ContentsSpread() {
  const { creatures, chapters } = useCodex();
  const first = creatures[0] ?? null;

  return (
    <Book label="Contents of the bestiary">
      <title>Middle-earth Bestiary</title>
      <LeftPage chapters={chapters} activeChapter={null}>
        <MainIllustration name="Frontispiece" imageUrl="/images/frontispiece.webp" caption="Frontispiece" />
      </LeftPage>
      <ContentsPage chapters={chapters} first={first && { id: first.id, name: first.name }} />
    </Book>
  );
}
