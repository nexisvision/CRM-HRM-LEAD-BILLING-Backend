import Joi from "joi";
import validator from "../../utils/validator.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            plan_id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { plan_id } = req.body;
            const client_id = req.user.clientId;

            // Get plan details
            const plan = await SubscriptionPlan.findByPk(plan_id);
            if (!plan) {
                return responseHandler.notFound(res, "Plan not found");
            }

            // Calculate dates
            const start_date = new Date();
            let end_date = null;
            if (plan.billing_cycle === 'yearly') {
                end_date = new Date();
                end_date.setFullYear(end_date.getFullYear() + 1);
            }

            // Create subscription
            const subscription = await ClientSubscription.create({
                client_id,
                plan_id,
                start_date,
                end_date,
                status: plan.trial_days > 0 ? 'trial' : 'active'
            });

            responseHandler.created(res, "Subscription created successfully", subscription);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}; 