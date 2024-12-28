import { Router } from "express";
import { createDeal, deleteDeal, getAllDeal, updateDeal } from "../controllers/dealControllers/index.js";
import { createDealTask, deleteDealTask, getAllDealTask } from "../controllers/dealControllers/dealTaskControllers/index.js";
import { createDealUser, getAllDealUser, deleteDealUser } from "../controllers/dealControllers/dealUserControllers/index.js";

const router = Router();


// Deal routes start ================================
router.post("/", createDeal.validator, createDeal.handler);
router.delete("/:id", deleteDeal.validator, deleteDeal.handler);
router.get("/", getAllDeal.validator, getAllDeal.handler);
router.put("/:id", updateDeal.validator, updateDeal.handler);

// Deal routes end ================================

// Deal task routes start ================================
router.post("/:dealId/task", createDealTask.validator, createDealTask.handler);
router.delete("/:dealId/task/:taskId", deleteDealTask.validator, deleteDealTask.handler);
router.get("/:dealId/task", getAllDealTask.validator, getAllDealTask.handler);
// Deal task routes end ================================


// Deal user routes start ================================
router.post("/:dealId/user", createDealUser.validator, createDealUser.handler);
router.get("/:dealId/user", getAllDealUser.validator, getAllDealUser.handler);
router.delete("/:dealId/user/:employeeId", deleteDealUser.validator, deleteDealUser.handler);
// Deal user routes end ================================

export default router;