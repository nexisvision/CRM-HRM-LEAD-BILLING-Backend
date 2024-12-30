import { Router } from "express";
import { createTask, deleteTask, updateTask, getAllTask } from "../controllers/taskControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();

router.use(authenticateUser, checkRole);

router.post('/', createTask.validator, createTask.handler);
router.delete('/:id', deleteTask.validator, deleteTask.handler);
router.put('/:id', updateTask.validator, updateTask.handler);
router.get('/', getAllTask.validator, getAllTask.handler);
export default router;