import Joi from "joi";
import Job from "../../models/jobModel.js";
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
            const jobs = await Job.findAll();
            if (!jobs) {
                responseHandler.error(res, "No jobs found");
            }
            responseHandler.success(res, "Jobs fetched successfully", jobs);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
