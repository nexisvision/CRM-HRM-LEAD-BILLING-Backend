import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/categoryControllers/index.js";

const router = Router();

router.post("/", createCategory.validator, createCategory.handler);
router.get("/", getAllCategory.validator, getAllCategory.handler);
router.put("/:id", updateCategory.validator, updateCategory.handler);
router.delete("/:id", deleteCategory.validator, deleteCategory.handler);

export default router;