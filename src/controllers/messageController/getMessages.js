import Joi from "joi";
import validator from "../../utils/validator.js";
import Message from "../../models/messageModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            chooseMember: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { chooseMember } = req.query;
            const messages = await Message.findAll({
                where: { chooseMember }
            });
            if (!messages) {
                return responseHandler(res, "No messages found");
            }
            return responseHandler.success(res, "Messages fetched successfully", messages);
        }
        catch (error) {
            return responseHandler.error(res, "Internal server error");
        }
    }
}
