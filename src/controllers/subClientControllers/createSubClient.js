import Joi from "joi";
import bcrypt from 'bcrypt';
import validator from "../../utils/validator.js";
import SubClient from "../../models/subClientModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import generateId from "../../middlewares/generatorId.js";
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
        }),
    }),
    handler: async (req, res) => {
        try {
            const { subscription } = req;
            const { username, email, password } = req.body;

            const existingUsername = await SubClient.findOne({
                where: { username }
            });

            if (existingUsername) {
                return responseHandler.error(res, "Username already exists.");
            }

            const existingEmail = await SubClient.findOne({
                where: { email }
            });

            if (existingEmail) {
                return responseHandler.error(res, "Email already exists.");
            }

            const [role] = await Role.findOrCreate({
                where: { role_name: 'sub-client' },
                defaults: { id: generateId() }
            });

            const hashedPassword = await bcrypt.hash(password, 10);

            const subClient = await SubClient.create({
                username,
                password: hashedPassword,
                email,
                role_id: role.id,
                created_by: req.user?.username,
            });

            const clientSubscription = await ClientSubscription.findByPk(subscription.id);
            await clientSubscription.increment('current_clients_count');

            return responseHandler.created(res, "subClient created successfully", subClient);

        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}