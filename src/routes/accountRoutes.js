import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { getAccounts, getAccountById, createAccount, updateAccount, deleteAccount } from "../controllers/accountControllers/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createAccount.validator, createAccount.handler);
router.get('/', getAccounts.validator, getAccounts.handler);
router.get('/:id', getAccountById.validator, getAccountById.handler);
router.put('/:id', updateAccount.validator, updateAccount.handler);
router.delete('/:id', deleteAccount.validator, deleteAccount.handler);

export default router;