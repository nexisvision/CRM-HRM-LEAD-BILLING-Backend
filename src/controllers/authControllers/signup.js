import Joi from "joi";
import bcrypt from 'bcrypt';
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";

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
            const { subscription } = req;
            const { username, password, email, role_id } = req.body;

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
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role_id
            });

            const clientSubscription = await ClientSubscription.findByPk(subscription.id);
            await clientSubscription.increment('current_users_count');

            return responseHandler.created(res, "User created successfully", user);

        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
};
