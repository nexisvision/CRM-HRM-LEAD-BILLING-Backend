import express from "express";
import { getAllClients, getClientById, updateClient, deleteClient, createClient } from "../controllers/clientControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['company']), createClient.validator, createClient.handler);
router.get('/', authenticateUser, checkUserRole(['company']), getAllClients.validator, getAllClients.handler);
router.get('/:id', authenticateUser, checkUserRole(['company']), getClientById.validator, getClientById.handler);
router.put('/:id', authenticateUser, checkUserRole(['company']), updateClient.validator, updateClient.handler);
router.delete('/:id', authenticateUser, checkUserRole(['company']), deleteClient.validator, deleteClient.handler);


export default router;