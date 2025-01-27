import express from 'express';
import { authenticateUser, checkRole, checkUserRole } from '../middlewares/index.js';
import { createPlan, getAllPlans, updatePlan, deletePlan, assignPlanToClient, getAllAssignedPlans } from '../controllers/subscriptionController/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);
router.get('/', getAllPlans.validator, getAllPlans.handler);

router.use(authenticateUser, checkUserRole(['super-admin']));
router.post('/', createPlan.validator, createPlan.handler);
router.put('/:id', updatePlan.validator, updatePlan.handler);
router.delete('/:id', deletePlan.validator, deletePlan.handler);

// Assign plan to client
router.post('/assign', assignPlanToClient.validator, assignPlanToClient.handler);

// New route for getting all assigned plans
router.get('/assign', getAllAssignedPlans.validator, getAllAssignedPlans.handler);

export default router;
