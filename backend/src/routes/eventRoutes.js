import express from "express";
import { createEventsetUp, getAllEventsetUp, updateEventsetUp, deleteEventsetUp } from "../controllers/eventControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post("/", authenticateUser, checkUserRole(["client"]), createEventsetUp.validator, createEventsetUp.handler);
router.get("/", authenticateUser, checkUserRole(["client"]), getAllEventsetUp.validator, getAllEventsetUp.handler);
router.put("/:id", authenticateUser, checkUserRole(["client"]), updateEventsetUp.validator, updateEventsetUp.handler);
router.delete("/:id", authenticateUser, checkUserRole(["client"]), deleteEventsetUp.validator, deleteEventsetUp.handler);

export default router;
