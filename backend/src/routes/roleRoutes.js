import express from 'express';
import { createRole, getAllRoles, getRoleById, updateRole, deleteRole } from '../controllers/roleController/index.js';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createRole.validator, createRole.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllRoles.validator, getAllRoles.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getRoleById.validator, getRoleById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateRole.validator, updateRole.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteRole.validator, deleteRole.handler);

export default router;
