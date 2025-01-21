import { Op } from "sequelize";
import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import OfferLetter from "../../models/offerletter.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            job: Joi.string().required(),
            job_applicant: Joi.string().required(),
            offer_expiry: Joi.date().required(),
            expected_joining_date: Joi.date().required(),
            salary: Joi.number().required(),
            description: Joi.string().optional().allow('', null),
            files: Joi.object().optional().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { job, job_applicant, offer_expiry, expected_joining_date, salary, description, files } = req.body;
            const offerletter = await OfferLetter.findByPk(id);
            if (!offerletter) {
                return responseHandler.error(res, "Offer letter not found");
            }
            // const existingOfferLetter = await OfferLetter.findOne({ where: { job, job_applicant, id: { [Op.not]: id } } });
            // if (existingOfferLetter) {
            //     return responseHandler.error(res, "Offer letter already exists");
            // }
            await offerletter.update({ job, job_applicant, offer_expiry, expected_joining_date, salary, description, files });
            return responseHandler.success(res, "Offer letter updated successfully", offerletter);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

