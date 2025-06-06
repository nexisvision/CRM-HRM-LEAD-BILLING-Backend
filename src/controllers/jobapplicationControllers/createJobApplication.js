import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import JobApplication from "../../models/jobapplicationModel.js";

export default {
    validator: validator({
        body: Joi.object({
            job: Joi.string().required(),
            name: Joi.string().allow('', null),
            email: Joi.string().allow('', null),
            phone: Joi.string().allow('', null),
            location: Joi.string().allow('', null),
            total_experience: Joi.number().allow('', null),
            current_location: Joi.string().allow('', null),
            notice_period: Joi.number().allow('', null),
            status: Joi.string().allow('', null),
            applied_source: Joi.string().allow('', null),
            cover_letter: Joi.string().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { job, name, email, phone, location, total_experience, current_location, notice_period, status, applied_source, cover_letter } = req.body;
            const existingJobApplication = await JobApplication.findOne({ where: { job, name, email, phone, location, total_experience, current_location, notice_period, status, applied_source, cover_letter } });
            if (existingJobApplication) {
                return responseHandler.error(res, "Job application already exists");
            }
            const jobApplication = await JobApplication.create({ job, name, email, phone, location, total_experience, current_location, notice_period, status, applied_source, cover_letter,
                client_id: req.des?.client_id,
                created_by: req.user?.username });
            return responseHandler.success(res, "Job application created successfully", jobApplication);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

