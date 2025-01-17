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
                return responseHandler.error(res, "No jobs found");
            }
            return responseHandler.success(res, "Jobs fetched successfully", jobs);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}
