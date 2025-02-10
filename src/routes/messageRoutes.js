import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createMessage, getMessages, getMessagesById, updateMessage, deleteMessage } from "../controllers/messageController/index.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post("/", upload.single('file'), createMessage.validator, createMessage.handler);
router.get("/", getMessages.validator, getMessages.handler);
router.get("/:id", getMessagesById.validator, getMessagesById.handler);
router.put("/:id", upload.single('file'), updateMessage.validator, updateMessage.handler);
router.delete("/:id", deleteMessage.validator, deleteMessage.handler);

export default router;