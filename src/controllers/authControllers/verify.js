import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import { sendEmail } from "../../utils/emailService.js";
import { getWelcomeEmailTemplate } from "../../utils/emailTemplates.js";
import Role from "../../models/roleModel.js";
import User from "../../models/userModel.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";

export default {
    validator: validator({
        body: Joi.object({
            otp: Joi.string().length(6).required()
        })
    }),

    handler: async (req, res) => {
        try {
            const { otp } = req.body;
            const user = req.user;

            console.log(user);

            const { subscription } = req;

            if (user.type !== 'email_verification') {
                return responseHandler.unauthorized(res, "Invalid verification token");
            }

            if (String(user.verificationOTP) !== String(otp)) {
                return responseHandler.unauthorized(res, "Invalid OTP");
            }

            if (Date.now() > user.verificationOTPExpiry) {
                return responseHandler.unauthorized(res, "OTP has expired");
            }

            // Update email verification status
            await User.update(
                { 
                    isEmailVerified: true,
                    email: user.email 
                },
                { where: { id: user.id } }
            );

            // Send welcome email
            const welcomeTemplate = getWelcomeEmailTemplate(user.username);
            await sendEmail(
                user.email,
                'Welcome to CRM!',
                welcomeTemplate
            );

            return responseHandler.success(res, "Email verification completed successfully", {
                success: true
            });
        } catch (error) {   
            return responseHandler.internalServerError(res, error.message);
        }
    }
}; 