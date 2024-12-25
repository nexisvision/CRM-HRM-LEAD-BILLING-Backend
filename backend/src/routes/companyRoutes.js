import express from "express";
import { getAllCompanies, getCompanyById, updateCompany, deleteCompany, createCompany } from "../controllers/companyControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['super-admin']), createCompany.validator, createCompany.handler);
router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllCompanies.validator, getAllCompanies.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getCompanyById.validator, getCompanyById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateCompany.validator, updateCompany.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteCompany.validator, deleteCompany.handler);

export default router;