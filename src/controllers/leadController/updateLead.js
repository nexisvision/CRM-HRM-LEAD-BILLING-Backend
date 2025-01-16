import Lead from "../../models/leadModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
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
            const { id } = req.params;
            const { leadTitle, firstName, lastName, telephone, email, assigned, lead_owner, category, status, source, company_name, website, country, city, state, zipCode, address } = req.body;

            const lead = await Lead.findByPk(id);

            if (!lead) {
                responseHandler.notFound(res, "Lead not found");
            }

            await lead.update({
                leadTitle,
                firstName,
                lastName,
                telephone,
                email,
                assigned,
                lead_owner,
                category,
                status,
                source,
                company_name,
                website,
                country,
                city,
                state,
                zipCode,
                address,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Lead updated successfully!", lead);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
