import Joi from "joi";
import SalesCreditnote from "../../models/salesCreditnoteModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            invoice: Joi.string().required(),
            date: Joi.date().required(),
            currency: Joi.string().required(),
            amount: Joi.number().required(),
            description: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.user;
            const { invoice, date, currency, amount, description } = req.body;
            const salesCreditnote = await SalesCreditnote.create({ related_id: id, invoice, date, currency, amount, description, created_by: req.user?.username });
            return responseHandler.success(res, "SalesCreditnote created successfully", salesCreditnote);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}