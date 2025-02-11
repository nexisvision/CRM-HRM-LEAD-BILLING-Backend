import Joi from "joi";
import Payment from "../../models/paymentModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            project_name: Joi.string().required(),
            invoice: Joi.string().required(),
            paidOn: Joi.date().required(),
            amount: Joi.string().required(),
            currency: Joi.string().required(),
            transactionId: Joi.number().required(),
            paymentMethod: Joi.string().required(),
            remark: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const receipt = req.file;
            const { id } = req.params;
            const { project, invoice, paidOn, amount, currency, transactionId, paymentMethod, remark } = req.body;
            const existingPayment = await Payment.findOne({ where: { related_id: id, project, invoice, paidOn, amount, currency, transactionId, paymentMethod, remark } });
            if (existingPayment) {
                return responseHandler.error(res, "Payment already exists");
            }

            const receiptUrl = await uploadToS3(receipt, req.user?.roleName, "payments", req.user?.username);
            const payment = await Payment.create({
                related_id: id,
                project_name,
                invoice,
                paidOn,
                amount,
                currency,
                transactionId,
                paymentMethod,
                receipt: receiptUrl,
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
