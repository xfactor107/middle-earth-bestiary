// Routes for /api/creatures. Each request passes through its middleware left to right:
//   requireAdmin     writes only: rejects requests without the right x-api-key
//   validateRequest  checks and converts params/query/body against a Zod schema (400 on failure)
//   controller       runs the Prisma query and sends the response
// Reads are public; the live site has no ADMIN_API_KEY, so it is read-only.
import express from "express";
import {
  getCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
} from "../controllers/creatureController.js";
import { validateRequest } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  getCreaturesQuerySchema,
  creatureIdParamSchema,
  createCreatureSchema,
  updateCreatureSchema,
} from "../schemas/creature.schema.js";

const router = express.Router();

router
  .route("/")
  .get(validateRequest(getCreaturesQuerySchema), getCreatures)
  .post(requireAdmin, validateRequest(createCreatureSchema), createCreature);

router
  .route("/:id")
  .get(validateRequest(creatureIdParamSchema), getCreatureById)
  .put(requireAdmin, validateRequest(updateCreatureSchema), updateCreature)
  .delete(requireAdmin, validateRequest(creatureIdParamSchema), deleteCreature);

export default router;
