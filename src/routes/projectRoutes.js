import express from "express";
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createProject.validator, createProject.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllProjects.validator, getAllProjects.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getProjectById.validator, getProjectById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateProject.validator, updateProject.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteProject.validator, deleteProject.handler);

export default router;