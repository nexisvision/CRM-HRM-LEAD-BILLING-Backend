import Lead from "../../models/leadModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            leadTitle: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            telephone: Joi.string().allow('', null),
            email: Joi.string().email(),
            assigned: Joi.string().allow('', null),
            lead_owner: Joi.string().allow('', null),
            category: Joi.string().allow('', null),
            status: Joi.string().required(),
            source: Joi.string().allow('', null),
            company_name: Joi.string().allow('', null),
            website: Joi.string().allow('', null),
            country: Joi.string().allow('', null),
            city: Joi.string().allow('', null),
            state: Joi.string().allow('', null),
            zipCode: Joi.string().allow('', null),
            address: Joi.string().allow('', null),
        })
    }),

    handler: async (req, res) => {
        try {
            const { leadTitle, firstName, lastName, telephone, email, assigned, lead_owner, category, status, source, company_name, website, country, city, state, zipCode, address } = req.body;
            const existingLead = await Lead.findOne({ where: { email } });
            if (existingLead) {
                return responseHandler.conflict(res, "Lead with this email already exists!");
            }
            const lead = await Lead.create({ leadTitle, firstName, lastName, telephone, email, assigned, lead_owner, category, status, source, company_name, website, country, city, state, zipCode, address, created_by: req.user?.username });
            return responseHandler.success(res, "Lead created successfully!", lead);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}


