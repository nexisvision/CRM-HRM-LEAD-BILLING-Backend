import { Router } from "express";
import { createDeal, deleteDeal, getAllDeal, updateDeal, getDealById } from "../controllers/dealControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import passCompanyDetails from '../middlewares/passCompanyDetail.js';
const router = Router();

router.use(authenticateUser, checkRole,passCompanyDetails); 


router.post("/", createDeal.validator, createDeal.handler);
router.get("/", getAllDeal.validator, getAllDeal.handler);
router.get("/:id", getDealById.validator, getDealById.handler);
router.put("/:id", updateDeal.validator, updateDeal.handler);
router.delete("/:id", deleteDeal.validator, deleteDeal.handler);




export default router;