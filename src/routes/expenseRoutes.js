import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from "../controllers/expenseControllers/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/:id', createExpense.validator, createExpense.handler);
router.get('/:id', getAllExpenses.validator, getAllExpenses.handler);
router.get('/:id', getExpenseById.validator, getExpenseById.handler);
router.put('/:id', updateExpense.validator, updateExpense.handler);
router.delete('/:id', deleteExpense.validator, deleteExpense.handler);

export default router;