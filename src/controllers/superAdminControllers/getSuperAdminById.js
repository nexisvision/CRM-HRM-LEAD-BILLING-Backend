import Joi from "joi";
import SuperAdmin from "../../models/superAdminModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID must be a string',
                'string.empty': 'ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const superAdmin = await SuperAdmin.findByPk(id);

            if (!superAdmin) {
                return responseHandler.notFound(res, "Super admin not found");
            }

            responseHandler.success(res, "Super admin fetched successfully", superAdmin);
        } catch (error) {
            console.error(error);
            responseHandler.error(res, "Failed to fetch super admin");
        }
    }
};