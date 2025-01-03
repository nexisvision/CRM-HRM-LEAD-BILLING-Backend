import { Router } from "express";
import { createProposal, deleteProposal, getAllProposal, updateProposal } from "../controllers/proposalControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();

router.use(authenticateUser, checkRole);

router.post("/", createProposal.handler, createProposal.validator);
router.get("/", getAllProposal.handler, getAllProposal.validator);
router.put("/:id", updateProposal.handler, updateProposal.validator);
router.delete("/:id", deleteProposal.handler, deleteProposal.validator);

export default router;