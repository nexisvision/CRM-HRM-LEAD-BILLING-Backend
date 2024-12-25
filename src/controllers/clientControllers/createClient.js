import Joi from "joi";
import bcrypt from "bcrypt";
import Client from "../../models/clientModel.js";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from 'sequelize';
import generateId from "../../middlewares/generatorId.js";

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
                })
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Check if the username or email already exists
            const existingClient = await Client.findOne({
                where: {
                    [Op.or]: [
                        { username },
                        { email }
                    ]
                }
            });

            if (existingClient) {
                return responseHandler.error(res, "Username or email already exists.");
            }

            // Find or create the client role
            const [role, created] = await Role.findOrCreate({
                where: { role_name: 'client' },
                defaults: { id: generateId() }
            });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create client with client role
            const client = await Client.create({
                username,
                password: hashedPassword,
                email,
                role_id: role.id
            });

            responseHandler.created(res, "Client created successfully", client);

        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};