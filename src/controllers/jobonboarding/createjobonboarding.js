import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import JobOnboarding from "../../models/jobonboarding.js";

export default {
    validator: validator({
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
            const { Interviewer, JoiningDate, DaysOfWeek, Salary,
                SalaryType, SalaryDuration, JobType, Status } = req.body;

            const jobOnboarding = await JobOnboarding.create({
                Interviewer,
                JoiningDate,
                DaysOfWeek,
                Salary,
                SalaryType,
                SalaryDuration,
                JobType,
                Status,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Job onboarding created successfully", jobOnboarding);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
