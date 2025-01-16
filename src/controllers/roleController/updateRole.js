import Joi from "joi";
import Role from "../../models/roleModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            role_name: Joi.string().required(),
            permissions: Joi.array().items(Joi.string()).allow(null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { role_name, permissions } = req.body;

            const role = await Role.findByPk(id);
            if (!role) {
                return responseHandler.notFound(res, 'Role not found');
            }

            await role.update({
                role_name,
                permissions,
                updated_by: req.user?.username
            });
            return responseHandler.success(res, 'Role updated successfully', role);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}