import Joi from "joi";
import JobCategory from "../../models/JobCategoryModel.js";
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
            const jobCategories = await JobCategory.findAll();
            if (!jobCategories) {
                return responseHandler.error(res, "No job categories found");
            }
            return responseHandler.success(res, "Job categories fetched successfully", jobCategories);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}