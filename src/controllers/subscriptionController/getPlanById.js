import Joi from "joi";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
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

            const plan = await SubscriptionPlan.findByPk(id);
            if (!plan) {
                responseHandler.notFound(res, "Plan not found");
            }

            responseHandler.success(res, "Plan retrieved successfully", plan);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
}; 