import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/userModel.js";
import SuperAdmin from "../../models/superAdminModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";
import Role from "../../models/roleModel.js";

export default {
    validator: validator({
        body: Joi.object({
            login: Joi.string().required(),
            password: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { login, password } = req.body;
            const entities = await Promise.all([
                SuperAdmin.findOne({
                    where: { [Op.or]: [{ email: login }, { username: login }, { phone: login }] },
                    attributes: { exclude: ['conversations'] }
                }),
                User.findOne({
                    where: { [Op.or]: [{ email: login }, { username: login }, { phone: login }] },
                    attributes: { exclude: ['conversations'] }
                }),
            ]);
            const foundEntity = entities.find(entity => entity && bcrypt.compareSync(password, entity.password));

            if (!foundEntity) {
                return responseHandler.error(res, entities.some(e => e) ? "Invalid password" : "Account not found");
            }
            const role = await Role.findOne({ where: { id: foundEntity.role_id } });

            const token = jwt.sign({
                username: foundEntity.username,
                email: foundEntity.email,
                phone: foundEntity.phone,
                id: foundEntity.id,
                role: foundEntity.role_id,
                roleName: role.role_name,
                created_by: foundEntity.created_by
            }, JWT_SECRET, { expiresIn: '24h' });
            return responseHandler.success(res, "Login successful", { token, user: foundEntity });

        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
