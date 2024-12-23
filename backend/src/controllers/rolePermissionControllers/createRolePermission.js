import Joi from "joi";
import Role from "../../models/roleModel.js";
import Permission from "../../models/permissionModel.js";
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
            permission_id: Joi.string().required().messages({
                'string.base': 'Permission ID must be a string',
                'string.empty': 'Permission ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { role_id, permission_id } = req.body;

            // Check if role exists
            const role = await Role.findByPk(role_id);
            if (!role) {
                return responseHandler.notFound(res, "Role not found");
            }

            // Check if permission exists
            const permission = await Permission.findByPk(permission_id);
            if (!permission) {
                return responseHandler.notFound(res, "Permission not found");
            }

            // Check if association already exists
            const existingAssociation = await RolePermission.findOne({
                where: { role_id, permission_id }
            });

            if (existingAssociation) {
                return responseHandler.error(res, "This permission is already assigned to the role");
            }

            const rolePermission = await RolePermission.create({
                role_id,
                permission_id,
                created_by: req.user?.id
            });

            responseHandler.created(res, "Role permission created successfully", rolePermission);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
