import ClientSubscription from '../models/clientSubscriptionModel.js';
import SubscriptionPlan from '../models/subscriptionPlanModel.js';
import responseHandler from '../utils/responseHandler.js';
import User from '../models/userModel.js';

export const checkSubscriptionStatus = async (req, res, next) => {
    try {
        const clientId = req.user.clientId;

        const subscription = await ClientSubscription.findOne({
            where: {
                client_id: clientId,
                status: ['active', 'trial']
            },
            include: [{
                model: SubscriptionPlan,
                attributes: ['max_users', 'max_customers', 'max_vendors', 'max_clients', 'storage_limit', 'features']
            }]
        });

        if (!subscription) {
            return responseHandler.forbidden(res, "No active subscription found");
        }

        // Add subscription info to request for further use
        req.subscription = subscription;
        next();
    } catch (error) {
        console.log(error);
        responseHandler.error(res, error.message);
    }
};

export const checkSubscriptionLimits = (limitType) => {
    return async (req, res, next) => {
        try {
            const subscription = req.subscription;
            const plan = subscription.SubscriptionPlan;

            switch (limitType) {
                case 'users':
                    // Check user limit
                    const currentUsers = await User.count({ where: { clientId: req.user.clientId } });
                    if (currentUsers >= plan.max_users) {
                        return responseHandler.forbidden(res, "User limit reached for your subscription");
                    }
                    break;

                case 'storage':
                    // Check storage limit
                    if (subscription.current_storage_used >= plan.storage_limit) {
                        return responseHandler.forbidden(res, "Storage limit reached");
                    }
                    break;

                // Add other limit checks as needed
            }

            next();
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    };
};

// Example of checking user limit
const checkUserLimit = async (clientId, plan) => {
    const currentUsers = await User.count({ where: { clientId } });
    return currentUsers < plan.max_users;
};

// Example of checking storage limit
const checkStorageLimit = async (clientId, plan) => {
    const subscription = await ClientSubscription.findOne({
        where: { client_id: clientId }
    });
    return subscription.current_storage_used < plan.storage_limit;
}; 