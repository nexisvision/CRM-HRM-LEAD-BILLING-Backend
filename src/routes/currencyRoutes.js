import { Router } from "express";
import { createCurrency, getAllCurrency } from "../controllers/currencyControllers/index.js";

const router = Router();

router.post('/', createCurrency.validator, createCurrency.handler);
router.get('/', getAllCurrency.validator, getAllCurrency.handler);

export default router;