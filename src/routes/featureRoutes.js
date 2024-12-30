import express from "express";
import { createFeature, getAllFeature, deleteFeature, updateFeature } from "../controllers/featureControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createFeature.validator, createFeature.handler);
router.get('/', getAllFeature.validator, getAllFeature.handler);
router.delete('/:id', deleteFeature.validator, deleteFeature.handler);
router.put('/:id', updateFeature.validator, updateFeature.handler);

export default router;