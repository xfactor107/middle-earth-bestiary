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
