import Announcement from "../../models/announcementModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            title: Joi.string().required()
                .messages({
                    'string.empty': 'Title is required'
                }),
            description: Joi.string().required()
                .messages({
                    'string.empty': 'Description is required'
                })
        })
    }),
    handler: async (req, res) => {
        const { title, description } = req.body;
        try {
            const announcement = await Announcement.findByPk(req.params.id);
            if (!announcement) {
                return responseHandler.error(res, "Announcement not found");
            }
            await announcement.update({ title, description });
            responseHandler.success(res, "Announcement updated successfully", announcement);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
