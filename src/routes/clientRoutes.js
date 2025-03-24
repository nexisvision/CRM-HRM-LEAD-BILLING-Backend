import express from "express";
import { getAllClients, updateClient, deleteClient, createClient, updatemail, registerClient } from "../controllers/clientControllers/index.js";
import { authenticateUser, checkRole, checkUserRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.post('/register', registerClient.validator, registerClient.handler);

router.use(authenticateUser, checkRole);

router.put('/:id', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'e_signatures', maxCount: 1 }
]), updateClient.validator, updateClient.handler);

router.put('/email/:id', updatemail.validator, updatemail.handler);

router.get('/', getAllClients.validator, getAllClients.handler);



router.use(authenticateUser, checkUserRole(['super-admin']));

router.post('/', createClient.validator, createClient.handler);



router.delete('/:id', deleteClient.validator, deleteClient.handler);

export default router;