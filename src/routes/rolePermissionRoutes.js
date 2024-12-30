import express from 'express';
const router = express.Router();
import { createRolePermission, getAllRolePermissions, getRolePermissionById, updateRolePermission, deleteRolePermission } from '../controllers/rolePermissionControllers/index.js';
import { authenticateUser, checkRole } from '../middlewares/index.js';

router.use(authenticateUser, checkRole);

router.post('/', createRolePermission.validator, createRolePermission.handler);
router.get('/', getAllRolePermissions.validator, getAllRolePermissions.handler);
router.get('/:id', getRolePermissionById.validator, getRolePermissionById.handler);
router.put('/:id', updateRolePermission.validator, updateRolePermission.handler);
router.delete('/:id', deleteRolePermission.validator, deleteRolePermission.handler);

export default router;
