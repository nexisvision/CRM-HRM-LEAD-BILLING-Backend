import Lead from "../../models/leadModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Lead ID must be a string',
                'string.empty': 'Lead ID is required',
            })
        }),
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
            email: Joi.string().email().allow('', null),
            leadValue: Joi.number().allow('', null),
            assigned: Joi.string().allow('', null),
            status: Joi.string().required()
                .messages({
                    'string.empty': 'Please select a status.'
                }),
            details: Joi.string().allow('', null),
            notes: Joi.string().allow('', null),
            source: Joi.string().allow('', null),
            category: Joi.string().allow('', null),
            tags: Joi.string().allow('', null),
            lastContacted: Joi.date().allow('', null),
            totalBudget: Joi.string().allow('', null),
            targetDate: Joi.date().allow('', null),
            contentType: Joi.string().allow('', null),
            brandName: Joi.string().allow('', null),
            companyName: Joi.string().allow('', null),
            street: Joi.string().allow('', null),
            city: Joi.string().allow('', null),
            state: Joi.string().allow('', null),
            zipCode: Joi.string().allow('', null),
            country: Joi.string().allow('', null),
            website: Joi.string().uri().allow('', null)
        })
    }),

    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { leadTitle, firstName, lastName, telephone, email, leadValue, assigned, status, details, notes, source, category, tags, lastContacted, totalBudget, targetDate, contentType, brandName, companyName, street, city, state, zipCode, country, website } = req.body;

            const lead = await Lead.findByPk(id);

            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }

            await lead.update({
                leadTitle,
                firstName,
                lastName,
                telephone,
                email,
                leadValue,
                assigned,
                status,
                details,
                notes,
                source,
                category,
                tags,
                lastContacted,
                totalBudget,
                targetDate,
                contentType,
                brandName,
                companyName,
                street,
                city,
                state,
                zipCode,
                country,
                website,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Lead updated successfully!", lead);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
