import express from 'express';
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
const router = express.Router();

import { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance } from '../controllers/attendanceController/index.js';

router.post('/', authenticateUser, checkUserRole(['client']), createAttendance.validator, createAttendance.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllAttendances.validator, getAllAttendances.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getAttendanceById.validator, getAttendanceById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateAttendance.validator, updateAttendance.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteAttendance.validator, deleteAttendance.handler);

export default router;
