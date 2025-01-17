import responseHandler from "../../utils/responseHandler.js";
import JobOnboarding from "../../models/jobonboarding.js";
import Joi from "joi";
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
            // Fetch all job onboarding records
            const jobOnboardings = await JobOnboarding.findAll();

            // If no records are found
            if (!jobOnboardings) {
                return responseHandler.error(res, "No job onboarding records found");
            }

            // Return success with all records
            return responseHandler.success(res, "Fetched all job onboarding records successfully", jobOnboardings);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}
