import Joi from "joi";
import Payment from "../../models/paymentModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import uploadToS3 from "../../utils/uploadToS3.js";
import { s3 } from "../../config/config.js";
import { Op } from "sequelize";

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
            remark: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const receipt = req.file;
            const { project, invoice, paidOn, amount, currency, transactionId, paymentMethod, remark } = req.body;

            const payment = await Payment.findByPk(id);
            if (!payment) {
                return responseHandler.notFound(res, "Payment not found");
            }
            const existingPayment = await Payment.findOne({ where: { related_id: payment.related_id, project, invoice, paidOn, amount, currency, transactionId, paymentMethod, remark, id: { [Op.not]: payment.id } } });
            if (existingPayment) {
                return responseHandler.error(res, "Payment already exists");
            }
            let receiptUrl = payment.receipt;
            if (receipt) {
                if (payment.receipt) {
                    const key = decodeURIComponent(payment.receipt.split(".com/").pop());
                    const s3Params = {
                        Bucket: s3.config.bucketName,
                        Key: key,
                    };
                    await s3.deleteObject(s3Params).promise();
                }
                receiptUrl = await uploadToS3(receipt, req.user?.roleName, "payments", req.user?.username);
            }
            await payment.update({
                project,
                invoice,
                paidOn,
                amount,
                currency,
                transactionId,
                paymentMethod,
                receipt: receiptUrl,
                remark,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Payment updated successfully", payment);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
