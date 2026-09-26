// The app is one open book on a desk. Every route renders a two-page "spread".
//
//   /                  ContentsSpread   table of contents with search (?q=)
//   /creatures/:id     CreatureSpread   one bestiary entry
//   anything else      StatusSpread     "This page is lost"
//
// How data flows:
//   CodexLayout fetches the whole codex once (GET /api/creatures) and shares it with
//   both spreads through outlet context (useCodex). CreatureSpread renders an entry
//   from that list instantly, then refreshes it from GET /api/creatures/:id.
//   All requests go through api/client.ts, which keeps retrying while the free-tier
//   backend wakes up.
import { Route, Routes } from "react-router";
import CodexLayout from "./routes/CodexLayout";
import ContentsSpread from "./routes/ContentsSpread";
import CreatureSpread from "./routes/CreatureSpread";
import StatusSpread from "./components/StatusSpread";
import HostingNotice from "./components/HostingNotice";
import "./routes/pageTurn.css";

export default function App() {
  return (
    <main className="desk">
      <Routes>
        <Route element={<CodexLayout />}>
          <Route index element={<ContentsSpread />} />
          <Route path="creatures/:id" element={<CreatureSpread />} />
        </Route>
        <Route
          path="*"
          element={
            <StatusSpread
              title="This page is lost"
              message="There is no such page in this codex."
              showIndexLink
            />
          }
        />
      </Routes>
      <HostingNotice />
    </main>
  );
}
