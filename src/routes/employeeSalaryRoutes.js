import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createEmployeeSalary, getEmployeeSalary, updateEmployeeSalary, deleteEmployeeSalary } from "../controllers/employeeSalaryController/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createEmployeeSalary.validator, createEmployeeSalary.handler);
router.get('/', getEmployeeSalary.validator, getEmployeeSalary.handler);
router.put('/:id', updateEmployeeSalary.validator, updateEmployeeSalary.handler);
router.delete('/:id', deleteEmployeeSalary.validator, deleteEmployeeSalary.handler);

export default router;