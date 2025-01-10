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

        req.role = role;
        console.log("hr");
        next();
    } catch (error) {
        responseHandler.error(res, error.message);
    }
}
