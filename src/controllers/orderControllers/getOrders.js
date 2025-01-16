import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Order from "../../models/orderModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const orders = await Order.findAll({ where: { related_id: id } });
            responseHandler.success(res, orders);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}   