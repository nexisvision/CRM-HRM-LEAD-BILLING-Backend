import express from "express";
import { createDepartment, getAllDepartments, updateDepartment, deleteDepartment } from "../controllers/departmentControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authenticateUser, checkUserRole(['client']), getAllDepartments.validator, getAllDepartments.handler);
router.post("/", authenticateUser, checkUserRole(['client']), createDepartment.validator, createDepartment.handler);
router.put("/:id", authenticateUser, checkUserRole(['client']), updateDepartment.validator, updateDepartment.handler);
router.delete("/:id", authenticateUser, checkUserRole(['client']), deleteDepartment.validator, deleteDepartment.handler);

export default router;