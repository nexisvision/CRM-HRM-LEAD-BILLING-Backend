import { Router } from "express";
import { createPayment, deletePayment, getAllPayment, updatePayment } from "../controllers/paymentControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();

router.use(authenticateUser, checkRole);

router.post('/', createPayment.validator, createPayment.handler);
router.get('/:id', getAllPayment.validator, getAllPayment.handler);
router.put('/:id', updatePayment.validator, updatePayment.handler);
router.delete('/:id', deletePayment.validator, deletePayment.handler);

export default router;