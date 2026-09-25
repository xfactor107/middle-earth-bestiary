import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Prisma } from "@prisma/client";
import creatureRouter from "./routes/creatureRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Comma-separated allowed origins, e.g. https://bestiary.vercel.app; any origin when unset.
// Trailing slashes are dropped because browsers send the Origin header without one.
const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((o) => o.trim().replace(/\/+$/, ""));
app.use(cors({ origin: allowedOrigins ?? true }));
app.use(express.json());

// API Routes
app.use("/api/creatures", creatureRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2025: update/delete target does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Creature not found" });
      return;
    }
    // P2002: unique constraint (creature name) violated
    if (err.code === "P2002") {
      res.status(409).json({ error: "A creature with that name already exists" });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🧙‍♂️`);
});
