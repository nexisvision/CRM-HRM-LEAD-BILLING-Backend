import Joi from "joi";
import Payment from "../../models/paymentModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const payments = await Payment.findByPk(id);
            responseHandler.success(res, "Payments fetched successfully", payments);
        } catch (error) {
            console.error('Error fetching payments:', error);
            responseHandler.error(res, error.message);
        }
    }
};