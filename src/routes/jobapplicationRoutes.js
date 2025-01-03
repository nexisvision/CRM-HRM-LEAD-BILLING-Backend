
import { Router } from "express";
import { createJobApplication, getAllJobApplication, updateJobApplication, deleteJobApplication } from "../controllers/jobapplicationControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();

router.use(authenticateUser,checkRole);

router.post("/", createJobApplication.handler, createJobApplication.validator);
router.get("/", getAllJobApplication.handler, getAllJobApplication.validator);
router.put("/:id", updateJobApplication.handler, updateJobApplication.validator);
router.delete("/:id", deleteJobApplication.handler, deleteJobApplication.validator);

export default router;
