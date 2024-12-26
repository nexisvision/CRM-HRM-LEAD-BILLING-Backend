import express from 'express';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';
import { createDesignation, getAllDesignations, getDesignationById, updateDesignation, deleteDesignation } from '../controllers/designationControllers/index.js';

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createDesignation.validator, createDesignation.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllDesignations.validator, getAllDesignations.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getDesignationById.validator, getDesignationById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateDesignation.validator, updateDesignation.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteDesignation.validator, deleteDesignation.handler);

export default router;