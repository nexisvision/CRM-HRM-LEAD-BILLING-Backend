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
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);

            if (!role) {
                return responseHandler.notFound(res, 'Role not found');
            }

            return responseHandler.success(res, 'Role retrieved successfully', role);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}