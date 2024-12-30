import Joi from "joi";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().allow('', null).optional(),
            price: Joi.number().allow('', null).optional(),
            duration: Joi.string().allow('', null).optional(),
            description: Joi.string().allow('', null).optional(),
            trial_period: Joi.number().allow('', null).optional(),
            max_users: Joi.number().allow('', null).optional(),
            max_customers: Joi.number().allow('', null).optional(),
            max_vendors: Joi.number().allow('', null).optional(),
            max_clients: Joi.number().allow('', null).optional(),
            storage_limit: Joi.number().allow('', null).optional(),
            features: Joi.object({
                account: Joi.boolean().allow('', null).optional(),
                crm: Joi.boolean().allow('', null).optional(),
                hrm: Joi.boolean().allow('', null).optional(),
                project: Joi.boolean().allow('', null).optional()
            }).optional(),
            status: Joi.string().valid('active', 'inactive').allow('', null).optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price, duration, description, trial_period, max_users, max_customers, max_vendors, max_clients, storage_limit, features, status } = req.body;

            const plan = await SubscriptionPlan.findByPk(id);
            if (!plan) {
                return responseHandler.notFound(res, "Plan not found");
            }

            await plan.update({ name, price, duration, description, trial_period, max_users, max_customers, max_vendors, max_clients, storage_limit, features, status });

            responseHandler.success(res, "Plan updated successfully", plan);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}; 