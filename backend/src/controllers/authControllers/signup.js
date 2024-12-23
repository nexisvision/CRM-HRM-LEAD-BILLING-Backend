import Joi from "joi";
import bcrypt from 'bcrypt';
import User from "../../models/userModel.js";
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
                }),
            client_id: Joi.string().optional()
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, password, email, role_name } = req.body;

            // Check if the username or email already exists
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { username },
                        { email }
                    ]
                }
            });

            if (existingUser) {
                return responseHandler.error(res, "Username or email already exists.");
            }


            // Find or create the role
            const [role, created] = await Role.findOrCreate({
                where: { role_name: role_name || 'user' },
                defaults: { id: generateId() }
            });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user with the found role_id
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role_id: role.id, // Use the role_id from the found or created role
            });

            responseHandler.created(res, "User created successfully", user);

        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
