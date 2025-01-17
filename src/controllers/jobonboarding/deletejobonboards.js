import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import JobOnboarding from "../../models/jobonboarding.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required() // Validate that the ID is provided in the URL params
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            // Find the JobOnboarding record by its primary key (id)
            const jobOnboarding = await JobOnboarding.findByPk(id);

            if (!jobOnboarding) {
                return responseHandler.error(res, "Job onboarding record not found", 404);
            }

            // Delete the record
            await jobOnboarding.destroy();

            return responseHandler.success(res, "Job onboarding record deleted successfully");
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}
