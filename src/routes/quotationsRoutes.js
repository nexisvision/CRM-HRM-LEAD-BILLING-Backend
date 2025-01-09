import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createQuotation, getAllQuotations, updateQuotation, deleteQuotation } from "../controllers/quotationsControllers/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/:id', createQuotation.validator, createQuotation.handler);
router.get('/:id', getAllQuotations.validator, getAllQuotations.handler);
router.put('/:id', updateQuotation.validator, updateQuotation.handler);
router.delete('/:id', deleteQuotation.validator, deleteQuotation.handler);

export default router;