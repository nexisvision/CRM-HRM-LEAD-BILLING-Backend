import Joi from "joi";
import InterviewSchedule from "../../models/interviewSchedule.js";
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
            const interviewSchedules = await InterviewSchedule.findAll();
            return responseHandler.success(res, "Interview schedules fetched successfully", interviewSchedules);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}