import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import JobApplication from "../../models/jobapplicationModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const jobApplication = await JobApplication.findByPk(id);
            if (!jobApplication) {
                responseHandler.error(res, "Job application not found");
            }
            await jobApplication.destroy();
            responseHandler.success(res, "Job application deleted successfully", jobApplication);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}