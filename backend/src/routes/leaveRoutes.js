import express from 'express';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';
import { createLeave, getAllLeaves, getLeaveById, updateLeave, deleteLeave } from '../controllers/leaveController/index.js';

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createLeave.validator, createLeave.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllLeaves.validator, getAllLeaves.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getLeaveById.validator, getLeaveById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateLeave.validator, updateLeave.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteLeave.validator, deleteLeave.handler);

export default router;