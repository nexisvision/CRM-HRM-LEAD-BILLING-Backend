import express from "express";
import { createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice } from "../controllers/invoiceControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createInvoice.validator, createInvoice.handler);
router.get('/', getAllInvoices.validator, getAllInvoices.handler);
router.get('/:id', getInvoiceById.validator, getInvoiceById.handler);
router.put('/:id', updateInvoice.validator, updateInvoice.handler);
router.delete('/:id', deleteInvoice.validator, deleteInvoice.handler);

export default router;  