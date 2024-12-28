import express from "express";
import { createLead, getAllLeads, getLeadById, updateLead, deleteLead } from "../controllers/leadController/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createLead.validator, createLead.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllLeads.validator, getAllLeads.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getLeadById.validator, getLeadById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateLead.validator, updateLead.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteLead.validator, deleteLead.handler);

export default router;