import Joi from "joi";
import validator from "../../utils/validator.js";
import Permission from "../../models/permissionModel.js";
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
            const permissions = await Permission.findAll();
            return responseHandler.success(res, "Permissions retrieved successfully", permissions);
        } catch (error) {

            return responseHandler.error(res, error.message);
        }
    }
};
