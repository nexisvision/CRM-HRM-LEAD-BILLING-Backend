import Joi from "joi";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().required(),
            currency: Joi.string().required(),
            price: Joi.number().required(),
            duration: Joi.string().valid('Lifetime', 'Per Month', 'Per Year').required(),
            trial_period: Joi.number().required(),
            max_users: Joi.number().required(),
            max_clients: Joi.number().required(),
            storage_limit: Joi.number().required(),
            features: Joi.object().optional().allow(null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, currency, price, duration, trial_period, max_users, max_clients, storage_limit, features, status } = req.body;

            const plan = await SubscriptionPlan.findByPk(id);
            if (!plan) {
                return responseHandler.notFound(res, "Plan not found");
            }

            await plan.update({ name, currency, price, duration, trial_period, max_users, max_clients, storage_limit, features, status, updated_by: req.user?.username });

            return responseHandler.success(res, "Plan updated successfully", plan);
        } catch (error) {

            return responseHandler.error(res, error);
        }
    }
}; 