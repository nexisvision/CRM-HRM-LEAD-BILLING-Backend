import Joi from "joi";
import RolePermission from "../../models/rolePermissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const rolePermission = await RolePermission.findByPk(id);
            if (!rolePermission) {
                return responseHandler.notFound(res, "Role permission not found");
            }

            await rolePermission.destroy();

            return responseHandler.success(res, "Role permission deleted successfully");
        } catch (error) {

            return responseHandler.error(res, error);
        }
    }
};
