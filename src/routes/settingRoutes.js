

import { Router } from "express";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import { createSetting, getAllSetting , deleteSetting, updateSetting } from "../controllers/settingControllers/index.js";
import upload from "../middlewares/upload.js";
import passCompanyDetails from '../middlewares/passCompanyDetail.js';
const router = Router();

router.use(authenticateUser, checkRole, passCompanyDetails);

router.post("/", upload.fields([{ name: 'companylogo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), createSetting.validator, createSetting.handler);
router.get("/", getAllSetting.validator, getAllSetting.handler);
router.put("/:id", upload.fields([{ name: 'companylogo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), updateSetting.validator, updateSetting.handler);
router.delete("/:id", deleteSetting.validator, deleteSetting.handler);

export default router;