import express from "express";
import { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employeeControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createEmployee.validator, createEmployee.handler);
router.get('/', getAllEmployees.validator, getAllEmployees.handler);
router.get('/:id', getEmployeeById.validator, getEmployeeById.handler);
router.put('/:id', updateEmployee.validator, updateEmployee.handler);
router.delete('/:id', deleteEmployee.validator, deleteEmployee.handler);


export default router;