import express from "express";
import { signup, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/authControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();


router.post('/signup', signup.validator, signup.handler);
router.post('/login', login.validator, login.handler);

//Super-Admin 
router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllUsers.validator, getAllUsers.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getUserById.validator, getUserById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateUser.validator, updateUser.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteUser.validator, deleteUser.handler);

export default router;