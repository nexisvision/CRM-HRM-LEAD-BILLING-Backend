import Joi from "joi";
import validator from "../../utils/validator.js";
import Announcement from "../../models/announcementModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        const { title, description, } = req.body;
        try {
            const announcement = await Announcement.create({ title, description, });
            return responseHandler.success(res, "Announcement created successfully", announcement);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }

    }
}   