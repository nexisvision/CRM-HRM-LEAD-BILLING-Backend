import Joi from "joi";
import Permission from "../../models/permissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            permissions: Joi.object().allow(null).required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { permissions } = req.body;

            const permission = await Permission.findByPk(id);

            if (!permission) {
                responseHandler.notFound(res, "Permission not found");
            }

            await permission.update({
                permissions: permissions || permission.permissions,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Permission updated successfully", permission);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
};
