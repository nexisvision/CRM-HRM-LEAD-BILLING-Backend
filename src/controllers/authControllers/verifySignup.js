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
            const { subscription } = req;

            if (user.type !== 'signup_verification') {
                responseHandler.unauthorized(res, "Invalid verification token");
            }

            if (String(user.verificationOTP) !== String(otp)) {
                responseHandler.unauthorized(res, "Invalid OTP");
            }

            if (Date.now() > user.verificationOTPExpiry) {
                responseHandler.unauthorized(res, "OTP has expired");
            }

            //check Role
            const role = await Role.findOne({ where: { id: user.role_id } });
            if (!role) {
                responseHandler.error(res, "Role not found");
            }



            // Create verified user
            const newUser = await User.create({
                username: user.username,
                email: user.email,
                password: user.password,
                role_id: role.id,
                isEmailVerified: true
            });
            //increment user/client count
            const clientSubscription = await ClientSubscription.findByPk(subscription?.id);

            if (role.role_name === 'sub-client') {
                await clientSubscription.increment('current_clients_count');
            } else if (!['super-admin', 'client'].includes(role.role_name)) {
                await clientSubscription.increment('current_users_count');
            }


            // After creating the new user, generate a login token
            const token = jwt.sign(
                {
                    id: newUser.id,
                    role: role.role_name,
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Send welcome email
            const welcomeTemplate = getWelcomeEmailTemplate(newUser.username);
            await sendEmail(
                newUser.email,
                'Welcome to CRM!',
                welcomeTemplate
            );

            responseHandler.success(res, "Registration completed successfully", {
                success: true,
                token,
                user: newUser
            });
        } catch (error) {
            responseHandler.internalServerError(res, error.message);
        }
    }
}; 