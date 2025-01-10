import { Router } from "express";
import { createSalesInvoice, deleteSalesInvoice, getAllSalesInvoice, updateSalesInvoice } from "../controllers/salesInvoiceControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();


router.use(authenticateUser, checkRole);

router.post("/", createSalesInvoice.validator, createSalesInvoice.handler);
router.get("/", getAllSalesInvoice.validator, getAllSalesInvoice.handler);
router.put("/:id", updateSalesInvoice.validator, updateSalesInvoice.handler);
router.delete("/:id", deleteSalesInvoice.validator, deleteSalesInvoice.handler);

export default router;