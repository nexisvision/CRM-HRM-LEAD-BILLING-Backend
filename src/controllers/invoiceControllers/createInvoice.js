import Joi from "joi";
import Invoice from "../../models/invoiceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            customer: Joi.string().required(),
            issueDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            status: Joi.string().valid('paid', 'unpaid', 'partially paid').required(),
            amount: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { issueDate, dueDate, status, amount, customer } = req.body;
            const invoice = await Invoice.create({ customer, issueDate, dueDate, status, amount, created_by: req.user?.username });
            return responseHandler.success(res, "Invoice created successfully", invoice);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}   