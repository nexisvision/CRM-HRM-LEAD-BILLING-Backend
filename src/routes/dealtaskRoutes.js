import { Router } from "express";
import { createDealTask, deleteDealTask, getAllDealTask } from "../controllers/dealControllers/dealTaskControllers/index.js";

const router = Router();

// Deal task routes start ================================
router.post("/:dealId/", createDealTask.validator, createDealTask.handler);
router.delete("/:dealId/:id", deleteDealTask.validator, deleteDealTask.handler);
router.get("/:dealId/", getAllDealTask.validator, getAllDealTask.handler);
// Deal task routes end ================================

export default router;
