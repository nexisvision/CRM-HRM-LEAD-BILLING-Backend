import Joi from "joi";
import bcrypt from "bcrypt";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import generateId from "../../middlewares/generatorId.js";
import User from "../../models/userModel.js";
import { sendEmail } from '../../utils/emailService.js';
import { generateOTP } from "../../utils/otpService.js";
import { OTP_CONFIG } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import { getVerificationEmailTemplate } from '../../utils/emailTemplates.js';
import { getActiveSubscription } from "../../middlewares/checkSubscriptionLimits.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required().messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required'
            }),
            email: Joi.string().email().required().messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invalid email format'
            }),
            password: Joi.string()
                .required()
                .min(8)
                .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$'))
                .messages({
                    'string.base': 'Password must be a string',
                    'string.empty': 'Password is required',
                    'string.min': 'Password must be at least 8 characters',
                    'string.pattern.base': 'Password must contain only letters, numbers and special characters'
                }),
        })
    }),
    handler: async (req, res) => {
        try {
            const { subscription } = req;
            const { username, email, password } = req.body;

            // Check if email already exists
            const existingUsername = await User.findOne({
                where: { username }
            });

            if (existingUsername) {
                return responseHandler.error(res, "Username already exists.");
            }

            const existingEmail = await User.findOne({
                where: { email }
            });

            if (existingEmail) {
                return responseHandler.error(res, "Email already exists.");
            }

            const [role] = await Role.findOrCreate({
                where: { role_name: 'employee' },
                defaults: { id: generateId() }
            });

            // Generate OTP
            const otp = generateOTP(OTP_CONFIG.LENGTH);

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create temporary user record
            const tempUser = {
                id: req.user.id,
                username,
                email,
                role_id: role.id,
                password: hashedPassword,
                verificationOTP: otp,
                verificationOTPExpiry: Date.now() + OTP_CONFIG.EXPIRY.DEFAULT
            };

            // Store in session
            const sessionToken = jwt.sign(
                {
                    ...tempUser,
                    ...subscription,
                    type: 'signup_verification'
                },
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            // Send verification email
            const emailTemplate = getVerificationEmailTemplate(username, otp);
            await sendEmail(
                email,
                'Verify Your Email',
                emailTemplate
            );

            return responseHandler.success(res, "Please verify your email to complete registration", { sessionToken })

        } catch (error) {
            console.error('Error creating employee:', error);
            return responseHandler.error(res, error.message);
        }
    }
};