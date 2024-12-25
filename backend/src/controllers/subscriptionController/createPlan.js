import Joi from "joi";
import validator from "../../utils/validator.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().valid('platinum', 'gold', 'silver', 'bronze').required(),
            price: Joi.number().required(),
            duration: Joi.string().valid('lifetime', 'monthly', 'yearly').required(),
            description: Joi.string().required(),
            trial_period: Joi.number().required(),
            max_users: Joi.number().required(),
            max_customers: Joi.number().required(),
            max_vendors: Joi.number().required(),
            max_clients: Joi.number().required(),
            storage_limit: Joi.number().required(),
            features: Joi.object({
                account: Joi.boolean().required(),
                crm: Joi.boolean().required(),
                hrm: Joi.boolean().required(),
                project: Joi.boolean().required()
            }).required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, price, duration, description, trial_period, max_users, max_customers, max_vendors, max_clients, storage_limit, features } = req.body;
            const plan = await SubscriptionPlan.create({ name, price, duration, description, trial_period, max_users, max_customers, max_vendors, max_clients, storage_limit, features });
            if (!plan) {
                return responseHandler.error(res, "Failed to create plan");
            }
            responseHandler.created(res, "Plan created successfully", plan);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}; 