import Joi from "joi";
import Permission from "../../models/permissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Permission ID must be a string',
                'string.empty': 'Permission ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const permission = await Permission.findByPk(id);

            if (!permission) {
                return responseHandler.notFound(res, "Permission not found");
            }

            // Option 1: Hard delete
            await permission.destroy();

            // Option 2: Soft delete (if you prefer)
            // await permission.update({ status: 'inactive' });

            responseHandler.success(res, "Permission deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
