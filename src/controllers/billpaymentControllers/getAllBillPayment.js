import Joi from "joi";
import validator from "../../utils/validator.js";
import BillPayment from "../../models/billpaymentModel.js";
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
            const { id } = req.user;
            const billPayment = await BillPayment.findAll();
            return responseHandler.success(res, "billPayment fetched successfully", billPayment);

        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}