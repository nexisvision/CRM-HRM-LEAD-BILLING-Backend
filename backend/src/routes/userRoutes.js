import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllUsers.validator, getAllUsers.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getUserById.validator, getUserById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateUser.validator, updateUser.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteUser.validator, deleteUser.handler);

export default router;