import express from "express";
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject, deleteProjectMembers, addProjectMembers, getAllClientsProject } from "../controllers/projectController/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createProject.validator, createProject.handler);
router.get('/', getAllProjects.validator, getAllProjects.handler);
router.get('/:id', getProjectById.validator, getProjectById.handler);
router.put('/:id', updateProject.validator, updateProject.handler);
router.delete('/:id', deleteProject.validator, deleteProject.handler);

router.post('/membersdelete/:id', deleteProjectMembers.validator, deleteProjectMembers.handler);
router.post('/membersadd/:id', addProjectMembers.validator, addProjectMembers.handler);

router.get('/clients/:id', getAllClientsProject.validator, getAllClientsProject.handler);

export default router;