import Book from "./components/Book";
import { balrogFixture } from "./data/balrogFixture";

// Static spread: the Balrog is hardcoded until routing and API fetches land
export default function App() {
  return (
    <main className="desk">
      <Book creature={balrogFixture} pageNumber={1} totalPages={16} />
    </main>
  );
}
