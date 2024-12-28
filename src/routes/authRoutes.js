import express from "express";
import { signup, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/authControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();


router.post('/signup', signup.validator, signup.handler);
router.post('/login', login.validator, login.handler);


//Super-Admin 
router.use(authenticateUser, checkUserRole(['super-admin']));

router.get('/', getAllUsers.validator, getAllUsers.handler);
router.get('/:id', getUserById.validator, getUserById.handler);
router.put('/:id', updateUser.validator, updateUser.handler);
router.delete('/:id', deleteUser.validator, deleteUser.handler);

export default router;