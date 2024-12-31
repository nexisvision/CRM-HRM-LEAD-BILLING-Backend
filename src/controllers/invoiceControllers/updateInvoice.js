import Joi from "joi";
import Invoice from "../../models/invoiceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Invoice ID must be a string',
                'string.empty': 'Invoice ID is required',
            })
        }),
        body: Joi.object({
            project: Joi.string().required(),
            customer: Joi.string().required(),
            issueDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            status: Joi.string().valid('paid', 'unpaid', 'partially paid').required(),
            amount: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { customer, issueDate, dueDate, status, amount, project } = req.body;

            const invoice = await Invoice.findByPk(id);
            if (!invoice) {
                return responseHandler.error(res, "Invoice not found");
            }
            await invoice.update({ customer, project, issueDate, dueDate, status, amount, updated_by: req.user?.username });
            return responseHandler.success(res, "Invoice updated successfully", invoice);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}