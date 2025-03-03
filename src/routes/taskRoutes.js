import { Router } from "express";
import { createTask, deleteTask, updateTask, getAllTask } from "../controllers/taskControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";
import passCompanyDetails from '../middlewares/passCompanyDetail.js';
const router = Router();

router.use(authenticateUser, checkRole, passCompanyDetails);

router.post('/:id', upload.fields([{ name: 'task_file', maxCount: 1 }]),createTask.validator, createTask.handler);
router.get('/:id', getAllTask.validator, getAllTask.handler);
router.put('/:id', updateTask.validator, updateTask.handler);
router.delete('/:id', deleteTask.validator, deleteTask.handler);

export default router;