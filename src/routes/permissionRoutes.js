import express from "express";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
import { createPermission, getAllPermissions, getPermissionById, updatePermission, deletePermission, assignPermissionToRole, removePermissionFromRole, getPermissionsByRoleId } from "../controllers/permissionControllers/index.js";

const router = express.Router();


router.post('/', authenticateUser, checkUserRole(['client']), createPermission.validator, createPermission.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllPermissions.validator, getAllPermissions.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getPermissionById.validator, getPermissionById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updatePermission.validator, updatePermission.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deletePermission.validator, deletePermission.handler);
router.post('/assign-to-role', authenticateUser, checkUserRole(['super-admin']), assignPermissionToRole.validator, assignPermissionToRole.handler);
router.delete('/remove-from-role', authenticateUser, checkUserRole(['super-admin']), removePermissionFromRole.validator, removePermissionFromRole.handler);
router.get('/role/:roleId', authenticateUser, checkUserRole(['super-admin']), getPermissionsByRoleId.validator, getPermissionsByRoleId.handler);

export default router;