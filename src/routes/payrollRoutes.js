import express from "express";
import { authenticateUser, checkRole } from "../middleware/authMiddleware.js";
import { createPayroll, getAllPayroll, getPayrollById, updatePayroll, deletePayroll } from "../controllers/payrollController/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createPayroll.validator, createPayroll.controller);
router.get('/', getAllPayroll.validator, getAllPayroll.controller);
router.get('/:id', getPayrollById.validator, getPayrollById.controller);
router.put('/:id', updatePayroll.validator, updatePayroll.controller);
router.delete('/:id', deletePayroll.validator, deletePayroll.controller);

export default router;