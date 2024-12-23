import Joi from "joi";
import Role from "../../models/roleModel.js";
import Permission from "../../models/permissionModel.js";
import RolePermission from "../../models/rolePermissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            roleId: Joi.string().required().messages({
                'string.base': 'Role ID must be a string',
                'string.empty': 'Role ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { roleId } = req.params;

            // Check if role exists
            const role = await Role.findByPk(roleId);
            if (!role) {
                return responseHandler.notFound(res, "Role not found");
            }

            // Get all permissions for this role
            const permissions = await Permission.findAll({
                include: [{
                    model: RolePermission,
                    where: { role_id: roleId },
                    attributes: [] // Don't include RolePermission fields in response
                }],
                where: {
                    status: 'active' // Only get active permissions
                }
            });

            responseHandler.success(res, "Permissions fetched successfully", {
                role: {
                    id: role.id,
                    name: role.name
                },
                permissions
            });
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
