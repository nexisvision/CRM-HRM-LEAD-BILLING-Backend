import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import Client from "../../models/clientModel.js";
import Employee from "../../models/employeeModel.js";

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
        const user = await User.findByPk(decoded.userId) || await Client.findByPk(decoded.clientId) || await Employee.findByPk(decoded.employeeId);
        if (!user) return responseHandler.error(res, "User not found");
        req.user = user;
        next();
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};

export default authenticateUser;