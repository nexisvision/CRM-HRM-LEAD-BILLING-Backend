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
            const quotations = await Quotations.findByPk(id);
            if (!quotations) {
                responseHandler.error(res, "Quotation not found");
            }
            await quotations.update({ valid_till, currency, lead, client, calculatedTax, items, discount, tax, total, updated_by: req.user?.username });
            responseHandler.success(res, "Quotation updated successfully", quotations);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}   