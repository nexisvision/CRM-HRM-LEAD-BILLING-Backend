import { createAnnouncement, getAllAnnouncement, updateAnnouncement, deleteAnnouncement } from "../controllers/announcementControllers/index.js";
import express from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post("/", createAnnouncement.validator, createAnnouncement.handler);
router.get("/", getAllAnnouncement.validator, getAllAnnouncement.handler);
router.put("/:id", updateAnnouncement.validator, updateAnnouncement.handler);
router.delete("/:id", deleteAnnouncement.validator, deleteAnnouncement.handler);

export default router;
