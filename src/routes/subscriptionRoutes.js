import express from 'express';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';
import { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan, assignPlanToClient } from '../controllers/subscriptionController/index.js';

const router = express.Router();

router.use(authenticateUser, checkUserRole(['super-admin']));

router.post('/', createPlan.validator, createPlan.handler);
router.get('/', getAllPlans.validator, getAllPlans.handler);
router.get('/:id', getPlanById.validator, getPlanById.handler);
router.put('/:id', updatePlan.validator, updatePlan.handler);
router.delete('/:id', deletePlan.validator, deletePlan.handler);

// Assign plan to client
router.post('/assign', assignPlanToClient.validator, assignPlanToClient.handler);

export default router;
