import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import JobApplication from "../../models/jobapplicationModel.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const jobApplications = await JobApplication.findAll();
            responseHandler.success(res, "Job applications fetched successfully", jobApplications);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}