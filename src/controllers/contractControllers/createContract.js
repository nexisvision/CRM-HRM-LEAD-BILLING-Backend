import Contract from "../../models/contractModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            subject: Joi.string().required(),
            project: Joi.string().required(),
            description: Joi.string().required(),
            client: Joi.string().required(),
            type: Joi.string().required(),
            value: Joi.number().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            type: Joi.string().required(),
            value: Joi.number().required(),
            currency: Joi.string().required(),
            client: Joi.string().required(),
            phone: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            zipcode: Joi.string().required(),
            address: Joi.string().required(),
            notes: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { subject, client, project, type, value, startDate, endDate, currency, description,
                phone, address, city, state, country, zipcode, notes } = req.body;
            const contract = await Contract.create({
                subject, client, project, type, value, startDate, endDate, currency, description,
                phone, address, city, state, country, zipcode, notes, created_by: req.user?.id
            });
            responseHandler.success(res, "Contract created successfully", contract);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }

}
