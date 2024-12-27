import { Router } from "express";
import { createDeal, deleteDeal, getAllDeal, updateDeal } from "../controllers/dealControllers/index.js";

const router = Router();

router.post("/", createDeal.validator, createDeal.handler);
router.delete("/:id", deleteDeal.validator, deleteDeal.handler);
router.get("/", getAllDeal.validator, getAllDeal.handler);
router.put("/:id", updateDeal.validator, updateDeal.handler);

export default router;