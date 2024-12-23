import Joi from "joi";
import validator from "../../utils/validator.js";
import Meeting from "../../models/meetingModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const meetings = await Meeting.findAll();
            if (!meetings) {
                return responseHandler.notFound(res, "Meetings not found");
            }
            return responseHandler.success(res, "Meetings retrieved successfully", meetings);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}