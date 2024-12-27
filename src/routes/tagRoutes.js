import express from "express";
import { getAllTags, createTag, updateTag, deleteTag } from "../controllers/tagControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post('/', authenticateUser, checkUserRole(['client']), createTag.validator, createTag.handler);
router.get('/', authenticateUser, checkUserRole(['client']), getAllTags.validator, getAllTags.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), updateTag.validator, updateTag.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteTag.validator, deleteTag.handler);

export default router;