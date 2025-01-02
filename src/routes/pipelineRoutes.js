import { createPipeline, getAllPipeline, DeletePipeline, updatePipeline } from "../controllers/pipelineControllers/index.js";
import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
const router = express.Router();

router.use(authenticateUser,checkRole);

router.post('/', createPipeline.validator, createPipeline.handler);
router.get('/', getAllPipeline.validator, getAllPipeline.handler);
router.delete('/:id', DeletePipeline.validator, DeletePipeline.handler);
router.put('/:id', updatePipeline.validator, updatePipeline.handler);

export default router;