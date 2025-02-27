import express from "express";
import { signup, login, getAllUsers, getUserById, updateUser, deleteUser, verifySignup, resendSignupOtp, forgotPassword, verifyOtp, resetPassword, verify } from "../controllers/authControllers/index.js";
import { authenticateUser, checkUserRole, checkRole } from "../middlewares/index.js";
import { checkSubscriptionLimits, getActiveSubscription } from "../middlewares/checkSubscriptionLimits.js";
import passCompanyDetail from "../middlewares/passCompanyDetail.js";

const router = express.Router();

router.post('/signup', authenticateUser, checkRole,  getActiveSubscription, passCompanyDetail, signup.validator, signup.handler);
router.post('/login', login.validator, login.handler);
router.post("/verify-signup", authenticateUser, checkSubscriptionLimits, verifySignup.validator, verifySignup.handler);
router.post("/resend-signup-otp", authenticateUser, resendSignupOtp.handler);
router.post("/forgot-password", forgotPassword.validator, forgotPassword.handler);
router.post("/verify-otp", authenticateUser, verifyOtp.validator, verifyOtp.handler);
router.post("/reset-password", authenticateUser, resetPassword.validator, resetPassword.handler);

router.post("/verify", authenticateUser, verify.validator, verify.handler);

//Super-Admin 
router.use(authenticateUser, checkUserRole(['super-admin','client']));

router.get('/', getAllUsers.validator, getAllUsers.handler);
router.get('/:id', getUserById.validator, getUserById.handler);
router.put('/:id', updateUser.validator, updateUser.handler);
router.delete('/:id', deleteUser.validator, deleteUser.handler);

export default router;