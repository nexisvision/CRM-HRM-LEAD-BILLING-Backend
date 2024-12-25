import Joi from "joi";
import Company from "../../models/companyModel.js";
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
            const companies = await Company.findAll();
            responseHandler.success(res, "Companies fetched successfully", companies);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}