import Joi from "joi";
import RolePermission from "../../models/rolePermissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            status: Joi.string().valid('active', 'inactive').required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const rolePermission = await RolePermission.findByPk(id);
            if (!rolePermission) {
                return responseHandler.notFound(res, "Role permission not found");
            }

            const existingRolePermission = await RolePermission.findOne({ where: { role_id, permission_id, id: { [Op.not]: id } } });
            if (existingRolePermission) {
                return responseHandler.error(res, "Role permission already exists");
            }

            await rolePermission.update({
                status,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Role permission updated successfully", rolePermission);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};
