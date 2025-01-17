import Joi from "joi";
import SalesRevenue from "../../models/salesRevenueModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            date: Joi.date().required(),
            currency: Joi.string().optional(),
            amount: Joi.number().required(),
            account: Joi.string().required(),
            customer: Joi.string().required(),
            description: Joi.string().optional().allow('', null),
            category: Joi.string().required(),
            paymentReceipt: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { date, currency, amount, account, customer, description, category, paymentReceipt } = req.body;
            const salesRevenue = await SalesRevenue.findByPk(id);
            if (!salesRevenue) {
                return responseHandler.error(res, "SalesRevenue not found");
            }
            await salesRevenue.update({ date, currency, amount, account, customer, description, category, paymentReceipt, updated_by: req.user?.username });
            return responseHandler.success(res, "SalesRevenue updated successfully", salesRevenue);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}