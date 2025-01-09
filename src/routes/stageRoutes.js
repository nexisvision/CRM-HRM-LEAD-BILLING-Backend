import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createStage, getAllStages, updateStage, deleteStage } from "../controllers/stageControllers/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createStage.validator, createStage.handler);
router.get('/', getAllStages.validator, getAllStages.handler);
router.put('/:id', updateStage.validator, updateStage.handler);
router.delete('/:id', deleteStage.validator, deleteStage.handler);

export default router;