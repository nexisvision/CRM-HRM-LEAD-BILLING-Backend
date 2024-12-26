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
            telephone: Joi.string(),
            email: Joi.string().email(),
            leadValue: Joi.number(),
            assigned: Joi.string(),
            status: Joi.string().required()
                .messages({
                    'string.empty': 'Please select a status.'
                }),
            details: Joi.string(),
            notes: Joi.string(),
            source: Joi.string(),
            category: Joi.string(),
            tags: Joi.array().items(Joi.string()),
            lastContacted: Joi.date(),
            totalBudget: Joi.number(),
            targetDate: Joi.date(),
            contentType: Joi.string(),
            brandName: Joi.string(),
            companyName: Joi.string(),
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zipCode: Joi.string(),
            country: Joi.string(),
            website: Joi.string().uri()
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
