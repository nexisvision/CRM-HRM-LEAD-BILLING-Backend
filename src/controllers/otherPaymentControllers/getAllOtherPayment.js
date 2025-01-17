import Joi from "joi";
import validator from "../../utils/validator.js";
import OtherPayment from "../../models/otherPaymentModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const otherPayments = await OtherPayment.findAll();
            if (!otherPayments) {
                return responseHandler.success(res, "OtherPayments not found");
            }
            return responseHandler.success(res, "OtherPayments fetched successfully", otherPayments);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}