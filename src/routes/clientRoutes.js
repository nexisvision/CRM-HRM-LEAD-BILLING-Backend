import express from "express";
import { getAllClients, updateClient, deleteClient, createClient, updatemail } from "../controllers/clientControllers/index.js";
import { authenticateUser, checkRole, checkUserRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.put('/:id', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'e_signatures', maxCount: 1 }
]), updateClient.validator, updateClient.handler);

router.put('/:id/email', updatemail.validator, updatemail.handler);

router.use(authenticateUser, checkUserRole(['super-admin']));

router.post('/', createClient.validator, createClient.handler);

router.get('/', getAllClients.validator, getAllClients.handler);


router.delete('/:id', deleteClient.validator, deleteClient.handler);

export default router;