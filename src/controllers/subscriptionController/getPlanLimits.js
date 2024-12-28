import ClientSubscription from "../../models/clientSubscriptionModel.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const clientId = req.user.clientId;

            const subscription = await ClientSubscription.findOne({
                where: {
                    client_id: clientId,
                    status: ['active', 'trial']
                },
                include: [{
                    model: SubscriptionPlan,
                    attributes: ['max_users', 'max_customers', 'max_vendors', 'max_clients', 'storage_limit']
                }]
            });

            if (!subscription) {
                return responseHandler.notFound(res, "No active subscription found");
            }

            const limits = {
                users: subscription.SubscriptionPlan.max_users,
                customers: subscription.SubscriptionPlan.max_customers,
                vendors: subscription.SubscriptionPlan.max_vendors,
                clients: subscription.SubscriptionPlan.max_clients,
                storage: subscription.SubscriptionPlan.storage_limit
            };

            responseHandler.success(res, "Plan limits retrieved", limits);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}; 