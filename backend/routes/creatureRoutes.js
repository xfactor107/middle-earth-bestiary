import express from "express";
import {
  getCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
} from "../controllers/creatureController.js";
import { validate } from "../src/middleware/validate.js";
import {
  getCreaturesQuerySchema,
  creatureIdParamSchema,
  createCreatureSchema,
  updateCreatureSchema,
} from "../src/schemas/creature.schema.js";

const router = express.Router();

router
  .route("/")
  .get(validate(getCreaturesQuerySchema), getCreatures)
  .post(validate(createCreatureSchema), createCreature);

router
  .route("/:id")
  .get(validate(creatureIdParamSchema), getCreatureById)
  .put(validate(updateCreatureSchema), updateCreature)
  .delete(validate(creatureIdParamSchema), deleteCreature);

export default router;
