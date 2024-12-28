import { createAnnouncement, getAllAnnouncement, updateAnnouncement, deleteAnnouncement } from "../controllers/announcementControllers/index.js";
import express from "express";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post("/", authenticateUser, checkUserRole(["client"]), createAnnouncement.validator, createAnnouncement.handler);
router.get("/", authenticateUser, checkUserRole(["client"]), getAllAnnouncement.validator, getAllAnnouncement.handler);
router.put("/:id", authenticateUser, checkUserRole(["client"]), updateAnnouncement.validator, updateAnnouncement.handler);
router.delete("/:id", authenticateUser, checkUserRole(["client"]), deleteAnnouncement.validator, deleteAnnouncement.handler);

export default router;
