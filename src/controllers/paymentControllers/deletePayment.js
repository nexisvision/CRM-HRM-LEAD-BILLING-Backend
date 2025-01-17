import Joi from "joi";
import Payment from "../../models/paymentModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await Payment.findByPk(id);
            if (!payment) {
                return responseHandler.error(res, "Payment not found", 404);
            }
            await payment.destroy();
            return responseHandler.success(res, "Payment deleted successfully", payment);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
};