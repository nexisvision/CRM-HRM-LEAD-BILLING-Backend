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
                    attributes: ['name', 'features', 'max_users', 'max_customers', 'storage_limit']
                }],
                order: [['created_at', 'DESC']]
            });

            if (!subscription) {
                return responseHandler.notFound(res, "No active subscription found");
            }

            responseHandler.success(res, "Subscription status retrieved", subscription);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}; 