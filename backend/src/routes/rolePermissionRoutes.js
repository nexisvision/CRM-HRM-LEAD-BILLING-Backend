import express from 'express';
const router = express.Router();
import { createRolePermission, getAllRolePermissions, getRolePermissionById, updateRolePermission, deleteRolePermission } from '../controllers/rolePermissionControllers/index.js';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';

// Role-Permission routes
router.post('/', authenticateUser, checkUserRole(['client']), createRolePermission.validator, createRolePermission.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllRolePermissions.validator, getAllRolePermissions.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getRolePermissionById.validator, getRolePermissionById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateRolePermission.validator, updateRolePermission.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteRolePermission.validator, deleteRolePermission.handler);

export default router;
