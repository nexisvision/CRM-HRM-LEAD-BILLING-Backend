import Joi from "joi";
import Payment from "../../models/paymentModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            project: Joi.string().allow('', null),
            invoice: Joi.string().allow('', null), 
            paidOn: Joi.date().allow('', null),
            amount: Joi.number().allow('', null),
            currency: Joi.string().allow('', null),
            transactionId: Joi.string().allow('', null),
            paymentMethod: Joi.string().allow('', null),
            receipt: Joi.string().allow('', null),
            remark: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const payment = await Payment.findByPk(id);
            if (!payment) {
                return responseHandler.notFound(res, "Payment not found");
            }

            // Only update fields that were provided
            const fieldsToUpdate = {};
            for (const [key, value] of Object.entries(updateData)) {
                if (value !== null && value !== '') {
                    fieldsToUpdate[key] = value;
                }
            }

            // Add updated_by field
            fieldsToUpdate.updated_by = req.user?.username;

            // Update payment with only provided fields
            await payment.update(fieldsToUpdate);

            responseHandler.success(res, "Payment updated successfully", payment);
        } catch (error) {
            console.error('Error updating payment:', error);
            responseHandler.error(res, error.message);
        }
    }
};
