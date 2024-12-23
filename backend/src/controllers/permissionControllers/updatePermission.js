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
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            status: Joi.string().valid('active', 'inactive').optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, status } = req.body;

            const permission = await Permission.findByPk(id);

            if (!permission) {
                return responseHandler.notFound(res, "Permission not found");
            }

            // If name is being updated, check for duplicates
            if (name && name !== permission.name) {
                const existingPermission = await Permission.findOne({
                    where: { name }
                });

                if (existingPermission) {
                    return responseHandler.error(res, "Permission name already exists");
                }
            }

            // Update permission
            await permission.update({
                name: name || permission.name,
                description: description || permission.description,
                status: status || permission.status,
                updated_by: req.user?.id // If you're tracking who updates
            });

            responseHandler.success(res, "Permission updated successfully", permission);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
