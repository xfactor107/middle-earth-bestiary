import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

export const validateRequest = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as { body?: unknown; query?: unknown; params?: unknown };

      // Only replace the parts this schema validated; the rest stay untouched
      if ("body" in parsed) req.body = parsed.body;
      if ("params" in parsed) req.params = parsed.params as Request["params"];
      // Express 5 exposes req.query as a read-only getter, so redefine it instead of assigning
      if ("query" in parsed) {
        Object.defineProperty(req, "query", {
          value: parsed.query,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
