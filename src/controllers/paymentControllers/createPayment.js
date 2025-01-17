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
            project: Joi.string().required(),
            invoice: Joi.string().required(),
            paidOn: Joi.date().required(),
            amount: Joi.string().required(),
            currency: Joi.string().required(),
            transactionId: Joi.number().required(),
            paymentMethod: Joi.string().required(),
            receipt: Joi.string().optional().allow('', null),
            remark: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                project,
                invoice,
                paidOn,
                amount,
                currency,
                transactionId,
                paymentMethod,
                receipt,
                remark
            } = req.body;

            const payment = await Payment.create({
                related_id: id,
                project,
                invoice,
                paidOn,
                amount,
                currency,
                transactionId,
                paymentMethod,
                receipt,
                remark,
                created_by: req.user?.username,
                updated_by: req.user?.username
            });

            return responseHandler.created(res, "Payment created successfully", payment);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
