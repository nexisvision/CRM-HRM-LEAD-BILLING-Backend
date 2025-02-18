
import { Router } from "express";
import { createJobApplication, getAllJobApplication, updateJobApplication, deleteJobApplication } from "../controllers/jobapplicationControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.use(authenticateUser,checkRole);

router.post("/", createJobApplication.handler, createJobApplication.validator);
router.get("/", getAllJobApplication.handler, getAllJobApplication.validator);
router.put("/:id",  upload.fields([
    { name: 'cv', maxCount: 1 },
]), updateJobApplication.handler, updateJobApplication.validator);
router.delete("/:id", deleteJobApplication.handler, deleteJobApplication.validator);

export default router;
