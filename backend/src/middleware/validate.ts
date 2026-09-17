import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

export const validateRequest = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = (parsed as { body?: unknown }).body;
      req.query = (parsed as { query?: unknown }).query as Request["query"];
      req.params = (parsed as { params?: unknown }).params as Request["params"];

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
