import ClientSubscription from '../models/clientSubscriptionModel.js';
import SubscriptionPlan from '../models/subscriptionPlanModel.js';
import responseHandler from '../utils/responseHandler.js';

const getActiveSubscription = async (clientId) => {
    const clientSubscription = await ClientSubscription.findOne({
        where: {
            client_id: clientId,
            status: ['active', 'trial', 'expired']
        }
    });

    if (!clientSubscription) {
        throw new Error('No active subscription found');
    }
    if (clientSubscription.status === 'expired') {
        throw new Error('Subscription has expired');
    }


    const plan = await SubscriptionPlan.findByPk(clientSubscription.plan_id);

    if (!plan) {
        throw new Error('Subscription plan not found');
    }

    return { clientSubscription, plan };
};

export const checkSubscriptionExpiry = async (req, res, next) => {
    try {
        const { clientSubscription } = await getActiveSubscription(req.user?.id);
        const currentDate = new Date();
        if (clientSubscription.end_date && new Date(clientSubscription.end_date) < currentDate) {
            // Update subscription status to expired
            await clientSubscription.update({ status: 'expired' });
            return responseHandler.error(res, 'Subscription has expired');
        }
        next();
    } catch (error) {
        return responseHandler.error(res, error.message)
    }
};

export const checkUserLimit = async (req, res, next) => {
    try {
        const { clientSubscription, plan } = await getActiveSubscription(req.user?.id);

        // Check if user limit is reached
        if (clientSubscription.current_users_count >= plan.max_users) {
            return responseHandler.error(res, 'Maximum user limit reached for your subscription plan');
        }

        req.subscription = clientSubscription;
        next();
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};

export const checkClientLimit = async (req, res, next) => {
    try {
        const { clientSubscription, plan } = await getActiveSubscription(req.user?.id);


        // Check if client limit is reached
        if (clientSubscription.current_clients_count >= plan.max_clients) {
            return responseHandler.error(res, 'Maximum client limit reached for your subscription plan');
        }
        req.subscription = clientSubscription;
        next();
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};
