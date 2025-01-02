import Joi from "joi";
import Invoice from "../../models/invoiceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            project: Joi.string().required(),
            client: Joi.string().required(),
            issueDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            currency: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { issueDate, dueDate, currency, client, project } = req.body;

            const invoice = await Invoice.findByPk(id);
            if (!invoice) {
                return responseHandler.error(res, "Invoice not found");
            }
            await invoice.update({ issueDate, dueDate, currency, client, project, updated_by: req.user?.username });
            return responseHandler.success(res, "Invoice updated successfully", invoice);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}