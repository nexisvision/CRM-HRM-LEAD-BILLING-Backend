import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createSubClient, getAllSubClients, updateSubClient, deleteSubClient } from "../controllers/subClientControllers/index.js";
import { checkClientLimit, checkSubscriptionExpiry } from "../middlewares/checkSubscriptionLimits.js";
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', checkSubscriptionExpiry, checkClientLimit, createSubClient.validator, createSubClient.handler);
router.get('/', getAllSubClients.validator, getAllSubClients.handler);
router.put('/:id', updateSubClient.validator, updateSubClient.handler);
router.delete('/:id', deleteSubClient.validator, deleteSubClient.handler);

export default router;