import express from "express";
import { createSuperAdmin, getAllSuperAdmins, getSuperAdminById, updateSuperAdmin, deleteSuperAdmin } from "../controllers/superAdminControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();


router.post("/", createSuperAdmin.validator, createSuperAdmin.handler);
router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllSuperAdmins.validator, getAllSuperAdmins.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getSuperAdminById.validator, getSuperAdminById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateSuperAdmin.validator, updateSuperAdmin.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteSuperAdmin.validator, deleteSuperAdmin.handler);

export default router;
