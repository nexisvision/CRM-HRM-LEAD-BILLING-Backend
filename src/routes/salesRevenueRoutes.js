import { Router } from "express";
import { createSalesRevenue, deleteSalesRevenue, getAllSalesRevenue, updateSalesRevenue } from "../controllers/salesRevenueControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();


router.use(authenticateUser, checkRole);

router.post("/", createSalesRevenue.validator, createSalesRevenue.handler);
router.get("/", getAllSalesRevenue.validator, getAllSalesRevenue.handler);
router.put("/:id", updateSalesRevenue.validator, updateSalesRevenue.handler);
router.delete("/:id", deleteSalesRevenue.validator, deleteSalesRevenue.handler);

export default router;