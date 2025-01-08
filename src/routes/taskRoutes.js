import { Router } from "express";
import { createTask, deleteTask, updateTask, getAllTask } from "../controllers/taskControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();

router.use(authenticateUser, checkRole);

router.post('/:id', createTask.validator, createTask.handler);
router.get('/:id', getAllTask.validator, getAllTask.handler);
router.put('/:id', updateTask.validator, updateTask.handler);
router.delete('/:id', deleteTask.validator, deleteTask.handler);

export default router;