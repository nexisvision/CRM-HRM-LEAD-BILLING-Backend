import Joi from "joi";
import validator from "../../utils/validator.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";
import SubscriptionPlan from "../../models/subscriptionPlanModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Bill from "../../models/billModel.js";
import { getPlanBuyEmailTemplate } from "../../utils/emailTemplates.js";
import User from "../../models/userModel.js";
import { sendEmail } from "../../utils/emailService.js";
import { CLIENT_URL } from "../../config/config.js";

export default {
    validator: validator({
        body: Joi.object({
            client_id: Joi.string().required(),
            plan_id: Joi.string().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().optional(),
            status: Joi.string().valid('active', 'trial').required(),
            payment_status: Joi.string().valid('paid', 'unpaid').default('unpaid')
        })
    }),
    handler: async (req, res) => {
        try {
            const { client_id, plan_id, start_date, end_date, status, payment_status } = req.body;

            // Check if plan exists
            const plan = await SubscriptionPlan.findByPk(plan_id);
            if (!plan) {
                return responseHandler.notFound(res, "Subscription plan not found");
            }

            // Check if client already has an active subscription
            const existingSubscription = await ClientSubscription.findOne({
                where: {
                    client_id,
                    status: ['active', 'trial']
                }
            });

            if (existingSubscription) {
                return responseHandler.error(res, "Client already has an active subscription");
            }

            // Create new subscription
            const subscription = await ClientSubscription.create({
                client_id,
                plan_id,
                start_date,
                end_date,
                status,
                current_users_count: 0,
                current_clients_count: 0,
                current_storage_used: 0,
                payment_status,
                created_by: req.user?.username
            });

            const planPrice = plan.price;
            const client = await User.findByPk(client_id);

            // Create bill record
            const bill = await Bill.create({
                related_id: subscription.id,
                vendor: client_id,
                billDate: new Date(),
                discription: {
                    subscription
                },
                status: payment_status,
                discount: 0,
                tax: 0,
                total: planPrice,
                note: "Thank you for subscribing to our service",
                created_by: req.user?.username
            });

            // Generate bill download URL
            const billUrl = `${CLIENT_URL}/api/v1/bills/download/${bill.id}`;

            // Send email with bill download link
            const emailTemplate = getPlanBuyEmailTemplate(client.username, plan, billUrl);
            await sendEmail(
                client.email,
                'Plan Buy Confirmation',
                emailTemplate
            );

            responseHandler.created(res, "Subscription plan assigned successfully", subscription);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
