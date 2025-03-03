import { Router } from "express";
import { getNotification} from "../controllers/notificationControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import passCompanyDetails from '../middlewares/passCompanyDetail.js';
const router = Router();

router.use(authenticateUser, checkRole, passCompanyDetails);

router.get("/", getNotification.validator, getNotification.handler);


export default router;
