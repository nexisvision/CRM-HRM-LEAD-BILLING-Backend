import Joi from "joi";
import validator from "../../utils/validator.js";
import Message from "../../models/messageModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const messageData = await Message.findByPk(id);
            if (!messageData) {
                responseHandler.error(res, "Message not found");
            }
            await messageData.destroy();
            responseHandler.success(res, "Message deleted successfully", messageData);
        }
        catch (error) {
            responseHandler.error(res, "Internal server error");
        }
    }
}   