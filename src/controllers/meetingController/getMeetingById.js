import Joi from "joi";
import Meeting from "../../models/meetingModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const meeting = await Meeting.findByPk(id);
            if (!meeting) {
                responseHandler.notFound(res, "Meeting not found");
            }
            responseHandler.success(res, "Meeting retrieved successfully", meeting);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}