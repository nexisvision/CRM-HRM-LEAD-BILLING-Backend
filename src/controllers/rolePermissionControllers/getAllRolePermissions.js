import Joi from "joi";
import RolePermission from "../../models/rolePermissionModel.js";
import Role from "../../models/roleModel.js";
import Permission from "../../models/permissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const rolePermissions = await RolePermission.findAll({
                include: [
                    {
                        model: Role,
                        attributes: ['name']
                    },
                    {
                        model: Permission,
                        attributes: ['name', 'description']
                    }
                ],
                where: {
                    status: 'active'
                }
            });

            responseHandler.success(res, "Role permissions fetched successfully", rolePermissions);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
