import { Router } from "express";
import { createBillDebitNote, getAllBillDebitNote, updateBillDebitNote, deleteBillDebitNote } from "../controllers/billdebitnoteControllers.js/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import passCompanyDetails from '../middlewares/passCompanyDetail.js';
const router = Router();


router.use(authenticateUser, checkRole, passCompanyDetails);

router.post("/", createBillDebitNote.validator, createBillDebitNote.handler);
router.get("/", getAllBillDebitNote.validator, getAllBillDebitNote.handler);
//  router.get("/:id", getBillDebitnoteById.validator, getBillDebitnoteById.handler);
router.put("/:id", updateBillDebitNote.validator, updateBillDebitNote.handler);
router.delete("/:id", deleteBillDebitNote.validator, deleteBillDebitNote.handler);

export default router;