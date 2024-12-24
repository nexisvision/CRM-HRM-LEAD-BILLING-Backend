import express from 'express';
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
import { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance } from '../controllers/attendanceController/index.js';

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['employee']), createAttendance.validator, createAttendance.handler);
router.get('/', authenticateUser, checkUserRole(['employee']), getAllAttendances.validator, getAllAttendances.handler);
router.get('/:id', authenticateUser, checkUserRole(['employee']), getAttendanceById.validator, getAttendanceById.handler);
router.put('/:id', authenticateUser, checkUserRole(['employee']), updateAttendance.validator, updateAttendance.handler);
router.delete('/:id', authenticateUser, checkUserRole(['employee']), deleteAttendance.validator, deleteAttendance.handler);

export default router;
