import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createAppreciation, getAppreciations, getAppreciationById, updateAppreciation, deleteAppreciation } from "../controllers/appreciationController/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createAppreciation.validator, createAppreciation.handler);
router.get('/', getAppreciations.validator, getAppreciations.handler);
router.get('/:id', getAppreciationById.validator, getAppreciationById.handler);
router.put('/:id', updateAppreciation.validator, updateAppreciation.handler);
router.delete('/:id', deleteAppreciation.validator, deleteAppreciation.handler);

export default router;