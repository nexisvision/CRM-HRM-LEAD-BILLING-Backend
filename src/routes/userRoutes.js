import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userControllers/index.js";
import { authenticateUser, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticateUser, checkRole);

router.get('/', getAllUsers.validator, getAllUsers.handler);
router.get('/:id', getUserById.validator, getUserById.handler);
router.put('/:id', updateUser.validator, updateUser.handler);
router.delete('/:id', deleteUser.validator, deleteUser.handler);

export default router;