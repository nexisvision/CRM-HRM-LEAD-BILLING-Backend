import express from "express";
import { createBranch, getAllBranch, updateBranch, deleteBranch } from "../controllers/branchControllers/index.js";

const router = express.Router();

router.post('/', createBranch.validator, createBranch.handler);
router.get('/', getAllBranch.validator, getAllBranch.handler);
router.put('/:id', updateBranch.validator, updateBranch.handler);
router.delete('/:id', deleteBranch.validator, deleteBranch.handler);

export default router;
