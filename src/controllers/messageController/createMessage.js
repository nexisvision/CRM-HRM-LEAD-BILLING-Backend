import Joi from "joi";
import validator from "../../utils/validator.js";
import Message from "../../models/messageModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            chooseMember: Joi.string().required(),
            message: Joi.string().required(),
            file: Joi.string().optional().allow(null, ''),
            isRead: Joi.boolean().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { chooseMember, message, file, isRead } = req.body;
            const messageData = await Message.create({
                chooseMember,
                message,
                file,
                isRead
            });
            responseHandler.success(res, "Message sent successfully", messageData);
        }
        catch (error) {
            responseHandler.error(res, "Internal server error");
        }
    }
}