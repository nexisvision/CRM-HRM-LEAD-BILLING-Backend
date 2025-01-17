
import { Router } from "express";
import { createInquiry, getAllInquiry, updateInquiry, deleteInquiry } from "../controllers/inquiryControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = Router();


router.post("/", createInquiry.handler, createInquiry.validator);
router.use(authenticateUser, checkRole);
router.get("/", getAllInquiry.handler, getAllInquiry.validator);
router.put("/:id", updateInquiry.handler, updateInquiry.validator);
router.delete("/:id", deleteInquiry.handler, deleteInquiry.validator);

export default router;
