import { Route, Routes } from "react-router";
import CodexLayout from "./routes/CodexLayout";
import ContentsSpread from "./routes/ContentsSpread";
import CreatureSpread from "./routes/CreatureSpread";
import StatusSpread from "./components/StatusSpread";
import HostingNotice from "./components/HostingNotice";

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
