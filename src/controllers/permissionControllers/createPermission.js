import Joi from "joi";
import Permission from "../../models/permissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            permissions: Joi.object().allow(null).required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { permissions } = req.body;

            // Check if permission already exists
            const existingPermission = await Permission.findOne({
                where: { permissions }
            });

            if (existingPermission) {
                return responseHandler.error(res, "Permission already exists");
            }

            const permission = await Permission.create({
                permissions,
                created_by: req.user?.username,
            });

            responseHandler.created(res, "Permission created successfully", permission);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}; 