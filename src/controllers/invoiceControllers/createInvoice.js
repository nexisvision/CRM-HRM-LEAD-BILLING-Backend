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
            subtotal: Joi.number().required(),
            items: Joi.array().required(),
            discount: Joi.number().optional(),
            tax: Joi.number().optional(),
            total: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { issueDate, dueDate, currency, client, project, items, discount, tax, total, subtotal } = req.body;
            const invoice = await Invoice.create({ related_id: id, issueDate, dueDate, currency, client, project, items, discount, tax, total, subtotal,    
                client_id: req.des?.client_id,
                created_by: req.user?.username });
            return responseHandler.success(res, "Invoice created successfully", invoice);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}   