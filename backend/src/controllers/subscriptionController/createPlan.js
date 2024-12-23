import Joi from "joi";
import validator from "../../utils/validator.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().valid('platinum', 'gold', 'silver', 'bronze').required(),
            price: Joi.number().required(),
            billing_cycle: Joi.string().valid('lifetime', 'yearly').required(),
            trial_days: Joi.number().min(0).required(),
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
            const plan = await SubscriptionPlan.create(req.body);
            responseHandler.created(res, "Plan created successfully", plan);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}; 