import { Router } from "express";
import { createSalesCreditnote, deleteSalesCreditnote, getAllSalesCreditnote, getSalesCreditnoteById, updateSalesCreditnote } from "../controllers/salesCreditnoteControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import passCompanyDetails from '../middlewares/passCompanyDetail.js';
const router = Router();


router.use(authenticateUser, checkRole, passCompanyDetails);

router.post("/", createSalesCreditnote.validator, createSalesCreditnote.handler);
router.get("/", getAllSalesCreditnote.validator, getAllSalesCreditnote.handler);
router.get("/:id", getSalesCreditnoteById.validator, getSalesCreditnoteById.handler);
router.put("/:id", updateSalesCreditnote.validator, updateSalesCreditnote.handler);
router.delete("/:id", deleteSalesCreditnote.validator, deleteSalesCreditnote.handler);

export default router;