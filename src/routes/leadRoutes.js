import express from "express";
import { createLead, getAllLeads, getLeadById, updateLead, deleteLead, addLeadMembers, addLeadFiles, deleteLeadMembers } from "../controllers/leadController/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.use(authenticateUser, checkRole)

// Lead Routes start ==============================
router.post('/', createLead.validator, createLead.handler);
router.get('/', getAllLeads.validator, getAllLeads.handler);
router.get('/:id', getLeadById.validator, getLeadById.handler);
router.put('/:id', updateLead.validator, updateLead.handler);
router.delete('/:id', deleteLead.validator, deleteLead.handler);

router.post('/membersadd/:id', addLeadMembers.validator, addLeadMembers.handler);
router.delete('/membersdel/:id', deleteLeadMembers.validator, deleteLeadMembers.handler);

router.post('/files/:id', upload.fields([{ name: 'lead_files', maxCount: 1 }]), addLeadFiles.validator, addLeadFiles.handler);

// router.post('/note/:id', leadNote.validator, leadNote.handler);

export default router;