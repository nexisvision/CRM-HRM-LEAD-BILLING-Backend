import express from "express";
import { createMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting } from "../controllers/meetingController/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createMeeting.validator, createMeeting.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getMeetings.validator, getMeetings.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getMeetingById.validator, getMeetingById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateMeeting.validator, updateMeeting.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteMeeting.validator, deleteMeeting.handler);

export default router;