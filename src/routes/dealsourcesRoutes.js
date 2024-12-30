import { createDealSources } from "../controllers/dealControllers/dealSourcesControllers/index.js";
import { Router } from "express";

const router = Router();

router.post("/:dealId/", createDealSources.validator, createDealSources.handler);

export default router;
