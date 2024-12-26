import { Router } from "express";
import { createTaskCalendar, getAllTaskCalendar, updateTaskCalendar, deleteTaskCalendar } from "../controllers/taskcalendarController/index.js";

const router = Router();

router.post("/", createTaskCalendar.validator, createTaskCalendar.handler);
router.get("/", getAllTaskCalendar.validator, getAllTaskCalendar.handler);    
// router.get("/:id", getTaskCalendarById.validator, getTaskCalendarById.handler);
router.put("/:id", updateTaskCalendar.validator, updateTaskCalendar.handler);
router.delete("/:id", deleteTaskCalendar.validator, deleteTaskCalendar.handler);

export default router;