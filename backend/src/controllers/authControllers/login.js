import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import SuperAdmin from "../../models/superAdminModel.js";
import Employee from "../../models/employeeModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";
import Company from "../../models/companyModel.js";

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
                SuperAdmin.findOne({ where: { [Op.or]: [{ email: login }, { username: login }] } }),
                User.findOne({ where: { [Op.or]: [{ email: login }, { username: login }] } }),
                Company.findOne({ where: { [Op.or]: [{ email: login }, { username: login }] } }),
                Client.findOne({ where: { [Op.or]: [{ email: login }, { username: login }] } }),
                Employee.findOne({ where: { [Op.or]: [{ email: login }, { username: login }] } })
            ]);
            const foundEntity = entities.find(entity => entity && bcrypt.compareSync(password, entity.password));

            if (foundEntity) {
                const type = ['super-admin', 'user', 'company', 'client', 'employee'][entities.indexOf(foundEntity)];
                const token = jwt.sign({
                    email: foundEntity.email,
                    id: foundEntity.id,
                    role: type
                }, JWT_SECRET, { expiresIn: '24h' });
                return responseHandler.success(res, "Login successful", { token, user: foundEntity });
            }

            return responseHandler.error(res, entities.some(e => e) ? "Invalid password" : "Account not found");
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
