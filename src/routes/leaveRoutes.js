import express from 'express';
import { authenticateUser, checkRole } from '../middlewares/index.js';
import { createLeave, getAllLeaves, getLeaveById, updateLeave, deleteLeave } from '../controllers/leaveController/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createLeave.validator, createLeave.handler);
router.get('/', getAllLeaves.validator, getAllLeaves.handler);
router.get('/:id', getLeaveById.validator, getLeaveById.handler);
router.put('/:id', updateLeave.validator, updateLeave.handler);
router.delete('/:id', deleteLeave.validator, deleteLeave.handler);

export default router;