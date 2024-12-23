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
            const { page = 1, limit = 10 } = req.query;
            const permissions = await Permission.findAll({
                offset: (page - 1) * limit,
                limit: parseInt(limit)
            });
            responseHandler.success(res, "Permissions retrieved successfully", permissions);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
