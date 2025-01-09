import Joi from "joi";
import bcrypt from "bcrypt";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import generateId from "../../middlewares/generatorId.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required().messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required'
            }),
            email: Joi.string().email().required().messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invalid email format'
            }),
            password: Joi.string()
                .required()
                .min(8)
                .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$'))
                .messages({
                    'string.base': 'Password must be a string',
                    'string.empty': 'Password is required',
                    'string.min': 'Password must be at least 8 characters',
                    'string.pattern.base': 'Password must contain only letters, numbers and special characters'
                }),
        })
    }),
    handler: async (req, res) => {
        try {
            const {
                username, email, password } = req.body;

            // Check if email already exists
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

            const [role] = await Role.findOrCreate({
                where: { role_name: 'employee' },
                defaults: { id: generateId() }
            });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create employee with all fields
            const employee = await User.create({
                username,
                email,
                password: hashedPassword,
                role_id: role.id,
                created_by: req.user?.username,
            });

            return responseHandler.created(res, "Employee created successfully", employee);

        } catch (error) {
            console.error('Error creating employee:', error);
            return responseHandler.error(res, error.message);
        }
    }
};