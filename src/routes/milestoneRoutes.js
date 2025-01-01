import { Router } from "express";
import { createMilestone, deleteMilestone, getAllMilestone, updateMilestone } from "../controllers/milestoneControllers/index.js";

const router = Router();

router.post("/:project_id", createMilestone.validator, createMilestone.handler);
router.get("/:project_id", getAllMilestone.validator, getAllMilestone.handler);
router.put("/:id", updateMilestone.validator, updateMilestone.handler);
router.delete("/:id", deleteMilestone.validator, deleteMilestone.handler);

export default router;