import express from "express";
import { createMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting } from "../controllers/meetingController/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createMeeting.validator, createMeeting.handler);
router.get('/', getMeetings.validator, getMeetings.handler);
router.get('/:id', getMeetingById.validator, getMeetingById.handler);
router.put('/:id', updateMeeting.validator, updateMeeting.handler);
router.delete('/:id', deleteMeeting.validator, deleteMeeting.handler);

export default router;