import jwt from "jsonwebtoken";
import { JWT_SECRET, OTP_CONFIG } from "../../config/config.js";
import { generateOTP } from "../../utils/otpService.js";
import { sendEmail } from "../../utils/emailService.js";
import { getVerificationEmailTemplate } from "../../utils/emailTemplates.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const { user } = req;

            if (user.type !== 'signup_verification') {
                responseHandler.unauthorized(res, "Invalid verification token");
            }

            const newOTP = generateOTP(OTP_CONFIG.LENGTH);

            const newSessionToken = jwt.sign(
                {
                    ...user,
                    verificationOTP: newOTP,
                    verificationOTPExpiry: Date.now() + OTP_CONFIG.EXPIRY.DEFAULT,
                    type: 'signup_verification'
                },
                JWT_SECRET
            );

            const emailTemplate = getVerificationEmailTemplate(user.username, newOTP);
            await sendEmail(
                user.email,
                'Verify Your Email',
                emailTemplate
            );

            responseHandler.success(res, "New OTP sent successfully", { sessionToken: newSessionToken });
        } catch (error) {
            responseHandler.internalServerError(res, error.message);
        }
    }
}; 