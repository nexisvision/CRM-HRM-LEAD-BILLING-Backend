import Joi from "joi";
import Role from "../../models/roleModel.js";
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
            const roles = await Role.findAll();
            responseHandler.success(res, 'Roles fetched successfully', roles);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}