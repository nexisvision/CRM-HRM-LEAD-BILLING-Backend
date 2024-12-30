import express from "express";
import { createEventsetUp, getAllEventsetUp, updateEventsetUp, deleteEventsetUp } from "../controllers/eventControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post("/", createEventsetUp.validator, createEventsetUp.handler);
router.get("/", getAllEventsetUp.validator, getAllEventsetUp.handler);
router.put("/:id", updateEventsetUp.validator, updateEventsetUp.handler);
router.delete("/:id", deleteEventsetUp.validator, deleteEventsetUp.handler);

export default router;
