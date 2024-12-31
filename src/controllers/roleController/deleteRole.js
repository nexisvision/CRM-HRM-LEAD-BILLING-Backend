import Joi from "joi";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

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

            await role.destroy();
            return responseHandler.success(res, 'Role deleted successfully');
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
