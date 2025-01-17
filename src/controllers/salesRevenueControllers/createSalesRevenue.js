import Joi from "joi";
import SalesRevenue from "../../models/salesRevenueModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
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
            const { id } = req.user;
            const { date, currency, amount, account, customer, description, category, paymentReceipt } = req.body;
            const salesRevenue = await SalesRevenue.create({ related_id: id, date, currency, amount, account, customer, description, category, paymentReceipt, created_by: req.user?.username });
            return responseHandler.success(res, "SalesRevenue created successfully", salesRevenue);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}