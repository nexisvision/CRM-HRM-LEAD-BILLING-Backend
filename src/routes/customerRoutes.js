import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createCustomer, getCustomers, updateCustomer, deleteCustomer } from "../controllers/customerController/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createCustomer.validator, createCustomer.handler);
router.get('/', getCustomers.validator, getCustomers.handler);
router.put('/:id', updateCustomer.validator, updateCustomer.handler);
router.delete('/:id', deleteCustomer.validator, deleteCustomer.handler);

export default router;