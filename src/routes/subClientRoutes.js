import express from "express";
import { getAllSubClients, getSubClientById, updateSubClient, deleteSubClient, createSubClient } from "../controllers/subClientControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createSubClient.validator, createSubClient.handler);
router.get('/', getAllSubClients.validator, getAllSubClients.handler);
router.get('/:id', getSubClientById.validator, getSubClientById.handler);
router.put('/:id', updateSubClient.validator, updateSubClient.handler);
router.delete('/:id', deleteSubClient.validator, deleteSubClient.handler);

export default router;