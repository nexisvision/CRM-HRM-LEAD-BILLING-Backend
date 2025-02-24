import Joi from "joi";
import BillPayment from "../../models/billPaymentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            bill: Joi.string().required(),
            date: Joi.date().required(),
            amount: Joi.number().required(),
            account: Joi.string().required(),
            reference: Joi.string().optional().allow('', null),
            description: Joi.string().optional().allow('', null),
            // paymentReceipt: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { bill, date, amount, account, reference, description } = req.body;

            const billPayment = await BillPayment.create({
                bill,
                date,
                amount,
                account,
                reference,
                description,
                paymentReceipt,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Bill payment created successfully", billPayment);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
