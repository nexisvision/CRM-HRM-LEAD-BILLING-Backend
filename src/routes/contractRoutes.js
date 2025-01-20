import express from "express";
import { getAllContracts, getContractById, updateContract, deleteContract, createContract } from "../controllers/contractControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createContract.validator, createContract.handler);
router.get('/', getAllContracts.validator, getAllContracts.handler);
router.get('/:id', getContractById.validator, getContractById.handler);
router.put('/:id', updateContract.validator, updateContract.handler);
router.delete('/:id', deleteContract.validator, deleteContract.handler);


export default router;
