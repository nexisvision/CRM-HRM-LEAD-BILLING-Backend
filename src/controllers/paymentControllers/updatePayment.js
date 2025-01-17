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

            const payment = await Payment.findByPk(id);
            if (!payment) {
                return responseHandler.notFound(res, "Payment not found");
            }

            await payment.update({
                project,
                invoice,
                paidOn,
                amount,
                currency,
                transactionId,
                paymentMethod,
                receipt,
                remark,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Payment updated successfully", payment);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
