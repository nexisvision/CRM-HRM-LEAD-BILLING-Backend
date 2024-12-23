import express from 'express';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';
import { createDesignation, getAllDesignations, updateDesignation, deleteDesignation } from '../controllers/designationControllers/index.js';

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['super-admin']), createDesignation.handler);
router.get('/', authenticateUser, getAllDesignations.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateDesignation.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteDesignation.handler);

export default router;