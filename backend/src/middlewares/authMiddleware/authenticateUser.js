import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import Client from "../../models/clientModel.js";
import Employee from "../../models/employeeModel.js";
import SuperAdmin from "../../models/superAdminModel.js";
import Company from "../../models/companyModel.js";

const authenticateUser = async (req, res, next) => {
    try {
        let token;
        if (req.headers?.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return responseHandler.error(res, "Authorization token is required");
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const models = [User, Client, Employee, SuperAdmin, Company];
        const user = await models.reduce(async (promise, Model) => {
            const result = await promise;
            return result || await Model.findByPk(decoded.id);
        }, Promise.resolve(null));

        if (!user) return responseHandler.error(res, "User not found");
        req.user = user;
        next();
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};

export default authenticateUser;