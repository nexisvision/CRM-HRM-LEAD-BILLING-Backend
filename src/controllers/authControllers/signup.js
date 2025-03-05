import Joi from "joi";
import bcrypt from 'bcrypt';
import User from "../../models/userModel.js";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { sendEmail } from '../../utils/emailService.js';
import { generateOTP } from "../../utils/otpService.js";
import { OTP_CONFIG } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import { getVerificationEmailTemplate } from '../../utils/emailTemplates.js';

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
            role_id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, password, email, role_id } = req.body;

            // console.log("req.body",req.body);

            const { subscription } = req;

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

            // Get creator's role
            const creatorRole = await Role.findByPk(req.user.role);
            if (!creatorRole) {
                return responseHandler.error(res, "Invalid creator role");
            }


            // console.log("dfgfdgfd",creatorRole);


            // Determine client_id based on creator's role
            let client_id;
            let client_plan_id = subscription?.id;
            
            if (creatorRole.role_name === 'client') {
                client_id = req.user.id;
                // Get client's subscription plan ID
                const clientUser = await User.findByPk(req.user.id);
                if (clientUser?.client_plan_id) {
                    client_plan_id = clientUser.client_plan_id;
                }

                // console.log("client_plan_id",client_plan_id);
            } else if (creatorRole.role_name === 'super-admin') {
                client_id = req.user.id;
            } else {
                const user = await User.findByPk(req.user.id);
                if (!user) {
                    return responseHandler.error(res, "User not found");
                }
                client_id = user.client_id;


                // console.log("client_idsdsd",client_id);
                // Get client's subscription plan ID from parent user
                // const parentUser = await User.findByPk(req.user.client_id);
                if (user?.client_plan_id) {
                    client_plan_id = user.client_plan_id;
                    console.log("client_plan_id",client_plan_id);
                }
            }

            

            // Generate OTP
            const otp = generateOTP(OTP_CONFIG.LENGTH);

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create temporary user record
            const tempUser = {
                id: req.user.id,
                username,
                email,
                role_id,
                password: hashedPassword,
                verificationOTP: otp,
                verificationOTPExpiry: Date.now() + OTP_CONFIG.EXPIRY.DEFAULT,
                client_id,
                client_plan_id: client_plan_id,
                created_by: req.user?.username
                
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
            return responseHandler.error(res, error?.message);
        }
    }
};








// import Joi from "joi";
// import bcrypt from 'bcrypt';
// import User from "../../models/userModel.js";
// import validator from "../../utils/validator.js";
// import responseHandler from "../../utils/responseHandler.js";
// import { sendEmail } from '../../utils/emailService.js';
// import { generateOTP } from "../../utils/otpService.js";
// import { OTP_CONFIG } from "../../config/config.js";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../../config/config.js";
// import { getVerificationEmailTemplate } from '../../utils/emailTemplates.js';

// export default {
//     validator: validator({
//         body: Joi.object({
//             username: Joi.string().required(),
//             email: Joi.string().email().required(),
//             password: Joi.string()
//                 .required()
//                 .min(8)
//                 .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$'))
//                 .messages({
//                     'string.pattern.base': 'Create a strong password',
//                     'string.min': 'Password must be at least 8 characters long',
//                     'string.empty': 'Password is required'
//                 }),
//             role_id: Joi.string().required(),
//         }),
//     }),
//     handler: async (req, res) => {
//         try {
//             const { username, password, email, role_id } = req.body;
//             const { subscription } = req;

//             const existingUsername = await User.findOne({
//                 where: { username }
//             });

//             if (existingUsername) {
//                 return responseHandler.error(res, "Username already exists.");
//             }

//             const existingEmail = await User.findOne({
//                 where: { email }
//             });

//             if (existingEmail) {
//                 return responseHandler.error(res, "Email already exists.");
//             }

//             // Generate OTP
//             const otp = generateOTP(OTP_CONFIG.LENGTH);

//             // Hash password
//             const hashedPassword = await bcrypt.hash(password, 12);

//             // Create temporary user record
//             const tempUser = {
//                 id: req.user.id,
//                 username,
//                 email,
//                 role_id,
//                 password: hashedPassword,
//                 verificationOTP: otp,
//                 verificationOTPExpiry: Date.now() + OTP_CONFIG.EXPIRY.DEFAULT,
//                 created_by: req.user?.username
//             };

//             // Store in session
//             const sessionToken = jwt.sign(
//                 {
//                     ...tempUser,
//                     ...subscription,
//                     type: 'signup_verification'
//                 },
//                 JWT_SECRET,
//                 { expiresIn: '15m' }
//             );

//             // Send verification email
//             const emailTemplate = getVerificationEmailTemplate(username, otp);
//             await sendEmail(
//                 email,
//                 'Verify Your Email',
//                 emailTemplate
//             );

//             return responseHandler.success(res, "Please verify your email to complete registration", { sessionToken })

//         } catch (error) {
//             return responseHandler.error(res, error?.message);
//         }
//     }
// };
