import Joi from "joi";
import RolePermission from "../../models/rolePermissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID must be a string',
                'string.empty': 'ID is required'
            })
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

            responseHandler.success(res, "Role permission deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
