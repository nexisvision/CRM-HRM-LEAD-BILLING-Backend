import Joi from "joi";
import SalesCreditnote from "../../models/salesCreditnoteModel.js";
import SalesInvoice from "../../models/salesInvoiceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            invoice: Joi.string().required(),
            date: Joi.date().required(), 
            currency: Joi.string().optional(),
            amount: Joi.number().required(),
            description: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.user;
            const { invoice, date, currency, amount, description } = req.body;

            // Find the related sales invoice
            const salesInvoice = await SalesInvoice.findByPk(invoice);
            if (!salesInvoice) {
                return responseHandler.error(res, "Sales Invoice not found");
            }

            // Check if credit amount is valid
            if (amount > salesInvoice.total) {
                return responseHandler.error(res, "Credit amount cannot be greater than invoice total");
            }

            // Create credit note
            const salesCreditnote = await SalesCreditnote.create({ 
                related_id: id, 
                invoice, 
                date, 
                currency, 
                amount, 
                description, 
                client_id: req.des?.client_id,
                created_by: req.user?.username 
            });

            // Update invoice total
            const updatedTotal = salesInvoice.total - amount;
            await salesInvoice.update({ total: updatedTotal });

            return responseHandler.success(res, "Sales Credit Note created successfully", salesCreditnote);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}