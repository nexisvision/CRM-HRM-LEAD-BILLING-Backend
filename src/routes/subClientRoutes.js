import express from "express";
import { getAllSubClients, getSubClientById, updateSubClient, deleteSubClient, createSubClient } from "../controllers/subClientControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createSubClient.validator, createSubClient.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllSubClients.validator, getAllSubClients.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getSubClientById.validator, getSubClientById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateSubClient.validator, updateSubClient.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteSubClient.validator, deleteSubClient.handler);

export default router;