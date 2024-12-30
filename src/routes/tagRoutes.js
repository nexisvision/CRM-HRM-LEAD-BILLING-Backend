import express from "express";
import { getAllTags, createTag, updateTag, deleteTag } from "../controllers/tagControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', createTag.validator, createTag.handler);
router.get('/', getAllTags.validator, getAllTags.handler);
router.put('/:id', updateTag.validator, updateTag.handler);
router.delete('/:id', deleteTag.validator, deleteTag.handler);

export default router;