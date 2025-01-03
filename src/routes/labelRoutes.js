import express from "express";
import { getAllLabel, createLabel, updateLabel, deleteLabel } from "../controllers/labelControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/:id', createLabel.validator, createLabel.handler);
router.get('/:id', getAllLabel.validator, getAllLabel.handler);
router.put('/:id', updateLabel.validator, updateLabel.handler);
router.delete('/:id', deleteLabel.validator, deleteLabel.handler);

export default router;