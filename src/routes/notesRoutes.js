import { Router } from "express";
import { createNotes, getAllNotes, updateNotes, deleteNotes } from "../controllers/noteControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();

router.use(authenticateUser, checkRole);

router.post("/:project_id", createNotes.validator, createNotes.handler);
router.get("/:project_id", getAllNotes.validator, getAllNotes.handler);
router.put("/:id", updateNotes.validator, updateNotes.handler);
router.delete("/:id", deleteNotes.validator, deleteNotes.handler);

export default router;