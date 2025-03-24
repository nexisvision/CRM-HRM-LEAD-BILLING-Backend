import Joi from "joi";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().optional()
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            currency: Joi.string().optional(),
            price: Joi.string().optional(),
            duration: Joi.string().optional(),
            trial_period: Joi.string().optional().allow(null),
            status: Joi.string().valid('active', 'inactive').optional(),
            max_users: Joi.string().optional(),
            max_clients: Joi.string().optional(),
            max_customers: Joi.string().optional().allow("",null),
            max_vendors: Joi.string().optional().allow("",null),
            storage_limit: Joi.string().optional(),
            features: Joi.object().optional().allow(null),
            is_default: Joi.boolean().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, currency, price, duration, trial_period, max_users, max_clients, max_customers, max_vendors, storage_limit, features, status, is_default } = req.body;

            const plan = await SubscriptionPlan.findByPk(id);
            if (!plan) {
                return responseHandler.notFound(res, "Plan not found");
            }

            const existingPlan = await SubscriptionPlan.findOne({ where: { name, id: { [Op.not]: id } } });
            if (existingPlan) {
                return responseHandler.error(res, "Plan already exists");
            }

            if (is_default) {
                await SubscriptionPlan.update(
                    { is_default: false },
                    { where: { id: { [Op.not]: id }, is_default: true } }
                );
            }

            await plan.update({ name, currency, price, duration, trial_period, max_users, max_clients, max_customers, max_vendors, storage_limit, features, status, is_default, updated_by: req.user?.username });

            return responseHandler.success(res, "Plan updated successfully", plan);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}; 