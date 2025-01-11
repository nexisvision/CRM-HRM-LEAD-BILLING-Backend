import express from "express";
import { getAllClients, updateClient, deleteClient, createClient } from "../controllers/clientControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkUserRole(['super-admin']));

router.post('/', createClient.validator, createClient.handler);
router.get('/', getAllClients.validator, getAllClients.handler);
router.put('/:id', updateClient.validator, updateClient.handler);
router.delete('/:id', deleteClient.validator, deleteClient.handler);


export default router;