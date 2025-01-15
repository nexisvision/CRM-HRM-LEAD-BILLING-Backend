import express from "express";
import { createBill, getAllBill, updateBill, deleteBill } from "../controllers/billControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/:id', createBill.validator, createBill.handler);
router.get('/:id', getAllBill.validator, getAllBill.handler);
router.put('/:id', updateBill.validator, updateBill.handler);
router.delete('/:id', deleteBill.validator, deleteBill.handler);

export default router;
