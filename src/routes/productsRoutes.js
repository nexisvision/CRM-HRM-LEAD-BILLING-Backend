import express from "express";
import { createProducts, getAllProducts, updateProducts, deleteProducts } from "../controllers/productsControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post("/:id", createProducts.validator, createProducts.handler);
router.get("/:id", getAllProducts.validator, getAllProducts.handler);
router.put("/:id", updateProducts.validator, updateProducts.handler);
router.delete("/:id", deleteProducts.validator, deleteProducts.handler);

export default router;

