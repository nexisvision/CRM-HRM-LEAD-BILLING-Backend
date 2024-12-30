import express from 'express';
import { authenticateUser, checkRole } from '../middlewares/index.js';
import { createDesignation, getAllDesignations, getDesignationById, updateDesignation, deleteDesignation } from '../controllers/designationControllers/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createDesignation.validator, createDesignation.handler);
router.get('/', getAllDesignations.validator, getAllDesignations.handler);
router.get('/:id', getDesignationById.validator, getDesignationById.handler);
router.put('/:id', updateDesignation.validator, updateDesignation.handler);
router.delete('/:id', deleteDesignation.validator, deleteDesignation.handler);

export default router;