import Joi from "joi";
import SalesInvoice from "../../models/salesInvoiceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            customer: Joi.string().required(),
            issueDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            category: Joi.string().required(),
            subtotal: Joi.number().required(),
            items: Joi.object().required(),
            discount: Joi.number().optional(),
            tax: Joi.number().optional(),
            total: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.user;
            const { customer, issueDate, dueDate, category, subtotal, items, discount, tax, total } = req.body;
            const salesInvoice = await SalesInvoice.create({ related_id: id, customer, issueDate, dueDate, category, subtotal,  items, discount, tax, total,
                client_id: req.des?.client_id,
                created_by: req.user?.username });
            return responseHandler.success(res, "SalesInvoice created successfully", salesInvoice);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}   