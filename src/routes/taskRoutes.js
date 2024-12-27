import { Router } from "express";
import {createTask, deleteTask, updateTask, getAllTask} from "../controllers/taskControllers/index.js";


const router = Router();

router.post('/', createTask.validator, createTask.handler);
router.delete('/:id', deleteTask.validator, deleteTask.handler);
router.put('/:id', updateTask.validator, updateTask.handler);
router.get('/', getAllTask.validator, getAllTask.handler);
export default router;