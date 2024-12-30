import express from 'express';
import { authenticateUser, checkRole } from '../middlewares/index.js';
import { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan } from '../controllers/subscriptionController/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createPlan.validator, createPlan.handler);
router.get('/', getAllPlans.validator, getAllPlans.handler);
router.get('/:id', getPlanById.validator, getPlanById.handler);
router.put('/:id', updatePlan.validator, updatePlan.handler);
router.delete('/:id', deletePlan.validator, deletePlan.handler);

export default router;
