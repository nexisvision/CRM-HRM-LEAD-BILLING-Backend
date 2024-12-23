import express from "express";
import { getAllClients, getClientById, updateClient, deleteClient, createClient } from "../controllers/clientControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllClients.validator, getAllClients.handler);
router.post('/', authenticateUser, checkUserRole(['super-admin']), createClient.validator, createClient.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getClientById.validator, getClientById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateClient.validator, updateClient.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteClient.validator, deleteClient.handler);


export default router;