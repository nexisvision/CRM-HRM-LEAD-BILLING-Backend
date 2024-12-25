import express from 'express';
import { authenticateUser, checkUserRole } from '../middlewares/index.js';
import { createLeave, getAllLeaves, getLeaveById, updateLeave, deleteLeave } from '../controllers/leaveController/index.js';

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['employee']), createLeave.validator, createLeave.handler);
router.get('/', authenticateUser, checkUserRole(['employee']), getAllLeaves.validator, getAllLeaves.handler);
router.get('/:id', authenticateUser, checkUserRole(['employee']), getLeaveById.validator, getLeaveById.handler);
router.put('/:id', authenticateUser, checkUserRole(['employee']), updateLeave.validator, updateLeave.handler);
router.delete('/:id', authenticateUser, checkUserRole(['employee']), deleteLeave.validator, deleteLeave.handler);

export default router;