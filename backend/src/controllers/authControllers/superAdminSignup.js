import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../../models/userModel.js";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import generateId from "../../middlewares/generatorId.js";
import { SUPER_ADMIN_SECRET_KEY } from '../../config/config.js'

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required()
                .min(3)
                .max(30)
                .messages({
                    'string.empty': 'Username is required',
                    'string.min': 'Username must be at least 3 characters',
                    'string.max': 'Username cannot exceed 30 characters'
                }),
            email: Joi.string().email().required()
                .messages({
                    'string.empty': 'Email is required',
                    'string.email': 'Please enter a valid email'
                }),
            password: Joi.string().required()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .messages({
                    'string.empty': 'Password is required',
                    'string.min': 'Password must be at least 8 characters',
                    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                }),
            secret_key: Joi.string().required()
                .messages({
                    'string.empty': 'Secret key is required'
                })
        })
    }),
    handler: async (req, res) => {
        try {
            const { username, email, password, secret_key } = req.body;

            // Verify secret key (store this in environment variables)
            if (secret_key !== SUPER_ADMIN_SECRET_KEY) {
                return responseHandler.unauthorized(res, "Invalid secret key");
            }

            // Check if super-admin already exists
            const existingSuperAdmin = await User.findOne({
                where: {
                    role_id: 'super-admin'
                }
            });

            if (existingSuperAdmin) {
                return responseHandler.error(res, "Super admin already exists");
            }

            // Check if email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return responseHandler.error(res, "Email already exists");
            }

            // Find or create super-admin role
            const [role] = await Role.findOrCreate({
                where: { role_name: 'super-admin' },
                defaults: { id: generateId() }
            });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create super-admin user
            const superAdmin = await User.create({
                id: generateId(),
                username,
                email,
                password: hashedPassword,
                role_id: role.id,
            });

            // Remove password from response
            const { password: _, ...superAdminData } = superAdmin.toJSON();

            responseHandler.created(res, "Super admin created successfully", superAdminData);
        } catch (error) {
            console.error(error);
            responseHandler.error(res, error.message);
        }
    }
}; 