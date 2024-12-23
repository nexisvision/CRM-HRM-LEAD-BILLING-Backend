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
            price: Joi.number().optional(),
            trial_days: Joi.number().min(0).optional(),
            max_users: Joi.number().optional(),
            max_customers: Joi.number().optional(),
            max_vendors: Joi.number().optional(),
            max_clients: Joi.number().optional(),
            storage_limit: Joi.number().optional(),
            features: Joi.object({
                account: Joi.boolean().optional(),
                crm: Joi.boolean().optional(),
                hrm: Joi.boolean().optional(),
                project: Joi.boolean().optional()
            }).optional(),
            status: Joi.string().valid('active', 'inactive').optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const plan = await SubscriptionPlan.findByPk(id);
            if (!plan) {
                return responseHandler.notFound(res, "Plan not found");
            }

            await plan.update(req.body);

            responseHandler.success(res, "Plan updated successfully", plan);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}; 