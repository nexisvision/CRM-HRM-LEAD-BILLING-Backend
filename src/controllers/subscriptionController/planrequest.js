import Joi from "joi";
import validator from "../../utils/validator.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";
import { getPlanBuyEmailTemplate } from "../../utils/emailTemplates.js";
import { sendEmail } from "../../utils/emailService.js";

export default {
    validator: validator({
        body: Joi.object({
            plan_id: Joi.string().required(),
            client_id: Joi.string().required(),
            // amount: Joi.number().required(),
            payment_status: Joi.string().valid('paid', 'unpaid').default('unpaid')
        })
    }),
    handler: async (req, res) => {
        try {
            const { plan_id, payment_status , client_id} = req.body;
            // const client_id = req.user.id;

            // Get the plan details
            const plan = await SubscriptionPlan.findByPk(plan_id);
            if (!plan) {
                return responseHandler.notFound(res, "Subscription plan not found");
            }

            // // Verify amount matches plan price
            // if (amount !== plan.price) {
            //     return responseHandler.error(res, "Amount does not match plan price");
            // }

            // Check for existing subscription
            const existingSubscription = await ClientSubscription.findOne({
                where: {
                    client_id
                }
            });

            // Calculate dates
            const start_date = new Date();
            const end_date = new Date(start_date);
            end_date.setMonth(end_date.getMonth() + plan.duration);

            let subscription;
            if (existingSubscription) {
                // Update existing subscription
                subscription = await existingSubscription.update({
                    plan_id,
                    start_date,
                    end_date,
                    status: 'active',
                    current_storage_used: 0,
                    current_users_count: 0,
                    current_clients_count: 0,
                    payment_status: payment_status,
                    last_payment_date: new Date(),
                    updated_by: req.user?.username
                });
            } else {
                // Create new subscription
                subscription = await ClientSubscription.create({
                    client_id,
                    plan_id,
                    start_date,
                    end_date,
                    status: 'active',
                    current_users_count: 0,
                    current_clients_count: 0,
                    current_storage_used: 0,
                    payment_status: payment_status,
                    last_payment_date: new Date(),
                    created_by: req.user?.username
                });
            }

            const client = await User.findByPk(client_id);

            // Send confirmation email
            const emailTemplate = getPlanBuyEmailTemplate(client.username, plan);
            await sendEmail(
                client.email,
                'Plan Purchase Confirmation',
                emailTemplate
            );

            const message = existingSubscription ? 
                "Subscription plan updated successfully" :
                "Subscription plan request processed successfully";

            return responseHandler.created(res, message, subscription);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
