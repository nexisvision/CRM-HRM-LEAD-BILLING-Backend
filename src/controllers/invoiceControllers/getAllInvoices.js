import Invoice from "../../models/invoiceModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const invoices = await Invoice.findAll();
            responseHandler.success(res, "Invoices fetched successfully", invoices);
        }
        catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}