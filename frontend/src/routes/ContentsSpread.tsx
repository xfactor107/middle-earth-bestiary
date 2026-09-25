import Book from "../components/Book";
import LeftPage from "../components/LeftPage";
import MainIllustration from "../components/MainIllustration";
import ContentsPage from "../components/ContentsPage";
import { useCodex } from "./codexContext";

export default function ContentsSpread() {
  const { chapters } = useCodex();

  return (
    <Book label="Contents of the bestiary">
      <title>Tolkien Bestiary</title>
      <LeftPage chapters={chapters} activeChapter={null}>
        <MainIllustration name="Frontispiece" imageUrl="/images/frontispiece.png" caption="Frontispiece" />
      </LeftPage>
      <ContentsPage chapters={chapters} />
    </Book>
  );
}
