import express from 'express';
import { authenticateUser, checkRole } from '../middlewares/index.js';
import { createGoalType, getAllGoalType, getGoalTypeById, updateGoalType, deleteGoalType } from '../controllers/GoalTypeController/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createGoalType.validator, createGoalType.handler);
router.get('/', getAllGoalType.validator, getAllGoalType.handler);
router.get('/:id', getGoalTypeById.validator, getGoalTypeById.handler);
router.put('/:id', updateGoalType.validator, updateGoalType.handler);
router.delete('/:id', deleteGoalType.validator, deleteGoalType.handler);

export default router;