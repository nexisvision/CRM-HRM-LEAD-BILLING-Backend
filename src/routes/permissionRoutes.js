import express from "express";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
import { createPermission, getAllPermissions, getPermissionById, updatePermission, deletePermission, assignPermissionToRole, removePermissionFromRole, getPermissionsByRoleId } from "../controllers/permissionControllers/index.js";

const router = express.Router();


router.post('/', authenticateUser, checkUserRole(['super-admin']), createPermission.validator, createPermission.handler);
router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllPermissions.validator, getAllPermissions.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getPermissionById.validator, getPermissionById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updatePermission.validator, updatePermission.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deletePermission.validator, deletePermission.handler);
router.post('/assign-to-role', authenticateUser, checkUserRole(['super-admin']), assignPermissionToRole.validator, assignPermissionToRole.handler);
router.delete('/remove-from-role', authenticateUser, checkUserRole(['super-admin']), removePermissionFromRole.validator, removePermissionFromRole.handler);
router.get('/role/:roleId', authenticateUser, checkUserRole(['super-admin']), getPermissionsByRoleId.validator, getPermissionsByRoleId.handler);

export default router;