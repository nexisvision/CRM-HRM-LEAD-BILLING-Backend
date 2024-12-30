import { Router } from "express";
import { createDealUser, getAllDealUser, deleteDealUser } from "../controllers/dealControllers/dealUserControllers/index.js";

const router = Router();

// Deal user routes start ================================
router.post("/:dealId/", createDealUser.validator, createDealUser.handler);
router.get("/:dealId/", getAllDealUser.validator, getAllDealUser.handler);
router.delete("/:dealId/:id", deleteDealUser.validator, deleteDealUser.handler);
// Deal user routes end ================================

export default router;
