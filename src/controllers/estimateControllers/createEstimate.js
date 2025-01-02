import Joi from "joi";
import Estimate from "../../models/estimateModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            valid_till: Joi.date().required(),
            currency: Joi.string().required(),
            project: Joi.string().required(),
            client: Joi.string().required(),
            calculatedTax: Joi.number().required(),
            items: Joi.array().required(),
            discount: Joi.number().required(),
            tax: Joi.number().required(),
            total: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { valid_till, currency, project, client, calculatedTax, items, discount, tax, total } = req.body;
            const estimate = await Estimate.create({ related_id: id, valid_till, currency, project, client, calculatedTax, items, discount, tax, total, created_by: req.user?.username });
            return responseHandler.success(res, "Estimate created successfully", estimate);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}   