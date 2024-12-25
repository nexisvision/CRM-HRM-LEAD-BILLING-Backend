import Joi from "joi";
import Permission from "../../models/permissionModel.js";
import Role from "../../models/roleModel.js";
import RolePermission from "../../models/rolePermissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            role_id: Joi.string().required().messages({
                'string.base': 'Role ID must be a string',
                'string.empty': 'Role ID is required'
            }),
            permission_ids: Joi.array().items(Joi.string()).required().messages({
                'array.base': 'Permission IDs must be an array',
                'array.empty': 'At least one permission ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { role_id, permission_ids } = req.body;

            // Check if role exists
            const role = await Role.findByPk(role_id);
            if (!role) {
                return responseHandler.notFound(res, "Role not found");
            }

            // Check if all permissions exist
            const permissions = await Permission.findAll({
                where: { id: permission_ids }
            });

            if (permissions.length !== permission_ids.length) {
                return responseHandler.error(res, "One or more permissions not found");
            }

            // Create role-permission associations
            const rolePermissions = await Promise.all(
                permission_ids.map(async (permission_id) => {
                    const [rolePermission, created] = await RolePermission.findOrCreate({
                        where: {
                            role_id,
                            permission_id
                        },
                        defaults: {
                            created_by: req.user?.id
                        }
                    });
                    return rolePermission;
                })
            );

            responseHandler.success(res, "Permissions assigned to role successfully", {
                role,
                assigned_permissions: permissions
            });
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
