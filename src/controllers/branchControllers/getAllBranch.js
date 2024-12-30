import Joi from "joi";
import Branch from "../../models/branchModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const branches = await Branch.findAll({ limit: limit, offset: page });
            responseHandler.success(res, "Branches fetched successfully", branches);
        } catch (error) {
            console.error('Error fetching branches:', error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};