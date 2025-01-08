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

            const allNotifications = await Notification.findAll();

            console.log("allNotifications", allNotifications);

            return responseHandler.success(res, "Notifications marked as read successfully", allNotifications || []);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    },
};