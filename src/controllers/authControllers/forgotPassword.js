import Joi from "joi";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { generateOTP } from "../../utils/otpService.js";
import { sendEmail } from "../../utils/emailService.js";
import { getPasswordResetEmailTemplate } from "../../utils/emailTemplates.js";
import { OTP_CONFIG } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";

export default {
    validator: validator({
        body: Joi.object({
            email: Joi.string().email().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const otp = generateOTP(OTP_CONFIG.LENGTH);
            user.resetPasswordOTP = otp;
            user.resetPasswordOTPExpiry = Date.now() + OTP_CONFIG.EXPIRY.RESET_PASSWORD;
            await user.save();

            // Generate session token with email
            const sessionToken = jwt.sign(
                { email: user.email },
                JWT_SECRET,
                { expiresIn: '15m' }
            );
            // Send email with OTP
            const emailTemplate = getPasswordResetEmailTemplate(user.username, otp);
            await sendEmail(email, 'Password Reset Request', emailTemplate);
            return responseHandler.success(res, "Password reset OTP sent to your email", { sessionToken });
        } catch (error) {
            console.error('Forgot Password Error:', error);
            return responseHandler.internalServerError(res, error.message);
        }
    }
}; 