import express from "express";
import { createLead, getAllLeads, getLeadById, updateLead, deleteLead } from "../controllers/leadController/index.js";
import { createLeadUser, getAllLeadUser, deleteLeadUser } from "../controllers/leadController/leadUserControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";


const router = express.Router();

router.use(authenticateUser, checkRole)

// Lead Routes start ==============================
router.post('/', createLead.validator, createLead.handler);
router.get('/', getAllLeads.validator, getAllLeads.handler);
router.get('/:id', getLeadById.validator, getLeadById.handler);
router.put('/:id', updateLead.validator, updateLead.handler);
router.delete('/:id', deleteLead.validator, deleteLead.handler);


export default router;