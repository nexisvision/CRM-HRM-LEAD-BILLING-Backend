import express from 'express';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';
import { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan, subscribeToPlan, cancelSubscription, getSubscriptionStatus, getUsageStats, getPlanLimits } from '../controllers/subscriptionController/index.js';

const router = express.Router();

// Plan Management (Super Admin only)
router.post('/plans', authenticateUser, checkUserRole(['super-admin']), createPlan.validator, createPlan.handler);
router.get('/plans', authenticateUser, getAllPlans.validator, getAllPlans.handler);
router.get('/plans/:id', authenticateUser, getPlanById.validator, getPlanById.handler);
router.put('/plans/:id', authenticateUser, checkUserRole(['super-admin']), updatePlan.validator, updatePlan.handler);
router.delete('/plans/:id', authenticateUser, checkUserRole(['super-admin']), deletePlan.validator, deletePlan.handler);

// Subscription Management
router.post('/subscribe', authenticateUser, checkUserRole(['client']), subscribeToPlan.validator, subscribeToPlan.handler);
router.put('/:id/cancel', authenticateUser, checkUserRole(['client']), cancelSubscription.validator, cancelSubscription.handler);

// Status and Usage
router.get('/status', authenticateUser, getSubscriptionStatus.handler);
router.get('/usage', authenticateUser, getUsageStats.handler);
router.get('/limits', authenticateUser, getPlanLimits.handler);

export default router;
