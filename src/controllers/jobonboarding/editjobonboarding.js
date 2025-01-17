import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import JobOnboarding from "../../models/jobonboarding.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()  // Validate the 'id' parameter in the URL
        }),
        body: Joi.object({
            Interviewer: Joi.string().allow('', null),
            JoiningDate: Joi.string().required(),
            DaysOfWeek: Joi.string().allow('', null),
            Salary: Joi.string().allow('', null),
            SalaryType: Joi.string().required(),
            SalaryDuration: Joi.string().allow('', null),
            JobType: Joi.string().required(),
            Status: Joi.string().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { Interviewer, JoiningDate, DaysOfWeek, Salary,
                SalaryType, SalaryDuration, JobType, Status } = req.body;

            // Find the job onboarding record by primary key (id)
            const jobOnboarding = await JobOnboarding.findByPk(id);

            // If the record is not found, return an error
            if (!jobOnboarding) {
                return responseHandler.error(res, "Job onboarding record not found", 404);
            }

            // Update the job onboarding record with the provided value
            await jobOnboarding.update({
                Interviewer,
                JoiningDate,
                DaysOfWeek,
                Salary,
                SalaryType,
                SalaryDuration,
                JobType,
                Status,
                updated_by: req.user?.username
            })

            // Return success response with the updated record
            return responseHandler.success(res, "Job onboarding record updated successfully", jobOnboarding);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
