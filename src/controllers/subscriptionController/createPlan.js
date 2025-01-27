import Joi from "joi";
import validator from "../../utils/validator.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Notification from "../../models/notificationModel.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().optional(),
            currency: Joi.string().optional(),
            price: Joi.number().optional(),
            duration: Joi.string().valid('Lifetime', 'Per Month', 'Per Year').optional(),
            trial_period: Joi.number().optional(),
            max_users: Joi.number().optional(),
            max_clients: Joi.number().optional(),
            storage_limit: Joi.number().optional(),
            features: Joi.object().optional().allow(null),
            status: Joi.string().valid('active', 'inactive').optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, currency, price, duration, trial_period, max_users, max_clients, storage_limit, features, status } = req.body;
            const existingPlan = await SubscriptionPlan.findOne({ where: { name } });
            if (existingPlan) {
                return responseHandler.error(res, "Plan already exists");
            }
            const plan = await SubscriptionPlan.create({ name, currency, price, duration, trial_period, max_users, max_clients, storage_limit, features, status, created_by: req.user?.username });
            const clients = await ClientSubscription.findAll({ where: { status: 'active' } });

            const clientsIds = clients.map(client => client.client_id);

            await Notification.create({
                related_id: req.user?.id,
                users: clientsIds,
                title: "New Plan",
                from: req.user?.id,
                message: `A new plan is available,tap to view`,
                description: `Plan Name: ${name}`,
                created_by: req.user?.username,
            });
            return responseHandler.created(res, "Plan created successfully", plan);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};