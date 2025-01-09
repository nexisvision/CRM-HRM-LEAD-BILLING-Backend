import express from 'express';
import { createRole, getAllRoles, updateRole, deleteRole } from '../controllers/roleController/index.js';
import { authenticateUser, checkRole } from '../middlewares/index.js';

const router = express.Router();


router.use(authenticateUser, checkRole);
router.post('/', createRole.validator, createRole.handler);
router.get('/', getAllRoles.validator, getAllRoles.handler);
router.put('/:id', updateRole.validator, updateRole.handler);
router.delete('/:id', deleteRole.validator, deleteRole.handler);

export default router;
