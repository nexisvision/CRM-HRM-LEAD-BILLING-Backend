import express from "express";
import { signup, login, getAllUsers, getUserById, superAdminSignup } from "../controllers/authControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

// Auth routes
router.post('/signup', signup.validator, signup.handler);
router.post('/login', login.validator, login.handler);

// User routes (protected)
router.get('/', authenticateUser, checkUserRole(['super-admin']), getAllUsers.validator, getAllUsers.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getUserById.validator, getUserById.handler);

router.post("/super-admin/signup", superAdminSignup.validator, superAdminSignup.handler);

export default router;
