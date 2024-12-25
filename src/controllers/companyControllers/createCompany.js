import Joi from "joi";
import bcrypt from 'bcrypt';
import validator from "../../utils/validator.js";
import Company from "../../models/companyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import { Op } from "sequelize";
import generateId from "../../middlewares/generatorId.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone: Joi.string().optional(),
            address: Joi.string().optional(),
            website: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { username, email, password, phone, address, website } = req.body;

            const existingClient = await Company.findOne({
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

            const [role, created] = await Role.findOrCreate({
                where: { role_name: 'client' },
                defaults: { id: generateId() }
            });

            const hashedPassword = await bcrypt.hash(password, 10);

            const client = await Company.create({
                username,
                password: hashedPassword,
                email,
                role_id: role.id,
                phone,
                address,
                website,
                created_by: req.user?.id,
                updated_by: req.user?.id
            });

            responseHandler.created(res, "Company created successfully", client);

        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}