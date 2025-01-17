import ClientSubscription from '../models/clientSubscriptionModel.js';
import Role from '../models/roleModel.js';
import SubscriptionPlan from '../models/subscriptionPlanModel.js';
import responseHandler from '../utils/responseHandler.js';

export const getActiveSubscription = async (req, res, next) => {
    const clientSubscription = await ClientSubscription.findOne({
        where: { client_id: req?.user?.id, status: ['active', 'trial', 'expired'] }
    });
    if (!clientSubscription) return responseHandler.error(res, 'Subscription is not found')
    if (clientSubscription.status === 'expired') return responseHandler.error(res, 'Subscription expired');
    const plan = await SubscriptionPlan.findByPk(clientSubscription.plan_id);
    if (!plan) throw new Error('Subscription plan not found');
    req.subscription = { clientSubscription, plan };
    return next();
};

export const checkSubscriptionLimits = async (req, res, next) => {
    try {
        const { user } = req;
        const { clientSubscription, plan } = req.user;
        const role = await Role.findByPk(user?.role_id);
        if (!role) return responseHandler.error(res, 'Role not found');
        if (['super-admin', 'client'].includes(role.role_name)) {
            req.subscription = { clientSubscription, plan };
            return next();
        }
        const limits = {
            'sub-client': { field: 'current_clients_count', max: plan.max_clients, message: 'Maximum client limit reached' },
            'user': { field: 'current_users_count', max: plan.max_users, message: 'Maximum number of users reached' }
        };

        if (role.role_name === 'sub-client') {
            if (clientSubscription[limits[role.role_name].field] >= limits[role.role_name].max) {
                return responseHandler.error(res, limits[role.role_name].message);
            }
        } else {
            if (clientSubscription[limits['user'].field] >= limits['user'].max) {
                return responseHandler.error(res, limits['user'].message);
            }
        }
        req.subscription = clientSubscription;
        return next();
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
};