import Joi from "joi";
import bcrypt from "bcrypt";
import Client from "../../models/clientModel.js";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
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
            firstName: Joi.string().allow('', null).optional(),
            lastName: Joi.string().allow('', null).optional(),
            phone: Joi.string().allow('', null).optional(),
            profilePic: Joi.string().allow('', null).optional()
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, password, email, firstName, lastName, phone, profilePic } = req.body;

            const existingUsername = await Client.findOne({
                where: { username }
            });

            if (existingUsername) {
                return responseHandler.error(res, "Username already exists.");
            }

            const existingEmail = await Client.findOne({
                where: { email }
            });

            if (existingEmail) {
                return responseHandler.error(res, "Email already exists.");
            }

            const [role] = await Role.findOrCreate({
                where: { role_name: 'client' },
                defaults: { id: generateId() }
            });

            const hashedPassword = await bcrypt.hash(password, 10);

            const client = await Client.create({
                username,
                password: hashedPassword,
                email,
                role_id: role.id,
                firstName,
                lastName,
                phone,
                profilePic,
                created_by: req.user?.username,
                updated_by: req.user?.username
            });

            responseHandler.created(res, "Client created successfully", client);

        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};