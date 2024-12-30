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




export default router;