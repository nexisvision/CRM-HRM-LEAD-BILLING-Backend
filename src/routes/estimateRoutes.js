import express from "express";
import { createEstimate, getAllEstimates, updateEstimate, deleteEstimate } from "../controllers/estimateControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/:id', createEstimate.validator, createEstimate.handler);
router.get('/:id', getAllEstimates.validator, getAllEstimates.handler);
router.put('/:id', updateEstimate.validator, updateEstimate.handler);
router.delete('/:id', deleteEstimate.validator, deleteEstimate.handler);

export default router;