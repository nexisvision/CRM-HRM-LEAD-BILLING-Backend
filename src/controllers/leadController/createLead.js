import Lead from "../../models/leadModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            leadTitle: Joi.string().required()
                .messages({
                    'string.empty': 'Please provide a title for the lead.'
                }),
            firstName: Joi.string().required()
                .messages({
                    'string.empty': 'Please provide a first name.'
                }),
            lastName: Joi.string().required()
                .messages({
                    'string.empty': 'Please provide a last name.'
                }),
            telephone: Joi.string().allow('', null),
            email: Joi.string().email(),
            // leadValue: Joi.string().allow('', null),    
            assigned: Joi.string().allow('', null),
            lead_owner: Joi.string().allow('', null),
            status: Joi.string().required()
                .messages({
                    'string.empty': 'Please select a status.'
                }),

            source: Joi.string().allow('', null),
            // totalBudget: Joi.string().allow('', null),
            // targetDate: Joi.date(),
            // contentType: Joi.string().allow('', null),
            company_name: Joi.string().allow('', null),
            website: Joi.string().allow('', null),
            country: Joi.string().allow('', null),
            city: Joi.string().allow('', null),
            state: Joi.string().allow('', null),
            zip: Joi.string().allow('', null),
            address: Joi.string().allow('', null),
           

            // companyName: Joi.string().allow('', null),
        })
    }),

    handler: async (req, res) => {
        try {
            const { leadTitle, firstName, lastName, telephone, email, leadValue, assigned,lead_owner,
                     status, source, company_name, website, country, city, state, zip, address } = req.body;
            const lead = await Lead.create({ leadTitle, firstName, lastName, telephone, email, leadValue, 
                assigned, lead_owner, status, source, company_name, website, country, city, state, zip, address, created_by: req.user?.username, updated_by: req.user?.username });
            responseHandler.success(res, "Lead created successfully!", lead);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
