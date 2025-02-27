import Role from "../models/roleModel.js";
import responseHandler from "../utils/responseHandler.js";
import User from "../models/userModel.js";

const passClientId = async (req, res, next) => {
    try {
        const role = await Role.findByPk(req.user?.role);
        
        if (!role) {
            return responseHandler.error(res, "Invalid role");
        }

        let des = {};

        if (role.role_name === 'client') {
            des = {
                client_id: req.user.id,
                client_plan_id: req.user.client_plan_id
            };
        } else {
            const user = await User.findByPk(req.user.id);
            if (!user) {
                return responseHandler.error(res, "User not found");
            }
            des = {
                client_id: user.client_id,
                client_plan_id: user.client_plan_id
            };
        }

        req.des = des;
        next();
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
};

export default passClientId;
