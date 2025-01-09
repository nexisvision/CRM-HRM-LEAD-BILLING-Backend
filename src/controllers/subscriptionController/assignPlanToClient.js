import Joi from "joi";
import validator from "../../utils/validator.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            client_id: Joi.string().required(),
            plan_id: Joi.string().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().optional(),
            status: Joi.string().valid('active', 'trial').required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { client_id, plan_id, start_date, end_date, status } = req.body;

            // Check if plan exists
            const plan = await SubscriptionPlan.findByPk(plan_id);
            if (!plan) {
                return responseHandler.notFound(res, "Subscription plan not found");
            }

            // Check if client already has an active subscription
            const existingSubscription = await ClientSubscription.findOne({
                where: {
                    client_id,
                    status: ['active', 'trial']
                }
            });

            if (existingSubscription) {
                return responseHandler.error(res, "Client already has an active subscription");
            }

            // Create new subscription
            const subscription = await ClientSubscription.create({
                client_id,
                plan_id,
                start_date,
                end_date,
                status,
                current_users_count: 0,
                current_clients_count: 0,
                current_storage_used: 0,
                created_by: req.user?.username
            });

            responseHandler.created(res, "Subscription plan assigned successfully", subscription);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
