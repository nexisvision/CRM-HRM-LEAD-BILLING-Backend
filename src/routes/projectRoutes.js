import express from "express";
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createProject.validator, createProject.handler);
router.get('/', getAllProjects.validator, getAllProjects.handler);
router.get('/:id', getProjectById.validator, getProjectById.handler);
router.put('/:id', updateProject.validator, updateProject.handler);
router.delete('/:id', deleteProject.validator, deleteProject.handler);

export default router;