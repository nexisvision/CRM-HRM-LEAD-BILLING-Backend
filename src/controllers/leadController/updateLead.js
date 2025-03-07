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
            leadStage: Joi.string().required(),
            currency: Joi.string().allow('', null),
            leadValue: Joi.string().allow('', null),
            source: Joi.string().allow('', null),
            company_name: Joi.string().allow('', null),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneCode: Joi.string().allow('', null),
            telephone: Joi.string().allow('', null),
            email: Joi.string().email(),
            assigned: Joi.string().allow('', null),
            category: Joi.string().allow('', null),
            status: Joi.string().required(),
            tag: Joi.string().allow('', null),
            website: Joi.string().allow('', null),
            country: Joi.string().allow('', null),
            city: Joi.string().allow('', null),
            state: Joi.string().allow('', null),
            zipCode: Joi.string().allow('', null),
            address: Joi.string().allow('', null)
        })
    }),

    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { leadStage, leadTitle, firstName, lastName, phoneCode, telephone, email, assigned, category, status, tag, source, company_name, currency, leadValue, website, country, city, state, zipCode, address } = req.body;

            const lead = await Lead.findByPk(id);

            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }

            await lead.update({
                leadStage,
                leadTitle,
                firstName,
                lastName,
                phoneCode,
                telephone,
                email,
                assigned,
                category,
                status,
                tag,
                source,
                company_name,
                currency,
                leadValue,
                website,
                country,
                city,
                state,
                zipCode,
                address,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Lead updated successfully!", lead);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
