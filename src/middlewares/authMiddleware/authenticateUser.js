import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import Employee from "../../models/employeeModel.js";
import SuperAdmin from "../../models/superAdminModel.js";
import Company from "../../models/subClientModel.js";
import Role from "../../models/roleModel.js"; // Import Role model
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";

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

        const role = await Role.findByPk(user.role_id);
        if (!role) return responseHandler.error(res, "Role not found");

        // Parse permissions if they are stored as a JSON string
        const permissions = typeof role.permissions === "string"
            ? JSON.parse(role.permissions)
            : role.permissions;

        req.user = {
            ...user.toJSON(),
            permissions // Attach parsed permissions
        };

        next();
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};

export default authenticateUser;
