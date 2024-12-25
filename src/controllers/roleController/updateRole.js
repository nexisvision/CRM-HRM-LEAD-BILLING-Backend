import Joi from "joi";
import Role from "../../models/roleModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Role ID must be a string',
                'string.empty': 'Role ID is required',
            })
        }),
        body: Joi.object({
            role_name: Joi.string().required().messages({
                'string.base': 'Role name must be a string',
                'string.empty': 'Role name is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { role_name } = req.body;

            const role = await Role.findByPk(id);
            if (!role) {
                return responseHandler.notFound(res, 'Role not found');
            }

            await role.update({ role_name });
            return responseHandler.success(res, 'Role updated successfully', role);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}