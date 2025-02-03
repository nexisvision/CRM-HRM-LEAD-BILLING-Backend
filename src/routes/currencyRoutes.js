import { Router } from "express";
import { createCurrency, getAllCurrency,deletecurrency } from "../controllers/currencyControllers/index.js";

const router = Router();

router.post('/', createCurrency.validator, createCurrency.handler);
router.get('/', getAllCurrency.validator, getAllCurrency.handler);

router.delete("/:id", deletecurrency.validator, deletecurrency.handler);


export default router;