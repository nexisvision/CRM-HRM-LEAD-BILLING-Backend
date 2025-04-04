import Joi from "joi";
import bcrypt from "bcrypt";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import generateId from "../../middlewares/generatorId.js";
import { sendEmail } from '../../utils/emailService.js';
import { generateOTP } from "../../utils/otpService.js";
import { OTP_CONFIG } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import { getVerificationEmailTemplate } from '../../utils/emailTemplates.js';
import User from "../../models/userModel.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .required()
                .min(8)
                .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$'))
                .messages({
                    'string.pattern.base': 'Create a strong password',
                    'string.min': 'Password must be at least 8 characters long',
                    'string.empty': 'Password is required'
                }),
        }),
    }),
    handler: async (req, res) => {
        try {

            const { username, email, password } = req.body;

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
                where: { role_name: 'client', created_by: "superadmin" },
                defaults: { id: generateId() }
            });

            const defaultPlan = await SubscriptionPlan.findOne({
                where: { is_default: true, status: 'active' }
            });

            if (!defaultPlan) {
                return responseHandler.error(res, "No default subscription plan found");
            }

            const otp = generateOTP(OTP_CONFIG.LENGTH);

            const hashedPassword = await bcrypt.hash(password, 12);

            const tempUser = {
                id: "superadmin",
                username,
                email,
                role_id: role.id,
                password: hashedPassword,
                verificationOTP: otp,
                verificationOTPExpiry: Date.now() + OTP_CONFIG.EXPIRY.DEFAULT,
                client_plan_id: defaultPlan.id,
                client_id: null,
                created_by: "superadmin"
            };

            const sessionToken = jwt.sign(
                {
                    ...tempUser,
                  
                    type: 'signup_verification'
                },
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            const emailTemplate = getVerificationEmailTemplate(username, otp);
            await sendEmail(
                email,
                'Verify Your Email',
                emailTemplate
            );

            return responseHandler.success(res, "Please verify your email to complete registration", { sessionToken })

        } catch (error) {
            return responseHandler.error(res, error?.message)
        }
    }
};







