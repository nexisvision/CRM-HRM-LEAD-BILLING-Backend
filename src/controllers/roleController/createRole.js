import Joi from "joi";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            role_name: Joi.string().required(),
            permissions: Joi.object().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { role_name, permissions } = req.body;
            const role = await Role.create({
                role_name,
                permissions,
                created_by: req.user?.username,
            });
            const existingRole = await Role.findOne({ where: { role_name } });
            if (existingRole) {
                return responseHandler.error(res, "Role already exists");
            }
            return responseHandler.success(res, 'Role created successfully', role);
        } catch (error) {
            return responseHandler.error(res, error.errors[0].message);
        }
    }
}