import Joi from "joi";
import Quotations from "../../models/quotationModel.js";
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
            lead: Joi.string().required(),
            client: Joi.string().required(),
            calculatedTax: Joi.number().required(),
            items: Joi.object().required(),
            discount: Joi.number().required(),
            tax: Joi.number().required(),
            total: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { valid_till, currency, lead, client, calculatedTax, items, discount, tax, total } = req.body;
            const quotation = await Quotations.create({ related_id: id, valid_till, currency, lead, client, calculatedTax, items, discount, tax, total, created_by: req.user?.username });
            responseHandler.success(res, "Quotation created successfully", quotation);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}   