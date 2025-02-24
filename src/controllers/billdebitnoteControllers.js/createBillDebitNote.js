import Joi from "joi";
import BillDebitnote from "../../models/billdebitnoteModel.js";
import Bill from "../../models/billModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            bill: Joi.string().required(),
            date: Joi.date().required(), 
            // currency: Joi.string().optional(),
            amount: Joi.number().required(),
            description: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.user;
            const { bill, date, amount, description } = req.body;

            // Find the related sales invoice
            const billDebitnotee = await BillDebitnote.findByPk(bill);
            if (!billDebitnotee) {
                return responseHandler.error(res, "Bill Debitnote not found");
            }

            // Check if credit amount is valid
            if (amount > billDebitnotee.total) {
                return responseHandler.error(res, "Credit amount cannot be greater than invoice total");
            }

            // Create credit note
            const billDebitnote = await BillDebitnotee.create({ 
                related_id: id, 
                bill, 
                date, 
                // currency, 
                amount, 
                description, 
                created_by: req.user?.username 
            });

            // Update invoice total
            const updatedTotal = billDebitnotee.total - amount;
                await billDebitnotee.update({ total: updatedTotal });

            return responseHandler.success(res, "Bill Debit Note created successfully", billDebitnote);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}