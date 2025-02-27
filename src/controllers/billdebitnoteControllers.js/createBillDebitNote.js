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

            // Find the bill in bill model
            const billData = await Bill.findOne({ 
                where: { 
                    id: bill,
                    // related_id: id 
                } 
            });
            
            if (!billData) {
                return responseHandler.error(res, "Bill not found");
            }

            // Check if debit amount is valid
            if (amount > billData.total) {
                return responseHandler.error(res, "Debit amount cannot be greater than bill total");
            }

            // Create debit note
            const billDebitnote = await BillDebitnote.create({ 
                // related_id: id, 
                bill, 
                date, 
                // currency, 
                amount, 
                description, 
                created_by: req.user?.username 
            });

            // Calculate updated total based on whether updated_total exists
            let updatedTotal;
            if (billData.updated_total === 0 || billData.updated_total === null) {
                updatedTotal = billData.total - amount;
            } else {
                updatedTotal = billData.updated_total - amount;
            }

            // Update bill total
            await billData.update({ updated_total: updatedTotal });

            return responseHandler.success(res, "Bill Debit Note created successfully", billDebitnote);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}