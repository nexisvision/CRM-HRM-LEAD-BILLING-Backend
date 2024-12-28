import express from "express";
import { createLead, getAllLeads, getLeadById, updateLead, deleteLead } from "../controllers/leadController/index.js";
import { createLeadUser, getAllLeadUser, deleteLeadUser } from "../controllers/leadController/leadUserControllers/index.js";
import { authenticateUser, checkRole, checkPermission } from "../middlewares/index.js";


const router = express.Router();

router.use(authenticateUser, checkRole, checkPermission('lead'))



// Lead Routes start ==============================
router.post('/', createLead.validator, createLead.handler);
router.get('/', getAllLeads.validator, getAllLeads.handler);
router.get('/:id', getLeadById.validator, getLeadById.handler);
router.put('/:id', updateLead.validator, updateLead.handler);
router.delete('/:id', deleteLead.validator, deleteLead.handler);

// Lead User Routes start ==============================
router.post('/:leadId/user', createLeadUser.validator, createLeadUser.handler);
router.get('/:leadId/user', getAllLeadUser.validator, getAllLeadUser.handler);
router.delete('/:leadId/user/:employeeId', deleteLeadUser.validator, deleteLeadUser.handler);
//
export default router;