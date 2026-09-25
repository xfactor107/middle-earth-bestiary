import { createHash, timingSafeEqual } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

const digest = (value: string) => createHash("sha256").update(value).digest();

// Guards write routes. Requests must send `x-api-key` matching ADMIN_API_KEY;
// when ADMIN_API_KEY is unset, writes are disabled entirely.
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    res.status(403).json({ error: "Editing the codex is disabled on this server" });
    return;
  }

  const provided = req.get("x-api-key") ?? "";
  // Compare fixed-length digests so the check takes the same time for any input
  if (!timingSafeEqual(digest(provided), digest(expected))) {
    res.status(401).json({ error: "A valid x-api-key header is required" });
    return;
  }

  next();
};
