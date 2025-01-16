import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Order from "../../models/orderModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                responseHandler.error(res, "Order not found");
            }
            await order.destroy();
            responseHandler.success(res, "Order deleted successfully", order);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}