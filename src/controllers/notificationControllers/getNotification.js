import Joi from "joi";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const userId = req.user.id;

            const notification = await Notification.findAll({ where: { isRead: false } });

            const filteredNotifications = notification.filter(a => a.users.includes(userId));
            if (filteredNotifications.length === 0) {
                return responseHandler.success(res, "No notifications found", []);
            }

            for (const notification of filteredNotifications) {
                notification.isRead = true;
                await notification.save();
            }

            return responseHandler.success(res, "Notifications fetched successfully", filteredNotifications);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    },
};