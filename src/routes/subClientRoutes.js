import express from "express";
import { authenticateUser, checkRole, checkUserRole } from "../middlewares/index.js";
import { createSubClient, getAllSubClients, updateSubClient, deleteSubClient } from "../controllers/subClientControllers/index.js";
import { getActiveSubscription } from "../middlewares/checkSubscriptionLimits.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.use(authenticateUser, checkRole);
router.put('/:id', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'e_signature', maxCount: 1 }
]), updateSubClient.validator, updateSubClient.handler);


router.use(authenticateUser, checkUserRole(['super-admin', 'client']));
router.post('/', getActiveSubscription, createSubClient.validator, createSubClient.handler);
router.get('/', getAllSubClients.validator, getAllSubClients.handler);
router.delete('/:id', deleteSubClient.validator, deleteSubClient.handler);

export default router;