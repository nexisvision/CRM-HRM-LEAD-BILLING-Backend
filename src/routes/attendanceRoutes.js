import express from 'express';
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createAttendance, getAllAttendances, getAttendanceById,
    updateAttendance, deleteAttendance, createBulkAttendance } from '../controllers/attendanceController/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createAttendance.validator, createAttendance.handler);
router.get('/', getAllAttendances.validator, getAllAttendances.handler);
router.get('/:id', getAttendanceById.validator, getAttendanceById.handler);
router.put('/:id', updateAttendance.validator, updateAttendance.handler);
router.delete('/:id', deleteAttendance.validator, deleteAttendance.handler);
router.post('/bulk', createBulkAttendance.validator, createBulkAttendance.handler);

export default router;
