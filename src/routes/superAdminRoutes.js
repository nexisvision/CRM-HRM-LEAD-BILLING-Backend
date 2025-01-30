import express from "express";
import { createSuperAdmin, getAllSuperAdmins, updateSuperAdmin, deleteSuperAdmin, allLogin } from "../controllers/superAdminControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();


router.post("/", createSuperAdmin.validator, createSuperAdmin.handler);


router.use(authenticateUser, checkUserRole(['super-admin']));
router.get('/', getAllSuperAdmins.validator, getAllSuperAdmins.handler);
router.put('/:id', updateSuperAdmin.validator, updateSuperAdmin.handler);
router.delete('/:id', deleteSuperAdmin.validator, deleteSuperAdmin.handler);

router.post('/alllogin', allLogin.validator, allLogin.handler)

export default router;
