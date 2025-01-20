import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import OfferLetter from "../../models/offerletter.js";

export default {
    validator: validator({
        body: Joi.object({
            job: Joi.string().required(),
            job_applicant: Joi.string().required(),
            offer_expiry: Joi.date().required(),
            expected_joining_date: Joi.date().required(),
            salary: Joi.string().required(),
            description: Joi.string().optional().allow('', null),
            files: Joi.object().optional().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { job, job_applicant, offer_expiry, expected_joining_date, salary, description, files } = req.body;
            const existingOfferLetter = await OfferLetter.findOne({ where: { job, job_applicant } });
            if (existingOfferLetter) {
                return responseHandler.error(res, "Offer letter already exists");
            }
            const offerletter = await OfferLetter.create({ job, job_applicant, offer_expiry, expected_joining_date, salary, description, files, created_by: req.user?.username });
            return responseHandler.success(res, offerletter, "Offer letter created successfully");
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}