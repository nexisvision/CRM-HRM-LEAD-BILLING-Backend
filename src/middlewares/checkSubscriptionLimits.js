import ClientSubscription from '../models/clientSubscriptionModel.js';
import Role from '../models/roleModel.js';
import SubscriptionPlan from '../models/subscriptionPlanModel.js';
import SuperAdmin from '../models/superAdminModel.js';
import User from '../models/userModel.js';
import responseHandler from '../utils/responseHandler.js';
import { Op } from 'sequelize';

// sanivar

export const getActiveSubscription = async (req, res, next) => {
    try {

        console.log('req.user', req.user);
        const role = await Role.findByPk(req.user.role);
        if (!role) return responseHandler.error(res, 'Role not found');

        let clientSubscription;
        if (role.role_name === 'client') {
            clientSubscription = await ClientSubscription.findOne({
                where: { client_id: req.user.id, status: ['active', 'trial', 'expired'] }
            });
        } else {
            const user = await User.findByPk(req.user.id);
            if (!user?.client_plan_id) {
                return responseHandler.error(res, 'No subscription plan found for user');
            }
            clientSubscription = await ClientSubscription.findByPk(user.client_plan_id);
        }

        // console.log('Subscription check for user:', req.user.id, 'Role:', role.role_name);

        if (!clientSubscription) return responseHandler.error(res, 'Subscription is not found');
        if (clientSubscription.status === 'expired') return responseHandler.error(res, 'Subscription expired');

        const plan = await SubscriptionPlan.findByPk(clientSubscription.plan_id);
        if (!plan) throw new Error('Subscription plan not found');

        req.subscription = { clientSubscription, plan };
        return next();
    } catch (error) {
        console.error('Error in getActiveSubscription:', error);
        return responseHandler.error(res, error?.message);
    }
};


export const checkSubscriptionDates = async (req, res, next) => {
    try {
        const { login } = req.body;
        const currentDate = new Date();

        const isSuperAdmin = await SuperAdmin.findOne({ where: { email: login } });

        if (isSuperAdmin) {
            return next();
        }

        // Find user by username, email or phone
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    login && { username: login },
                    login && { email: login },
                    login && { phone: login }
                ].filter(Boolean)
            }
        });

        if (!user) {
            return responseHandler.error(res, 'User not found');
        }

        // Get user's role
        const role = await Role.findByPk(user.role_id);
        if (!role) {
            return responseHandler.error(res, 'Role not found');
        }

        let subscription;
        if (role.role_name === 'client') {
            // If user is client, find subscription using user.id as client_id
            subscription = await ClientSubscription.findOne({
                where: {
                    client_id: user.id,
                    status: ['active', 'trial']
                }
            });
        } else {
            // For other roles, find subscription using user.client_id
            subscription = await ClientSubscription.findOne({
                where: {
                    client_id: user.client_id,
                    status: ['active', 'trial']
                }
            });
        }

        if (!subscription) {
            return responseHandler.error(res, 'No active subscription found');
        }

        // Check if current date is within subscription period
        const startDate = new Date(subscription.start_date);
        const endDate = subscription.end_date ? new Date(subscription.end_date) : null;

        if (currentDate < startDate) {
            return responseHandler.error(res, 'Subscription has not started yet');
        }

        if (endDate && currentDate > endDate) {
            return responseHandler.error(res, 'Subscription has expired');
        }

        // Add subscription dates to request
        req.subscriptionDates = {
            start_date: subscription.start_date,
            end_date: subscription.end_date
        };

        next();
    } catch (error) {
        console.error('Error in checkSubscriptionDates:', error);
        return responseHandler.error(res, error?.message);
    }
};




export const checkSubscriptionLimits = async (req, res, next) => {
    try {
        const role = await Role.findByPk(req.user.role_id);
        if (!role) return responseHandler.error(res, 'Role not found');

        let clientSubscription, plan;
        if (role.role_name === 'client') {
            clientSubscription = req.user.clientSubscription;
            plan = req.user.plan;
        } else {
            const user = await User.findByPk(req.user.id);
            if (!user?.client_plan_id) {
                return responseHandler.error(res, 'No subscription plan found for user');
            }
            clientSubscription = await ClientSubscription.findByPk(user.client_plan_id);
            plan = await SubscriptionPlan.findByPk(clientSubscription.plan_id);
        }

        // console.log('Checking limits for user:', req.user.id, 'Role:', role.role_name);

        if (['super-admin', 'client'].includes(role.role_name)) {
            req.subscription = { clientSubscription, plan };
            return next();
        }

        const limits = {
            'sub-client': { field: 'current_clients_count', max: plan.max_clients, message: 'Maximum client limit reached' },
            'user': { field: 'current_users_count', max: plan.max_users, message: 'Maximum number of users reached' },
            'vendors': { field: 'current_vendors_count', max: plan.max_vendors, message: 'Maximum number of vendors reached' },
            'customers': { field: 'current_customers_count', max: plan.max_customers, message: 'Maximum number of customers reached' },




        };

        if (role.role_name === 'sub-client') {
            if (clientSubscription[limits[role.role_name].field] >= limits[role.role_name].max) {
                return responseHandler.error(res, limits[role.role_name].message);
            }
        } else if (role.role_name === 'user') {
            if (clientSubscription[limits['user'].field] >= limits['user'].max) {
                return responseHandler.error(res, limits['user'].message);
            }
        } else {
            if (clientSubscription[limits['vendors'].field] >= limits['vendors'].max) {
                return responseHandler.error(res, limits['vendors'].message);
            }
            if (clientSubscription[limits['customers'].field] >= limits['customers'].max) {
                return responseHandler.error(res, limits['customers'].message);
            }
        }

        req.subscription = { clientSubscription, plan };
        return next();
    } catch (error) {
        console.error('Error in checkSubscriptionLimits:', error);
        return responseHandler.error(res, error?.message);
    }
};









// import ClientSubscription from '../models/clientSubscriptionModel.js';
// import Role from '../models/roleModel.js';
// import SubscriptionPlan from '../models/subscriptionPlanModel.js';
// import responseHandler from '../utils/responseHandler.js';

// export const getActiveSubscription = async (req, res, next) => {
//     const clientSubscription = await ClientSubscription.findOne({
//         where: { client_id: req?.user?.id, status: ['active', 'trial', 'expired'] }
//     });
//     if (!clientSubscription) return responseHandler.error(res, 'Subscription is not found')
//     if (clientSubscription.status === 'expired') return responseHandler.error(res, 'Subscription expired');
//     const plan = await SubscriptionPlan.findByPk(clientSubscription.plan_id);
//     if (!plan) throw new Error('Subscription plan not found');
//     req.subscription = { clientSubscription, plan };
//     return next();
// };

// export const checkSubscriptionLimits = async (req, res, next) => {
//     try {
//         const { user } = req;
//         const { clientSubscription, plan } = req.user;
//         const role = await Role.findByPk(user?.role_id);
//         if (!role) return responseHandler.error(res, 'Role not found');
//         if (['super-admin', 'client'].includes(role.role_name)) {
//             req.subscription = { clientSubscription, plan };
//             return next();
//         }
//         const limits = {
//             'sub-client': { field: 'current_clients_count', max: plan.max_clients, message: 'Maximum client limit reached' },
//             'user': { field: 'current_users_count', max: plan.max_users, message: 'Maximum number of users reached' }
//         };

//         if (role.role_name === 'sub-client') {
//             if (clientSubscription[limits[role.role_name].field] >= limits[role.role_name].max) {
//                 return responseHandler.error(res, limits[role.role_name].message);
//             }
//         } else {
//             if (clientSubscription[limits['user'].field] >= limits['user'].max) {
//                 return responseHandler.error(res, limits['user'].message);
//             }
//         }
//         req.subscription = clientSubscription;
//         return next();
//     } catch (error) {
//         return responseHandler.error(res, error?.message);
//     }
// };