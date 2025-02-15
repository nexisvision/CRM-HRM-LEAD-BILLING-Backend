import express from "express";
import { createEsignature, getAllEsignature } from "../controllers/esignatureControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post("/", upload.fields([{ name: 'e_signatures', maxCount: 1 }]), createEsignature.validator, createEsignature.handler);
router.get("/", getAllEsignature.validator, getAllEsignature.handler);

export default router;

