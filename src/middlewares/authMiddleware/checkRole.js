import Role from "../../models/roleModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default async function checkRole(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return responseHandler.error(res, "User not authenticated");
        }

        const user = req.user;

        const role = await Role.findByPk(user.role_id);
        if (!role) {
            return responseHandler.error(res, "Role not found");
        }

        req.role = role; // Assign role to req object for further use
        next(); // Call next middleware
    } catch (error) {
        responseHandler.error(res, error.message);
    }
}
