import express from "express";
import { createFeature, getAllFeature, deleteFeature, updateFeature } from "../controllers/featureControllers/index.js";

const router = express.Router();

router.post('/', createFeature.validator, createFeature.handler);
router.get('/', getAllFeature.validator, getAllFeature.handler);
router.delete('/:id', deleteFeature.validator, deleteFeature.handler);
router.put('/:id', updateFeature.validator, updateFeature.handler);

export default router;