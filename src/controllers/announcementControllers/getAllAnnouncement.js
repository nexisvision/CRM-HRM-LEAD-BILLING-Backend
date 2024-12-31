import Joi from "joi";
import Announcement from "../../models/announcementModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const announcements = await Announcement.findAll();
            responseHandler.success(res, "Announcements fetched successfully", announcements);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
