import Lead from "../../models/leadModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().optional()
        }),
        body: Joi.object({
            leadTitle: Joi.string().allow('', null),
            firstName: Joi.string().allow('', null),
            lastName: Joi.string().allow('', null),
            leadStage: Joi.string().allow('', null),
            telephone: Joi.string().allow('', null),
            email: Joi.string().email().allow('', null),
            assigned: Joi.string().allow('', null),
            lead_owner: Joi.string().allow('', null),
            category: Joi.string().allow('', null),
            status: Joi.string().allow('', null),
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
            const {leadStage, leadTitle, firstName, lastName, telephone, email, assigned, lead_owner, category, status, source, company_name, website, country, city, state, zipCode, address } = req.body;

            const lead = await Lead.findByPk(id);

            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }
            // const existingLead = await Lead.findOne({ where: { email, id: { [Op.not]: id } } });
            // if (existingLead) {
            //     return responseHandler.conflict(res, "Lead with this email already exists!");
            // }
            await lead.update({
                leadTitle,
                firstName,
                lastName,
                leadStage,
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

            return responseHandler.success(res, "Lead updated successfully!", lead);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
