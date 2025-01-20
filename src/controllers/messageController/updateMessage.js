import Joi from "joi";
import validator from "../../utils/validator.js";
import Message from "../../models/messageModel.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            message: Joi.string().required(),
            file: Joi.string().optional().allow(null, ''),
            isRead: Joi.boolean().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { message, file, isRead } = req.body;
            const existingMessage = await Message.findOne({ where: { message, file, isRead, id: { [Op.not]: id } } });
            if (existingMessage) {
                return responseHandler.error(res, "Message already exists");
            }
            const messageData = await Message.findByPk(id);
            if (!messageData) {
                return responseHandler(res, "Message not found");
            }

            await messageData.update({ message, file, isRead });

            return responseHandler.success(res, "Message updated successfully", messageData);
        }
        catch (error) {
            return responseHandler.error(res, "Internal server error");
        }
    }
}