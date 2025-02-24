import { Router } from "express";
import { createBillPayment, getAllBillPayment } from "../controllers/billpaymentControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();


router.use(authenticateUser, checkRole);

router.post("/", createBillPayment.validator, createBillPayment.handler);
router.get("/", getAllBillPayment.validator, getAllBillPayment.handler);
//  router.get("/:id", getBillDebitnoteById.validator, getBillDebitnoteById.handler);
// router.put("/:id", updateBillDebitNote.validator, updateBillDebitNote.handler);
// router.delete("/:id", deleteBillDebitNote.validator, deleteBillDebitNote.handler);

export default router;