import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createMessage, getMessages, getMessagesById, updateMessage, deleteMessage } from "../controllers/messageController/index.js";
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post("/", createMessage.validator, createMessage.handler);
router.get("/", getMessages.validator, getMessages.handler);
router.get("/:id", getMessagesById.validator, getMessagesById.handler);
router.put("/:id", updateMessage.validator, updateMessage.handler);
router.delete("/:id", deleteMessage.validator, deleteMessage.handler);

export default router;