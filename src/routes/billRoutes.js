import express from "express";
import { createBill, getAllBill, updateBill, deleteBill } from "../controllers/billControllers/index.js";
import downloadBill from "../controllers/billControllers/downloadBill.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();


router.get('/download/:billId', downloadBill.handler);

router.use(authenticateUser);

// Protected routes requiring role check
router.post('/:billId', checkRole, createBill.validator, createBill.handler);
router.get('/:billId', checkRole, getAllBill.validator, getAllBill.handler);
router.put('/:billId', checkRole, updateBill.validator, updateBill.handler);
router.delete('/:billId', checkRole, deleteBill.validator, deleteBill.handler);

export default router;
