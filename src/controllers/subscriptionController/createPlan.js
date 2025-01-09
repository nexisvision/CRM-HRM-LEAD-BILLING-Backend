import Joi from "joi";
import validator from "../../utils/validator.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
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
            status: Joi.string().valid('active', 'inactive').required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, currency, price, duration, trial_period, max_users, max_clients, storage_limit, features, status } = req.body;
            const plan = await SubscriptionPlan.create({ name, currency, price, duration, trial_period, max_users, max_clients, storage_limit, features, status, created_by: req.user?.username });
            responseHandler.created(res, "Plan created successfully", plan);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};