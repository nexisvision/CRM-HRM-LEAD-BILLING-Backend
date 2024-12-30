import express from 'express';
import { createRole, getAllRoles, getRoleById, updateRole, deleteRole } from '../controllers/roleController/index.js';
import { authenticateUser, checkRole } from '../middlewares/index.js';

const router = express.Router();


router.post('/', createRole.validator, createRole.handler);
router.use(authenticateUser, checkRole);
router.get('/', getAllRoles.validator, getAllRoles.handler);
router.get('/:id', getRoleById.validator, getRoleById.handler);
router.put('/:id', updateRole.validator, updateRole.handler);
router.delete('/:id', deleteRole.validator, deleteRole.handler);

export default router;
