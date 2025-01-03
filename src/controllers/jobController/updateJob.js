import Joi from "joi";
import validator from "../../utils/validator.js";
import Job from "../../models/jobModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            title: Joi.string().required(),
            department: Joi.string().required(),
            skills: Joi.object().required(),
            location: Joi.string().required(),
            interviewRounds: Joi.object().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            totalOpenings: Joi.number().required(),
            status: Joi.string().required(),
            recruiter: Joi.string().required(),
            jobType: Joi.string().required(),
            workExperience: Joi.number().required(),
            currency: Joi.string().required(),
            expectedSalary: Joi.number().required(),
            description: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, department, skills, location, interviewRounds, startDate, endDate, totalOpenings, status, recruiter, jobType, workExperience, currency, expectedSalary, description } = req.body;
            const { id } = req.params;
            const job = await Job.findByPk(id);
            if (!job) {
                return responseHandler.error(res, "Job not found");
            }
            await job.update({ title, department, skills, location, interviewRounds, startDate, endDate, totalOpenings, status, recruiter, jobType, workExperience, currency, expectedSalary, description, updated_by: req.user?.username });
            return responseHandler.success(res, "Job updated successfully", job);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}