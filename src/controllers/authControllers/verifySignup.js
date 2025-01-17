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
                return responseHandler.unauthorized(res, "Invalid verification token");
            }

            if (String(user.verificationOTP) !== String(otp)) {
                return responseHandler.unauthorized(res, "Invalid OTP");
            }

            if (Date.now() > user.verificationOTPExpiry) {
                return responseHandler.unauthorized(res, "OTP has expired");
            }

            //check Role
            const role = await Role.findOne({ where: { id: user.role_id } });
            if (!role) {
                return responseHandler.error(res, "Role not found");
            }



            // Create verified user
            const newUser = role.role_name === 'employee' ? await User.create({
                username: user.username,
                email: user.email,
                password: user.password,
                role_id: role.id,
                isEmailVerified: true,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                joiningDate: user.joiningDate,
                leaveDate: user.leaveDate,
                branch: user.branch,
                department: user.department,
                designation: user.designation,
                salary: user.salary,
                accountholder: user.accountholder,
                accountnumber: user.accountnumber,
                bankname: user.bankname,
                ifsc: user.ifsc,
                banklocation: user.banklocation,
                e_signatures: user.e_signatures,
                documents: user.documents,
                links: user.links,
                created_by: user.created_by

            }) : await User.create({
                username: user.username,
                email: user.email,
                password: user.password,
                role_id: role.id,
                isEmailVerified: true,
                created_by: user.created_by
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

            return responseHandler.success(res, "Registration completed successfully", {
                success: true,
                token,
                user: newUser
            });
        } catch (error) {
            return responseHandler.internalServerError(res, error.message);
        }
    }
}; 