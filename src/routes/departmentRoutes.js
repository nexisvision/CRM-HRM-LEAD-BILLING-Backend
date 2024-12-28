import express from "express";
import { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment } from "../controllers/departmentControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post("/", authenticateUser, checkUserRole(['client']), createDepartment.validator, createDepartment.handler);
router.get("/", authenticateUser, checkUserRole(['client']), getAllDepartments.validator, getAllDepartments.handler);
router.get("/:id", authenticateUser, checkUserRole(['client']), getDepartmentById.validator, getDepartmentById.handler);
router.put("/:id", authenticateUser, checkUserRole(['client']), updateDepartment.validator, updateDepartment.handler);
router.delete("/:id", authenticateUser, checkUserRole(['client']), deleteDepartment.validator, deleteDepartment.handler);

export default router;