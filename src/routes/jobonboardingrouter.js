import { Router } from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createjobonboarding,getjobonboarding, editjobonboarding,deleteonbaording } from "../controllers/jobonboarding/index.js"

const router = Router();
router.use(authenticateUser, checkRole);
router.post("/", createjobonboarding.validator, createjobonboarding.handler);
router.get("/", getjobonboarding.validator, getjobonboarding.handler);
router.put("/:id", editjobonboarding.validator, editjobonboarding.handler);
router.delete("/:id", deleteonbaording.validator, deleteonbaording.handler);

export default router;

