import Joi from "joi";
import SalesCreditnote from "../../models/salesCreditnoteModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
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
            const { id } = req.params;
            const { invoice, date, currency, amount, description } = req.body;
            const salesCreditnote = await SalesCreditnote.findByPk(id);
            if (!salesCreditnote) {
                return responseHandler.error(res, "SalesCreditnote not found");
            }
            await salesCreditnote.update({ related_id: id, invoice, date, currency, amount, description, updated_by: req.user?.username });
            return responseHandler.success(res, "SalesCreditnote updated successfully", salesCreditnote);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}